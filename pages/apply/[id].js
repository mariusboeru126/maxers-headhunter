import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Recaptcha from "../../components/Recaptcha";
import { query } from "../../lib/db";
import { decryptJobLink } from "../../lib/jobLink";
import { getUserFromRequest } from "../../lib/auth";

export async function getServerSideProps({ params, req }) {
  const jobId = decryptJobLink(params.id);
  if (!jobId) return { notFound: true };
  const rows = await query("SELECT id, title, employer_name, location FROM jobs WHERE id = ?", [jobId]);
  if (rows.length === 0) {
    return { notFound: true };
  }
  const questions = await query(
    "SELECT id, question, input_type, select_items, is_required FROM application_form_questions WHERE job_id = ? ORDER BY sort_order, id",
    [jobId]
  );
  const sessionUser = getUserFromRequest(req);
  const applicationRows = sessionUser
    ? await query("SELECT status FROM applications WHERE job_id = ? AND user_id = ?", [jobId, sessionUser.id])
    : [];
  const job = JSON.parse(JSON.stringify(rows[0]));
  return { props: { job, questions: JSON.parse(JSON.stringify(questions)), detailToken: params.id, existingApplication: applicationRows[0] || null } };
}

export default function Apply({ job, questions, detailToken, existingApplication }) {
  const router = useRouter();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", coverLetter: "", resumeLink: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: Boolean(existingApplication) });
  const [answers, setAnswers] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeMethod, setResumeMethod] = useState("upload");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        setUser(data.user);
        if (data.user) {
          setForm((f) => ({ ...f, fullName: data.user.fullName, email: data.user.email }));
        }
      });
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!captchaToken) {
      setStatus({ loading: false, error: "Please complete the reCAPTCHA challenge.", success: false });
      return;
    }
    setStatus({ loading: true, error: "", success: false });

    const payload = new FormData();
    payload.append("jobId", String(job.id));
    payload.append("fullName", form.fullName);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("coverLetter", form.coverLetter);
    payload.append("resumeLink", form.resumeLink);
    payload.append("resumeMethod", resumeMethod);
    payload.append("captchaToken", captchaToken);
    payload.append("answers", JSON.stringify(answers));
    if (resumeFile) payload.append("resumeFile", resumeFile);

    const res = await fetch("/api/applications", {
      method: "POST",
      body: payload,
    });
    const data = await res.json();

    if (!res.ok) {
      setCaptchaToken("");
      captchaRef.current?.reset();
      setStatus({ loading: false, error: data.error || "Something went wrong.", success: false });
      return;
    }

    setStatus({ loading: false, error: "", success: true });
  }

  const handleCaptchaVerify = useCallback((token) => setCaptchaToken(token), []);
  const handleCaptchaExpire = useCallback(() => setCaptchaToken(""), []);

  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-sm text-slate-500 mb-2">
          <Link href={`/jobs/${detailToken}`} className="text-brand hover:underline">{job.title}</Link> / Apply
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Apply for {job.title}</h1>
        <p className="text-slate-500 mb-8">{job.employer_name} • {job.location}</p>

        {user === undefined && (
          <p className="text-slate-500">Checking your session...</p>
        )}

        {user === null && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
            <p className="text-slate-700 mb-4">
              You need an account to apply for this job.
            </p>
            <div className="flex justify-center gap-3">
              <Link href={`/login?next=/apply/${detailToken}`} className="bg-brand text-white font-semibold px-5 py-2.5 rounded-md text-sm">
                Log In
              </Link>
              <Link href={`/signup?next=/apply/${detailToken}`} className="border border-brand text-brand font-semibold px-5 py-2.5 rounded-md text-sm">
                Create Account
              </Link>
            </div>
          </div>
        )}

        {user && status.success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
            {existingApplication ? `You already applied for this job. Current status: ${existingApplication.status}.` : "Your application has been submitted. Our team will review it and get back to you."}
            <Link href="/users" className="block mt-3 font-semibold text-brand hover:underline">View my applications</Link>
          </div>
        )}

        {user && !status.success && (
          <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-lg p-8">
            {status.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
                {status.error}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Resume</label>
              <select
                value={resumeMethod}
                onChange={(event) => {
                  setResumeMethod(event.target.value);
                  setResumeFile(null);
                  update("resumeLink", "");
                }}
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              >
                <option value="upload">Upload a file</option>
                <option value="link">Provide a resume link</option>
              </select>
              {resumeMethod === "upload" ? (
                <><input
                  required
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                  className="mt-2 w-full border border-slate-200 rounded-md px-4 py-2 text-sm file:mr-3 file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-brand file:font-semibold"
                /><p className="mt-1 text-xs text-slate-500">PDF, DOC, or DOCX only; maximum 5 MB.</p></>
              ) : (
                <input
                  required
                  type="url"
                  value={form.resumeLink}
                  onChange={(e) => update("resumeLink", e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="mt-2 w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter</label>
              <textarea
                required
                rows={5}
                value={form.coverLetter}
                onChange={(e) => update("coverLetter", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              />
            </div>

            {questions.map((question) => {
              const options = question.select_items ? question.select_items.split(",").map((item) => item.trim()).filter(Boolean) : [];
              const common = {
                required: Boolean(question.is_required),
                className: "w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm",
              };
              return (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {question.question}{question.is_required ? " *" : ""}
                  </label>
                  {question.input_type === "textarea" ? (
                    <textarea {...common} rows={4} value={answers[question.id] || ""} onChange={(e) => setAnswers((current) => ({ ...current, [question.id]: e.target.value }))} />
                  ) : question.input_type === "single-select" ? (
                    <select {...common} value={answers[question.id] || ""} onChange={(e) => setAnswers((current) => ({ ...current, [question.id]: e.target.value }))}>
                      <option value="">Select an option</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : question.input_type === "multi-select" ? (
                    <select {...common} multiple value={answers[question.id] || []} onChange={(e) => setAnswers((current) => ({ ...current, [question.id]: Array.from(e.target.selectedOptions, (option) => option.value) }))}>
                      {options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input {...common} value={answers[question.id] || ""} onChange={(e) => setAnswers((current) => ({ ...current, [question.id]: e.target.value }))} />
                  )}
                </div>
              );
            })}

            <Recaptcha ref={captchaRef} onVerify={handleCaptchaVerify} onExpire={handleCaptchaExpire} />

            <button
              type="submit"
              disabled={status.loading}
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-md text-sm disabled:opacity-60"
            >
              {status.loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </section>

      <Footer />
    </>
  );
}
