import Link from "next/link";
import { categoryAccent } from "../lib/jobUtils";

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

function CategoryIcon({ type }) {
  const common = "w-5 h-5 text-white";
  if (type === "code") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "people") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="3" />
        <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M14 21c0-2.5 1.5-4.5 4-5.5" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a4 4 0 018 0v2" />
    </svg>
  );
}

export default function JobCard({ job }) {
  const accent = categoryAccent(job.category_name);
  const href = `/jobs/${job.detail_token}`;

  return (
    <Link
      href={href}
      className="motion-card block bg-white border border-slate-200 rounded-md p-5 hover:border-brand/30"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-md ${accent.bg} flex items-center justify-center shrink-0`}>
          <CategoryIcon type={accent.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#0B1F3A]">{job.title}</h3>
              <p className="text-[13px] text-slate-500 mt-0.5">{job.employer_name}</p>
              <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {job.location}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block text-[11px] font-semibold bg-blue-50 text-brand px-3 py-1 rounded">
                {job.job_type}
              </span>
              <p className="text-[11px] text-slate-400 mt-2">{timeAgo(job.posted_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
