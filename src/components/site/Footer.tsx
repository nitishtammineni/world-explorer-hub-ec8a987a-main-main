import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="container-app py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Vicky Ryoko Tours and Party's"
              className="h-9 w-9 rounded-full bg-primary object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold">Vicky Ryoko Tours and Party's</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">
                Tours & Parties
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-70 max-w-xs">
            Crafting unforgettable journeys to every corner of the world. Tours, parties, and
            bespoke experiences.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-90">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <Link to="/countries" className="hover:text-primary">
                All Countries
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-90">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5" />{" "}
              <a href="mailto:vikasvarma529@gmail.com" className="hover:text-primary">
                vikasvarma529@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5" />{" "}
              <a href="tel:+918639888490" className="hover:text-primary">
                +91 86398 88490
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" /> Worldwide · Available 24/7
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-90">Follow</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-primary transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-primary transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-primary transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-app py-6 text-xs opacity-60 flex flex-wrap justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Vicky Ryoko Tours and Party's. All rights reserved.
          </span>
          <span>Made with passion for travelers worldwide.</span>
        </div>
      </div>
    </footer>
  );
}
