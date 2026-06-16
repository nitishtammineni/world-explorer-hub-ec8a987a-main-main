import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  ArrowRight,
  Globe2,
  MapPin,
  Sparkles,
  ShieldCheck,
  PartyPopper,
  Plane,
  Star,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import { getAllCountries, FEATURED_CCA3, formatNumber } from "@/lib/countries";
import { getCountryMainImage } from "@/lib/country-images";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vicky Ryoko Tours and Party's — Discover the World" },
      {
        name: "description",
        content:
          "Bespoke tours, parties and travel experiences across every country in the world. Plan your dream journey with Vicky Ryoko Tours and Party's.",
      },
      { property: "og:title", content: "Vicky Ryoko Tours and Party's" },
      {
        property: "og:description",
        content: "Bespoke tours and unforgettable journeys to every corner of the world.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    router.navigate({ to: "/mobile-view" });
  }, [router]);

  // Always call useQuery first to follow React hooks rules
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
  });

  const featured = (countries ?? []).filter((c) => FEATURED_CCA3.includes(c.cca3));

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Tropical paradise at sunset"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover scale-105 animate-[fade-in_1.2s_ease-out]"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container-app relative z-10 pb-20 pt-32 text-white">
          <span className="chip !bg-white/15 !text-white backdrop-blur border border-white/20">
            <Sparkles className="h-3.5 w-3.5" /> 50+ countries · curated experiences
          </span>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl">
            The world is yours.
            <br />
            <span className="text-gradient-sunset">Let's go explore it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Vicky Ryoko Tours and Party's crafts bespoke journeys, immersive cultural escapes and
            high-energy travel experiences — to every country on the map.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/countries" className="btn-primary">
              Explore all countries <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Plan my trip
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {[
              { k: "50+", v: "Countries covered" },
              { k: "12k+", v: "Happy travelers" },
              { k: "24/7", v: "Concierge support" },
              { k: "4.9â˜…", v: "Average rating" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-bold">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 container-app">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip">
            <Star className="h-3.5 w-3.5" /> Why Vicky Ryoko Tours
          </span>
          <DiscoTitle className="mt-4 text-4xl sm:text-5xl font-bold">
            Travel that feels like a story
          </DiscoTitle>
          <p className="mt-4 text-muted-foreground">
            From quiet escapes to electric adventures — every detail is handled, every moment
            unforgettable.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Globe2,
              title: "Every country, in depth",
              desc: "Detailed guides for all 50+ countries — culture, climate, currency and the must-see spots.",
            },
            {
              icon: PartyPopper,
              title: "Tours & experiences",
              desc: "From honeymoons to group adventures, cultural tours to destination experiences — we plan it all.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted concierge",
              desc: "Visas, flights, stays, transfers and 24/7 on-trip support. Travel worry-free.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card-elev p-7 group hover:-translate-y-1 transition-transform"
            >
              <div className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-20 bg-secondary/40">
        <div className="container-app">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip">
                <MapPin className="h-3.5 w-3.5" /> Featured destinations
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Trending right now</h2>
            </div>
            <Link to="/countries" className="btn-outline">
              View all countries <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-elev min-h-[380px] animate-pulse bg-muted" />
              ))}
            {featured.map((c) => (
              <Link
                key={c.cca3}
                to="/countries/$code"
                params={{ code: c.cca3 }}
                className="group relative overflow-hidden rounded-2xl card-elev border border-border/50 min-h-[380px] flex flex-col"
              >
                <div className="absolute inset-0">
                  <img
                    src={getCountryMainImage(c.cca3) || c.flags.svg}
                    alt={c.name.common}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = c.flags.svg;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  {/* Flag badge - bottom left */}
                  <div className="absolute bottom-4 left-4 z-20 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                    <img
                      src={c.flags.svg}
                      alt={`Flag of ${c.name.common}`}
                      className="h-8 w-12 object-cover"
                    />
                  </div>
                  {/* Star badge for featured */}
                  {FEATURED_CCA3.includes(c.cca3) && (
                    <div className="absolute top-4 right-4 z-20 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Featured
                    </div>
                  )}
                </div>
                <div className="relative z-10 mt-auto p-6 text-white">
                  <div className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest bg-primary/80 backdrop-blur-sm rounded-full">
                    {c.region}
                  </div>
                  <div className="font-display text-3xl font-bold mt-3">{c.name.common}</div>
                  <div className="mt-2 text-sm opacity-90 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {c.capital?.[0] ?? "—"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>{formatNumber(c.population)} people</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary px-4 py-2 rounded-full transition-all group-hover:gap-3">
                    Discover{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container-app">
        <div
          className="card-elev relative overflow-hidden p-10 sm:p-16 text-center"
          style={{ background: "var(--gradient-ocean)", color: "white" }}
        >
          <Plane className="absolute -top-6 -right-6 h-40 w-40 opacity-10 rotate-12" />
          <h2 className="text-4xl sm:text-5xl font-bold">Your next chapter starts here.</h2>
          <p className="mt-4 max-w-xl mx-auto opacity-90">
            Tell us where you want to go — we'll handle everything else.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn-primary">
              Plan my trip
            </Link>
            <Link to="/countries" className="btn-ghost">
              Browse countries
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
