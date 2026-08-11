import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/api";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = (location.state as { from?: string })?.from ?? "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(getErrorMessage(err, "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-brown text-center">Welcome back</h1>
      <p className="text-sm text-charcoal-soft text-center mt-1">Sign in to continue to the shop</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-charcoal">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-none border border-sand px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-terracotta"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-none border border-sand px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-terracotta"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-soft">
        New here?{" "}
        <Link to="/register" className="font-medium text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
