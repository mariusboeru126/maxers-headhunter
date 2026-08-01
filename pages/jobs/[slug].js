import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { query } from "../../lib/db";
import { decryptJobLink } from "../../lib/jobLink";
import { sanitizeJobHtml } from "../../lib/sanitizeHtml";

function RoleBadge({ label, value, variant }) {
  const workStyle = value === "Remote" ? "bg-violet-50 text-violet-700 ring-violet-200" : value === "Hybrid" ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-cyan-50 text-cyan-700 ring-cyan-200";
  const style = variant === "job" ? "bg-blue-50 text-brand ring-blue-200" : workStyle;
  return <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 ring-1 ${style}`}><span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">{variant === "job" ? <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a4 4 0 018 0v2M3 12h18" /></> : <><path d="M4 5h16v11H4z" /><path d="M8 20h8M12 16v4" /></>}</svg></span><span><span className="block text-[9px] font-bold uppercase tracking-[0.15em] opacity-70">{label}</span><span className="block text-[13px] font-extrabold leading-tight">{value}</span></span></div>;
}

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
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-6">
            <span>{job.employer_name}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <RoleBadge label="" value={job.job_type} variant="job" />
            {job.work_type && (
              <>
                <span>•</span>
                <RoleBadge label="" value={job.work_type} variant="work" />
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
            <RoleBadge label="" value={job.job_type} variant="job" /> <br />
            {job.work_type && (
              <RoleBadge label="" value={job.work_type} variant="work" />
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
