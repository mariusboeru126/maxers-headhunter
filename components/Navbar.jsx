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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const avatarMenuRef = useRef(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [router.pathname, router.isReady]);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [router.asPath]);

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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-brand text-white flex items-center justify-center font-extrabold text-xl shrink-0 transition-transform duration-200 group-hover:rotate-[-4deg] group-hover:scale-105">
            M
          </div>
          <div className="leading-tight">
            <div className="font-bold text-[#0B1F3A] text-[17px] tracking-tight">Maxers</div>
            <div className="text-[11px] text-slate-500 font-medium">Head Hunter</div>
          </div>
        </Link>

        <nav className="navbar-items hidden flex-1 justify-center items-center gap-4 lg:gap-6 xl:gap-9 text-[13px] font-semibold text-slate-700 whitespace-nowrap">
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

        <div className="flex items-center gap-3 sm:gap-3">
          {user ? (
            <>
              <span className="hidden xl:inline text-xs text-slate-500 font-medium">
                Hi, {user.fullName?.split(" ")[0]}
              </span>
            </>
          ) : (
            <Link
              href="/login"
              className=" items-center justify-center border border-brand text-brand hover:bg-brand/5 text-[13px] font-semibold px-3 lg:px-5 py-2.5 rounded transition-all hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}

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

          <button
            type="button"
            onClick={() => setShowMobileMenu((open) => !open)}
            className="sm:hidden w-10 h-10 inline-flex items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={showMobileMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {showMobileMenu ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="sm:hidden absolute top-full inset-x-0 bg-white border-b border-slate-200 shadow-lg px-4 sm:px-6 py-4 animate-[page-enter_180ms_ease-out]">
          <nav className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-4 py-3 text-sm font-semibold transition-colors ${isActive(link.href) ? "bg-blue-50 text-brand" : "text-slate-700 hover:bg-slate-50 hover:text-brand"}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 rounded-md px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="mt-2 rounded-md px-4 py-3 text-sm font-semibold text-brand hover:bg-blue-50">
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export { ArrowIcon };
