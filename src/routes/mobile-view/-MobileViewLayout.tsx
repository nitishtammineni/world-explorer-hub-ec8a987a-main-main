import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  MapPin,
  Info,
  MessageCircle,
  Star,
  ShoppingCart,
  Plane,
  Globe,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";

type MobileViewLayoutProps = {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showCart?: boolean;
};

// Fast device detection without hooks
function checkIsMobile(): boolean {
  if (typeof window === "undefined") return true;
  return window.innerWidth < 768;
}

// Bottom nav items for mobile-view routes
const navItems = [
  { to: "/mobile-view", label: "Home", icon: Home },
  { to: "/mobile-view/countries", label: "Explore", icon: MapPin },
  { to: "/mobile-view/services", label: "Services", icon: Star },
  { to: "/mobile-view/about", label: "About", icon: Info },
  { to: "/mobile-view/contact", label: "Support", icon: MessageCircle },
];

const cartNavItems = [
  { to: "/mobile-view", label: "Home", icon: Home },
  { to: "/mobile-view/countries", label: "Explore", icon: MapPin },
  { to: "/mobile-view/cart", label: "Cart", icon: ShoppingCart },
  { to: "/mobile-view/about", label: "About", icon: Info },
  { to: "/mobile-view/contact", label: "Support", icon: MessageCircle },
];

export function MobileViewLayout({
  children,
  title,
  showBack = false,
  onBack,
  showCart = true,
}: MobileViewLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [deviceChecked, setDeviceChecked] = useState(false);
  // SSR guard: CartProvider is typically client-initialized; during SSR we still want the page to render.
  // If CartProvider is missing, avoid crashing the whole SSR render.
  let totalItems = 0;
  try {
    totalItems = useCart().totalItems;
  } catch {
    totalItems = 0;
  }
  const location = useLocation();
  const router = useRouter();

  // Use static defaults for SSR, update after mount for client
  const isCartPage = mounted ? location.pathname.includes("/cart") : false;

  // Check device size - fast synchronous check
  const isSmallDevice = checkIsMobile();

  // Handle scroll effect for header and mounted state
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* TOP HEADER - Constant at all pages */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-200/50"
            : "bg-white shadow-md"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Menu or Back button */}
          <div className="flex items-center">
            {showBack ? (
              <button
                onClick={onBack || (() => window.history.back())}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            )}
          </div>

          {/* Center - Logo and Brand */}
          <Link to="/mobile-view" className="flex items-center gap-2">
            <div className="relative">
              <img
                src={logo}
                alt="Vicky Ryoko"
                className="h-9 w-9 rounded-full border-2 border-orange-500"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-orange-600 text-sm leading-tight">Vicky Ryoko</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider">
                Tours & Parties
              </span>
            </div>
          </Link>

          {/* Right side - Cart or Search */}
          <div className="flex items-center gap-1">
            <Link
              to="/mobile-view/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-orange-600 text-white text-xs font-bold animate-pulse">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Title bar (shown when provided) */}
        {title && (
          <>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
            <div className="px-4 py-4 text-center overflow-hidden bg-white/50 backdrop-blur-sm">
              <h1 className="text-2xl font-black tracking-tight animate-text-reveal">
                <span className="animate-text-gradient bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            </div>
            <div className="h-[1px] w-full bg-gray-100/80 shadow-sm" />
          </>
        )}
      </header>

      {/* Spacing after title */}
      <div className="h-4" />

      {/* MOBILE MENU DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in">
            <div className="p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/mobile-view"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={logo}
                    alt="Vicky Ryoko"
                    className="h-12 w-12 rounded-full border-2 border-orange-500"
                  />
                  <div>
                    <span className="font-bold text-xl text-orange-600 block">Vicky Ryoko</span>
                    <span className="text-xs text-gray-400 uppercase">Tours & Parties</span>
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-2">
                {[
                  { path: "/mobile-view", label: "Home", icon: Home },
                  { path: "/mobile-view/countries", label: "Explore Countries", icon: Globe },
                  { path: "/mobile-view/packages", label: "Tour Packages", icon: Plane },
                  { path: "/mobile-view/passport", label: "Passport Services", icon: ShieldCheck },
                  { path: "/mobile-view/visa", label: "Visa Assistance", icon: Globe },
                  { path: "/mobile-view/services", label: "Our Services", icon: Star },
                  { path: "/mobile-view/about", label: "About Us", icon: Info },
                  { path: "/mobile-view/contact", label: "Contact Support", icon: MessageCircle },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all group"
                  >
                    <item.icon className="h-5 w-5 text-gray-400 group-hover:text-orange-600" />
                    <span className="font-medium text-gray-700 group-hover:text-orange-600">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* CTA Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <p className="text-white text-sm font-medium mb-1">Ready to dream up your trip?</p>
                <p className="text-white/80 text-xs mb-3">
                  Tell us your idea — we'll come back with a tailored plan within 24 hours.
                </p>
                <Link
                  to="/mobile-view/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-orange-600 rounded-lg font-semibold shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  Start planning
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="pt-[72px] pb-20">{children}</main>

      {/* BOTTOM NAV FOR MOBILE */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-50">
        {(isCartPage ? cartNavItems : navItems).map((item) => {
          const isActive =
            mounted && (location.pathname === item.to || location.pathname === item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 ${isActive ? "text-orange-600" : "text-gray-400"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
