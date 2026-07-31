import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JobCard from "../../components/JobCard";
import JobsFilterSidebar from "../../components/JobsFilterSidebar";

const PAGE_SIZE = 10;

const DEFAULT_FILTERS = {
  keyword: "",
  categoryId: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  jobType: "All Types",
  workType: "All Work Types",
  postedWithin: "",
};

const applySteps = [
  {
    step: "1",
    title: "Apply",
    desc: "Browse jobs and submit your application.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 12h10M11 17h10M11 22h6" />
        <path d="M22 22l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Assessment",
    desc: "We review your profile and assess your skills.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 12l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 20h10M11 24h6" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Interview",
    desc: "Shortlisted candidates will be invited.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="#64748b" strokeWidth="1.5">
        <circle cx="11" cy="12" r="3" />
        <circle cx="21" cy="12" r="3" />
        <path d="M5 24c0-3.3 2.7-6 6-6M21 18c3.3 0 6 2.7 6 6" />
      </svg>
    ),
  },
  {
    step: "4",
    title: "Training (if needed)",
    desc: "Get trained and prepared for the role.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <path d="M4 14h24" />
        <circle cx="16" cy="20" r="2" />
      </svg>
    ),
  },
  {
    step: "5",
    title: "Job Placement",
    desc: "We match you with the right opportunity.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="10" width="20" height="16" rx="2" />
        <path d="M12 10V8a4 4 0 018 0v2" />
        <path d="M6 18h20" />
      </svg>
    ),
  },
];

