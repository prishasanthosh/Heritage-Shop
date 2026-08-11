import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import type { Order } from "../lib/types";

const statusColor: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine").then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-24 text-center text-charcoal-soft/70">Loading orders…</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brown mb-6">My orders</h1>
      {orders.length === 0 ? (
        <p className="text-charcoal-soft">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block rounded-none border border-sand bg-ivory p-4 hover:border-terracotta"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-brown">Order #{order._id.slice(-8).toUpperCase()}</div>
                  <div className="text-xs text-charcoal-soft mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" · "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-brown">₹{order.total.toLocaleString("en-IN")}</div>
                  <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
