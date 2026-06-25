import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy — Avry Stroeve",
  description:
    "Privacy Policy for Avry Stroeve, including SMS/text messaging terms and consent.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">Legal</p>
      <h1 className="swiss text-4xl sm:text-5xl font-800 leading-[1.05] mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400 font-light mb-12">
        Last updated: {BUSINESS.lastUpdated}
      </p>

      <div className="space-y-10 text-gray-600 text-base leading-relaxed font-light">
        <section className="space-y-4">
          <p>
            This Privacy Policy describes how {BUSINESS.legalName} (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
            information when you visit{" "}
            <a
              href={BUSINESS.site}
              className="text-klein hover:underline"
            >
              {BUSINESS.site}
            </a>{" "}
            (the &ldquo;Site&rdquo;) or interact with our chat widget and
            messaging services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, including your
            name, mobile phone number, email address, and the content of
            messages you send through our chat widget. We also collect basic
            usage and analytics data (such as pages visited and device type) to
            understand how the Site is used.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            SMS / Text Messaging Program
          </h2>
          <p>
            {BUSINESS.legalName} sends both customer care and promotional
            messages to users who interact with the chat widget on{" "}
            <a href={BUSINESS.site} className="text-klein hover:underline">
              {BUSINESS.site}
            </a>
            . Customer care messages may include responses to support requests,
            ticket updates, appointment coordination, or follow-up
            communications related to an existing inquiry. Promotional messages
            may include special offers, discounts, event promotions, and service
            announcements.
          </p>
          <p>
            <strong className="font-600 text-gray-900">How you opt in.</strong>{" "}
            When you interact with the chat widget, you may voluntarily provide
            your mobile phone number and independently select one or both
            consent checkboxes — one to receive customer care messages related
            to your inquiries, and one to receive promotional messages. Each
            checkbox represents a separate and distinct consent. You may opt
            into either or both message types. Marketing consent is never
            combined with transactional consent.
          </p>
          <p>
            <strong className="font-600 text-gray-900">
              Message frequency &amp; rates.
            </strong>{" "}
            Message frequency varies. Message and data rates may apply. Consent
            is not a condition of any purchase.
          </p>
          <p>
            <strong className="font-600 text-gray-900">Opt out / help.</strong>{" "}
            You can cancel the SMS service at any time by replying{" "}
            <strong className="font-600 text-gray-900">STOP</strong>. After you
            send <strong className="font-600 text-gray-900">STOP</strong>, we
            will send a confirmation and then stop sending messages. For help,
            reply <strong className="font-600 text-gray-900">HELP</strong> or
            contact us at{" "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="text-klein hover:underline"
            >
              {BUSINESS.email}
            </a>
            .
          </p>
          <p className="border-l-2 border-klein/30 pl-4">
            <strong className="font-600 text-gray-900">
              No mobile information is shared with third parties.
            </strong>{" "}
            We do not sell or share your mobile phone number, SMS opt-in
            consent, or any related information with affiliates or third parties
            for their marketing or promotional purposes. Mobile opt-in data is
            collected directly by {BUSINESS.legalName} and is used only to
            deliver the messages you requested.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to respond to your inquiries,
            provide customer support, send the messages you have consented to
            receive, operate and improve the Site, and comply with legal
            obligations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            How We Share Your Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with service providers who help us operate the Site and our
            messaging services (for example, our messaging platform), strictly
            to perform services on our behalf. As stated above, we never share
            mobile opt-in information with third parties for their own marketing
            purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Analytics &amp; Cookies
          </h2>
          <p>
            We use privacy-conscious analytics tools (such as PostHog and Vercel
            Analytics) to understand Site usage. These tools may set cookies or
            use similar technologies. You can control cookies through your
            browser settings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Data Retention
          </h2>
          <p>
            We retain personal information for as long as needed to provide our
            services and fulfill the purposes described in this policy, unless a
            longer retention period is required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Children&apos;s Privacy
          </h2>
          <p>
            The Site is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="swiss-tight text-sm font-700 text-gray-900 uppercase tracking-wide">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes are
            effective when posted on this page, with an updated &ldquo;Last
            updated&rdquo; date.
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
