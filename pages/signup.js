import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const nextParam = Array.isArray(router.query.next) ? router.query.next[0] : router.query.next;
  const next = nextParam || "/";
  const googleHref = `/api/auth/google/start?next=${encodeURIComponent(next)}`;
  const queryError = typeof router.query.error === "string" ? decodeURIComponent(router.query.error) : "";

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus({ loading: false, error: data.error || "Signup failed." });
      return;
    }

    const next = router.query.next || "/";
    router.push(Array.isArray(next) ? next[0] : next);
  }

  return (
    <>
      <Navbar />

      <section className="max-w-md mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 text-center">Create Your Account</h1>
        <p className="text-slate-500 text-sm text-center mb-8">
          Sign up to apply for jobs and manage your applications.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-lg p-8">
          {(status.error || queryError) && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
              {status.error || queryError}
            </p>
          )}

          <GoogleSignInButton href={googleHref} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide text-slate-400">
              <span className="bg-white px-3">Or sign up with email</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone (optional)</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-md text-sm disabled:opacity-60"
          >
            {status.loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-brand font-medium">Log in</Link>
          </p>
        </form>
      </section>

      <Footer />
    </>
  );
}
