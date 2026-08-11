import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/api";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, phone || undefined);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not create account"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-brown text-center">Create your account</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium text-charcoal">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-none border border-sand px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-terracotta"
          />
        </div>
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
          <label className="text-sm font-medium text-charcoal">Phone (optional)</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-none border border-sand px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-terracotta"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-none border border-sand px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-terracotta"
          />
          <p className="mt-1 text-xs text-charcoal-soft/70">At least 8 characters.</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta px-6 py-2.5 text-sm font-semibold text-ink hover:bg-terracotta-dark disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-charcoal-soft">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
