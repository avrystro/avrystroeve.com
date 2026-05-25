"use client";

import { useEffect, useRef } from "react";

const SOCIALS = [
  {
    name: "Threads",
    handle: "@avrystroeve",
    url: "https://threads.net/@avrystroeve",
  },
  {
    name: "Instagram",
    handle: "@avrystroeve",
    url: "https://instagram.com/avrystroeve",
  },
  {
    name: "X",
    handle: "@avrystroeve",
    url: "https://x.com/avrystroeve",
  },
  {
    name: "Telegram",
    handle: "@avrystroeve",
    url: "https://t.me/avrystroeve",
  },
];

const PILLARS = [
  {
    title: "God & Meditation",
    body: "The divine will is the engine behind everything. Meditation, breathwork, and surrender are the practices that give me clarity and connection. Paramahansa Yogananda and SRF are the foundation.",
  },
  {
    title: "AI & Development",
    body: "I build AI operating systems for my life and for others. Claude Code is my partner. Language is the instrument, AI is the amplifier. Together we create at a speed and quality that is unmatched.",
  },
  {
    title: "Community & Gathering",
    body: "I host events. I bring people together. I am the connector. When I walk into a room, people feel the energy. The AI Lab, weekly bonfires, run club. Sun people. Warmth people. Beach people.",
  },
  {
    title: "Sovereign Living",
    body: "Every space I inhabit sustains itself. Own food, own water, own energy. No reliance on the grid. Close to the equator, beach nearby, self-sustaining communities. That is freedom.",
  },
  {
    title: "Creation",
    body: "I do not consume more than I create. My default mode is making things. Writings, music, videos, events, systems. A blog becomes a song in seconds, becomes a video, gets shared across the ecosystem.",
  },
  {
    title: "Health & Movement",
    body: "Two marathons in one month, every year. Boxing, muay thai, yoga, dance. My body is the vessel that carries the vision. Fresh food from the garden. Clean water. Sunlight every morning.",
  },
];

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const el = ref.current;
    if (el) {
      const reveals = el.querySelectorAll(".reveal");
      reveals.forEach((r) => observer.observe(r));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function HomePage() {
  const pageRef = useRevealOnScroll();

  return (
    <div ref={pageRef}>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,47,167,0.04)_0%,transparent_70%)]" />

        <div className="relative z-10 text-center max-w-3xl">
          <p
            className="swiss text-xs tracking-[0.25em] text-gray-400 mb-8"
            style={{ animation: "fade-in 1s ease-out 0.2s both" }}
          >
            Costa Rica
          </p>
          <h1
            className="swiss text-5xl sm:text-7xl md:text-8xl font-800 leading-[0.95] mb-8"
            style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}
          >
            Avry
            <br />
            Stroeve
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-500 font-light max-w-md mx-auto leading-relaxed"
            style={{ animation: "fade-up 1s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}
          >
            Explorer. Builder. Creator.
            <br />
            God-first living, AI-amplified building.
          </p>

          {/* Scroll indicator */}
          <div
            className="mt-16"
            style={{ animation: "fade-in 1s ease-out 1.2s both" }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="reveal">
            <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl font-600 leading-snug mb-8">
              God / Infinity / Allah / Dios / Aum is #1. Everything else is expression.
            </h2>
          </div>
          <div className="reveal space-y-6 text-gray-600 text-lg leading-relaxed font-light">
            <p>
              I live in Nosara, Costa Rica. I wake up to birds and monkeys. I
              run on Playa Guiones at dawn. I build AI systems that amplify
              human intelligence. I host events that bring people together
              around consciousness, creation, and community.
            </p>
            <p>
              God is the source. Language is the instrument. AI is the
              amplifier. Everything else is expression. Health is the vessel.
              Without it, nothing moves.
            </p>
            <p>
              I am an explorer of conversation, of words, of how things work.
              I live for the exploration - not only of my own mind, but of
              other people&apos;s minds, their memories, desires, and dreams.
              Machines and computers and inventions. Economies. The world.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="flex justify-center">
        <div className="w-12 h-px bg-gray-200" />
      </div>

      {/* ── What I Share ── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">
              What I Share
            </p>
            <h2 className="text-3xl sm:text-4xl font-600 max-w-xl mx-auto leading-snug">
              The message pillars I am building my life around.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.title}
                className="reveal group p-8 border border-gray-100 rounded-2xl hover:border-klein/20 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="swiss-tight text-sm font-700 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="flex justify-center">
        <div className="w-12 h-px bg-gray-200" />
      </div>

      {/* ── Beliefs ── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="reveal">
            <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">
              I Believe
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "God First",
                text: "The divine will supersedes my preferences. I surrender the how but not the what. Ambition is the soul's calling, not ego-driven striving. Personal will aligned with divine will is unstoppable.",
              },
              {
                title: "Language Shapes Reality",
                text: "The words I use - internally and externally - literally create my experience. Definitive language creates certainty. Present tense creates presence. I speak in 'I am' and 'I will,' never 'I hope' or 'I might.'",
              },
              {
                title: "Systems That Compound Daily",
                text: "Every action creates leverage for the next action. One piece of content becomes five. One relationship becomes twenty. Small daily inputs create exponential long-term outputs.",
              },
              {
                title: "Creation Is the Output",
                text: "I do not consume more than I create. My default mode is making things. The ecosystem feeds itself: blog to song to video to share to audience to customers to community to more creation.",
              },
              {
                title: "Sovereignty",
                text: "Every property, every home, every space I inhabit is infused with the ability to sustain itself. Own food, own water, own energy. No reliance on the grid. That is freedom.",
              },
            ].map((belief, i) => (
              <div
                key={belief.title}
                className="reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="swiss-tight text-sm font-700 mb-3 text-gray-900">
                  {belief.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  {belief.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="flex justify-center">
        <div className="w-12 h-px bg-gray-200" />
      </div>

      {/* ── Connect ── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal">
            <p className="swiss text-xs tracking-[0.25em] text-klein mb-6">
              Connect
            </p>
            <h2 className="text-3xl sm:text-4xl font-600 mb-4 leading-snug">
              Follow the journey.
            </h2>
            <p className="text-gray-500 text-lg font-light mb-12">
              I share what I learn, what I build, and what I believe.
            </p>
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-4 border border-gray-200 rounded-xl hover:border-klein/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="swiss-tight text-xs font-700">
                  {s.name}
                </span>
                <span className="text-gray-400 text-sm font-light">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="swiss text-xs tracking-[0.25em] text-gray-400">
            Avry Stroeve
          </p>
          <p className="text-xs text-gray-400 font-light">
            Nosara, Costa Rica
          </p>
        </div>
      </footer>
    </div>
  );
}
