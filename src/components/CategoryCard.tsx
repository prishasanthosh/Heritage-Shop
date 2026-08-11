import { Link } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";

export function CategoryCard({
  to,
  name,
  description,
  image,
}: {
  to: string;
  name: string;
  description?: string;
  image?: string;
}) {
  return (
    <Link to={to} className="group relative block aspect-4/5 overflow-hidden bg-brown">
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brown to-terracotta-dark">
          <Layers className="h-10 w-10 text-cream/30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl font-semibold text-ivory">{name}</h3>
        {description && <p className="mt-1 text-sm text-cream/75 line-clamp-2">{description}</p>}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-saffron transition-transform duration-300 group-hover:translate-x-1">
          Explore <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
