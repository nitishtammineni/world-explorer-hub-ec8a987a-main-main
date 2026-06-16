import { Link, useLocation } from "@tanstack/react-router";
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

type MobileLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/countries", label: "Explore", icon: MapPin },
  { to: "/services", label: "Services", icon: Star },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Support", icon: MessageCircle },
];

export function MobileLayout({ children, title }: MobileLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:hidden min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8 rounded-full border border-orange-500" />
            <span className="font-bold text-orange-600 text-sm">Vicky Ryoko</span>
          </Link>

          <Link to="/cart" className="relative p-2 -mr-2">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-orange-600 text-white text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        {title && (
          <div className="px-4 pb-2">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-orange-50 transition-colors ${
                    location.pathname === item.to ? "text-orange-600 bg-orange-50" : "text-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-orange-600 text-white rounded-lg font-semibold"
              >
                <Home className="h-4 w-4" />
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-[60px] pb-20 px-4">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-40">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 ${isActive ? "text-orange-600" : "text-gray-400"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
