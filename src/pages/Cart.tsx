import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ImageOff } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function CartPage() {
  const { cart, subtotal, updateItem, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-semibold text-brown">Sign in to view your cart</h1>
        <Link to="/login" className="mt-4 inline-block bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark">
          Sign in
        </Link>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-semibold text-brown">Your cart is empty</h1>
        <Link to="/" className="mt-4 inline-block bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brown mb-6">Your cart</h1>

      <div className="divide-y divide-sand border-y border-sand">
        {cart.items.map(({ product, quantity }) => (
          <div key={product._id} className="flex items-center gap-4 py-4">
            <div className="h-20 w-20 rounded-none bg-cream overflow-hidden flex-shrink-0">
              {product.images[0] ? (
                <img src={product.images[0].url} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-sand">
                  <ImageOff className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/products/${product.slug}`} className="font-medium text-brown hover:text-accent line-clamp-1">
                {product.name}
              </Link>
              <div className="text-sm text-charcoal-soft mt-0.5">
                {product.price === 0 ? "Free (Vidhyadhanam)" : `₹${product.price.toLocaleString("en-IN")} each`}
              </div>
            </div>
            <div className="flex items-center border border-sand rounded-full">
              <button
                onClick={() => updateItem(product._id, Math.max(1, quantity - 1))}
                className="grid h-8 w-8 place-items-center text-charcoal-soft hover:text-accent"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => updateItem(product._id, Math.min(product.stock, quantity + 1))}
                className="grid h-8 w-8 place-items-center text-charcoal-soft hover:text-accent"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="w-20 text-right font-semibold text-brown">
              {product.price === 0 ? "Free" : `₹${(product.price * quantity).toLocaleString("en-IN")}`}
            </div>
            <button
              onClick={() => removeItem(product._id)}
              aria-label="Remove item"
              className="grid h-8 w-8 place-items-center text-charcoal-soft/70 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-sm text-charcoal-soft">
            <span>Subtotal</span>
            <span className="font-medium text-brown">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-xs text-charcoal-soft/70">Shipping and totals calculated at checkout.</p>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