function filtersToParams(filters) {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.location) params.set("location", filters.location);
  if (filters.salaryMin) params.set("salaryMin", filters.salaryMin);
  if (filters.salaryMax) params.set("salaryMax", filters.salaryMax);
  if (filters.jobType && filters.jobType !== "All Types") params.set("jobType", filters.jobType);
  if (filters.workType && filters.workType !== "All Work Types") params.set("workType", filters.workType);
  if (filters.postedWithin) params.set("postedWithin", filters.postedWithin);
  return params;
}

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const loadMoreRef = useRef(null);

  const loadJobs = useCallback(async (nextFilters = filters, nextPage = 1, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    const params = filtersToParams(nextFilters);
    params.set("page", String(nextPage));
    params.set("limit", String(PAGE_SIZE));
    const res = await fetch(`/api/jobs?${params.toString()}`);
    const data = await res.json();
    const nextJobs = data.jobs || [];
    setJobs((current) => append ? [...current, ...nextJobs] : nextJobs);
    setTotal(data.total ?? nextJobs.length);
    setPage(nextPage);
    if (append) setLoadingMore(false);
    else setLoading(false);
  }, [filters]);

  const loadMore = useCallback(() => {
    if (!loading && !loadingMore && jobs.length < total) loadJobs(filters, page + 1, true);
  }, [filters, jobs.length, loadJobs, loading, loadingMore, page, total]);

  useEffect(() => { loadMoreRef.current = loadMore; }, [loadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) loadMoreRef.current?.();
    }, { rootMargin: "300px" });
    const target = document.getElementById("jobs-load-more");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    loadJobs(DEFAULT_FILTERS);
    fetch("/api/jobs/categories")
      .then((r) => r.json())
      .then((data) => setCategoryCounts(data.categories || []))
      .catch(() => setCategoryCounts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHeroSearch(e) {
    e.preventDefault();
    loadJobs(filters);
  }

  function handleSidebarSearch(overrideFilters) {
    const next = overrideFilters || filters;
    if (overrideFilters) setFilters(overrideFilters);
    loadJobs(next);
  }

  const start = jobs.length === 0 ? 0 : 1;
  const end = jobs.length;
  const rangeLabel = loading
    ? "Loading..."
    : jobs.length === 0
      ? "Showing 0 jobs"
      : `Showing ${start}-${end} of ${total} jobs`;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[380px] lg:min-h-[420px]">
        <img
          src="/images/team.jpg"
          alt="Professionals in a meeting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/55" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-32 lg:pb-36">
          <h1 className="text-[34px] lg:text-[42px] font-extrabold text-white leading-tight mb-4 max-w-xl">
            Find Your Next{" "}
            <span className="text-[#5B9FFF]">Opportunity</span>
          </h1>
          <p className="text-[14px] leading-relaxed text-white/85 max-w-lg">
            Explore exciting career opportunities with top companies around the world.
            Your next career move starts here.
          </p>
        </div>
      </section>

      {/* Sticky job search */}
      <div className="sticky top-20 z-40 -mt-7 lg:-mt-10">
        <div className="relative z-10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white rounded-md shadow-card flex flex-col lg:flex-row items-stretch lg:items-center gap-0 border border-slate-100 overflow-hidden"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3.5 border-b lg:border-b-0 lg:border-r border-slate-100">
                <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3-3" strokeLinecap="round" />
                </svg>
                <input
                  value={filters.keyword}
                  onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
                  placeholder="Job title, keyword or company"
                  className="flex-1 text-[13px] focus:outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="flex-1 border-b lg:border-b-0 lg:border-r border-slate-100">
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters((f) => ({ ...f, categoryId: e.target.value }))}
                  className="w-full h-full px-4 py-3.5 text-[13px] text-slate-600 focus:outline-none bg-transparent"
                >
                  <option value="">All Categories</option>
                  {categoryCounts.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3.5 border-b lg:border-b-0 lg:border-r border-slate-100">
                <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  value={filters.location}
                  onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Location"
                  className="flex-1 text-[13px] focus:outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-brand hover:bg-[#003d94] text-white font-semibold text-[13px] px-8 py-4 lg:py-3.5 transition-colors shrink-0"
              >
                Search Jobs
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="bg-[#F5F7FA] pt-24 lg:pt-28 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Job list */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-bold text-[#0B1F3A]">All Job Openings</h2>
                <span className="text-[12px] text-slate-500">{rangeLabel}</span>
              </div>

              {loading && (
                <p className="text-slate-500 text-[13px] py-8">Loading jobs...</p>
              )}

              {!loading && jobs.length === 0 && (
                <p className="text-slate-500 text-[13px] py-8">
                  No jobs matched your search. Try different keywords or filters.
                </p>
              )}

              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <div id="jobs-load-more" className="py-5 text-center text-[13px] text-slate-500">
                {loadingMore && "Loading more jobs..."}
                {!loading && !loadingMore && jobs.length < total && "Scroll to load more jobs"}
                {!loading && !loadingMore && jobs.length > 0 && jobs.length >= total && "You have reached the end of the listings."}
              </div>
            </div>

            {/* Sidebar */}
            <JobsFilterSidebar
              filters={filters}
              onChange={setFilters}
              onSearch={handleSidebarSearch}
              categoryCounts={categoryCounts}
            />
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="bg-white py-16 lg:py-20 border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <h2 className="text-center text-[22px] font-bold text-[#0B1F3A] mb-12">How to Apply</h2>
          <div className="lg:flex items-start justify-between">
            {applySteps.map((item, i) => (
              <div key={item.step} className="flex items-start flex-1">
                <div className="flex flex-col items-center text-center flex-1 max-w-[180px]">
                  <div className="w-14 h-14 rounded-full bg-[#F5F7FA] flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand text-white text-[13px] font-bold flex items-center justify-center mb-3 -mt-1">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-[13px] text-[#0B1F3A] mb-1.5">{item.title}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 px-2">{item.desc}</p>
                </div>
                {i < applySteps.length - 1 && <div className="process-arrow" />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-8">
            {applySteps.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#F5F7FA] flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <div className="w-7 h-7 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center mb-2">
                  {item.step}
                </div>
                <h4 className="font-bold text-[13px] text-[#0B1F3A] mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
