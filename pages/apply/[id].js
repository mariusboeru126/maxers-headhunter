import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { query } from "../../lib/db";

export async function getServerSideProps({ params }) {
  const rows = await query("SELECT id, title, employer_name, location FROM jobs WHERE id = ?", [params.id]);
  if (rows.length === 0) {
    return { notFound: true };
  }
  const job = JSON.parse(JSON.stringify(rows[0]));
  return { props: { job } };
}

export default function Apply({ job }) {
  const router = useRouter();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", coverLetter: "", resumeLink: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

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
    setStatus({ loading: true, error: "", success: false });

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: job.id, ...form }),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus({ loading: false, error: data.error || "Something went wrong.", success: false });
      return;
    }

    setStatus({ loading: false, error: "", success: true });
  }

  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-sm text-slate-500 mb-2">
          <Link href={`/jobs/${job.id}`} className="text-brand hover:underline">{job.title}</Link> / Apply
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
              <Link href={`/login?next=/apply/${job.id}`} className="bg-brand text-white font-semibold px-5 py-2.5 rounded-md text-sm">
                Log In
              </Link>
              <Link href={`/signup?next=/apply/${job.id}`} className="border border-brand text-brand font-semibold px-5 py-2.5 rounded-md text-sm">
                Create Account
              </Link>
            </div>
          </div>
        )}

        {user && status.success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
            Your application has been submitted. Our team will review it and get back to you.
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
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resume Link (Google Drive, Dropbox, etc.)
              </label>
              <input
                value={form.resumeLink}
                onChange={(e) => update("resumeLink", e.target.value)}
                placeholder="https://..."
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Letter</label>
              <textarea
                rows={5}
                value={form.coverLetter}
                onChange={(e) => update("coverLetter", e.target.value)}
                className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
              />
            </div>

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
