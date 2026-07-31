import Link from "next/link";

const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];
const WORK_TYPES = ["All Work Types", "Onsite", "Hybrid", "Remote"];
const POSTED_OPTIONS = [
  { label: "Any time", value: "" },
  { label: "Last 24 hours", value: "1" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

export default function JobsFilterSidebar({
  filters,
  onChange,
  onSearch,
  categoryCounts = [],
}) {
  function set(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <aside className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
        <h3 className="font-bold text-[#0B1F3A] text-[15px] mb-5">Search Jobs</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Keywords</label>
            <input
              value={filters.keyword}
              onChange={(e) => set("keyword", e.target.value)}
              placeholder="Job title or company"
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Category</label>
            <select
              value={filters.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              <option value="">All Categories</option>
              {categoryCounts.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Location</label>
            <input
              value={filters.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="City or remote"
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Min salary</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={filters.salaryMin}
                onChange={(e) => set("salaryMin", e.target.value)}
                placeholder="50000"
                className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Max salary</label>
              <input
                type="number"
                min="0"
                step="1000"
                value={filters.salaryMax}
                onChange={(e) => set("salaryMax", e.target.value)}
                placeholder="120000"
                className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Job type</label>
            <select
              value={filters.jobType}
              onChange={(e) => set("jobType", e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Work type</label>
            <select
              value={filters.workType}
              onChange={(e) => set("workType", e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {WORK_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Posted date</label>
            <select
              value={filters.postedWithin}
              onChange={(e) => set("postedWithin", e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {POSTED_OPTIONS.map((o) => (
                <option key={o.label} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-brand hover:bg-[#003d94] text-white font-semibold text-[13px] py-3 rounded transition-colors"
          >
            Search Jobs
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
        <h3 className="font-bold text-[#0B1F3A] text-[15px] mb-4">Job Categories</h3>
        <ul className="space-y-3 text-[13px]">
          {categoryCounts.map((row) => (
            <li key={row.id} className="flex items-center justify-between text-slate-600">
              <button
                type="button"
                onClick={() => {
                  onChange({ ...filters, categoryId: String(row.id) });
                  onSearch({ ...filters, categoryId: String(row.id) });
                }}
                className="hover:text-brand text-left"
              >
                {row.name}
              </button>
              <span className="min-w-[26px] h-[26px] rounded-full bg-blue-50 text-brand text-[11px] font-bold flex items-center justify-center">
                {row.count}
              </span>
            </li>
          ))}
        </ul>
        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-brand text-[13px] font-semibold mt-5 hover:underline">
          View All Categories
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
        <h3 className="font-bold text-[#0B1F3A] text-[15px] mb-4">Why Join Us?</h3>
        <ul className="space-y-4 text-[13px] text-slate-600">
          {[
            "Work with global companies",
            "Grow your career with training",
            "Personalized recruitment support",
            "Transparent hiring process",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-brand flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
