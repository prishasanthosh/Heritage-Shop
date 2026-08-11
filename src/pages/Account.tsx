import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export function Account() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-brown mb-6">My account</h1>
      <div className="rounded-none border border-sand bg-ivory p-5 space-y-2">
        <div className="text-sm text-charcoal-soft">Name</div>
        <div className="font-medium text-brown">{user.name}</div>
        <div className="text-sm text-charcoal-soft pt-2">Email</div>
        <div className="font-medium text-brown">{user.email}</div>
        {user.phone && (
          <>
            <div className="text-sm text-charcoal-soft pt-2">Phone</div>
            <div className="font-medium text-brown">{user.phone}</div>
          </>
        )}
      </div>
      <Link to="/orders" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
        View my orders →
      </Link>
    </div>
  );
}
