import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  {
    value: "10,000+",
    label: "Candidates Placed",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="7" r="3.5" />
        <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M14 21c0-2.5 1.5-4.5 4-5.5" />
      </svg>
    ),
  },
  {
    value: "1,200+",
    label: "Companies Served",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="8" width="18" height="13" rx="1" />
        <path d="M7 8V5a5 5 0 0110 0v3" />
        <path d="M3 13h18" />
      </svg>
    ),
  },
  {
    value: "25+",
    label: "Countries Reached",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

const mvv = [
  {
    title: "Our Mission",
    desc: "To connect talent with opportunity through reliable recruitment, training, and career support.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    desc: "To be a trusted global leader in people solutions and career development.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Our Values",
    desc: "Integrity, Excellence, Inclusion, and Partnership guide everything we do.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5L12 2z" />
      </svg>
    ),
  },
];

const coreValues = [
  { title: "Excellence", desc: "High standards, measurable outcomes, and continuous improvement." },
  { title: "Integrity", desc: "Transparent processes and ethical guidance for candidates and employers." },
  { title: "Inclusion", desc: "Equitable access to opportunities and diverse talent pools." },
  { title: "Partnership", desc: "Long-term relationships built on trust, results, and accountability." },
];

const excellencePillars = [
  ["Service Quality at Scale", "Our standardized processes and SLAs ensure consistent experiences globally, backed by dedicated account managers and responsive candidate support."],
  ["Technology-Driven Efficiency", "AI-powered matching, skills taxonomies, and workflow automation shorten hiring cycles while improving match accuracy."],
  ["Human-Centered Approach", "Experienced recruiters and career advisors provide personalized guidance, context, and advocacy at every step."],
  ["Data and Insights", "Real-time market data informs hiring strategies, compensation decisions, and workforce planning."],
];

const testimonials = [
  ["Michael LaFramboise", "CEO & CoFounder", "Aurelius Systems", "Their executive search team understood the brief immediately and delivered exceptional leaders across two markets.", "AS"],
  ["Svenja Falk", "Founder", "Bridget", "Maxers gave us fast access to quality candidates without compromising on fit or cultural alignment.", "NL"],
  ["Denis Bicanic", "Chief Executive Officer", "Veridian Health", "A trusted global partner—precise, responsive, and consistently strong on international recruitment.", "VH"],
  ["Shawn Heeren", "CEO", "Crestline Group", "The shortlist was thoughtful, diverse, and ready to move. Our hiring process became dramatically more focused.", "CG"],
  ["Austin Weatherford", "Founder & CEO", "Atlas Ventures", "They bring the rigor of a top consulting firm and the care of a long-term business partner.", "AV"],
  ["Grant Stenger", "CEO", "Kinetic Works", "Maxers helped us scale a specialist team quickly while keeping every candidate experience first-class.", "KW"],
  ["Kate Johnson", "CEO", "Lumen Collective", "The market insight was as valuable as the hires. We now make workforce decisions with greater confidence.", "LC"],
  ["Josh Stevens", "Chairman & CEO", "HarborPoint", "Professional, transparent, and deeply connected. They found talent we simply could not reach alone.", "HP"],
  ["Maurice Brewster", "Co-Founder & CEO", "Mosaic Global", "From role design to onboarding, Maxers made our international expansion feel clear and manageable.", "MG"],
];

const whatWeDoItems = [
  "Understand your needs and career goals",
  "Find and assess the right talent",
  "Providing workforce insights, hiring strategies, market intelligence, and talent solutions",
  "Support candidates through every hiring stage",
  "Build long-term partnerships with employers",
];

const trainingModes = [
  {
    title: "Talent Solutions",
    image: "/images/talent_solution.png",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="14" height="10" rx="2" />
        <path d="M16 9l6-3v12l-6-3V9z" />
      </svg>
    ),
  },
  {
    title: "Strategic Consulting",
    image: "/images/strategic_consulting.png",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M7 20h10M12 16v4" />
      </svg>
    ),
  },
  {
    title: "Career Development",
    image: "/images/career_dev.png",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
];

const founderQualifications = [
  "Juris Doctor (J.D.)",
  "Master of Arts in Education, major in Special Education (MAEdSPED)",
  "BSBA in Business Administration, major in Business Management",
];

const founderCompetencies = [
  "Leadership",
  "Integrity",
  "Innovation",
  "Accountability",
  "Customer focus",
  "Strategic planning",
  "Collaboration",
  "Results-driven",
  "Adaptability",
];

