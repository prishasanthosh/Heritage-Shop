import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layers, Search } from "lucide-react";
import { api } from "../lib/api";
import type { Product } from "../lib/types";
import { useCategories } from "../hooks/useCategories";
import { ProductCard } from "../components/ProductCard";

export function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: categories } = useCategories();

  const activeCategory = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (activeCategory) params.category = activeCategory;
    if (q) params.q = q;
    api
      .get<{ products: Product[] }>("/products", { params })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [activeCategory, q]);

  const setCategory = (id: string) => {
    const next = new URLSearchParams(searchParams);
    if (id) next.set("category", id);
    else next.delete("category");
    setSearchParams(next);
  };

  const activeCategoryName = categories?.find((c) => c._id === activeCategory)?.name;

  return (
    <div>
      <section className="bg-brown text-ivory py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Shop</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold">
            {activeCategoryName ?? "The full collection"}
          </h1>
          <p className="mt-3 text-cream/80 max-w-xl">
            Artisan-made pieces and community-shared books — every purchase supports Indian
            Heritager Foundation's programmes.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-soft" />
              <input
                defaultValue={q}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const next = new URLSearchParams(searchParams);
                    const value = (e.target as HTMLInputElement).value;
                    if (value) next.set("q", value);
                    else next.delete("q");
                    setSearchParams(next);
                  }
                }}
                placeholder="Search the collection…"
                className="w-full border border-sand bg-cream/40 py-2.5 pl-10 pr-4 text-sm text-brown placeholder:text-charcoal-soft/70 outline-none focus:border-terracotta transition-colors"
              />
            </div>
            <button
              onClick={() => setCategory("")}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide border transition-colors ${
                activeCategory === "" ? "bg-terracotta text-ivory border-terracotta" : "border-sand text-charcoal-soft hover:border-terracotta"
              }`}
            >
              All
            </button>
            {categories?.map((c) => (
              <button
                key={c._id}
                onClick={() => setCategory(c._id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide border transition-colors ${
                  activeCategory === c._id ? "bg-terracotta text-ivory border-terracotta" : "border-sand text-charcoal-soft hover:border-terracotta"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-charcoal-soft">
            {!loading && `${products.length} piece${products.length === 1 ? "" : "s"}`}
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="py-20 text-center text-charcoal-soft">Loading collection…</div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center text-charcoal-soft flex flex-col items-center gap-3">
                <Layers className="h-8 w-8 text-sand" />
                No pieces found. Try a different search or category.
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
