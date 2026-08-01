import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar, { ArrowIcon } from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  {
    title: "Recruitment",
    desc: "Helping companies find qualified and reliable professionals to build strong teams.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <circle cx="9" cy="7" r="3.5" />
        <path d="M2 21c0-3.87 3.13-7 7-7s7 3.13 7 7" />
        <circle cx="17" cy="8" r="2.5" opacity="0.7" />
        <path d="M14 21c0-2.5 1.5-4.5 4-5.5" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Career Support",
    desc: "Guiding job seekers through every step of their career journey with care.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <circle cx="6" cy="8" r="2.5" />
        <circle cx="12" cy="8" r="2.5" />
        <circle cx="18" cy="8" r="2.5" />
        <path d="M2 20c0-2.5 1.8-4.5 4-4.5M8 20c0-2.5 1.8-4.5 4-4.5M14 20c0-2.5 1.8-4.5 4-4.5" />
      </svg>
    ),
  },
  {
    title: "Talent Consulting",
    desc: "Providing workforce insights, hiring strategies, market intelligence, and talent solutions to help organizations build stronger teams.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" opacity="0.8" />
      </svg>
    ),
  },
  {
    title: "Global Opportunities",
    desc: "Connecting people with local and international career opportunities worldwide.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

const whyChoose = [
  {
    title: "Professional Recruitment",
    desc: "We carefully match the right people with the right opportunities for long-term success.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none">
        <path d="M24 4L8 10v10c0 9.33 6.4 18.05 16 20 9.6-1.95 16-10.67 16-20V10L24 4z" fill="#0047AB" opacity="0.15" />
        <path d="M24 4L8 10v10c0 9.33 6.4 18.05 16 20 9.6-1.95 16-10.67 16-20V10L24 4z" stroke="#0047AB" strokeWidth="2" />
        <circle cx="24" cy="18" r="4" fill="#0047AB" />
        <path d="M16 28c0-4.42 3.58-6 8-6s8 1.58 8 6" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Personalized Support",
    desc: "We guide candidates from application to employment with dedicated support every step of the way.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none">
        <path d="M10 30c0-8 8-14 14-14s14 6 14 14" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 16v-4M24 16c-3 0-5 2-5 5" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="22" r="5" fill="#0047AB" opacity="0.2" />
        <circle cx="24" cy="22" r="3" fill="#0047AB" />
      </svg>
    ),
  },
  {
    title: "Quality Service",
    desc: "We value integrity, excellence, and long-term partnerships with both clients and candidates.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0" fill="none">
        <circle cx="24" cy="26" r="14" fill="#0047AB" opacity="0.15" />
        <path d="M24 8l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" fill="#0047AB" />
        <path d="M16 38h16" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 38v4M28 38v4" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    step: "1",
    title: "Apply",
    desc: "Submit your application or resume.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 12h10M11 17h10M11 22h6" />
        <path d="M22 22l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Assessment",
    desc: "We assess your skills and experience.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="4" width="20" height="24" rx="2" />
        <path d="M11 12l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 20h10M11 24h6" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Interview",
    desc: "Interview with our team and hiring partners.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="#64748b" strokeWidth="1.5">
        <circle cx="11" cy="12" r="3" />
        <circle cx="21" cy="12" r="3" />
        <path d="M5 24c0-3.3 2.7-6 6-6M21 18c3.3 0 6 2.7 6 6" />
        <circle cx="16" cy="10" r="2.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    step: "4",
    title: "Training",
    desc: "Get trained and prepared for the role.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="4" y="8" width="24" height="16" rx="2" />
        <path d="M4 14h24" />
        <circle cx="16" cy="20" r="2" />
        <path d="M10 4l6 4M22 4l-6 4" />
      </svg>
    ),
  },
  {
    step: "5",
    title: "Job Placement",
    desc: "We place you in the right job opportunity.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="#64748b" strokeWidth="1.5">
        <rect x="6" y="10" width="20" height="16" rx="2" />
        <path d="M12 10V8a4 4 0 018 0v2" />
        <path d="M6 18h20" />
      </svg>
    ),
  },
];

const testimonials = [
  ["Michael LaFramboise", "CEO & CoFounder", "Aurelius Systems", "Their executive search team understood the brief immediately and delivered exceptional leaders across two markets.", "AS"],
  ["Svenja Falk", "Founder", "Bridget", "Maxers gave us fast access to quality candidates without compromising on fit or cultural alignment.", "NL"],
  ["Denis Bicanic", "Chief Executive Officer", "Veridian Health", "A trusted global partner—precise, responsive, and consistently strong on international recruitment.", "VH"],
  ["Shawn Heeren", "CEO", "Crestline Group", "The shortlist was thoughtful, diverse, and ready to move.", "CG"],
  ["Austin Weatherford", "Founder & CEO", "Atlas Ventures", "They bring the rigor of a top consulting firm and the care of a long-term business partner.", "AV"],
  ["Grant Stenger", "CEO", "Kinetic Works", "Maxers helped us scale a specialist team quickly while keeping every candidate experience first-class.", "KW"],
  ["Kate Johnson", "CEO", "Lumen Collective", "The market insight was as valuable as the hires.", "LC"],
  ["Josh Stevens", "Chairman & CEO", "HarborPoint", "Professional, transparent, and deeply connected.", "HP"],
  ["Maurice Brewster", "Co-Founder & CEO", "Mosaic Global", "Maxers made our international expansion feel clear and manageable.", "MG"],
];