const teamPrinciples = [
  {
    title: "Experienced Professionals",
    desc: "Our team brings deep expertise in recruitment, HR, and workforce development across industries.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#0047AB" strokeWidth="1.8">
        <circle cx="18" cy="16" r="5" />
        <circle cx="32" cy="16" r="4" />
        <path d="M8 38c0-6 4.5-10 10-10s10 4 10 10M26 38c0-4 2.5-7 6-7s6 3 6 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Client Focused",
    desc: "We listen carefully to employer needs and candidate aspirations to deliver the right match every time.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#0047AB" strokeWidth="1.8">
        <path d="M10 24c0-8 6.5-14 14-14s14 6 14 14" strokeLinecap="round" />
        <path d="M16 30l-4 8 8-4M32 30l4 8-8-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Data Driven",
    desc: "We use insights and analytics to improve hiring outcomes and career pathways for our community.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#0047AB" strokeWidth="1.8">
        <path d="M8 36V20M20 36V12M32 36V24M44 36V8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "People First",
    desc: "Every decision we make puts people, dignity, and long-term success at the center of our work.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="#0047AB" strokeWidth="1.8">
        <path d="M24 8v28M14 18l10-10 10 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 36h24" strokeLinecap="round" />
      </svg>
    ),
  },
];

const cultureValues = ["Teamwork", "Respect", "Integrity", "Growth"];

