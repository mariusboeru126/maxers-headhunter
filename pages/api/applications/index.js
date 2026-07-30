import { query } from "../../../lib/db";
import { getUserFromRequest } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionUser = getUserFromRequest(req);
  if (!sessionUser) {
    return res.status(401).json({ error: "Please log in to apply for this job." });
  }

  const { jobId, fullName, email, phone, coverLetter, resumeLink } = req.body || {};

  if (!jobId || !fullName || !email) {
    return res.status(400).json({ error: "Job, name, and email are required." });
  }

  try {
    await query(
      `INSERT INTO applications (job_id, user_id, full_name, email, phone, cover_letter, resume_link)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [jobId, sessionUser.id, fullName, email, phone || null, coverLetter || null, resumeLink || null]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to submit application." });
  }
}