export default function Home() {
  const [testimonialPage, setTestimonialPage] = useState(0);
  const testimonialGroups = [testimonials.slice(0, 3), testimonials.slice(3, 6), testimonials.slice(6, 9)];
  useEffect(() => { const timer = window.setInterval(() => setTestimonialPage((page) => (page + 1) % 3), 6500); return () => window.clearInterval(timer); }, []);
  return (
    <>
      <Navbar />

      <section
        className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-[#edf4fc] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/back.png')" }}
      >
        <div className="relative z-10 max-w-[1280px] min-h-[calc(100svh-80px)] mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
          <div className="max-w-[590px]">
            <p className="section-label">Global recruitment, thoughtfully connected</p>
            <h1 className="text-[38px] sm:text-[48px] lg:text-[60px] font-extrabold text-[#0B1F3A] leading-[1.08] tracking-tight mb-7">
              Opportunity has no borders.
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-slate-700 max-w-[560px]">
              We provide quality and specialized talents connecting to diverse industries through global hiring process and expertise.
            </p>
          </div>

          <div className="grid gap-5 lg:justify-items-end">
            <Link
              href="/contact"
              className="group w-full max-w-[460px] rounded-2xl border border-white/80 bg-[#0A2550]/90 backdrop-blur-sm px-7 sm:px-9 py-7 shadow-[0_20px_45px_rgba(10,37,80,0.23)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0047AB]"
            >
              <span className="text-[11px] font-bold tracking-[0.22em] text-blue-200 uppercase">For employers</span>
              <span className="mt-3 flex items-center justify-between gap-4 text-[26px] sm:text-[32px] font-extrabold leading-tight text-white">
                I&apos;m Looking to Hire <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/jobs"
              className="group w-full max-w-[460px] rounded-2xl border border-[#0047AB]/20 bg-white/90 backdrop-blur-sm px-7 sm:px-9 py-7 shadow-[0_20px_45px_rgba(10,37,80,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-white"
            >
              <span className="text-[11px] font-bold tracking-[0.22em] text-brand uppercase">For candidates</span>
              <span className="mt-3 flex items-center justify-between gap-4 text-[26px] sm:text-[32px] font-extrabold leading-tight text-[#0B1F3A] group-hover:text-brand">
                I&apos;m Looking for Jobs <ArrowIcon />
              </span>
            </Link>
            <p className="max-w-[460px] pt-2 text-center text-[15px] font-medium leading-relaxed text-[#0B396F] lg:text-right">
              Your partner for professional career across boarders.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="image-frame rounded-2xl">
          <p className="section-label">Welcome to Maxers Head Hunter</p>
          <h1 className="text-[34px] lg:text-[42px] xl:text-[46px] font-extrabold text-[#0B1F3A] leading-[1.15] mb-6">
            Connecting Talent with Opportunity{" "}
            <span className="text-brand">Worldwide</span>
          </h1>
          <p className="text-[14px] leading-relaxed text-slate-500 mb-10">
            We help skilled professionals find rewarding careers while
            helping businesses hire the right people through reliable
            recruitment, training, and career support.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/jobs" className="btn-primary">
              Find Jobs <ArrowIcon />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us <ArrowIcon />
            </Link>
          </div>
        </div>
        <div class="image-frame relative min-h-[220px]">
          <img
            src="/images/home_1.png"
            alt="Team collaborating in a meeting"
            className="motion-image w-full h-[340px] lg:h-[380px] object-cover rounded-2xl shadow-card"
          />
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="image-frame rounded-2xl">
          <p className="section-label">Who We Are</p>
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1F3A] leading-tight mb-6">
            Your Partner in Building Successful Careers
          </h2>
          <p className="text-[14px] leading-relaxed text-slate-500 mb-4">
            Maxers Head Hunter is a recruitment and workforce solutions
            company dedicated to connecting talented individuals with
            trusted employers.
          </p>
          <p className="text-[14px] leading-relaxed text-slate-500 mb-4">
            We support both job seekers and businesses through professional
            hiring, career guidance, and training services.
          </p>
          <p className="text-[14px] leading-relaxed text-slate-500">
            Our goal is to create opportunities, develop skills, and build
            successful careers through quality recruitment and personalized
            support.
          </p>
        </div>
        <div class="image-frame relative min-h-[220px]">
          <img
            src="/images/home_2.png"
            alt="Team collaborating in a meeting"
            className="motion-image w-full h-[340px] lg:h-[380px] object-cover rounded-2xl shadow-card"
          />
        </div>
      </section>

      <section id="services" className="bg-white pb-20 lg:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((item) => (
              <div
                key={item.title}
                className="motion-card bg-white border-t-[3px] border-brand rounded-sm shadow-card-sm px-6 pt-8 pb-10 text-center"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-brand flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[15px] text-[#0B1F3A] mb-3">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20 lg:pb-24">
        <div className="text-center">
          <h2 className="section-heading">Why Choose Maxers?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {whyChoose.map((item) => (
            <div
              key={item.title}
                className="motion-card bg-[#F5F7FA] rounded-lg px-6 py-7 flex items-start gap-4"
            >
              {item.icon}
              <div>
                <h3 className="font-bold text-[14px] text-[#0B1F3A] mb-2">{item.title}</h3>
                <p className="text-[12px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10"><div><p className="section-label">CEO testimonials</p><h2 className="text-[34px] lg:text-[46px] font-extrabold tracking-tight text-[#0B1F3A]">Trusted at the table.</h2><p className="mt-3 text-slate-500">Global hiring partnerships built on confidence, quality, and results.</p></div><div className="flex gap-2">{testimonialGroups.map((_, index) => <button key={index} aria-label={`Show testimonial group ${index + 1}`} onClick={() => setTestimonialPage(index)} className={`h-2.5 rounded-full transition-all ${testimonialPage === index ? "w-9 bg-brand" : "w-2.5 bg-slate-200 hover:bg-blue-200"}`} />)}</div></div>
          <div className="overflow-hidden"><div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${testimonialPage * 100}%)` }}>{testimonialGroups.map((group, groupIndex) => <div key={groupIndex} className="w-full shrink-0 grid md:grid-cols-3 gap-5">{group.map((testimonial, index) => { const absoluteIndex = groupIndex * 3 + index; return <article key={testimonial[0]} className="motion-card relative flex min-h-[350px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card-sm"><span className="text-[50px] leading-none text-brand/20">“</span><p className="-mt-3 text-[15px] leading-relaxed text-slate-600">{testimonial[3]}</p><div className="mt-auto pt-7 flex items-center gap-3"><img src={`/images/testimonials/ceo-${absoluteIndex + 1}.jpg`} alt={`Fictional portrait of ${testimonial[0]}`} className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"/><div className="min-w-0"><p className="font-bold text-[#0B1F3A]">{testimonial[0]}</p><p className="text-[12px] text-slate-500">{testimonial[1]}</p></div><div className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[11px] font-extrabold text-brand">{testimonial[4]}</div></div><p className="mt-3 border-t border-slate-100 pt-3 text-[12px] font-bold tracking-wide text-slate-500">{testimonial[2]}</p></article>})}</div>)}</div></div>
        </div>
      </section>

      <section className="bg-[#F5F7FA] py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center">
            <h2 className="section-heading">How We Help</h2>
          </div>
          <div className="hidden lg:flex items-start justify-between">
            {processSteps.map((item, i) => (
              <div key={item.step} className="flex items-start flex-1">
                <div className="motion-card flex flex-col items-center text-center flex-1 max-w-[180px] rounded-lg py-2">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand text-white text-[13px] font-bold flex items-center justify-center mb-3 -mt-1 relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-[13px] text-[#0B1F3A] mb-1.5">{item.title}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 px-2">{item.desc}</p>
                </div>
                {i < processSteps.length - 1 && <div className="process-arrow" />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="motion-card flex flex-col items-center text-center rounded-lg py-2">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <div className="w-7 h-7 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center mb-2">
                  {item.step}
                </div>
                <h4 className="font-bold text-[13px] text-[#0B1F3A] mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 rounded-lg overflow-hidden shadow-card min-h-[280px]">
          <div className="bg-gradient-to-br from-[#0A2550] via-[#0B2D6B] to-[#0047AB] px-10 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
            <p className="flex items-center gap-2.5 text-white/80 text-[12px] font-semibold tracking-wider uppercase mb-4">
              <span className="w-7 h-[2px] bg-white/60 inline-block" />
            </p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-4 leading-tight">
              Ready to Build Your Future?
            </h2>
            <p className="text-[13px] leading-relaxed text-blue-100/80 mb-8 max-w-[380px]">
              Whether you&apos;re searching for your next career opportunity or
              looking to hire exceptional talent, Maxers Head Hunter is here to
              help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-white text-brand font-semibold text-[13px] px-6 py-3 rounded hover:bg-blue-50 transition-colors"
              >
                Apply Now <ArrowIcon />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white text-white font-semibold text-[13px] px-6 py-3 rounded hover:bg-white/10 transition-colors"
              >
                Contact Us <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="image-frame relative min-h-[220px]">
            <img
              src="/images/home_3.png"
              alt="Business professionals shaking hands"
              className="motion-image absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
