import { query } from "../../../lib/db";
import { getUserFromRequest } from "../../../lib/auth";
import { verifyRecaptcha } from "../../../lib/recaptcha";
import { formidable } from "formidable";
import fs from "fs/promises";
import path from "path";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

async function parseApplication(req) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
  await fs.mkdir(uploadDir, { recursive: true });
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: MAX_RESUME_SIZE,
    filter: ({ mimetype }) => !mimetype || ALLOWED_RESUME_TYPES.has(mimetype),
  });
  return new Promise((resolve, reject) => form.parse(req, (error, fields, files) => error ? reject(error) : resolve({ fields, files })));
}

export default async function handler(req, res) {
  const sessionUser = getUserFromRequest(req);
  if (!sessionUser) {
    return res.status(401).json({ error: "Please log in to access applications." });
  }

  if (req.method === "GET") {
    try {
      const applications = await query(
        `SELECT a.id, a.status, a.created_at, j.id AS job_id, j.title, j.employer_name, j.location
         FROM applications a JOIN jobs j ON j.id = a.job_id
         WHERE a.user_id = ? ORDER BY a.created_at DESC`,
        [sessionUser.id]
      );
      return res.status(200).json({ applications });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to load applications." });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let fields;
  let files;
  try {
    ({ fields, files } = await parseApplication(req));
  } catch (error) {
    return res.status(400).json({ error: "Resume upload failed. Use a PDF, DOC, or DOCX file up to 5 MB." });
  }

  const jobId = first(fields.jobId);
  const fullName = first(fields.fullName);
  const email = first(fields.email);
  const phone = first(fields.phone);
  const coverLetter = first(fields.coverLetter);
  const resumeLink = first(fields.resumeLink);
  const resumeMethod = first(fields.resumeMethod);
  const captchaToken = first(fields.captchaToken);
  let answers = {};
  try { answers = JSON.parse(first(fields.answers) || "{}"); } catch { return res.status(400).json({ error: "Application answers are invalid." }); }
  const resumeFile = first(files.resumeFile);
  const uploadedResumeUrl = resumeFile ? `/uploads/resumes/${path.basename(resumeFile.filepath)}` : null;

  if (!jobId || !fullName || !email || !phone || !coverLetter) {
    return res.status(400).json({ error: "Job, full name, email, phone, and cover letter are required." });
  }
  try {
    if (!(await verifyRecaptcha(req, captchaToken))) {
      return res.status(400).json({ error: "Please complete the reCAPTCHA challenge." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "reCAPTCHA verification is unavailable. Please try again." });
  }
  if (!['upload', 'link'].includes(resumeMethod)) {
    return res.status(400).json({ error: "Choose how you want to provide your resume." });
  }
  if (resumeMethod === 'upload' && !uploadedResumeUrl) {
    return res.status(400).json({ error: "Please upload your resume file." });
  }
  if (resumeMethod === 'link') {
    try {
      const url = new URL(resumeLink);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol');
    } catch {
      return res.status(400).json({ error: "Please provide a valid resume link." });
    }
  }

  try {
    const jobs = await query("SELECT id FROM jobs WHERE id = ?", [jobId]);
    if (!jobs.length) return res.status(404).json({ error: "Job not found." });
    const existingApplication = await query("SELECT id FROM applications WHERE job_id = ? AND user_id = ?", [jobId, sessionUser.id]);
    if (existingApplication.length) {
      return res.status(409).json({ error: "You have already applied for this job.", alreadyApplied: true });
    }
    const questions = await query("SELECT id, input_type, select_items, is_required FROM application_form_questions WHERE job_id = ?", [jobId]);
    const answerRows = [];
    for (const question of questions) {
      const value = answers[question.id];
      const values = Array.isArray(value) ? value : [value];
      if (question.is_required && !values.some((item) => String(item || "").trim())) {
        return res.status(400).json({ error: "Please answer all required application questions." });
      }
      if (value !== undefined && value !== "" && (!Array.isArray(value) || value.length)) {
        const allowed = question.select_items ? question.select_items.split(",").map((item) => item.trim()) : [];
        if ((question.input_type === "single-select" || question.input_type === "multi-select") && values.some((item) => !allowed.includes(item))) {
          return res.status(400).json({ error: "An application answer is invalid." });
        }
        answerRows.push([question.id, Array.isArray(value) ? value.join(", ") : String(value)]);
      }
    }

    const result = await query(
      `INSERT INTO applications (job_id, user_id, full_name, email, phone, cover_letter, resume_link, resume_file)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [jobId, sessionUser.id, fullName, email, phone, coverLetter, resumeMethod === 'link' ? resumeLink : null, resumeMethod === 'upload' ? uploadedResumeUrl : null]
    );

    for (const [questionId, answer] of answerRows) {
      await query("INSERT INTO application_answers (application_id, question_id, answer) VALUES (?, ?, ?)", [result.insertId, questionId, answer]);
    }

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "You have already applied for this job.", alreadyApplied: true });
    }
    return res.status(500).json({ error: "Failed to submit application." });
  }
}

export const config = {
  api: { bodyParser: false },
};