function CultureIcon({ label }) {
  if (label === "Teamwork") {
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
      </svg>
    );
  }
  if (label === "Respect") {
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8 4v6c0 5.25-3.5 10.15-8 11-4.5-.85-8-5.75-8-11V6l8-4z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (label === "Integrity") {
    return (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M7 8V6a5 5 0 0110 0v2" />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20V14" strokeLinecap="round" />
    </svg>
  );
}

export default function About() {
  const [testimonialPage, setTestimonialPage] = useState(0);
  const testimonialGroups = [testimonials.slice(0, 3), testimonials.slice(3, 6), testimonials.slice(6, 9)];

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonialPage((page) => (page + 1) % testimonialGroups.length), 6500);
    return () => window.clearInterval(timer);
  }, [testimonialGroups.length]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h1 className="text-[34px] lg:text-[42px] font-extrabold leading-tight mb-4">
                <span className="text-[#0B1F3A]">About Maxers </span>
                <span className="text-brand">Head Hunter</span>
              </h1>
              <p className="text-[16px] font-bold text-[#0B1F3A] mb-5">
                We connect great people with great opportunities.
              </p>
              <p className="text-[14px] leading-relaxed text-slate-500 mb-4">
                <strong>Maxers Head Hunter</strong> is a global talent enablement and workforce solutions
                partner. We specialize in connecting qualified professionals with companies
                across diverse industries, delivering consistent, high-quality service
                anywhere in the world.
              </p>
              <p className="text-[14px] leading-relaxed text-slate-500">
                Through a blend of human expertise and scalable technology, we help
                organizations build great teams while empowering candidates to land roles
                that fit their skills and ambitions.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/home_2.png"
                alt="Maxers team collaborating"
                className="w-full h-[300px] lg:h-[380px] object-cover rounded-lg shadow-card"
              />
            </div>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="relative -mt-16 lg:-mt-20 z-10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              {stats.map((item) => (
                <div
                  key={item.label}
                className="motion-card bg-white border border-slate-100 rounded-lg shadow-card-sm px-6 py-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-brand flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[22px] font-extrabold text-[#0B1F3A]">{item.value}</div>
                    <div className="text-[12px] text-slate-500 font-medium">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values, Mission, Vision */}
      <section className="mt-24 relative overflow-hidden bg-[#071D3D] py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-brand/30 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-48 left-[16%] h-[360px] w-[360px] rounded-full border border-white/10" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.78fr_1.22fr] gap-14 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase text-blue-300 mb-5">
              <span className="h-px w-9 bg-blue-300" /> What guides us
            </p>
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-extrabold tracking-tight leading-[1.04] text-white">
              Values that make every connection matter.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-300">
              Our values are not a statement on a wall. They are the standard behind every conversation, search, and career move.
            </p>

            <div className="mt-12 space-y-8 border-l border-white/20 pl-6">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9ec8ff]">Our Mission</p>
                <p className="mt-2 text-[16px] leading-relaxed text-white">To connect talent with opportunity through reliable recruitment, training, and career support.</p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9ec8ff]">Our Vision</p>
                <p className="mt-2 text-[16px] leading-relaxed text-white">To be a trusted global leader in people solutions and career development.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20">
            {coreValues.map((value, index) => (
              <article key={value.title} className="group grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[5rem_1fr_auto] gap-3 sm:gap-6 items-center border-b border-white/20 py-7 sm:py-9 transition-colors hover:border-blue-300">
                <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.14em] text-blue-300/80">0{index + 1}</span>
                <div>
                  <h3 className="text-[30px] sm:text-[42px] lg:text-[50px] font-extrabold tracking-tight leading-none text-white transition-transform duration-300 group-hover:translate-x-2 group-hover:text-blue-200">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-slate-300">{value.desc}</p>
                </div>
                <span className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xl text-white transition-all duration-300 group-hover:border-blue-300 group-hover:bg-blue-300 group-hover:text-[#071D3D]">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
            <div>
              <p className="section-label mt-16">We deliver excellence</p>
              <h2 className="text-[36px] lg:text-[48px] font-extrabold leading-[1.08] tracking-tight text-[#0B1F3A] mt-16">Built for quality.<br /><span className="text-brand">Designed to scale.</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 border-l border-t border-slate-200">
              {excellencePillars.map(([title, desc], index) => <article key={title} className="group border-r border-b border-slate-200 p-6 lg:p-8 hover:bg-[#f0f6ff] transition-colors"><span className="text-[12px] font-bold tracking-[0.18em] text-brand">0{index + 1}</span><h3 className="mt-6 text-[20px] font-extrabold text-[#0B1F3A] group-hover:text-brand">{title}</h3><p className="mt-3 text-[14px] leading-relaxed text-slate-500">{desc}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EAF3FF] py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <p className="section-label">Wide range of clientele</p>
          <div className="mt-7 grid lg:grid-cols-2 gap-px overflow-hidden rounded-2xl bg-blue-200 shadow-card">
            <article className="bg-[#0B2D62] p-9 lg:p-12"><span className="text-[12px] font-bold tracking-[.2em] uppercase text-blue-200">For professionals</span><h2 className="mt-5 text-[34px] font-extrabold text-white">A career partner with reach.</h2><p className="mt-5 max-w-lg text-[16px] leading-relaxed text-blue-100">Early-career to executive-level candidates seeking local, remote, or hybrid opportunities with transparent guidance and continuous upskilling.</p></article>
            <article className="bg-white p-9 lg:p-12"><span className="text-[12px] font-bold tracking-[.2em] uppercase text-brand">For companies</span><h2 className="mt-5 text-[34px] font-extrabold text-[#0B1F3A]">Talent for every turning point.</h2><p className="mt-5 max-w-lg text-[16px] leading-relaxed text-slate-600">Startups, SMEs, and enterprises needing reliable access to vetted talent for critical roles, rapid growth, or specialized projects.</p></article>
          </div>
          <div className="mt-14 grid lg:grid-cols-2 gap-8"><div className="border-t-2 border-brand pt-6"><p className="font-bold text-brand">Candidate services</p><p className="mt-3 text-[15px] leading-relaxed text-slate-600">Resume and LinkedIn optimization, portfolio review, interview preparation, skills assessments, mentorship, and job-search strategy.</p></div><div className="border-t-2 border-brand pt-6"><p className="font-bold text-brand">Employer services</p><p className="mt-3 text-[15px] leading-relaxed text-slate-600">Role design, sourcing, screening, shortlisting, interview coordination, reference checks, and onboarding support.</p></div></div>
        </div>
      </section>

      {false && <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10"><div><p className="section-label">CEO testimonials</p><h2 className="text-[34px] lg:text-[46px] font-extrabold tracking-tight text-[#0B1F3A]">Trusted at the table.</h2><p className="mt-3 text-slate-500">Global hiring partnerships built on confidence, quality, and results.</p></div><div className="flex gap-2">{testimonialGroups.map((_, index) => <button key={index} aria-label={`Show testimonial group ${index + 1}`} onClick={() => setTestimonialPage(index)} className={`h-2.5 rounded-full transition-all ${testimonialPage === index ? "w-9 bg-brand" : "w-2.5 bg-slate-200 hover:bg-blue-200"}`} />)}</div></div>
          <div className="overflow-hidden"><div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${testimonialPage * 100}%)` }}>{testimonialGroups.map((group, groupIndex) => <div key={groupIndex} className="w-full shrink-0 grid md:grid-cols-3 gap-5">{group.map((testimonial, index) => { const absoluteIndex = groupIndex * 3 + index; return <article key={testimonial[0]} className="motion-card relative flex min-h-[350px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card-sm"><span className="text-[50px] leading-none text-brand/20">“</span><p className="-mt-3 text-[15px] leading-relaxed text-slate-600">{testimonial[3]}</p><div className="mt-auto pt-7 flex items-center gap-3"><img src={`/images/testimonials/ceo-${absoluteIndex + 1}.jpg`} alt={`Fictional portrait of ${testimonial[0]}`} className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"/><div className="min-w-0"><p className="font-bold text-[#0B1F3A]">{testimonial[0]}</p><p className="text-[12px] text-slate-500">{testimonial[1]}</p></div><div className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[11px] font-extrabold text-brand">{testimonial[4]}</div></div><p className="mt-3 border-t border-slate-100 pt-3 text-[12px] font-bold tracking-wide text-slate-500">{testimonial[2]}</p></article>})}</div>)}</div></div>
        </div>
      </section>}

      {/* What We Do */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr_0.9fr] gap-8 lg:gap-10 items-start">
            <div>
              <p className="section-label">What We Do</p>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1F3A] leading-tight mb-5">
                Talent Consulting
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-500 mb-8">
                Providing workforce insights, hiring strategies, market intelligence, and talent solutions to help organizations build stronger teams.
              </p>
              <ul className="space-y-4">
                {whatWeDoItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <img
                src="/images/talent_consulting.png"
                alt="Training and development session"
                className="w-full h-[280px] lg:h-[360px] object-cover rounded-lg shadow-card"
              />
            </div>

            <div className="space-y-4">
              {trainingModes.map((mode) => (
                <div
                  key={mode.title}
                className="motion-card flex items-center gap-4 bg-white border border-slate-100 rounded-lg shadow-card-sm p-3"
                >
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="w-20 h-16 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-[13px] text-[#0B1F3A]">{mode.title}</h4>
                      <span className="w-8 h-8 rounded-full bg-blue-50 text-brand flex items-center justify-center shrink-0">
                        {mode.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders — placed naturally before Our Team */}
      <section className="bg-[#F5F7FA] py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10 lg:mb-12">
            <p className="section-label inline-flex">Leadership</p>
          </div>

          <article className="motion-card max-w-[900px] mx-auto mt-8 lg:mt-10 bg-white border border-slate-100 rounded-xl shadow-card-sm overflow-hidden">
            <div className="bg-[#0B1F3A] px-6 py-5 sm:px-8 sm:py-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-blue-200 mb-1">Founder profile</p>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Leading global staffing forward</h3>
            </div>
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 p-6 sm:p-8">
              <div>
                <h4 className="text-[13px] font-bold tracking-wide uppercase text-brand mb-3">Founder&apos;s Job Description</h4>
                <p className="text-[14px] leading-relaxed text-slate-600">
                  The founder is responsible for establishing and leading the overall vision, strategy, and growth of global staffing. This role oversees business development, operational excellence, financial sustainability, client relationships, and organizational culture while ensuring the company delivers high-quality staffing solutions to clients worldwide.
                </p>

                <h4 className="text-[13px] font-bold tracking-wide uppercase text-brand mt-7 mb-3">Founder&apos;s Qualification</h4>
                <ul className="space-y-2.5">
                  {founderQualifications.map((qualification) => (
                    <li key={qualification} className="flex gap-3 text-[13px] leading-relaxed text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      {qualification}
                    </li>
                  ))}
                </ul>

                <h4 className="text-[13px] font-bold tracking-wide uppercase text-brand mt-7 mb-3">Core Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {founderCompetencies.map((competency) => (
                    <span key={competency} className="rounded-full bg-blue-50 px-3 py-1.5 text-[12px] font-semibold text-brand">
                      {competency}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-100 lg:pl-8">
                <img
                  src="/images/Co-Founder-1.jpg"
                  alt="Founder profile illustration"
                  className="w-full object-cover rounded-lg
                  border border-slate-100 shadow-card-sm"
                />
                <p className="text-[13px] font-bold tracking-wide leading-relaxed text-slate-600 mt-8">
                  GENALYN B. DELA TORRE, M.A., J.D.
                </p>
                <p className="text-[12px] text-slate-500">
                  Founder & CEO
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Team</h2>
            <p className="text-[14px] text-slate-500 max-w-lg mx-auto -mt-8">
              A dedicated group of recruitment specialists committed to your success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamPrinciples.map((item) => (
              <div
                key={item.title}
                className="motion-card bg-white border border-slate-200 rounded-lg p-6 text-center"
              >
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3 className="font-bold text-[14px] text-[#0B1F3A] mb-2">{item.title}</h3>
                <p className="text-[12px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20 lg:py-24">
        <div className="bg-[#0B1F3A] max-w-[1280px] mx-auto grid lg:grid-cols-2 rounded-lg">
          <div className="relative min-h-[320px] lg:min-h-[420px]">
            <img
              src="/images/culture.png"
              alt="Team celebrating together"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="px-6 lg:px-14 py-14 lg:py-20 flex flex-col justify-center">
            <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-5">Our Culture</h2>
            <p className="text-[14px] leading-relaxed text-slate-300 mb-10 max-w-md">
              We believe a positive culture creates better results. Collaboration,
              respect, and continuous learning define how we work with candidates,
              clients, and each other every day.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {cultureValues.map((label) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center">
                    <CultureIcon label={label} />
                  </div>
                  <span className="text-[12px] font-semibold text-white/90">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
