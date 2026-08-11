import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";
import type { Order } from "../lib/types";

export function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const justPlaced = Boolean((location.state as { justPlaced?: boolean } | null)?.justPlaced);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/orders/mine/${id}`).then(({ data }) => setOrder(data.order)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-24 text-center text-charcoal-soft/70">Loading…</div>;
  if (!order) return <div className="py-24 text-center text-charcoal-soft/70">Order not found.</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {justPlaced && (
        <div className="mb-6 flex items-center gap-3 rounded-none bg-green-50 border border-green-200 px-4 py-3 text-green-800">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            Order placed successfully! {order.paymentMethod === "cod" ? "Pay on delivery." : "We'll confirm your payment shortly."}
          </span>
        </div>
      )}

      <h1 className="text-xl font-bold text-brown">Order #{order._id.slice(-8).toUpperCase()}</h1>
      <p className="text-sm text-charcoal-soft mt-1 capitalize">
        Status: <span className="font-medium">{order.status}</span> · Payment: <span className="font-medium">{order.paymentStatus}</span>
      </p>

      <div className="mt-6 divide-y divide-sand border-y border-sand">
        {order.items.map((item) => (
          <div key={item.product} className="flex justify-between py-3 text-sm">
            <span className="text-charcoal">{item.name} × {item.quantity}</span>
            <span className="font-medium text-brown">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <div className="flex justify-between text-charcoal-soft">
          <span>Subtotal</span>
          <span>₹{order.itemsTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-charcoal-soft">
          <span>Shipping</span>
          <span>{order.shippingFee === 0 ? "Free" : `₹${order.shippingFee}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-brown">
          <span>Total</span>
          <span>₹{order.total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="mt-6 rounded-none border border-sand bg-ivory p-4">
        <h2 className="text-sm font-semibold text-brown mb-2">Shipping to</h2>
        <p className="text-sm text-charcoal-soft">
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
          {order.shippingAddress.country} · {order.shippingAddress.phone}
        </p>
      </div>
    </div>
  );
}
