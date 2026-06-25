import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms of Service — Avry Stroeve",
  description: "Terms of Service governing use of the Avry Stroeve website and messaging services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">Legal</p>
      <h1 className="swiss text-4xl sm:text-5xl font-800 leading-[1.05] mb-4">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-400 font-light mb-12">
        Last updated: {BUSINESS.lastUpdated}
      </p>

      <div className="space-y-10 text-gray-600 text-base leading-relaxed font-light">
        <section className="space-y-4">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of{" "}
            <a href={BUSINESS.site} className="text-klein hover:underline">
              {BUSINESS.site}
            </a>{" "}
            (the &ldquo;Site&rdquo;) operated by {BUSINESS.legalName}. By using
            the Site or our messaging services, you agree to these Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Use of the Site
          </h2>
          <p>
            You may use the Site for lawful purposes only. You agree not to
            misuse the Site, interfere with its operation, or attempt to access
            it in any unauthorized manner.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Messaging Terms
          </h2>
          <p>
            If you provide your mobile number and opt in through our chat
            widget, you consent to receive the message types you selected
            (customer care and/or promotional). Message frequency varies.
            Message and data rates may apply. Consent is not a condition of any
            purchase. Reply{" "}
            <strong className="font-600 text-gray-900">STOP</strong> to
            unsubscribe at any time, or{" "}
            <strong className="font-600 text-gray-900">HELP</strong> for help.
            See our{" "}
            <a href="/privacy" className="text-klein hover:underline">
              Privacy Policy
            </a>{" "}
            for full details on how we handle your information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Intellectual Property
          </h2>
          <p>
            The content on the Site, including text, graphics, and logos, is
            owned by {BUSINESS.legalName} unless otherwise noted, and may not be
            copied or reused without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Disclaimers
          </h2>
          <p>
            The Site is provided &ldquo;as is&rdquo; without warranties of any
            kind. We do not guarantee that the Site will be uninterrupted,
            error-free, or free of harmful components.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, {BUSINESS.legalName} will
            not be liable for any indirect, incidental, or consequential
            damages arising from your use of the Site or our messaging services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the State of Colorado,
            without regard to its conflict-of-law principles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Changes are effective
            when posted on this page, with an updated &ldquo;Last updated&rdquo;
            date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Contact Us
          </h2>
          <address className="not-italic">
            {BUSINESS.legalName}
            <br />
            {BUSINESS.addressLine1}
            <br />
            {BUSINESS.addressLine2}
            <br />
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-klein hover:underline"
            >
              {BUSINESS.email}
            </a>
            {BUSINESS.phone && (
              <>
                <br />
                {BUSINESS.phone}
              </>
            )}
          </address>
        </section>
      </div>
    </main>
  );
}
