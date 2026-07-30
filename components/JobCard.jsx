import Link from "next/link";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export default function JobCard({ job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-brand/40 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-800">{job.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{job.employer_name}</p>
          <p className="text-sm text-slate-500">{job.location}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="inline-block text-xs font-medium bg-blue-50 text-brand px-2.5 py-1 rounded">
            {job.job_type}
          </span>
          <p className="text-xs text-slate-400 mt-2">{timeAgo(job.posted_at)}</p>
        </div>
      </div>
    </Link>
  );
}
