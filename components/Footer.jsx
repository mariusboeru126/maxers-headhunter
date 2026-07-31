import Link from "next/link";

function SocialIcon({ children, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white hover:bg-brand-light transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-slate-300">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded bg-white text-brand flex items-center justify-center font-extrabold text-xl shrink-0">
              M
            </div>
            <div className="leading-tight">
              <div className="font-bold text-white text-[17px]">Maxers</div>
              <div className="text-[11px] text-slate-400 font-medium">Head Hunter</div>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-400 mb-6 max-w-[260px]">
            Connecting talent with opportunity worldwide. We help individuals
            build better careers and companies build stronger teams.
          </p>
          <div className="flex items-center gap-2.5">
            <SocialIcon href="#" label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-[13px] tracking-wider mb-5 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-3 text-[13px] text-slate-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-[13px] tracking-wider mb-5 uppercase">
            Our Services
          </h4>
          <ul className="space-y-3 text-[13px] text-slate-400">
            <li>Recruitment</li>
            <li>Career Support</li>
            <li>Training &amp; Development</li>
            <li>Global Opportunities</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-[13px] tracking-wider mb-5 uppercase">
            Contact Us
          </h4>
          <ul className="space-y-4 text-[13px] text-slate-400">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              +63 (294) 948-3948
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@maxersheadhunter.com
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              123 Business Ave, Suite 100,<br />New York, NY 10001, USA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-500">
          <p>© 2024 Maxers Head Hunter. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
