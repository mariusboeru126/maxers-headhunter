import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const avatarMenuRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [router.pathname, router.isReady]);

  useEffect(() => {
    function onDocumentClick(event) {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target)) {
        setShowAvatarMenu(false);
      }
    }

    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  function isActive(href) {
    if (href === "/#services") return router.pathname === "/" && router.asPath.includes("#services");
    return router.pathname === href;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  }

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[72px] grid grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-brand text-white flex items-center justify-center font-extrabold text-xl shrink-0 transition-transform duration-200 group-hover:rotate-[-4deg] group-hover:scale-105">
            M
          </div>
          <div className="leading-tight">
            <div className="font-bold text-[#0B1F3A] text-[17px] tracking-tight">Maxers</div>
            <div className="text-[11px] text-slate-500 font-medium">Head Hunter</div>
          </div>
        </Link>

        <nav className="lg:flex items-center gap-9 text-[13px] font-semibold text-slate-700">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
            className={`nav-link relative pb-1 transition-colors hover:text-brand ${
                isActive(link.href) ? "nav-link--active text-brand" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          {user ? (
            <>
              <span className="hidden xl:inline text-xs text-slate-500 font-medium">
                Hi, {user.fullName?.split(" ")[0]}
              </span>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-brand text-brand hover:bg-brand/5 text-[13px] font-semibold px-5 py-2.5 rounded transition-all hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}

          <Link
            href="/jobs"
            className="bg-brand hover:bg-[#003d94] text-white text-[13px] font-semibold px-6 py-2.5 rounded transition-all hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center gap-2"
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </Link>

          {user && (
            <div className="relative" ref={avatarMenuRef}>
              <button
                type="button"
                onClick={() => setShowAvatarMenu((open) => !open)}
                className="w-10 h-10 rounded-full bg-slate-900 text-white font-semibold text-sm flex items-center justify-center border border-slate-200 hover:bg-slate-800 transition"
                aria-label="Open account menu"
              >
                {user.fullName?.trim().charAt(0).toUpperCase() || "U"}
              </button>

              {showAvatarMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg text-left z-10">
                  <button
                    type="button"
                    onClick={async () => {
                      setShowAvatarMenu(false);
                      await handleLogout();
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { ArrowIcon };
