import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom component overrides go here in Phase 3
    ...components,
  };
}
