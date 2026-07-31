import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus({ loading: false, error: data.error || "Something went wrong.", success: false });
      return;
    }

    setStatus({ loading: false, error: "", success: true });
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
          <p className="text-slate-500 max-w-xl">
            We&apos;d love to hear from you. Reach out to us for partnerships,
            inquiries, or support.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
            <p className="text-slate-500 text-sm">+63 (294) 948-3948</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
            <p className="text-slate-500 text-sm">info@maxersheadhunter.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
            <p className="text-slate-500 text-sm">
              123 Business Ave, Suite 100, New York, NY 10001, USA
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-lg p-8">
          {status.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
              {status.error}
            </p>
          )}
          {status.success && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-2">
              Thanks for reaching out! We&apos;ll get back to you soon.
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status.loading}
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-md text-sm disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}
