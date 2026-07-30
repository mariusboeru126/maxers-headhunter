import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { query } from "../../lib/db";

export async function getServerSideProps({ params }) {
  const rows = await query("SELECT * FROM jobs WHERE id = ?", [params.id]);
  if (rows.length === 0) {
    return { notFound: true };
  }
  // Dates need to be serialized to strings for Next.js props
  const job = JSON.parse(JSON.stringify(rows[0]));
  return { props: { job } };
}

function listFromLines(text) {
  if (!text) return [];
  return text.split("\n").filter(Boolean);
}

export default function JobDetail({ job }) {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-sm text-slate-500 mb-2">
            <Link href="/jobs" className="text-brand hover:underline">Jobs</Link> / {job.title}
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
            <span>{job.employer_name}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span className="text-brand font-medium">{job.job_type}</span>
          </div>
          <Link
            href={`/apply/${job.id}`}
            className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-md"
          >
            Apply for this Job →
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="font-semibold text-lg text-slate-800 mb-3">Job Description</h2>
            <p className="text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div>
              <h2 className="font-semibold text-lg text-slate-800 mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                {listFromLines(job.responsibilities).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div>
              <h2 className="font-semibold text-lg text-slate-800 mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                {listFromLines(job.requirements).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="bg-slate-50 rounded-lg p-6 h-fit space-y-4">
          <h3 className="font-semibold text-slate-800">Job Overview</h3>
          <div className="text-sm text-slate-600 space-y-2">
            <p><span className="font-medium text-slate-800">Employer:</span> {job.employer_name}</p>
            <p><span className="font-medium text-slate-800">Location:</span> {job.location}</p>
            <p><span className="font-medium text-slate-800">Job Type:</span> {job.job_type}</p>
            <p><span className="font-medium text-slate-800">Category:</span> {job.category}</p>
            {job.salary_range && (
              <p><span className="font-medium text-slate-800">Salary:</span> {job.salary_range}</p>
            )}
          </div>
          <Link
            href={`/apply/${job.id}`}
            className="block text-center bg-brand hover:bg-brand-dark text-white font-semibold px-4 py-2.5 rounded-md text-sm"
          >
            Apply Now
          </Link>
        </aside>
      </section>

      <Footer />
    </>
  );
}
