import { redirect } from "next/navigation";

const SAMPLE_OPENING = `I was sitting at the kitchen counter eating peanut butter bread with honey and cinnamon on the top. Fort Lauderdale. Staying at my friend Vince's place. I had my computer open, six hours of focused work already behind me, and the kind of quiet that only comes when everything immediate is handled.`;

const SAMPLE_PARAGRAPH = `This is a first-principles question. Not "what does the news say to worry about" or "what's trending on conspiracy Twitter." Start at the bottom: what, historically, have human beings needed to prepare for? In the old days, the answer was direct and physical. Kingdoms taking over other kingdoms. Hunters, raiders, pillagers. People who wanted what you had and were willing to take it by force.`;

const SAMPLE_QUOTE = `Preparing doesn't mean being afraid. It means being thoughtful about how you design your life. And then actually designing it.`;

const SAMPLE_LIST_ITEMS = [
  "Fresh farmers markets nearby, or better yet, a community that grows its own food",
  "Clean water - non-negotiable",
  "Solar and free energy technologies like Eternal Engines",
  "High-speed internet (Starlink) - the ability to keep building",
];

/* ============================================================
   STYLE DIRECTIONS
   Each direction shows the SAME content in a completely different
   visual language. Blog card + reading experience + blockquote.
   ============================================================ */

const PREVIEW_TITLE = "Preparing for the Worst Case Scenario";
const PREVIEW_EXCERPT = "I was sitting at the kitchen counter eating peanut butter bread with honey and cinnamon. Six hours of focused work behind me. And then the question hit...";
const PREVIEW_BODY = "This is a first-principles question. Not \"what does the news say to worry about\" or \"what's trending on conspiracy Twitter.\" Start at the bottom: what, historically, have human beings needed to prepare for?";
const PREVIEW_QUOTE_TEXT = "Preparing doesn't mean being afraid. It means being thoughtful about how you design your life. And then actually designing it.";

const BLOG_CARDS = [
  {
    title: "Preparing for the Worst Case Scenario",
    excerpt: "What does preparation actually look like when you strip away the fear?",
    date: "March 3, 2026",
  },
  {
    title: "Good Omens",
    excerpt: "The Alchemist showed up three times in one week. I started paying attention.",
    date: "Coming Soon",
  },
  {
    title: "The Mirror Self",
    excerpt: "What if the conversation with AI is really a conversation with yourself?",
    date: "Coming Soon",
  },
];

function StyleDirectionCard({
  name,
  subtitle,
  feeling,
  children,
}: {
  name: string;
  subtitle: string;
  feeling: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-cream-200 rounded-2xl overflow-hidden mb-12">
      <div className="px-8 py-5 bg-cream-50 border-b border-cream-200">
        <h3 className="text-xl font-bold text-ink">{name}</h3>
        <p className="text-sm text-charcoal mt-1">{subtitle}</p>
        <p className="text-xs text-earth-stone mt-1 italic">Feeling: {feeling}</p>
      </div>
      <div className="grid grid-cols-2 min-h-[500px]">
        {children}
      </div>
    </div>
  );
}

