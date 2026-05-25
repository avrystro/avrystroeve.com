# Glossary

| Term | Meaning |
|---|---|
| Agent | An AI persona with a system prompt and a knowledge base. Accessed via `/dashboard/agents/<name>`. |
| Capture | A raw recording or transcript ingested from an external source (voice memo, Fathom call, WhatsApp, etc.). |
| Conversation | A single interaction event (one call, one voice memo, one chat thread). Stored in Supabase `conversations` table. |
| Canvas | An Excalidraw whiteboard. Stored in Supabase `canvases` table as JSON. |
| Section | One of the seven top-level areas in the dashboard: Today, Inbox, People, Money, Agents, Canvases, Settings. |
| Milestone | A shippable increment tracked as a GitHub Milestone. Each has a plan in `docs/plans/`. |
| ADR | Architecture Decision Record. Documents why a significant technical decision was made. |
| PRD | Product Requirements Document. The single source of truth for what the product is. |
| Slice | Synonym for milestone in early planning. Deprecated in favor of "milestone." |
