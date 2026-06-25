"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/lib/business";

// Site-wide footer for public pages. Carries the business name, address,
// contact details and legal links required for A2P 10DLC SMS compliance.
// Hidden on the private admin surfaces (/internal, /admin), which have
// their own dark-theme layout.
export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/internal") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="swiss text-xs tracking-[0.25em] text-gray-400">
            {BUSINESS.legalName}
          </p>
          <address className="mt-3 not-italic text-xs text-gray-400 font-light leading-relaxed">
            {BUSINESS.addressLine1}
            <br />
            {BUSINESS.addressLine2}
            <br />
            <a
              href={`mailto:${BUSINESS.email}`}
              className="hover:text-klein transition-colors"
            >
              {BUSINESS.email}
            </a>
            {BUSINESS.phone && (
              <>
                <br />
                <a
                  href={`tel:${BUSINESS.phone.replace(/[^\d+]/g, "")}`}
                  className="hover:text-klein transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </>
            )}
          </address>
        </div>

        <nav className="flex flex-col gap-2 text-xs text-gray-400 font-light">
          <Link href="/privacy" className="hover:text-klein transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-klein transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
