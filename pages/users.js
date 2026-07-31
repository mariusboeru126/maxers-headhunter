import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserFromRequest } from "../lib/auth";
import { query } from "../lib/db";
import { encryptJobLink } from "../lib/jobLink";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Reviewed: "bg-blue-50 text-blue-700",
  Shortlisted: "bg-violet-50 text-violet-700",
  Rejected: "bg-red-50 text-red-700",
  Hired: "bg-green-50 text-green-700",
};

export async function getServerSideProps({ req, resolvedUrl }) {
  const user = getUserFromRequest(req);
  if (!user) {
    return { redirect: { destination: `/login?next=${encodeURIComponent(resolvedUrl)}`, permanent: false } };
  }
  const applications = await query(
    `SELECT a.id, a.status, a.created_at, j.id AS job_id, j.title, j.employer_name, j.location
     FROM applications a JOIN jobs j ON j.id = a.job_id
     WHERE a.user_id = ? ORDER BY a.created_at DESC`,
    [user.id]
  );
  return { props: { applications: JSON.parse(JSON.stringify(applications.map((application) => ({ ...application, detailToken: encryptJobLink(application.job_id) })))) } };
}

export default function Users({ applications }) {
  return <><Navbar /><main className="w-[1280px] mx-auto px-6 py-14">
    <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
    <p className="text-slate-500 mt-2 mb-8">Track the current status of your job applications.</p>
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-5 py-3 font-semibold">Job</th><th className="px-5 py-3 font-semibold">Company</th><th className="px-5 py-3 font-semibold">Location</th><th className="px-5 py-3 font-semibold">Applied</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead>
        <tbody>{applications.map((application) => <tr key={application.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-800"><Link className="hover:text-brand" href={`/jobs/${application.detailToken}`}>{application.title}</Link></td><td className="px-5 py-4 text-slate-600">{application.employer_name}</td><td className="px-5 py-4 text-slate-600">{application.location}</td><td className="px-5 py-4 text-slate-600">{new Date(application.created_at).toLocaleDateString()}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status] || statusStyles.Pending}`}>{application.status}</span></td></tr>)}</tbody>
      </table>{applications.length === 0 && <p className="px-5 py-10 text-center text-slate-500">You have not applied for any jobs yet.</p>}
    </div>
  </main><Footer /></>;
}
