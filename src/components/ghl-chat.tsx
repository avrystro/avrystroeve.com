"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// GoHighLevel (LeadConnector) chat widget.
// Loaded only on public pages — kept off the private admin surfaces
// (/internal brain dashboard and /admin/login).
export function GhlChat() {
  const pathname = usePathname();

  if (pathname.startsWith("/internal") || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6a3c9f66a2d78afbf7956feb"
      data-source="WEB_USER"
      strategy="afterInteractive"
    />
  );
}
