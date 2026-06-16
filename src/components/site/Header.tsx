import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/countries", label: "Countries" },
  { to: "/about", label: "About" },
  { to: "/passport", label: "Passport" },
  { to: "/visa", label: "Visa" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-slate-950/85 backdrop-blur-md"
      }`}
    >
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Vicky Ryoko Tours and Party's"
            className={`h-9 w-9 rounded-full transition-colors object-cover ${scrolled ? "bg-primary" : "bg-white/15"}`}
          />
          <span
            className={`flex flex-col leading-tight ${scrolled ? "text-foreground" : "text-white"}`}
          >
            <span className="font-display text-lg font-bold">Vicky Ryoko Tours and Party's</span>
            <span
              className={`text-[10px] uppercase tracking-[0.2em] ${scrolled ? "text-muted-foreground" : "text-white/70"}`}
            >
              Tours & Parties
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                scrolled ? "text-foreground hover:bg-secondary" : "text-white/90 hover:bg-white/10"
              }`}
              activeProps={{
                className: scrolled
                  ? "px-4 py-2 rounded-full text-sm font-semibold bg-secondary text-foreground"
                  : "px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className={`h-5 w-5 ${scrolled ? "text-foreground" : "text-white"}`} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Link to="/contact" className="btn-primary !py-2.5">
            Plan a Trip
          </Link>
        </div>

        <button
          aria-label="Menu"
          className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in overflow-y-auto max-h-[80vh]">
          <div className="container-app py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 self-start"
            >
              Plan a Trip
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-lg text-foreground hover:bg-secondary"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart{" "}
              {totalItems > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
