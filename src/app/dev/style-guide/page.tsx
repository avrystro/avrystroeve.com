import { redirect } from "next/navigation";

export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Style Guide</h1>
      <p className="text-gray-500 mb-12">
        Component showcase for development. This page is not accessible in production.
      </p>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Colors</h2>

        <h3 className="text-lg font-semibold mt-6 mb-3">Light Base</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded bg-cream-50 border" />
            <p className="text-sm">cream-50</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-cream-100" />
            <p className="text-sm">cream-100</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-cream-200" />
            <p className="text-sm">cream-200</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-parchment" />
            <p className="text-sm">parchment</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Dark Accents</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded bg-ink" />
            <p className="text-sm">ink</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-ink-light" />
            <p className="text-sm">ink-light</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-ink-dark" />
            <p className="text-sm">ink-dark</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-charcoal" />
            <p className="text-sm">charcoal</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Azure (Blue)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded bg-azure-light" />
            <p className="text-sm">azure-light</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-azure" />
            <p className="text-sm">azure</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-azure-dark" />
            <p className="text-sm">azure-dark</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-azure-glow" />
            <p className="text-sm">azure-glow</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Gold</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded bg-gold-light" />
            <p className="text-sm">gold-light</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-gold" />
            <p className="text-sm">gold</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-gold-dark" />
            <p className="text-sm">gold-dark</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-gold-glow" />
            <p className="text-sm">gold-glow</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3">Earth Tones</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded bg-earth-sand" />
            <p className="text-sm">earth-sand</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-earth-clay" />
            <p className="text-sm">earth-clay</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded bg-earth-stone" />
            <p className="text-sm">earth-stone</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">Heading 1</h1>
          <h2 className="text-4xl font-bold">Heading 2</h2>
          <h3 className="text-3xl font-bold">Heading 3</h3>
          <h4 className="text-2xl font-bold">Heading 4</h4>
          <p className="text-lg">Body text (large) - The quick brown fox jumps over the lazy dog.</p>
          <p>Body text (default) - The quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm">Small text - The quick brown fox jumps over the lazy dog.</p>
        </div>
      </section>

      {/* Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Components</h2>
        <p className="text-gray-500">Components will be added here as they are built in Phase 3.</p>
      </section>

      {/* Prose / MDX */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Prose (MDX Typography)</h2>
        <div className="prose prose-lg">
          <h3>Sample Prose Content</h3>
          <p>
            This section tests the Tailwind Typography plugin styles that will be used
            for blog post content rendered from MDX.
          </p>
          <blockquote>
            Getting people into things that changed your life.
          </blockquote>
          <ul>
            <li>List item one</li>
            <li>List item two</li>
            <li>List item three</li>
          </ul>
          <pre><code>{"const example = \"code block styling\";"}</code></pre>
        </div>
      </section>
    </main>
  );
}
