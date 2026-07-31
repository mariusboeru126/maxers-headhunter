import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { query } from "../../lib/db";
import { decryptJobLink } from "../../lib/jobLink";
import { sanitizeJobHtml } from "../../lib/sanitizeHtml";

export async function getServerSideProps({ params }) {
  const jobId = decryptJobLink(params.slug);
  if (!jobId) return { notFound: true };
  const rows = await query(
    "SELECT j.*, c.name AS category_name FROM jobs j JOIN categories c ON c.id = j.category_id WHERE j.id = ?",
    [jobId]
  );

  if (rows.length === 0) {
    return { notFound: true };
  }

  const job = JSON.parse(JSON.stringify(rows[0]));
  return { props: { job, detailToken: params.slug } };
}

export default function JobDetail({ job, detailToken }) {
  const applyHref = `/apply/${detailToken}`;

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
            {job.work_type && (
              <>
                <span>•</span>
                <span>{job.work_type}</span>
              </>
            )}
          </div>
          <Link
            href={applyHref}
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
            <div
              className="job-description text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeJobHtml(job.description) }}
            />
          </div>
        </div>

        <aside className="bg-slate-50 rounded-lg p-6 h-fit space-y-4">
          <h3 className="font-semibold text-slate-800">Job Overview</h3>
          <div className="text-sm text-slate-600 space-y-2">
            <p><span className="font-medium text-slate-800">Employer:</span> {job.employer_name}</p>
            <p><span className="font-medium text-slate-800">Location:</span> {job.location}</p>
            <p><span className="font-medium text-slate-800">Job Type:</span> {job.job_type}</p>
            {job.work_type && (
              <p><span className="font-medium text-slate-800">Work Type:</span> {job.work_type}</p>
            )}
            <p><span className="font-medium text-slate-800">Category:</span> {job.category_name}</p>
          </div>
          <Link
            href={applyHref}
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
