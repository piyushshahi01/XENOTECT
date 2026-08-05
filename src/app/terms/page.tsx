import type { Metadata } from "next";
import Link from "next/link";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | XENOTECT",
  description: "Read XENOTECT's terms of service governing the use of our website and professional digital services.",
  alternates: { canonical: "https://xenotect.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col">
      <NotchNavbar />
      <article className="flex-1 max-w-4xl mx-auto w-full px-6 pt-40 pb-24">
        <div className="mb-8">
          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-neutral-400 text-sm mb-12">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-neutral-400 prose-a:text-emerald-400 prose-strong:text-white">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the XENOTECT website (xenotect.com) and engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>

          <h2>2. Services</h2>
          <p>
            XENOTECT provides custom web development, AI solutions, digital marketing, and UI/UX design services. All services are subject to a separate project agreement or statement of work that defines scope, timelines, deliverables, and payment terms.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            Upon full payment, clients receive ownership of all custom-developed deliverables as outlined in the project agreement. XENOTECT retains the right to display completed work in our portfolio unless otherwise agreed in writing.
          </p>
          <p>
            All website content, branding, and proprietary tools on xenotect.com remain the intellectual property of XENOTECT and may not be reproduced without written permission.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            Payment schedules are defined per project in the signed agreement. XENOTECT typically requires a deposit before work begins. Late payments may result in work pauses. All fees are non-refundable once work has commenced unless stated otherwise in the project agreement.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            XENOTECT shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website. Our total liability shall not exceed the amount paid by the client for the specific project in question.
          </p>

          <h2>6. Confidentiality</h2>
          <p>
            XENOTECT treats all client information as confidential and will not disclose client business details to third parties without written consent, except as required by law.
          </p>

          <h2>7. Revisions & Scope Creep</h2>
          <p>
            Project agreements include a defined number of revision rounds. Additional revisions or scope changes beyond the agreed project brief will be billed at XENOTECT&apos;s standard hourly rate.
          </p>

          <h2>8. Termination</h2>
          <p>
            Either party may terminate a project agreement with 14 days&apos; written notice. In case of client-initiated termination, all work completed up to the termination date will be billed accordingly.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by applicable law. Any disputes will be resolved through good-faith negotiation first, and if unresolved, through appropriate legal channels.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            XENOTECT reserves the right to update these Terms of Service at any time. Continued use of our website after changes constitute acceptance of the updated terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any questions regarding these Terms of Service, contact us at:{" "}
            <a href="mailto:hello@xenotect.com">hello@xenotect.com</a>
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-neutral-500 text-sm mb-4">Also see:</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              Privacy Policy →
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
