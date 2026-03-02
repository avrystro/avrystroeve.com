"use client";

import { PostHogProvider } from "./posthog-provider";
import { AnalyticsProvider } from "./analytics-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
      <AnalyticsProvider />
    </PostHogProvider>
  );
}
