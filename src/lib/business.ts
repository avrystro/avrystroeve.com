// Single source of truth for business / contact details.
// Used by the site footer and the legal pages (privacy + terms).
// These values must match what was submitted to GoHighLevel for A2P
// 10DLC brand verification — carriers cross-check them against the site.

export const BUSINESS = {
  legalName: "Avry Stroeve",
  addressLine1: "237 Cook St",
  addressLine2: "Denver, CO 80206",
  email: "avrystroeve@gmail.com",
  // TODO: add the phone number used to verify the brand in GoHighLevel.
  // Required for A2P compliance — leave empty until provided.
  phone: "",
  site: "https://www.avrystroeve.com",
  lastUpdated: "June 24, 2026",
} as const;
