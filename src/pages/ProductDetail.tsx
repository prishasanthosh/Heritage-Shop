import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookHeart, ImageOff, Minus, Plus } from "lucide-react";
import { api } from "../lib/api";
import type { Product } from "../lib/types";
import { useCart } from "../context/CartContext";

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .get(`/products/${slug}`)
      .then(({ data }) => setProduct(data.product))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="py-24 text-center text-charcoal-soft/70">Loading…</div>;
  if (!product) return <div className="py-24 text-center text-charcoal-soft/70">Product not found.</div>;

  const image = product.images[activeImage]?.url;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/" className="text-sm text-charcoal-soft hover:text-accent">← Back to shop</Link>

      <div className="mt-4 grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-none bg-cream overflow-hidden">
            {image ? (
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-sand">
                <ImageOff className="h-14 w-14" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img.url}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 rounded-none overflow-hidden border-2 ${
                    i === activeImage ? "border-brand-600" : "border-transparent"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-brown">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-accent">
              {product.price === 0 ? "Free" : `₹${product.price.toLocaleString("en-IN")}`}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-charcoal-soft/70 line-through">₹{product.compareAtPrice.toLocaleString("en-IN")}</span>
            )}
          </div>

          {product.price === 0 && (
            <div className="mt-4 flex items-start gap-2.5 rounded-none bg-brand-50 border border-brand-100 px-4 py-3 text-sm text-accent">
              <BookHeart className="h-4 w-4 shrink-0 mt-0.5" />
              <span>This book is provided free of cost through Project Vidhyadhanam. Only delivery charges apply.</span>
            </div>
          )}

          <p className="mt-5 text-charcoal-soft leading-relaxed whitespace-pre-line">{product.description}</p>

          <div className="mt-6 text-sm text-charcoal-soft">
            {product.stock > 0 ? `${product.stock} in stock` : "Currently out of stock"}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center border border-sand rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center text-charcoal-soft hover:text-accent"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="grid h-10 w-10 place-items-center text-charcoal-soft hover:text-accent"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              disabled={product.stock <= 0 || adding}
              onClick={async () => {
                setAdding(true);
                try {
                  await addItem(product._id, quantity);
                } catch {
                  // toast already shown in context
                } finally {
                  setAdding(false);
                }
              }}
              className="flex-1 bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark disabled:opacity-50"
            >
              {product.stock <= 0 ? "Out of stock" : adding ? "Adding…" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
