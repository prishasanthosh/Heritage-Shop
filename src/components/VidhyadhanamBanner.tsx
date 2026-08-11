import { BookHeart, BookOpen, HandHeart } from "lucide-react";

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? "http://localhost:8080";

export function VidhyadhanamBanner() {
  return (
    <section className="bg-brown text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
            <BookHeart className="h-4 w-4" /> A Heritage Heart programme
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold leading-tight">Project Vidhyadhanam</h2>
          <p className="mt-4 text-cream/85 leading-relaxed max-w-xl">
            Usable books find a second life here — collected from homes, schools and publishers, then
            shared freely with students, libraries and community learning spaces who need them. Every
            book on this shelf carries someone's story forward.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${MAIN_SITE_URL}/project-vidhyadhanam/donate-books`}
              className="inline-flex items-center gap-2 rounded-none bg-terracotta px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-saffron"
            >
              <HandHeart className="h-4 w-4" /> Donate Books
            </a>
            <a
              href={`${MAIN_SITE_URL}/project-vidhyadhanam/request-books`}
              className="inline-flex items-center gap-2 border border-cream/30 px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-ivory/10"
            >
              <BookOpen className="h-4 w-4" /> Request Books
            </a>
          </div>
        </div>

        <a
          href={`${MAIN_SITE_URL}/project-vidhyadhanam`}
          className="group block aspect-4/3 overflow-hidden border border-cream/15"
        >
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta-dark to-brown transition-transform duration-700 group-hover:scale-105">
            <BookHeart className="h-16 w-16 text-cream/25" />
          </div>
        </a>
      </div>
    </section>
  );
}
