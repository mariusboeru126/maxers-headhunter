import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoogleSignInButton from "../components/GoogleSignInButton";
import Recaptcha from "../components/Recaptcha";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);

  const nextParam = Array.isArray(router.query.next) ? router.query.next[0] : router.query.next;
  const next = nextParam || "/";
  const googleHref = `/api/auth/google/start?next=${encodeURIComponent(next)}`;
  const queryError = typeof router.query.error === "string" ? decodeURIComponent(router.query.error) : "";
  const registered = router.query.registered === "1";

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!captchaToken) {
      setStatus({ loading: false, error: "Please complete the reCAPTCHA challenge." });
      return;
    }

    setStatus({ loading: true, error: "" });

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, captchaToken }),
    });
    const data = await res.json();

    if (!res.ok) {
      setCaptchaToken("");
      captchaRef.current?.reset();
      setStatus({ loading: false, error: data.error || "Login failed." });
      return;
    }

    router.push(next);
  }

  const handleCaptchaVerify = useCallback((token) => setCaptchaToken(token), []);
  const handleCaptchaExpire = useCallback(() => setCaptchaToken(""), []);

  return (
    <>
      <Navbar />

      <section className="max-w-md mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold text-slate-900 mb-1 text-center">Welcome Back</h1>
        <p className="text-slate-500 text-sm text-center mb-8">
          Log in to apply for jobs and track your applications.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-lg p-8">
          {registered && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-2">
              Account created. You can now log in.
            </p>
          )}
          {(status.error || queryError) && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
              {status.error || queryError}
            </p>
          )}

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
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-sm"
            />
          </div>

          <Recaptcha ref={captchaRef} onVerify={handleCaptchaVerify} onExpire={handleCaptchaExpire} />

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3 rounded-md text-sm disabled:opacity-60"
          >
            {status.loading ? "Logging in..." : "Log In"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide text-slate-400">
              <span className="bg-white px-3">Or continue with</span>
            </div>
          </div>

          <GoogleSignInButton href={googleHref} />

          <p className="text-sm text-slate-500 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-brand font-medium">Sign up</Link>
          </p>
        </form>
      </section>

      <Footer />
    </>
  );
}
