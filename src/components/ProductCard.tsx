import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Product } from "../lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]?.url;
  const outOfStock = product.stock <= 0;
  const categoryName = typeof product.category === "object" ? product.category?.name : undefined;

  return (
    <Link to={`/products/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-4/5 overflow-hidden bg-cream">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-sand">
            <ImageOff className="h-10 w-10" />
          </div>
        )}

        {outOfStock && (
          <span className="absolute top-3 left-3 bg-brown/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ivory">
            Out of stock
          </span>
        )}
        {product.price === 0 && !outOfStock && (
          <span className="absolute top-3 left-3 bg-green px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ivory">
            Free · Vidhyadhanam
          </span>
        )}

        <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center bg-ivory/90 text-brown opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="pt-4">
        {categoryName && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-dark/80">{categoryName}</span>
        )}
        <h3 className="mt-1 font-display text-base font-medium text-brown leading-snug line-clamp-2">{product.name}</h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-charcoal">
            {product.price === 0 ? "Free" : `₹${product.price.toLocaleString("en-IN")}`}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-charcoal-soft line-through">
              ₹{product.compareAtPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
