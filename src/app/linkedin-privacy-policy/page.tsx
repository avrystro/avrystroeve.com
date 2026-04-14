import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Privacy Policy - Avry Stroeve",
  description:
    "Privacy policy for the Content Publisher LinkedIn application by Avry Stroeve.",
  robots: { index: false, follow: false },
};

export default function LinkedInPrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900">
          LinkedIn Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Effective date: April 14, 2026
        </p>
      </header>

      <div className="space-y-8 text-neutral-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Overview
          </h2>
          <p>
            This privacy policy describes how the Content Publisher application
            (&quot;the App&quot;), operated by Avry Stroeve, handles data
            obtained through the LinkedIn API. The App is a personal content
            publishing tool used solely by its owner to create and publish
            LinkedIn posts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Collected from LinkedIn
          </h2>
          <p>
            The App accesses the following LinkedIn data through authorized API
            permissions:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Basic profile information</strong> (name, profile ID) to
              identify the posting account
            </li>
            <li>
              <strong>Email address</strong> for authentication purposes
            </li>
            <li>
              <strong>Post creation capability</strong> to publish content on
              your behalf
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            How Data Is Used
          </h2>
          <p>
            LinkedIn data is used exclusively for publishing content to the
            authorized LinkedIn profile. Specifically:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Profile information is used to authenticate API requests</li>
            <li>
              The App creates posts (text and images) on the authorized profile
            </li>
            <li>No LinkedIn data is used for analytics, advertising, or profiling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Storage and Security
          </h2>
          <p>
            OAuth access tokens are stored securely on a private, encrypted
            server and are used solely to authenticate API requests. No LinkedIn
            user data is stored beyond what is required for authentication. The
            App does not maintain a database of LinkedIn user information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Sharing
          </h2>
          <p>
            LinkedIn data accessed by the App is never sold, shared, rented, or
            disclosed to any third party. The App is a single-user personal tool
            with no external data sharing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Data Retention
          </h2>
          <p>
            Authentication tokens are retained only as long as they are valid
            and needed for the App to function. Tokens are refreshed
            automatically and old tokens are discarded. No historical LinkedIn
            data is retained.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Your Rights
          </h2>
          <p>
            You may revoke the App&apos;s access to your LinkedIn data at any
            time by removing it from your LinkedIn authorized applications at{" "}
            <a
              href="https://www.linkedin.com/psettings/permitted-services"
              className="underline hover:text-neutral-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/psettings/permitted-services
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Contact
          </h2>
          <p>
            For questions about this privacy policy or the App&apos;s data
            practices, contact Avry Stroeve at{" "}
            <a
              href="mailto:hello@avrystroeve.com"
              className="underline hover:text-neutral-900"
            >
              hello@avrystroeve.com
            </a>
            .
          </p>
        </section>

        <hr className="border-neutral-200" />

        <p className="text-sm text-neutral-400">
          This policy applies specifically to LinkedIn data accessed through the
          Content Publisher application and complies with the{" "}
          <a
            href="https://legal.linkedin.com/api-terms-of-use"
            className="underline hover:text-neutral-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn API Terms of Use
          </a>
          .
        </p>
      </div>
    </main>
  );
}
