import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JobCard from "../../components/JobCard";

const CATEGORIES = [
  "All Categories",
  "IT & Software",
  "Accounting & Finance",
  "Human Resources",
  "Marketing & Sales",
  "Design & Creative",
  "Administration",
];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");

  async function loadJobs(e) {
    if (e) e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (category && category !== "All Categories") params.set("category", category);
    if (location) params.set("location", location);

    const res = await fetch(`/api/jobs?${params.toString()}`);
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  }

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-slate-500 mb-8 max-w-xl">
            Explore exciting career opportunities across diverse industries.
            Your next career move starts here.
          </p>

          <form
            onSubmit={loadJobs}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-3"
          >
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, keyword or company"
              className="flex-1 border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="border border-slate-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-2.5 rounded-md text-sm"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">All Job Openings</h2>
          <span className="text-sm text-slate-500">
            {loading ? "Loading..." : `Showing ${jobs.length} jobs`}
          </span>
        </div>

        {!loading && jobs.length === 0 && (
          <p className="text-slate-500">
            No jobs matched your search. Try different keywords.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
