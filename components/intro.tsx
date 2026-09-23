"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities, liveSites, marqueeWords, profile } from "@/data/portfolio";
import { setNavTheme, watchNavTheme } from "@/lib/nav-theme";

gsap.registerPlugin(ScrollTrigger);

const HeroField = dynamic(() => import("@/components/hero-field"), { ssr: false });

const CARD_COUNT = capabilities.length + 1;
const STEP = 360 / CARD_COUNT;
const SLOT_SCALE = 0.9;
const CYCLE_MS = 2800;

const dots = [
  "linear-gradient(135deg,#f0abfc,#7c3aed)",
  "linear-gradient(135deg,#93c5fd,#1d4ed8)",
  "linear-gradient(135deg,#6ee7b7,#047857)",
  "linear-gradient(135deg,#fcd34d,#b45309)",
  "linear-gradient(135deg,#f9a8d4,#be185d)",
];

function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function Intro() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(section);
      const stage = q(".intro-stage")[0] as HTMLElement;
      const slot = q(".hero-slot")[0] as HTMLElement;
      const layer = q(".ring-layer")[0] as HTMLElement;
      const mover = q(".ring-mover")[0] as HTMLElement;
      const ring = q(".ring")[0] as HTMLElement;
      const heroPanel = q(".hero-panel")[0] as HTMLElement;
      const counter = q(".ring-counter")[0] as HTMLElement;
      const cards = q(".ring-card") as HTMLElement[];
      const reveal = { v: 0 };
      const pinned: { trigger?: ScrollTrigger } = {};
      let narrow = false;

      const place = () => {
        narrow = window.innerWidth < 768;
        const width = parseFloat(getComputedStyle(stage).getPropertyValue("--card-w")) || 300;
        const radius = width * (narrow ? 1.4 : 1.6);
        cards.forEach((card, i) => {
          card.style.transform = `rotateY(${i * STEP}deg) translateZ(${radius}px)`;
        });
        gsap.set(ring, { z: -radius });
      };

      const slotPoint = () => {
        const { x, y } = offsetWithin(slot, stage);
        return {
          x: x + slot.offsetWidth / 2 - stage.clientWidth / 2,
          y: y + slot.offsetHeight / 2 - stage.clientHeight / 2,
        };
      };

      const paint = () => {
        const rotation = Number(gsap.getProperty(ring, "rotationY")) || 0;
        let front = 0;
        let nearest = 360;
        cards.forEach((card, i) => {
          let angle = (i * STEP + rotation) % 360;
          if (angle > 180) angle -= 360;
          if (angle < -180) angle += 360;
          const away = Math.abs(angle);
          const facing = narrow
            ? gsap.utils.clamp(0, 1, 1 - (away - 10) / 18)
            : gsap.utils.clamp(0, 1, 1 - (away - 50) / 36);
          const opacity = i === 0 ? facing : facing * reveal.v;
          card.style.opacity = opacity.toFixed(3);
          card.style.pointerEvents = opacity > 0.9 && away < 20 ? "auto" : "none";
          if (away < nearest) {
            nearest = away;
            front = i;
          }
        });
        counter.textContent = `${String(front + 1).padStart(2, "0")} / ${String(CARD_COUNT).padStart(2, "0")}`;
        if ((pinned.trigger?.progress ?? 0) < 1) {
          const heroY = Number(gsap.getProperty(heroPanel, "yPercent")) || 0;
          setNavTheme(heroY < -93 ? "light" : "dark");
        }
      };

      place();
      ScrollTrigger.addEventListener("refreshInit", place);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: paint,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onLeave: () => setNavTheme("light"),
        },
      });

      tl.fromTo(q(".hero-copy"), { autoAlpha: 1, y: 0, scale: 1 }, { autoAlpha: 0, y: -70, scale: 0.95, duration: 0.55 }, 0)
        .fromTo(heroPanel, { yPercent: 0 }, { yPercent: -104, duration: 1 }, 0.2)
        .fromTo(q(".carousel-panel"), { yPercent: 104 }, { yPercent: 0, duration: 1 }, 0.2)
        .fromTo(
          mover,
          { x: () => slotPoint().x, y: () => slotPoint().y, scale: SLOT_SCALE },
          { x: 0, y: 0, scale: 1, duration: 1.2, ease: "power2.inOut" },
          0,
        )
        .fromTo(q(".carousel-copy"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.1)
        .fromTo(reveal, { v: 0 }, { v: 1, duration: 0.45 }, 1.1)
        .fromTo(q(".marquee-track"), { xPercent: 0 }, { xPercent: -50, duration: 3.8 }, 0.9)
        .fromTo(ring, { rotationY: 0 }, { rotationY: -360, duration: 3.2, ease: "power1.inOut" }, 1.4)
        .to({}, { duration: 0.3 });

      pinned.trigger = tl.scrollTrigger;
      paint();
      gsap.fromTo(layer, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.45, ease: "power3.out" });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", place);
        setNavTheme("dark");
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const hero = section.querySelector(".hero-panel");
      const carousel = section.querySelector(".carousel-panel");
      if (hero) watchNavTheme(hero, "dark");
      if (carousel) watchNavTheme(carousel, "light");
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="top" ref={root} aria-label="Introduction" className="relative">
      <div className="intro-stage relative h-svh overflow-hidden bg-paper">
        <div className="carousel-panel absolute inset-0 z-0 overflow-hidden bg-paper text-ink">
          <div
            aria-hidden
            className="marquee-track rm-hide absolute top-1/2 left-0 flex -translate-y-1/2 whitespace-nowrap text-[26vw] leading-none font-semibold tracking-[-0.06em] md:text-[13vw]"
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0">
                {marqueeWords.map((word) => (
                  <span key={`${copy}-${word}`} className="flex items-center">
                    <span className="px-[0.2em]">{word}</span>
                    <i className="mx-[0.12em] h-[0.12em] w-[0.12em] rounded-full bg-[#7c3aed]/35" />
                  </span>
                ))}
              </span>
            ))}
          </div>
          <p className="carousel-copy eyebrow absolute top-24 left-6 text-ink/55 md:left-12">What I build</p>
          <p className="carousel-copy ring-counter eyebrow rm-hide absolute bottom-11 left-6 text-ink/55 md:left-12">
            01 / {String(CARD_COUNT).padStart(2, "0")}
          </p>
          <a
            href="#work"
            className="carousel-copy rm-hide absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a1458]"
          >
            See the work
          </a>
          <div className="rm-show rm-grid gap-4 px-6 pt-36 pb-16 sm:grid-cols-2 md:px-12 lg:grid-cols-4">
            {capabilities.map((item) => (
              <div key={item.label} className="h-[300px]">
                <CapabilityCard item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel violet-panel absolute inset-0 z-10 overflow-hidden text-white [clip-path:inset(10px_round_28px)]">
          <div className="rm-hide absolute inset-0">
            <HeroField />
          </div>
          <div className="relative mx-auto grid h-full max-w-[1280px] content-center gap-10 px-6 pt-20 pb-10 md:grid-cols-[1fr_auto] md:items-center md:px-12">
            <div className="hero-copy">
              <p
                className="hero-line glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/85"
                style={{ "--i": 0 } as CSSProperties}
              >
                <span aria-hidden>✦</span> {profile.level}
              </p>
              <h1
                className="hero-line mt-6 text-[clamp(2.6rem,5.4vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
                style={{ "--i": 1 } as CSSProperties}
              >
                <span className="block">Shaqlin Mondal</span>
                <span className="block text-white/45">Full stack developer</span>
              </h1>
              <p
                className="hero-line mt-6 max-w-md text-[15px] leading-relaxed text-white/75 md:text-base"
                style={{ "--i": 2 } as CSSProperties}
              >
                Laravel and PHP applications, the MySQL behind them, and the Tailwind interfaces people actually
                use.
              </p>
              <div className="hero-line mt-8 flex flex-wrap gap-3" style={{ "--i": 3 } as CSSProperties}>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-full px-5 py-3 text-sm font-medium transition hover:bg-white/20"
                >
                  Download CV
                </a>
                <a
                  href="#work"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#1a0b3b] transition hover:bg-lilac"
                >
                  See the work <span aria-hidden>→</span>
                </a>
              </div>
              <p
                className="hero-line glass mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-xs text-white/80 [@media(max-height:720px)]:hidden"
                style={{ "--i": 4 } as CSSProperties}
              >
                <span aria-hidden className="flex -space-x-2">
                  {dots.map((background) => (
                    <span key={background} className="h-6 w-6 rounded-full ring-2 ring-[#3b1580]" style={{ background }} />
                  ))}
                </span>
                12 sites live in production
              </p>
            </div>
            <div className="hero-aside flex flex-col items-end gap-5 max-md:absolute max-md:inset-x-0 max-md:bottom-[calc(var(--card-h)*-1.1)] max-md:items-center">
              <div className="hero-slot relative h-[calc(var(--card-h)*0.9)] w-[calc(var(--card-w)*0.9)]">
                <div className="rm-show h-full">
                  <LiveCard cycle={false} />
                </div>
              </div>
              <p className="hero-copy max-w-[16rem] text-right text-sm leading-relaxed text-white/60 max-md:hidden">
                Currently PHP Developer at Dotcom Solutions in Kolkata.
              </p>
            </div>
          </div>
        </div>

        <div className="ring-layer rm-hide pointer-events-none absolute inset-0 z-20 [perspective:900px] md:[perspective:1200px]">
          <div className="ring-mover absolute top-1/2 left-1/2 [transform-style:preserve-3d]">
            <div className="ring [transform-style:preserve-3d]">
              <div className="ring-card">
                <LiveCard cycle />
              </div>
              {capabilities.map((item) => (
                <div key={item.label} className="ring-card">
                  <CapabilityCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveCard({ cycle }: { cycle: boolean }) {
  const [index, setIndex] = useState(0);
  const site = liveSites[index];

  useEffect(() => {
    if (!cycle || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % liveSites.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [cycle]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-white/15 bg-[linear-gradient(165deg,#3b1580_0%,#1f0b4a_55%,#12072c_100%)] p-4 text-white shadow-[0_30px_80px_-20px_rgba(20,0,60,0.6)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,232,255,0.9),rgba(167,139,250,0.35)_42%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.55),transparent_65%)]"
      />
      <div className="relative flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px]">
          <span aria-hidden>✦</span> In production
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/80">
          <i className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
          LIVE
        </span>
      </div>
      <div className="relative mt-auto">
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${site.name} at ${site.domain}`}
          className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/40 py-2 pr-2 pl-3.5 transition hover:border-white/30"
        >
          <span className="flex min-w-0 items-center font-mono text-[13px]">
            <span key={index} className="typed" style={{ "--n": site.domain.length } as CSSProperties}>
              {site.domain}
            </span>
            <span aria-hidden className="caret ml-px text-lilac">
              ▍
            </span>
          </span>
          <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm text-[#1a0b3b]">
            ↗
          </span>
        </a>
        <div aria-hidden className="mt-3 flex gap-1.5">
          {liveSites.map((item, i) => (
            <span key={item.domain} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
              <i
                className="block h-full origin-left rounded-full bg-white"
                style={
                  cycle && i === index
                    ? { animation: `segment-fill ${CYCLE_MS}ms linear forwards` }
                    : { transform: `scaleX(${i < index || (!cycle && i === 0) ? 1 : 0})` }
                }
              />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[15px] font-semibold">12 sites in production</p>
        <p className="mt-1 text-xs text-white/60">
          {site.name} · {site.stack}
        </p>
      </div>
    </div>
  );
}

function CapabilityCard({ item }: { item: (typeof capabilities)[number] }) {
  const light = item.tone === "light";
  return (
    <article
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[22px] p-4 shadow-[0_30px_70px_-25px_rgba(10,10,20,0.55)] ${
        light ? "text-ink" : "text-white"
      }`}
      style={{ background: item.art }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[11px] ${light ? "bg-black/10" : "bg-white/12"}`}>{item.label}</span>
        <span className={`truncate text-[11px] ${light ? "text-ink/55" : "text-white/55"}`}>{item.meta}</span>
      </div>
      <div className="mt-auto">
        <h3 className="text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] md:text-[26px]">{item.title}</h3>
        <p className={`mt-2 text-[13px] leading-relaxed ${light ? "text-ink/65" : "text-white/65"}`}>{item.body}</p>
      </div>
    </article>
  );
}
