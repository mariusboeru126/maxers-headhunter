import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            About Maxers Head Hunter
          </h1>
          <p className="text-slate-500 max-w-2xl">
            We connect great people with great opportunities.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-slate-600 mb-4">
            Maxers Head Hunter is a global talent enablement and workforce
            solutions partner. We specialize in connecting qualified
            professionals with companies across diverse industries,
            delivering consistent, high-quality service anywhere in the
            world.
          </p>
          <p className="text-slate-600">
            Through a blend of human expertise and scalable technology, we
            help organizations build great teams while empowering candidates
            to land roles that fit their skills and ambitions.
          </p>
        </div>
        <div className="bg-slate-200 rounded-lg h-72 flex items-center justify-center text-slate-400 text-sm">
          Team photo placeholder
        </div>
      </section>

      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Our Mission</h3>
            <p className="text-sm text-slate-500">
              To connect talent with opportunity through reliable
              recruitment, training, and career support.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Our Vision</h3>
            <p className="text-sm text-slate-500">
              To be a trusted global leader in people solutions and career
              development.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Our Values</h3>
            <p className="text-sm text-slate-500">
              Integrity, Excellence, Inclusion, and Partnership guide
              everything we do.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Company Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Excellence", desc: "High standards, measurable outcomes, and continuous improvement." },
            { title: "Integrity", desc: "Transparent processes and ethical guidance for candidates and employers." },
            { title: "Inclusion", desc: "Equitable access to opportunities and diverse talent pools." },
            { title: "Partnership", desc: "Long-term relationships built on trust, results, and accountability." },
          ].map((item) => (
            <div key={item.title} className="bg-slate-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
