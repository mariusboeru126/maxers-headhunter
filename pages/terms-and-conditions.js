import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsAndConditions() {
  return <><Navbar /><section className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
    <p className="section-label">Legal</p><h1 className="text-3xl font-bold text-[#0B1F3A] mb-3">Terms &amp; Conditions</h1>
    <p className="text-sm text-slate-500 mb-10">Last updated: July 30, 2026</p>
    <div className="space-y-8 text-sm leading-7 text-slate-600">
      <p>These Terms &amp; Conditions govern your use of the Maxers Head Hunter website and services. By using the site, you agree to these terms.</p>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Use of the Service</h2><p>You may use this website for lawful recruitment and career-related purposes. You must provide accurate information, protect your account credentials, and avoid activity that interferes with the security or operation of the platform.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Applications and Accounts</h2><p>Submitting an application does not guarantee an interview, employment, or placement. You are responsible for ensuring that application details and documents are accurate, current, and authorized for submission.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">User Content</h2><p>You retain responsibility for resumes, cover letters, messages, and other content you submit. You must not upload unlawful, misleading, infringing, harmful, or malicious material.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Intellectual Property</h2><p>The website design, branding, content, and software are owned by or licensed to Maxers Head Hunter and may not be copied, modified, or used without permission except as allowed by law.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Service Availability</h2><p>We aim to keep the platform available and accurate, but do not guarantee uninterrupted access or that every listing remains available. We may update, suspend, or discontinue features when necessary.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Limitation of Liability</h2><p>To the extent permitted by law, Maxers Head Hunter is not liable for indirect, incidental, or consequential losses arising from use of the website, recruitment decisions, or third-party services.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Changes and Contact</h2><p>We may revise these terms at any time by posting an updated version here. For questions, please use the Contact Us page.</p></section>
    </div>
  </section><Footer /></>;
}