function StyleDirections() {
  return (
    <div className="space-y-4">

      {/* ===== SECTION: READING EXPERIENCE ===== */}
      <div className="mb-4 pb-2 border-b border-cream-200">
        <h3 className="text-lg font-bold text-ink">Reading Experience</h3>
        <p className="text-sm text-earth-stone">How a blog post feels when you&apos;re inside it, reading.</p>
      </div>

      {/* ============================================================
          Sacred Minimalism - Pure (Original)
          The baseline. Clean, simple, just proportions.
          ============================================================ */}
      <StyleDirectionCard
        name="Sacred Minimalism - Pure"
        subtitle="Ultra-clean. Extreme whitespace. The math IS the style. No decoration."
        feeling="A Japanese tea room. Every element placed with absolute intention. Nothing extra."
      >
        {/* Light */}
        <div className="p-8" style={{ backgroundColor: '#FAFAF7' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#999' }}>Light</p>
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: '#BBBBBB', fontFamily: 'var(--font-mono)' }}>March 3, 2026</p>
            <h4 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: '#111111', lineHeight: 1.272 }}>{PREVIEW_TITLE}</h4>
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: '#444444', lineHeight: 1.732 }}>{PREVIEW_EXCERPT}</p>
            <div className="my-8" style={{ borderTop: '1px solid #E8E4DC' }} />
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: '#444444', lineHeight: 1.732 }}>{PREVIEW_BODY}</p>
            <div className="py-8 my-8">
              <p className="text-lg italic leading-relaxed" style={{ fontFamily: 'var(--font-heading)', color: '#111111', lineHeight: 1.618 }}>&ldquo;{PREVIEW_QUOTE_TEXT}&rdquo;</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#111111', borderBottom: '1px solid #111111' }}>Continue Reading</span>
          </div>
        </div>
        {/* Dark */}
        <div className="p-8" style={{ backgroundColor: '#111111' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#555' }}>Dark</p>
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: '#555555', fontFamily: 'var(--font-mono)' }}>March 3, 2026</p>
            <h4 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: '#EEEEEE', lineHeight: 1.272 }}>{PREVIEW_TITLE}</h4>
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: '#999999', lineHeight: 1.732 }}>{PREVIEW_EXCERPT}</p>
            <div className="my-8" style={{ borderTop: '1px solid #2A2A2A' }} />
            <p className="text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)', color: '#999999', lineHeight: 1.732 }}>{PREVIEW_BODY}</p>
            <div className="py-8 my-8">
              <p className="text-lg italic leading-relaxed" style={{ fontFamily: 'var(--font-heading)', color: '#EEEEEE', lineHeight: 1.618 }}>&ldquo;{PREVIEW_QUOTE_TEXT}&rdquo;</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#EEEEEE', borderBottom: '1px solid #EEEEEE' }}>Continue Reading</span>
          </div>
        </div>
      </StyleDirectionCard>

      {/* ============================================================
          Sacred Minimalism - Designer's Eye
          Same B&W + world-class design principles: entry point,
          contrast in weight, Fibonacci spacing, drop cap, progressive
          disclosure, active negative space, tension & release.
          ============================================================ */}
      <StyleDirectionCard
        name="Sacred Minimalism - Designer's Eye"
        subtitle="B&W + visual hierarchy, contrast, Fibonacci spacing, reading flow, tension/release."
        feeling="A museum exhibition. Each piece given exactly the space it deserves. Your eye knows exactly where to go."
      >
        {/* Light */}
        <div className="p-8" style={{ backgroundColor: '#FAFAF7' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#999' }}>Light</p>
          <div className="py-6 pr-6" style={{ paddingLeft: '8px' }}>
            <p style={{ color: '#C0C0C0', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 300, marginBottom: '34px' }}>March 3, 2026</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#000000', fontSize: '2.618rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '21px', maxWidth: '85%' }}>{PREVIEW_TITLE}</h4>
            <p style={{ fontFamily: 'var(--font-body)', color: '#666666', fontSize: '15px', lineHeight: 1.732, marginBottom: '55px', maxWidth: '90%' }}>{PREVIEW_EXCERPT}</p>
            <div style={{ width: '34px', height: '1px', backgroundColor: '#DDDDDD', marginBottom: '55px' }} />
            <p style={{ fontFamily: 'var(--font-body)', color: '#333333', fontSize: '14px', lineHeight: 1.8, marginBottom: '89px', maxWidth: '88%' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', lineHeight: 0.8, float: 'left', marginRight: '8px', marginTop: '5px', color: '#000000' }}>T</span>
              {PREVIEW_BODY.slice(1)}
            </p>
            <div style={{ paddingLeft: '34px', paddingTop: '34px', paddingBottom: '34px', marginBottom: '55px', borderLeft: '2px solid #E8E4DC' }}>
              <p style={{ fontFamily: 'var(--font-heading)', color: '#000000', fontSize: '1.35rem', lineHeight: 1.618, fontStyle: 'italic', maxWidth: '92%' }}>&ldquo;{PREVIEW_QUOTE_TEXT}&rdquo;</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#111111', borderBottom: '1px solid #111111' }}>Continue Reading</span>
          </div>
        </div>
        {/* Dark */}
        <div className="p-8" style={{ backgroundColor: '#0C0C0C' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#555' }}>Dark</p>
          <div className="py-6 pr-6" style={{ paddingLeft: '8px' }}>
            <p style={{ color: '#4A4A4A', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 300, marginBottom: '34px' }}>March 3, 2026</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#F5F5F5', fontSize: '2.618rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '21px', maxWidth: '85%' }}>{PREVIEW_TITLE}</h4>
            <p style={{ fontFamily: 'var(--font-body)', color: '#777777', fontSize: '15px', lineHeight: 1.732, marginBottom: '55px', maxWidth: '90%' }}>{PREVIEW_EXCERPT}</p>
            <div style={{ width: '34px', height: '1px', backgroundColor: '#2A2A2A', marginBottom: '55px' }} />
            <p style={{ fontFamily: 'var(--font-body)', color: '#AAAAAA', fontSize: '14px', lineHeight: 1.8, marginBottom: '89px', maxWidth: '88%' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', lineHeight: 0.8, float: 'left', marginRight: '8px', marginTop: '5px', color: '#F5F5F5' }}>T</span>
              {PREVIEW_BODY.slice(1)}
            </p>
            <div style={{ paddingLeft: '34px', paddingTop: '34px', paddingBottom: '34px', marginBottom: '55px', borderLeft: '2px solid #222222' }}>
              <p style={{ fontFamily: 'var(--font-heading)', color: '#E8E8E8', fontSize: '1.35rem', lineHeight: 1.618, fontStyle: 'italic', maxWidth: '92%' }}>&ldquo;{PREVIEW_QUOTE_TEXT}&rdquo;</p>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#EEEEEE', borderBottom: '1px solid #EEEEEE' }}>Continue Reading</span>
          </div>
        </div>
      </StyleDirectionCard>

      {/* ===== SECTION: DISCOVERY / BLOG LISTING ===== */}
      <div className="mt-16 mb-4 pb-2 border-b border-cream-200">
        <h3 className="text-lg font-bold text-ink">Discovery / Blog Listing</h3>
        <p className="text-sm text-earth-stone">How posts appear when browsing. What should the navigation layer look and feel like?</p>
      </div>

      {/* Sacred Minimalism as Discovery */}
      <StyleDirectionCard
        name="Sacred Minimalism - Blog Listing"
        subtitle="Clean stacked list. Generous whitespace between posts. Hairline dividers. Minimalism extends to navigation."
        feeling="A gallery guide. Each title is a doorway. Vast space between invites you to choose carefully."
      >
        {/* Light */}
        <div className="p-8" style={{ backgroundColor: '#FAFAF7' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#999' }}>Light</p>
          {BLOG_CARDS.map((card, i) => (
            <div key={i}>
              <div style={{ marginBottom: '13px' }}>
                <p style={{ color: '#BBBBBB', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '13px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: '#111111', fontSize: '1.618rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '8px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: '#666666', fontSize: '14px', lineHeight: 1.618, marginBottom: '13px' }}>{card.excerpt}</p>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#111111', borderBottom: '1px solid #111111' }}>Read</span>
              </div>
              {i < BLOG_CARDS.length - 1 && (
                <div style={{ borderTop: '1px solid #E8E4DC', marginTop: '34px', marginBottom: '34px' }} />
              )}
            </div>
          ))}
        </div>
        {/* Dark */}
        <div className="p-8" style={{ backgroundColor: '#111111' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#555' }}>Dark</p>
          {BLOG_CARDS.map((card, i) => (
            <div key={i}>
              <div style={{ marginBottom: '13px' }}>
                <p style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '13px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: '#EEEEEE', fontSize: '1.618rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '8px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: '#999999', fontSize: '14px', lineHeight: 1.618, marginBottom: '13px' }}>{card.excerpt}</p>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: '#EEEEEE', borderBottom: '1px solid #EEEEEE' }}>Read</span>
              </div>
              {i < BLOG_CARDS.length - 1 && (
                <div style={{ borderTop: '1px solid #2A2A2A', marginTop: '34px', marginBottom: '34px' }} />
              )}
            </div>
          ))}
        </div>
      </StyleDirectionCard>

      {/* Glass Card - Small Tiles B&W */}
      <StyleDirectionCard
        name="Glass Card - Small Tiles (B&W)"
        subtitle="Frosted glass cards on neutral background. No color. Each post is a floating tile."
        feeling="Crystal tablets arranged on a shelf. Each one catches the light differently."
      >
        {/* Light */}
        <div className="p-6" style={{ backgroundColor: '#E8E8E8' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(0,0,0,0.3)' }}>Light</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {BLOG_CARDS.map((card, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: '13px',
                padding: '21px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}>
                <p style={{ color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(0,0,0,0.85)', fontSize: '1.35rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '5px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(0,0,0,0.5)', fontSize: '13px', lineHeight: 1.618 }}>{card.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Dark */}
        <div className="p-6" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.2)' }}>Dark</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {BLOG_CARDS.map((card, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '13px',
                padding: '21px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.9)', fontSize: '1.35rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '5px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.618 }}>{card.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </StyleDirectionCard>

      {/* Glass Card - Large Featured Panel B&W */}
      <StyleDirectionCard
        name="Glass Card - Large Featured Panel (B&W)"
        subtitle="One big frosted panel for a featured/hero post. Smaller cards below. Dramatic hierarchy."
        feeling="A crystal monolith. One piece demands your attention first."
      >
        {/* Light */}
        <div className="p-6" style={{ backgroundColor: '#E8E8E8' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(0,0,0,0.3)' }}>Light</p>
          {/* Featured large panel */}
          <div style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(32px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '21px',
            padding: '34px',
            marginBottom: '13px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}>
            <p style={{ color: 'rgba(0,0,0,0.25)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '21px' }}>{BLOG_CARDS[0].date}</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(0,0,0,0.85)', fontSize: '2.2rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '13px' }}>{BLOG_CARDS[0].title}</h4>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(0,0,0,0.55)', fontSize: '15px', lineHeight: 1.732, marginBottom: '21px', maxWidth: '90%' }}>{PREVIEW_EXCERPT}</p>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: 'rgba(0,0,0,0.7)', borderBottom: '1px solid rgba(0,0,0,0.3)' }}>Continue Reading</span>
          </div>
          {/* Smaller cards */}
          <div style={{ display: 'flex', gap: '13px' }}>
            {BLOG_CARDS.slice(1).map((card, i) => (
              <div key={i} style={{
                flex: 1,
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '13px',
                padding: '21px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}>
                <p style={{ color: 'rgba(0,0,0,0.2)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(0,0,0,0.8)', fontSize: '1.1rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '5px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(0,0,0,0.45)', fontSize: '12px', lineHeight: 1.618 }}>{card.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Dark */}
        <div className="p-6" style={{ backgroundColor: '#0A0A0A' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'rgba(255,255,255,0.2)' }}>Dark</p>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(32px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '21px',
            padding: '34px',
            marginBottom: '13px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '21px' }}>{BLOG_CARDS[0].date}</p>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.9)', fontSize: '2.2rem', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '13px' }}>{BLOG_CARDS[0].title}</h4>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.732, marginBottom: '21px', maxWidth: '90%' }}>{PREVIEW_EXCERPT}</p>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold pb-1" style={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Continue Reading</span>
          </div>
          <div style={{ display: 'flex', gap: '13px' }}>
            {BLOG_CARDS.slice(1).map((card, i) => (
              <div key={i} style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '13px',
                padding: '21px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>{card.date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.272, fontWeight: 700, marginBottom: '5px' }}>{card.title}</h4>
                <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)', fontSize: '12px', lineHeight: 1.618 }}>{card.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </StyleDirectionCard>

    </div>
  );
}

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

function BlockquoteOptions() {
  return (
    <div className="space-y-12">
      {/* Option A: Centered Wisdom */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option A: Centered Wisdom</h3>
          <p className="text-sm text-earth-stone mt-1">
            Sacred text feel - gold rules above and below, centered, no background, no border.
            Like an inscription between passages.
          </p>
        </div>

        <div className="max-w-prose mx-auto">
          <p className="text-base leading-relaxed text-ink mb-8" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_PARAGRAPH.slice(0, 200)}...
          </p>

          {/* Centered Wisdom blockquote */}
          <div className="my-12 py-8">
            <div className="w-24 h-px bg-gold mx-auto mb-8" />
            <p
              className="text-center text-xl italic text-ink leading-relaxed px-8"
              style={{ fontFamily: `var(--font-heading)` }}
            >
              {SAMPLE_QUOTE}
            </p>
            <div className="w-24 h-px bg-gold mx-auto mt-8" />
          </div>

          <p className="text-base leading-relaxed text-ink" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_OPENING.slice(0, 180)}...
          </p>
        </div>
      </div>

      {/* Option B: Subtle Gradient Card */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option B: Subtle Gradient Card</h3>
          <p className="text-sm text-earth-stone mt-1">
            Faint gold gradient, gold left border, rounded. Almost invisible background that catches light.
            More contained than Centered Wisdom.
          </p>
        </div>

        <div className="max-w-prose mx-auto">
          <p className="text-base leading-relaxed text-ink mb-8" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_PARAGRAPH.slice(0, 200)}...
          </p>

          {/* Subtle Gradient Card blockquote */}
          <div
            className="my-8 border-l-3 border-gold rounded-r-lg py-5 px-6"
            style={{
              borderLeftWidth: '3px',
              background: 'linear-gradient(135deg, transparent 0%, rgba(212, 168, 83, 0.06) 50%, rgba(240, 215, 140, 0.08) 100%)',
            }}
          >
            <p
              className="text-base italic text-charcoal leading-relaxed"
              style={{ fontFamily: `var(--font-body)` }}
            >
              {SAMPLE_QUOTE}
            </p>
          </div>

          <p className="text-base leading-relaxed text-ink" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_OPENING.slice(0, 180)}...
          </p>
        </div>
      </div>
    </div>
  );
}

function ListStyleOptions() {
  return (
    <div className="space-y-12">
      {/* Option A: Gold Disc Bullets */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option A: Gold Disc Bullets</h3>
          <p className="text-sm text-earth-stone mt-1">
            Classic gold filled circles. Warm, intentional, premium. Simple and elegant.
          </p>
        </div>
        <div className="max-w-prose">
          <h3 className="text-xl font-bold text-ink-dark mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            Bottom Left: Self-Sustainability
          </h3>
          <ul className="space-y-3" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_LIST_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-ink leading-relaxed">
                <span className="mt-2 w-2 h-2 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Option B: Gold Dash Lines */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option B: Gold Dash Lines</h3>
          <p className="text-sm text-earth-stone mt-1">
            Short gold horizontal lines as bullets. Modern, editorial, distinctive.
          </p>
        </div>
        <div className="max-w-prose">
          <h3 className="text-xl font-bold text-ink-dark mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            Bottom Left: Self-Sustainability
          </h3>
          <ul className="space-y-3" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_LIST_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-ink leading-relaxed">
                <span className="mt-3 w-4 h-px bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Option C: Gold Diamond Markers */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option C: Gold Diamond Markers</h3>
          <p className="text-sm text-earth-stone mt-1">
            Small rotated gold squares (diamonds). Regal, temple-inspired, unique.
          </p>
        </div>
        <div className="max-w-prose">
          <h3 className="text-xl font-bold text-ink-dark mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            Bottom Left: Self-Sustainability
          </h3>
          <ul className="space-y-3" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_LIST_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-ink leading-relaxed">
                <span className="mt-2 w-2 h-2 bg-gold shrink-0 rotate-45" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Option D: Numbered with Gold */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option D: Gold Accent Numbers (for ordered lists)</h3>
          <p className="text-sm text-earth-stone mt-1">
            Gold numbers in EB Garamond. For ordered lists - pairs with any of the above bullet styles.
          </p>
        </div>
        <div className="max-w-prose">
          <h3 className="text-xl font-bold text-ink-dark mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            The Sovereignty Pyramid
          </h3>
          <ol className="space-y-3" style={{ fontFamily: `var(--font-body)` }}>
            {SAMPLE_LIST_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-ink leading-relaxed">
                <span
                  className="text-gold font-bold text-lg shrink-0 w-6 text-right"
                  style={{ fontFamily: `var(--font-heading)` }}
                >
                  {i + 1}.
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function HeadingSpacingOptions() {
  return (
    <div className="space-y-12">
      {/* Option A: Gold Rule Section Dividers */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option A: Gold Rule Section Dividers</h3>
          <p className="text-sm text-earth-stone mt-1">
            Thin centered gold rule above h2s. Creates visual breathing room between sections.
            Generous top margin (4rem+). Small gap between heading and first paragraph.
          </p>
        </div>
        <div className="max-w-prose" style={{ fontFamily: `var(--font-body)` }}>
          <p className="text-base leading-relaxed text-ink mb-4">
            {SAMPLE_OPENING.slice(0, 150)}...
          </p>

          <div className="mt-16 mb-8">
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-ink-dark" style={{ fontFamily: `var(--font-heading)` }}>
              What Are We Actually Preparing For?
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink mb-4">
            {SAMPLE_PARAGRAPH.slice(0, 200)}...
          </p>

          <div className="mt-16 mb-8">
            <div className="w-16 h-px bg-gold mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-ink-dark" style={{ fontFamily: `var(--font-heading)` }}>
              The Fork in the Road
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink">
            My dad passed away in 2023. He was fifty years old...
          </p>
        </div>
      </div>

      {/* Option B: Extra Space Only (No Rule) */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Option B: Generous Space Only</h3>
          <p className="text-sm text-earth-stone mt-1">
            No decorative elements. Pure whitespace. 4rem top margin on h2s.
            The breathing room comes from space alone. Minimal, clean.
          </p>
        </div>
        <div className="max-w-prose" style={{ fontFamily: `var(--font-body)` }}>
          <p className="text-base leading-relaxed text-ink mb-4">
            {SAMPLE_OPENING.slice(0, 150)}...
          </p>

          <h2 className="text-2xl font-bold text-ink-dark mt-16 mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            What Are We Actually Preparing For?
          </h2>
          <p className="text-base leading-relaxed text-ink mb-4">
            {SAMPLE_PARAGRAPH.slice(0, 200)}...
          </p>

          <h2 className="text-2xl font-bold text-ink-dark mt-16 mb-4" style={{ fontFamily: `var(--font-heading)` }}>
            The Fork in the Road
          </h2>
          <p className="text-base leading-relaxed text-ink">
            My dad passed away in 2023. He was fifty years old...
          </p>
        </div>
      </div>
    </div>
  );
}

function MediaEmbedOptions() {
  return (
    <div className="space-y-12">
      {/* Horizontal video */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Horizontal Video (16:9)</h3>
          <p className="text-sm text-earth-stone mt-1">
            YouTube-style. Full prose width, rounded corners, subtle shadow. Play button overlay.
          </p>
        </div>
        <div className="max-w-prose mx-auto">
          <div className="relative aspect-video bg-ink-dark rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-t-transparent border-b-transparent border-l-cream-50 ml-1" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 text-cream-100 text-sm" style={{ fontFamily: `var(--font-body)` }}>
              Preparing for the Worst Case Scenario
            </p>
          </div>
        </div>
      </div>

      {/* Vertical video */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Vertical Video (9:16)</h3>
          <p className="text-sm text-earth-stone mt-1">
            Reels/TikTok-style. Centered, capped height (500px), rounded. For social clips embedded in posts.
          </p>
        </div>
        <div className="max-w-prose mx-auto flex justify-center">
          <div className="relative w-[280px] h-[500px] bg-ink-dark rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-0 h-0 border-t-7 border-b-7 border-l-12 border-t-transparent border-b-transparent border-l-cream-50 ml-1" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-cream-100 text-sm text-center" style={{ fontFamily: `var(--font-body)` }}>
              Short clip from the post
            </p>
          </div>
        </div>
      </div>

      {/* Image handling */}
      <div className="border border-cream-200 rounded-xl p-8 bg-cream-50">
        <div className="mb-6 pb-4 border-b border-cream-200">
          <h3 className="text-lg font-bold text-ink">Image Handling</h3>
          <p className="text-sm text-earth-stone mt-1">
            Prose-width, rounded corners, subtle cream-200 border. Optional caption below.
          </p>
        </div>
        <div className="max-w-prose mx-auto">
          <div className="rounded-xl overflow-hidden border border-cream-200 shadow-sm">
            <div className="aspect-[3/2] bg-gradient-to-br from-parchment to-cream-200 flex items-center justify-center">
              <p className="text-earth-stone text-sm">Image placeholder (3:2 ratio)</p>
            </div>
          </div>
          <p className="text-center text-sm text-charcoal mt-3 italic" style={{ fontFamily: `var(--font-body)` }}>
            Fort Lauderdale, sitting at the kitchen counter. The moment the word arrived.
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

      {/* STYLE DIRECTIONS - The Big Decision */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-2">Style Directions</h2>
        <p className="text-gray-500 mb-2">
          Two layers to design: the reading experience (inside a post) and the
          discovery layer (browsing/listing posts). Each shown in light + dark.
        </p>
        <p className="text-sm text-charcoal mb-8">
          B&amp;W foundation first. Colors come after structure is locked.
        </p>
        <StyleDirections />
      </section>

      <hr className="border-cream-200 mb-16" />

      {/* Chosen Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Chosen Typography</h2>
        <p className="text-gray-500 mb-8">
          EB Garamond (headings) + Libre Baskerville (body) + IBM Plex Mono (code).
          Global tokens: --font-heading, --font-body, --font-mono.
        </p>
        <TypographyShowcase />
      </section>

      {/* Blockquote Options - DECISION NEEDED */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Blockquote Options</h2>
        <p className="text-gray-500 mb-8">
          Compare with real content in context. Which feels right for the blog reading experience?
        </p>
        <BlockquoteOptions />
      </section>

      {/* List Style Options - DECISION NEEDED */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">List Style Options</h2>
        <p className="text-gray-500 mb-8">
          Bullet styles for unordered lists. Pick one bullet style + the gold numbers for ordered lists.
        </p>
        <ListStyleOptions />
      </section>

      {/* Heading Spacing Options - DECISION NEEDED */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Heading Spacing</h2>
        <p className="text-gray-500 mb-8">
          How h2 section breaks feel within a long blog post. Both have generous top margin.
        </p>
        <HeadingSpacingOptions />
      </section>

      {/* Media Embed Preview */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Media Embeds</h2>
        <p className="text-gray-500 mb-8">
          How images and videos (horizontal + vertical) appear within blog posts.
        </p>
        <MediaEmbedOptions />
      </section>

      {/* Color Palette Comparison */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Color Palette Comparison</h2>
        <p className="text-gray-500 mb-8">
          Current palette (Session 37) vs Temple palette (Sacred Geometry Research, Session 39).
          Temple colors derived from Egyptian, Greek, and Gothic temple pigments.
          Compare side by side - which feels more &quot;warm/ancient/regal/temple&quot;?
        </p>

        {/* Side-by-side: Current vs Temple backgrounds */}
        <div className="border border-cream-200 rounded-xl p-8 bg-cream-50 mb-8">
          <h3 className="text-lg font-bold text-ink mb-6">Page Backgrounds</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Current</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-20 rounded-lg border" style={{ backgroundColor: '#FFFDF7' }} />
                  <p className="text-xs text-earth-stone">cream-50 #FFFDF7</p>
                </div>
                <div className="space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#F5F0E6' }} />
                  <p className="text-xs text-earth-stone">parchment #F5F0E6</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Temple</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#E8DCC8' }} />
                  <p className="text-xs text-earth-stone">temple-sandstone #E8DCC8</p>
                </div>
                <div className="space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#F5F0E6' }} />
                  <p className="text-xs text-earth-stone">temple-parchment #F5F0E6 (same)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side: Current vs Temple dark */}
        <div className="border border-cream-200 rounded-xl p-8 bg-cream-50 mb-8">
          <h3 className="text-lg font-bold text-ink mb-6">Dark / Text Colors</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Current</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: '#1A1A2E' }} />
                  <p className="text-xs text-earth-stone">ink #1A1A2E (blue-tinted dark)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: '#0F0F1A' }} />
                  <p className="text-xs text-earth-stone">ink-dark #0F0F1A</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: '#2C3E50' }} />
                  <p className="text-xs text-earth-stone">charcoal #2C3E50</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Temple</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: '#1A1A1A' }} />
                  <p className="text-xs text-earth-stone">temple-midnight #1A1A1A (pure dark)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded-lg" style={{ backgroundColor: '#0D1B2A' }} />
                  <p className="text-xs text-earth-stone">temple-lapis-deep #0D1B2A (dark mode bg)</p>
                </div>
                <div className="space-y-1">
                  <div className="h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0D1B2A' }}>
                    <span className="text-xs" style={{ color: '#F0E6D2' }}>temple-bone on lapis-deep</span>
                  </div>
                  <p className="text-xs text-earth-stone">temple-bone #F0E6D2 (text on dark)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side: Gold comparison */}
        <div className="border border-cream-200 rounded-xl p-8 bg-cream-50 mb-8">
          <h3 className="text-lg font-bold text-ink mb-6">Gold / Accent</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Current Gold</p>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#F0D78C' }} />
                  <p className="text-xs text-earth-stone">gold-light</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#D4A853' }} />
                  <p className="text-xs text-earth-stone">gold #D4A853</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#8B6914' }} />
                  <p className="text-xs text-earth-stone">gold-dark</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Temple Gold</p>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#E8D09A' }} />
                  <p className="text-xs text-earth-stone">temple-gold-light</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#C5973A' }} />
                  <p className="text-xs text-earth-stone">temple-gold #C5973A</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#8B6914' }} />
                  <p className="text-xs text-earth-stone">temple-gold-dark (same)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side: Blue comparison */}
        <div className="border border-cream-200 rounded-xl p-8 bg-cream-50 mb-8">
          <h3 className="text-lg font-bold text-ink mb-6">Blue / Secondary</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Current Azure</p>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#7CB9E8' }} />
                  <p className="text-xs text-earth-stone">azure-light</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#3B82C4' }} />
                  <p className="text-xs text-earth-stone">azure #3B82C4</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#1E3A5F' }} />
                  <p className="text-xs text-earth-stone">azure-dark</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal mb-3">Temple Lapis</p>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#2D5DA1' }} />
                  <p className="text-xs text-earth-stone">lapis-light</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#1E3F66' }} />
                  <p className="text-xs text-earth-stone">lapis #1E3F66</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-20 rounded-lg" style={{ backgroundColor: '#0D1B2A' }} />
                  <p className="text-xs text-earth-stone">lapis-deep</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temple-only: Accent colors */}
        <div className="border border-cream-200 rounded-xl p-8 bg-cream-50 mb-8">
          <h3 className="text-lg font-bold text-ink mb-2">Temple Accents (NEW)</h3>
          <p className="text-sm text-earth-stone mb-6">
            These don&apos;t exist in the current palette. From temple pigments - for semantic use.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="h-20 rounded-lg" style={{ backgroundColor: '#8B3A2A' }} />
              <p className="text-xs text-earth-stone">temple-ochre #8B3A2A</p>
              <p className="text-xs text-charcoal">Red ochre (emphasis)</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 rounded-lg" style={{ backgroundColor: '#2E5E4E' }} />
              <p className="text-xs text-earth-stone">temple-malachite #2E5E4E</p>
              <p className="text-xs text-charcoal">Malachite (success)</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 rounded-lg" style={{ backgroundColor: '#8B1A1A' }} />
              <p className="text-xs text-earth-stone">temple-ruby #8B1A1A</p>
              <p className="text-xs text-charcoal">Cathedral glass (critical)</p>
            </div>
            <div className="space-y-1">
              <div className="h-20 rounded-lg" style={{ backgroundColor: '#5B2C6F' }} />
              <p className="text-xs text-earth-stone">temple-amethyst #5B2C6F</p>
              <p className="text-xs text-charcoal">Manganese oxide (tertiary)</p>
            </div>
          </div>
        </div>

        {/* Full palette context: Light + Dark mode preview */}
        <div className="border border-cream-200 rounded-xl overflow-hidden mb-8">
          <div className="grid grid-cols-2">
            {/* Light mode mock */}
            <div className="p-8" style={{ backgroundColor: '#E8DCC8' }}>
              <p className="text-sm font-semibold mb-4" style={{ color: '#1A1A1A' }}>Light Mode (Temple)</p>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#F5F0E6' }}>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A1A' }}>
                  Preparing for the Worst Case
                </h3>
                <p className="text-sm mb-3" style={{ fontFamily: 'var(--font-body)', color: '#1A1A1A' }}>
                  I was sitting at the kitchen counter eating peanut butter bread...
                </p>
                <span className="text-sm font-semibold" style={{ color: '#C5973A' }}>Read More</span>
                <span className="mx-2" style={{ color: '#1A1A1A' }}>|</span>
                <span className="text-sm" style={{ color: '#1E3F66' }}>Share This Blog</span>
              </div>
            </div>
            {/* Dark mode mock */}
            <div className="p-8" style={{ backgroundColor: '#0D1B2A' }}>
              <p className="text-sm font-semibold mb-4" style={{ color: '#F0E6D2' }}>Dark Mode (Temple)</p>
              <div className="rounded-lg p-6" style={{ backgroundColor: '#162335' }}>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#F0E6D2' }}>
                  Preparing for the Worst Case
                </h3>
                <p className="text-sm mb-3" style={{ fontFamily: 'var(--font-body)', color: '#8B9EB3' }}>
                  I was sitting at the kitchen counter eating peanut butter bread...
                </p>
                <span className="text-sm font-semibold" style={{ color: '#C5973A' }}>Read More</span>
                <span className="mx-2" style={{ color: '#F0E6D2' }}>|</span>
                <span className="text-sm" style={{ color: '#2D5DA1' }}>Share This Blog</span>
              </div>
            </div>
          </div>
        </div>

        {/* Original swatches for reference */}
        <details className="border border-cream-200 rounded-xl p-8 bg-cream-50">
          <summary className="text-lg font-bold text-ink cursor-pointer">All Current Swatches (expand)</summary>
          <div className="mt-6">
            <h4 className="text-sm font-semibold mt-4 mb-3">Light Base</h4>
            <div className="grid grid-cols-5 gap-3">
              <div className="space-y-1"><div className="h-12 rounded bg-cream-50 border" /><p className="text-xs">cream-50</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-cream-100" /><p className="text-xs">cream-100</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-cream-200" /><p className="text-xs">cream-200</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-cream-300" /><p className="text-xs">cream-300</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-parchment" /><p className="text-xs">parchment</p></div>
            </div>
            <h4 className="text-sm font-semibold mt-4 mb-3">Dark</h4>
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1"><div className="h-12 rounded bg-ink" /><p className="text-xs">ink</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-ink-light" /><p className="text-xs">ink-light</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-ink-dark" /><p className="text-xs">ink-dark</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-charcoal" /><p className="text-xs">charcoal</p></div>
            </div>
            <h4 className="text-sm font-semibold mt-4 mb-3">Azure + Gold + Earth</h4>
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1"><div className="h-12 rounded bg-azure" /><p className="text-xs">azure</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-azure-light" /><p className="text-xs">azure-light</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-gold" /><p className="text-xs">gold</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-gold-light" /><p className="text-xs">gold-light</p></div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="space-y-1"><div className="h-12 rounded bg-earth-sand" /><p className="text-xs">earth-sand</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-earth-clay" /><p className="text-xs">earth-clay</p></div>
              <div className="space-y-1"><div className="h-12 rounded bg-earth-stone" /><p className="text-xs">earth-stone</p></div>
            </div>
          </div>
        </details>
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
