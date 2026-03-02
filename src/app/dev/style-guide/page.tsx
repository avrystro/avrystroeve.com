import { redirect } from "next/navigation";

const SAMPLE_OPENING = `I was sitting at the kitchen counter eating peanut butter bread with honey and cinnamon on the top. Fort Lauderdale. Staying at my friend Vince's place. I had my computer open, six hours of focused work already behind me, and the kind of quiet that only comes when everything immediate is handled.`;

const SAMPLE_PARAGRAPH = `This is a first-principles question. Not "what does the news say to worry about" or "what's trending on conspiracy Twitter." Start at the bottom: what, historically, have human beings needed to prepare for? In the old days, the answer was direct and physical. Kingdoms taking over other kingdoms. Hunters, raiders, pillagers. People who wanted what you had and were willing to take it by force.`;

const SAMPLE_QUOTE = `Preparing doesn't mean being afraid. It means being thoughtful about how you design your life. And then actually designing it.`;

function TypographyShowcase() {
  return (
    <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
      <div className="mb-6 pb-4 border-b border-cream-200">
        <h3 className="text-lg font-bold text-ink">Chosen Typography: Warm Artisan</h3>
        <p className="text-sm text-earth-stone mt-1">
          Hand-printed invitation - humanist warmth, calligraphic heritage, feels like
          reading a letter from someone you trust
        </p>
        <div className="flex gap-4 mt-2 text-xs text-charcoal">
          <span>Heading: EB Garamond</span>
          <span>Body: Libre Baskerville</span>
          <span>Code: IBM Plex Mono</span>
        </div>
      </div>

      {/* Heading scale */}
      <div className="space-y-3 mb-8" style={{ fontFamily: `var(--font-heading)` }}>
        <h1 className="text-5xl font-bold text-ink">Preparing for the Worst Case</h1>
        <h2 className="text-3xl font-bold text-ink">What Are We Actually Preparing For?</h2>
        <h3 className="text-2xl font-bold text-ink">The Sovereignty Pyramid</h3>
        <h4 className="text-xl font-bold text-ink">Bottom Left: Self-Sustainability</h4>
      </div>

      {/* Blog preview at reading width */}
      <div className="max-w-prose">
        <div style={{ fontFamily: `var(--font-body)` }}>
          <p className="text-lg leading-relaxed text-ink mb-4">{SAMPLE_OPENING}</p>
          <p className="text-base leading-relaxed text-ink mb-4">{SAMPLE_PARAGRAPH}</p>
        </div>

        {/* Blockquote */}
        <blockquote
          className="border-l-4 border-gold pl-6 py-3 my-6 bg-cream-100 rounded-r-lg"
          style={{ fontFamily: `var(--font-body)` }}
        >
          <p className="text-base italic text-ink-light">{SAMPLE_QUOTE}</p>
        </blockquote>

        {/* Code block */}
        <pre
          className="bg-ink rounded-lg p-4 my-6 overflow-x-auto"
          style={{ fontFamily: `var(--font-mono)` }}
        >
          <code className="text-sm text-cream-50">
            {`const sovereignty = {\n  spiritual: "Self-Realization Fellowship",\n  physical: "off-grid, food, water, solar",\n  third: "?" // What do you think?\n};`}
          </code>
        </pre>

        {/* Mixed: heading + body together */}
        <div className="mt-8 pt-6 border-t border-cream-200">
          <h2
            className="text-2xl font-bold text-ink mb-3"
            style={{ fontFamily: `var(--font-heading)` }}
          >
            The Fork in the Road
          </h2>
          <p
            className="text-base leading-relaxed text-ink"
            style={{ fontFamily: `var(--font-body)` }}
          >
            My dad passed away in 2023. He was fifty years old. I was doing door-to-door
            sales in Utah that summer. When it happened, I did what I thought was strong: I
            didn&apos;t cry. Not for months. I thought he&apos;d want me to carry on, keep working,
            keep building. I thought strength meant not letting the grief touch what I needed
            to do.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Style Guide</h1>
      <p className="text-gray-500 mb-12">
        Component showcase for development. This page is not accessible in production.
      </p>

      {/* Chosen Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Chosen Typography</h2>
        <p className="text-gray-500 mb-8">
          EB Garamond (headings) + Libre Baskerville (body) + IBM Plex Mono (code).
          Global tokens: --font-heading, --font-body, --font-mono.
        </p>
        <TypographyShowcase />
      </section>

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

      {/* Typography (default) */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Typography (Default)</h2>
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
