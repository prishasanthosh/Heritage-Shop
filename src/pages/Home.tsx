import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { api } from "../lib/api";
import type { Product } from "../lib/types";
import { useCategories } from "../hooks/useCategories";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { SectionHeading } from "../components/SectionHeading";
import { ImpactCounter } from "../components/ImpactCounter";
import { VidhyadhanamBanner } from "../components/VidhyadhanamBanner";
import { Reveal } from "../components/Reveal";

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? "https://indianheritager.org";

const stats = [
  { value: 25000, suffix: "+", label: "Books shared" },
  { value: 12000, suffix: "+", label: "Students & beneficiaries reached" },
  { value: 1000, suffix: "+", label: "Trees planted" },
  { value: 6200, suffix: "+", label: "Volunteers & supporters" },
];

const stories = [
  {
    title: "Our story",
    text: "Established in 2022 in Coimbatore, Tamil Nadu — a charitable organisation connecting available resources with communities that need them most.",
    href: `${MAIN_SITE_URL}/about`,
  },
  {
    title: "Our programmes",
    text: "Education, environmental sustainability, community development, skill development and livelihood promotion, shaped around real need.",
    href: `${MAIN_SITE_URL}/projects`,
  },
  {
    title: "CSR partnerships",
    text: "We work with companies, foundations and institutions to design socially relevant programmes aligned with community priorities.",
    href: `${MAIN_SITE_URL}/blog`,
  },
];

export function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const { data: categories } = useCategories();

  useEffect(() => {
    api
      .get<{ products: Product[] }>("/products", { params: { featured: "true", limit: 4 } })
      .then(({ data }) => setFeatured(data.products));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brown text-ivory">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,154,68,0.18),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(193,99,58,0.22),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              <Sparkles className="h-3.5 w-3.5" /> The Heritage Heart marketplace
            </span>
            <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold leading-[1.08]">
              Preserving stories.
              <br />
              Celebrating heritage.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-cream/85 max-w-xl">
              Every piece here carries forward a tradition, a craft or a story — and every purchase
              funds Indian Heritager Foundation's work in education, environment and community
              development.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collection" className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-ivory hover:bg-saffron transition-colors">
                Explore the Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`${MAIN_SITE_URL}/about`} className="inline-flex items-center gap-2 border border-cream/30 px-7 py-3.5 text-sm font-semibold text-ivory hover:bg-ivory/10 transition-colors">
                Our Story
              </a>
            </div>
          </div>
        </div>
        <div className="motif-divider relative pb-8 opacity-40" aria-hidden />
      </section>

      {/* Explore Heritage / categories */}
      {categories && categories.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Explore" title="Explore our collection" description="Browse by category to find pieces rooted in craft, culture and community." />
              <Link to="/collection" className="text-xs font-semibold uppercase tracking-wide text-terracotta-dark hover:text-brown transition-colors">
                View all →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((c, i) => (
                <Reveal key={c._id} delay={i * 80}>
                  <CategoryCard to={`/collection?category=${c._id}`} name={c.name} description={c.description} image={c.image} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-20 md:py-24 bg-cream/50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Featured" title="Featured pieces" description="A closer look at pieces our team has chosen to highlight this season." />
              <Link to="/collection" className="text-xs font-semibold uppercase tracking-wide text-terracotta-dark hover:text-brown transition-colors">
                Shop all pieces →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {featured.map((p, i) => (
                <Reveal key={p._id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Heritage stories */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Heritage & Impact" title="Stories of heritage" description="A closer look at the work behind every piece — from Indian Heritager Foundation." />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <a href={s.href} className="group block border-t-2 border-terracotta pt-5">
                  <h3 className="font-display text-xl font-semibold text-brown">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal-soft">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-terracotta-dark transition-transform duration-300 group-hover:translate-x-1">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VidhyadhanamBanner />

      {/* Impact stats */}
      <section className="bg-brown py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <ImpactCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-terracotta-soft">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-brown">
            Support the work behind every piece.
          </h2>
          <p className="mt-4 text-charcoal-soft leading-relaxed">
            Beyond the marketplace, Indian Heritager Foundation runs programmes in education,
            environment and community development across India.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`${MAIN_SITE_URL}/give`} className="bg-terracotta px-7 py-3.5 text-sm font-semibold text-ivory hover:bg-terracotta-dark transition-colors">
              Donate
            </a>
            <a href={`${MAIN_SITE_URL}/volunteer`} className="border border-terracotta-dark/40 px-7 py-3.5 text-sm font-semibold text-terracotta-dark hover:bg-ivory transition-colors">
              Volunteer
            </a>
            <Link to="/register" className="border border-terracotta-dark/40 px-7 py-3.5 text-sm font-semibold text-terracotta-dark hover:bg-ivory transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
