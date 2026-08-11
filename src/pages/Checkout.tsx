import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api, getErrorMessage } from "../lib/api";
import type { ShippingAddress } from "../lib/types";

const emptyAddress: ShippingAddress = {
  fullName: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  phone: "",
};

export function Checkout() {
  const { cart, subtotal, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState<ShippingAddress>({ ...emptyAddress, fullName: user?.name ?? "" });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "zoho">("cod");
  const [placing, setPlacing] = useState(false);

  const shippingFee = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shippingFee;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center text-charcoal-soft">
        Your cart is empty. <button onClick={() => navigate("/")} className="text-accent underline">Go shopping</button>
      </div>
    );
  }

  const field = (key: keyof ShippingAddress) => ({
    value: address[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAddress((a) => ({ ...a, [key]: e.target.value })),
  });

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const { data } = await api.post("/orders/checkout", { shippingAddress: address, paymentMethod });
      await refreshCart();

      if (paymentMethod === "zoho" && data.zohoPaymentSessionId) {
        // In production, mount Zoho's hosted checkout widget here using
        // data.zohoPaymentSessionId, then call /orders/:id/confirm-zoho-payment
        // once Zoho reports success. Falling back to the order page for now.
        toast.message("Redirecting to Zoho Payments…");
      }

      navigate(`/orders/${data.order._id}`, { state: { justPlaced: true } });
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not place your order"));
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 grid md:grid-cols-[1fr_320px] gap-10">
      <form onSubmit={placeOrder} className="space-y-6">
        <h1 className="text-2xl font-bold text-brown">Checkout</h1>

        <div>
          <h2 className="font-semibold text-brown mb-3">Shipping address</h2>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Full name" {...field("fullName")} className="col-span-2 rounded-none border border-sand px-3 py-2 text-sm" />
            <input required placeholder="Address line 1" {...field("line1")} className="col-span-2 rounded-none border border-sand px-3 py-2 text-sm" />
            <input placeholder="Address line 2 (optional)" {...field("line2")} className="col-span-2 rounded-none border border-sand px-3 py-2 text-sm" />
            <input required placeholder="City" {...field("city")} className="rounded-none border border-sand px-3 py-2 text-sm" />
            <input required placeholder="State" {...field("state")} className="rounded-none border border-sand px-3 py-2 text-sm" />
            <input required placeholder="Postal code" {...field("postalCode")} className="rounded-none border border-sand px-3 py-2 text-sm" />
            <input required placeholder="Phone" {...field("phone")} className="rounded-none border border-sand px-3 py-2 text-sm" />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-brown mb-3">Payment method</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-3 rounded-none border border-sand px-4 py-3 cursor-pointer has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="radio" name="pm" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              <span className="text-sm font-medium">Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3 rounded-none border border-sand px-4 py-3 cursor-pointer has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50">
              <input type="radio" name="pm" checked={paymentMethod === "zoho"} onChange={() => setPaymentMethod("zoho")} />
              <span className="text-sm font-medium">Pay online (Zoho Payments)</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={placing}
          className="w-full bg-terracotta px-6 py-3 text-sm font-semibold text-ink hover:bg-terracotta-dark disabled:opacity-50"
        >
          {placing ? "Placing order…" : `Place order · ₹${total.toLocaleString("en-IN")}`}
        </button>
      </form>

      <aside className="rounded-none border border-sand bg-ivory p-5 h-fit space-y-3">
        <h2 className="font-semibold text-brown">Order summary</h2>
        {cart.items.map(({ product, quantity }) => (
          <div key={product._id} className="flex justify-between text-sm text-charcoal-soft">
            <span className="line-clamp-1">{product.name} × {quantity}</span>
            <span>{product.price === 0 ? "Free" : `₹${(product.price * quantity).toLocaleString("en-IN")}`}</span>
          </div>
        ))}
        <div className="border-t border-sand pt-3 space-y-1">
          <div className="flex justify-between text-sm text-charcoal-soft">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-charcoal-soft">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-brown pt-1">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
