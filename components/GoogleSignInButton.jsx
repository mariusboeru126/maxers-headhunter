import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

function loadGoogleScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.accounts?.oauth2) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function GoogleSignInButton({ next = "/", className = "", onError }) {
  const router = useRouter();
  const clientRef = useRef(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    if (!clientId) return undefined;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google?.accounts?.oauth2) return;
        clientRef.current = window.google.accounts.oauth2.initCodeClient({
          client_id: clientId,
          scope: "openid email profile",
          ux_mode: "popup",
          callback: async (response) => {
            if (response.error) {
              onError?.(response.error);
              return;
            }

            const res = await fetch("/api/auth/google/exchange", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code: response.code, redirectUri: "postmessage" }),
            });
            const data = await res.json();
            if (!res.ok) {
              onError?.(data.error || "Google login failed.");
              return;
            }
            router.push(next);
          },
        });
      })
      .catch(() => {
        onError?.("Could not load Google Sign-In.");
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, next, onError, router]);

  function handleClick() {
    if (!clientId) {
      window.location.href = `/api/auth/google/start?next=${encodeURIComponent(next)}`;
      return;
    }
    if (clientRef.current) {
      clientRef.current.requestCode();
      return;
    }
    window.location.href = `/api/auth/google/start?next=${encodeURIComponent(next)}`;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 border border-slate-200 rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.6 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.53Z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z"
        />
        <path
          fill="#FBBC05"
          d="M6.41 13.91A6.02 6.02 0 0 1 6.41 10.1V7.52H3.07a10 10 0 0 0 0 12.78l3.34-2.58Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.04c1.47 0 2.8.5 3.84 1.49l2.88-2.88A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.52l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
