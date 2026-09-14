import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { api, getErrorMessage } from "../lib/api";
import logo from "../assets/logo.png";

// lucide-react's brand/social icons were removed in this major version, so
// these are drawn as minimal inline glyphs instead of pulling in a new dependency.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.59-1.56h1.7V3.14C15.98 3.1 15 3 13.85 3 11.44 3 9.8 4.46 9.8 7.28v2.32H7v3.2h2.8V21h3.7Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12s0-3.4-.43-5a2.9 2.9 0 0 0-2-2.05C17.9 4.5 12 4.5 12 4.5s-5.9 0-7.57.45A2.9 2.9 0 0 0 2.43 7C2 8.6 2 12 2 12s0 3.4.43 5a2.9 2.9 0 0 0 2 2.05C6.1 19.5 12 19.5 12 19.5s5.9 0 7.57-.45a2.9 2.9 0 0 0 2-2.05c.43-1.6.43-5 .43-5Zm-11.9 3.1V8.9l5.2 3.1-5.2 3.1Z" />
    </svg>
  );
}

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? "https://indianheritager.org";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    try {
      await api.post("/newsletter", { email });
      setEmail("");
      toast.success("You're subscribed", { description: "Thanks for joining our monthly field letter." });
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not subscribe. Please try again."));
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-brown text-cream/80">
      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Indian Heritager Foundation" className="h-11 w-11 rounded-full" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-ivory">Indian Heritager</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-cream/60">Shop</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed max-w-sm">
            A marketplace of artisan goods and community-shared books — every purchase carries forward
            the work of Indian Heritager Foundation.
          </p>
          <div className="mt-6 space-y-2.5 text-sm">
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-saffron shrink-0" /> Coimbatore, Tamil Nadu, India</div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-saffron shrink-0" /> +91 79041 40033</div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-saffron shrink-0" /> info@indianheritager.org</div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {[FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="grid place-items-center h-9 w-9 border border-cream/15 hover:bg-terracotta hover:border-terracotta transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-semibold text-ivory mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/collection" className="hover:text-ivory transition-colors">All products</Link></li>
            <li><Link to="/orders" className="hover:text-ivory transition-colors">My orders</Link></li>
            <li><Link to="/account" className="hover:text-ivory transition-colors">My account</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display text-sm font-semibold text-ivory mb-4">Heritage Heart</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href={MAIN_SITE_URL} className="hover:text-ivory transition-colors">Main site</a></li>
            <li><a href={`${MAIN_SITE_URL}/projects`} className="hover:text-ivory transition-colors">Our Programmes</a></li>
            <li><a href={`${MAIN_SITE_URL}/project-vidhyadhanam`} className="hover:text-ivory transition-colors">Project Vidhyadhanam</a></li>
            <li><a href={`${MAIN_SITE_URL}/give`} className="hover:text-ivory transition-colors">Donate</a></li>
            <li><a href={`${MAIN_SITE_URL}/contact`} className="hover:text-ivory transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display text-sm font-semibold text-ivory mb-4">Stories in your inbox</h4>
          <p className="text-sm">A monthly letter from the field — no noise, just impact.</p>
          <form onSubmit={subscribe} className="mt-4 flex items-center gap-2 border border-cream/20 p-1.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email"
              className="flex-1 bg-transparent px-2 text-sm text-ivory placeholder:text-cream/40 outline-none"
            />
            <button type="submit" disabled={subscribing} className="flex items-center gap-1 bg-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ivory hover:bg-saffron transition-colors">
              {subscribing ? "…" : "Subscribe"} <ArrowRight className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Indian Heritager Foundation. All rights reserved.</p>
          <p>Proceeds support education, environment and community programmes across India.</p>
        </div>
      </div>
    </footer>
  );
}
