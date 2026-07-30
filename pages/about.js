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

const whatWeDoItems = [
  "Understand your needs and career goals",
  "Find and assess the right talent",
  "Provide training and skill development",
  "Support candidates through every hiring stage",
  "Build long-term partnerships with employers",
];

const trainingModes = [
  {
    title: "Training in Zoom",
    image: "/images/home_1.png",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="14" height="10" rx="2" />
        <path d="M16 9l6-3v12l-6-3V9z" />
      </svg>
    ),
  },
  {
    title: "Classroom Training",
    image: "/images/home_2.png",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M7 20h10M12 16v4" />
      </svg>
    ),
  },
  {
    title: "Online Learning",
    image: "/images/team.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
      </svg>
    ),
  },
];

const founders = [
  {
    name: "Michael Reyes",
    role: "Co-Founder & CEO",
    image: "/images/Co-Founder-1.jpg",
    bio: "With over 15 years in global recruitment, Michael built Maxers Head Hunter to bridge the gap between exceptional talent and world-class employers.",
  },
  {
    name: "Sarah Chen",
    role: "Co-Founder & COO",
    image: "/images/Co-Founder-2.jpg",
    bio: "Sarah leads operations and candidate development programs, ensuring every professional receives personalized support from application to placement.",
  },
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
                Maxers Head Hunter is a global talent enablement and workforce solutions
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
                  className="bg-white border border-slate-100 rounded-lg shadow-card-sm px-6 py-6 flex items-center gap-4"
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

      {/* Mission, Vision, Values */}
      <section className="bg-[#F5F7FA] py-16 lg:py-20 mt-8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-6">
          {mvv.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-card-sm border border-slate-100 p-6 flex gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-[15px] text-[#0B1F3A] mb-2">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr_0.9fr] gap-8 lg:gap-10 items-start">
            <div>
              <p className="section-label">What We Do</p>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1F3A] leading-tight mb-5">
                We Create, Train and Connect People
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-500 mb-8">
                From sourcing talent to preparing candidates for success, we provide
                end-to-end workforce solutions that help people and businesses thrive.
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
                src="/images/team.jpg"
                alt="Training and development session"
                className="w-full h-[280px] lg:h-[360px] object-cover rounded-lg shadow-card"
              />
            </div>

            <div className="space-y-4">
              {trainingModes.map((mode) => (
                <div
                  key={mode.title}
                  className="flex items-center gap-4 bg-white border border-slate-100 rounded-lg shadow-card-sm p-3"
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
          <div className="text-center mb-12">
            <p className="section-label inline-flex">Leadership</p>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0B1F3A] mb-3">
              Meet Our Founders
            </h2>
            <p className="text-[14px] text-slate-500 max-w-xl mx-auto">
              Maxers Head Hunter was built on a shared belief that the right connection
              can change a career — and a company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-lg border border-slate-100 shadow-card-sm overflow-hidden"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-[220px] object-cover object-top"
                />
                <div className="p-6">
                  <h3 className="font-bold text-[17px] text-[#0B1F3A]">{founder.name}</h3>
                  <p className="text-brand text-[13px] font-semibold mb-3">{founder.role}</p>
                  <p className="text-[13px] leading-relaxed text-slate-500">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
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
                className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:shadow-card-sm transition-shadow"
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
              src="/images/home_3.png"
              alt="Team celebrating together"
              className="absolute inset-0 w-full h-full object-cover"
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
