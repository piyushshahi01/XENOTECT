import type { Metadata } from "next";
import Link from "next/link";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | XENOTECT",
  description: "Read XENOTECT's privacy policy to understand how we collect, use, and protect your personal data.",
  alternates: { canonical: "https://www.xenotectsolution.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col">
      <NotchNavbar />
      <article className="flex-1 max-w-4xl mx-auto w-full px-6 pt-40 pb-24">
        <div className="mb-8">
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-neutral-400 text-sm mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-a:text-emerald-400 prose-strong:text-white">
          <h2>1. Information We Collect</h2>
          <p>
            When you use our website or contact us, we may collect personal information such as your name, email address, phone number, and project details. This information is only collected when you voluntarily provide it (e.g., via our contact form or project wizard).
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your project inquiries and provide quotes</li>
            <li>Deliver our web development, AI, and marketing services</li>
            <li>Send project updates, invoices, and relevant communications</li>
            <li>Improve our website and service offerings</li>
          </ul>
          <p>We do not sell, trade, or rent your personal information to third parties.</p>

          <h2>3. Cookies & Analytics</h2>
          <p>
            Our website may use cookies and third-party analytics tools (such as Google Analytics) to understand how visitors interact with our site. You can disable cookies in your browser settings at any time.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            We may use trusted third-party services (e.g., email providers, cloud infrastructure) to operate our business. These services have their own privacy policies and are bound by data protection agreements.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us at{" "}
            <a href="mailto:hello@xenotect.com">hello@xenotect.com</a>.
          </p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of our website constitutes acceptance of the updated policy.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:hello@xenotect.com">hello@xenotect.com</a>
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-neutral-500 text-sm mb-4">Also see:</p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Terms of Service →
            </Link>
            <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
