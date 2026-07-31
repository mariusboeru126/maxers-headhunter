import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return <><Navbar /><section className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
    <p className="section-label">Legal</p><h1 className="text-3xl font-bold text-[#0B1F3A] mb-3">Privacy Policy</h1>
    <p className="text-sm text-slate-500 mb-10">Last updated: July 30, 2026</p>
    <div className="space-y-8 text-sm leading-7 text-slate-600">
      <p>Maxers Head Hunter respects your privacy. This policy explains how we collect, use, store, and protect information when you use our website, create an account, apply for jobs, or contact us.</p>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Information We Collect</h2><p>We collect account details such as your name, email address, and phone number; application details such as your resume, cover letter, and answers to job-specific questions; and messages you send through our contact or comment features.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">How We Use Information</h2><p>We use your information to create and secure your account, process job applications, communicate about opportunities and applications, respond to your messages, improve our services, and meet legal obligations.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Sharing Information</h2><p>We share application information only with relevant hiring teams, service providers supporting our platform, or authorities when required by law. We do not sell personal information.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Security and Retention</h2><p>We use reasonable technical and organizational safeguards to protect information. We retain it only for as long as needed for recruitment, account administration, legal compliance, and legitimate business purposes.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Your Choices</h2><p>You may request access, correction, or deletion of personal information where applicable. You may also ask questions about this policy by contacting us through the Contact Us page.</p></section>
      <section><h2 className="text-lg font-bold text-slate-800 mb-2">Policy Updates</h2><p>We may update this policy to reflect changes to our practices or applicable law. The latest version will always be posted on this page.</p></section>
    </div>
  </section><Footer /></>;
}
