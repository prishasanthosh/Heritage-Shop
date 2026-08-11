import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronDown, ExternalLink, LogOut, Menu, Search, ShoppingCart, User as UserIcon, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCategories } from "../hooks/useCategories";
import logo from "../assets/logo.png";

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL ?? "http://localhost:8080";

export function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { data: categories } = useCategories();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(q ? `/collection?q=${encodeURIComponent(q)}` : "/collection");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden md:block bg-brown text-cream/80 text-xs">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-9">
          <p className="tracking-wide">Every purchase supports Indian Heritager Foundation's community programmes.</p>
          <a href={MAIN_SITE_URL} className="flex items-center gap-1 hover:text-ivory transition-colors">
            Main site <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className={`bg-ivory transition-shadow ${scrolled ? "shadow-[0_2px_20px_-8px_rgba(58,38,24,0.25)]" : ""} border-b border-sand`}>
        <div className="mx-auto max-w-7xl px-4 flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Indian Heritager Foundation" className="h-11 w-11 rounded-full" />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-brown">Indian Heritager</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta-dark">Heritage Shop</span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the collection…"
              className="w-full border border-sand bg-cream/40 py-2.5 pl-10 pr-4 text-sm text-brown placeholder:text-charcoal-soft/70 outline-none focus:border-terracotta transition-colors"
            />
          </form>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-charcoal">
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <Link to="/collection" className="flex items-center gap-1 px-3 py-2 hover:text-terracotta-dark transition-colors">
                Shop <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {categoriesOpen && categories && categories.length > 0 && (
                <div className="absolute left-0 top-full w-64 border border-sand bg-ivory shadow-[0_16px_40px_-12px_rgba(58,38,24,0.25)]">
                  <ul className="py-2">
                    {categories.map((c) => (
                      <li key={c._id}>
                        <Link
                          to={`/collection?category=${c._id}`}
                          className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-terracotta-dark transition-colors"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {user && (
              <Link to="/orders" className="px-3 py-2 hover:text-terracotta-dark transition-colors">
                My Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-1">
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center text-brown hover:bg-cream transition-colors" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-ivory">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/account" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-brown hover:bg-cream transition-colors">
                  <UserIcon className="h-4 w-4" /> {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  aria-label="Log out"
                  className="grid h-10 w-10 place-items-center text-charcoal-soft hover:bg-cream transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:inline-flex bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-terracotta-dark transition-colors">
                Sign in
              </Link>
            )}

            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden grid h-10 w-10 place-items-center text-brown hover:bg-cream transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-b border-sand bg-ivory">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-soft" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the collection…"
                className="w-full border border-sand bg-cream/40 py-2.5 pl-10 pr-4 text-sm text-brown outline-none focus:border-terracotta"
              />
            </form>

            <div className="flex flex-col">
              <Link
                to="/collection"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-charcoal border-b border-sand/70"
              >
                Shop all
              </Link>
              {categories?.map((c) => (
                <Link
                  key={c._id}
                  to={`/collection?category=${c._id}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-sm font-medium text-charcoal border-b border-sand/70"
                >
                  {c.name}
                </Link>
              ))}
              {user && (
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-charcoal border-b border-sand/70">
                  My Orders
                </Link>
              )}
              <a href={MAIN_SITE_URL} className="py-2.5 text-sm font-medium text-charcoal flex items-center gap-1.5">
                Main site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {user ? (
              <div className="flex gap-2 pt-1">
                <Link to="/account" onClick={() => setMobileOpen(false)} className="flex-1 text-center border border-sand py-2.5 text-sm font-medium text-brown">
                  My account
                </Link>
                <button
                  onClick={async () => {
                    await logout();
                    setMobileOpen(false);
                    navigate("/");
                  }}
                  className="flex-1 border border-sand py-2.5 text-sm font-medium text-charcoal-soft"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center bg-terracotta py-2.5 text-sm font-semibold text-ivory">
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
