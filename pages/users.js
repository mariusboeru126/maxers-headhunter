import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [feedback, setFeedback] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(null);
  useEffect(() => { fetch("/api/feedback").then((response) => response.json()).then(setFeedback).catch(() => {}); }, []);
  async function openReplies(item) {
    setOpenFeedback(item.id);
    const unreadIds = (feedback?.replies || []).filter((reply) => reply.source_id === item.id && reply.unread).map((reply) => reply.id);
    if (unreadIds.length) {
      await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ replyIds: unreadIds }) });
      setFeedback((current) => ({ ...current, unreadCount: Math.max(0, current.unreadCount - unreadIds.length), replies: current.replies.map((reply) => unreadIds.includes(reply.id) ? { ...reply, unread: 0 } : reply) }));
    }
  }
  return <><Navbar /><main className="w-[1280px] mx-auto px-6 py-14">
    <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
    <p className="text-slate-500 mt-2 mb-8">Track the current status of your job applications.</p>
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-5 py-3 font-semibold">Job</th><th className="px-5 py-3 font-semibold">Company</th><th className="px-5 py-3 font-semibold">Location</th><th className="px-5 py-3 font-semibold">Applied</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead>
        <tbody>{applications.map((application) => <tr key={application.id} className="border-t border-slate-100"><td className="px-5 py-4 font-semibold text-slate-800"><Link className="hover:text-brand" href={`/jobs/${application.detailToken}`}>{application.title}</Link></td><td className="px-5 py-4 text-slate-600">{application.employer_name}</td><td className="px-5 py-4 text-slate-600">{application.location}</td><td className="px-5 py-4 text-slate-600">{new Date(application.created_at).toLocaleDateString()}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status] || statusStyles.Pending}`}>{application.status}</span></td></tr>)}</tbody>
      </table>{applications.length === 0 && <p className="px-5 py-10 text-center text-slate-500">You have not applied for any jobs yet.</p>}
    </div>
    <section id="feedback" className="mt-12 scroll-mt-24">
      <div className="flex items-end justify-between gap-4 mb-5"><div><h2 className="text-2xl font-bold text-slate-900">My Feedback</h2><p className="text-slate-500 mt-1">Comments you sent to Maxers Head Hunter and our team&apos;s replies.</p></div>{feedback?.unreadCount > 0 && <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 animate-pulse">{feedback.unreadCount} new reply{feedback.unreadCount > 1 ? "ies" : ""}</span>}</div>
      {feedback?.unreadCount > 0 && <div role="alert" className="mb-5 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800"><span className="text-xl">!</span><p><b>You have unread feedback replies.</b> Open your feedback below to read the response from Maxers Head Hunter.</p></div>}
      <div className="space-y-3">{feedback?.feedback?.map((item) => <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm text-slate-500">Sent {new Date(item.created_at).toLocaleDateString()}</p><p className="mt-2 text-slate-700">{item.message}</p></div><button onClick={() => openReplies(item)} className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-brand hover:bg-blue-100">{item.reply_count} reply{item.reply_count !== 1 ? "ies" : ""}</button></div>{openFeedback === item.id && <div className="mt-5 border-t border-slate-100 pt-4 space-y-3">{feedback.replies.filter((reply) => reply.source_id === item.id).map((reply) => <div key={reply.id} className="rounded-md bg-slate-50 p-4"><p className="text-xs font-bold text-brand">Reply from {reply.admin_name} · {new Date(reply.created_at).toLocaleString()}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{reply.message}</p></div>)}{!feedback.replies.some((reply) => reply.source_id === item.id) && <p className="text-sm text-slate-500">No reply yet.</p>}</div>}</article>)}{feedback && !feedback.feedback.length && <p className="rounded-lg border border-dashed border-slate-200 p-7 text-center text-slate-500">You have not sent feedback yet. Use the comment form in the footer to contact us.</p>}</div>
    </section>
  </main><Footer /></>;
}
