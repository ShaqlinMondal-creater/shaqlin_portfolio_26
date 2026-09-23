import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Intro } from "@/components/intro";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Stack } from "@/components/stack";
import { Statement } from "@/components/statement";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Intro />
        <Statement />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="bg-ink px-6 py-10 text-sm text-white/50 md:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Shaqlin Mondal</p>
          <p className="font-mono text-xs tracking-[0.18em] uppercase">Laravel · PHP · Kolkata</p>
          <a href="#top" className="transition hover:text-white">
            Back to top <span aria-hidden>↑</span>
          </a>
        </div>
      </footer>
    </>
  );
}
