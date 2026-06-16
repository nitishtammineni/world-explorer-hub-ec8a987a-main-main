

﻿
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MobileViewLayout } from "./-MobileViewLayout";
import {
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Languages,
  Coins,
  Clock,
  Car,
  ExternalLink,
  Sparkles,
  Plane,
  Star,
  MessageCircle,
} from "lucide-react";
import { getAllCountries, formatNumber, FEATURED_CCA3, type Country } from "@/lib/countries";
import {
  getCountryMainImage,
  getCountryMustVisitImages,
  hasCountryImages,
} from "@/lib/country-images";
import { getGuide, unsplash, getGalleryImages, type TouristPlace } from "@/lib/tourist-data";
import { useCart, type CartItem } from "@/context/CartContext";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createElement } from "react";
import { IndiaExplorer } from "@/components/india/IndiaExplorer";

// Robust image component with lazy loading, placeholders, and error fallbacks
function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground/70">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          )}
        />
      )}
    </div>
  );
}

const MOBILE_IMAGE_ONLY_FLAG_EXCEPT_CCA3 = new Set<string>([
  "THA",
  "SGP",
  "MYS",
  "AZE",
  "IDN",
  "TUR",
  "ARE",
  "GBR",
  "IND",
  "MDV",
  "CHN",
  "EUR",
  "LKA",
  "VNM",
  "KHM",
  "EGY",
  "FRA",
  "CHE",
]);

function isMobileImageOnlyFlagExcept(cca3: string) {
  return MOBILE_IMAGE_ONLY_FLAG_EXCEPT_CCA3.has(cca3);
}

function MobileCountryDetailPage({ c }: { c: Country }) {
  const router = useRouter();
  const { addItem } = useCart();
  const guide = getGuide(c.cca3);
  const places = guide?.places || [];
  const mustVisitImages = getCountryMustVisitImages(c.cca3);
  const isExcluded = isMobileImageOnlyFlagExcept(c.cca3);

  const heroImg = isExcluded
    ? getCountryMainImage(c.cca3) || unsplash(guide?.hero ?? `${c.name.common} travel`, 1200, 800)
    : c.flags.svg;
  const langs = Object.values(c.languages || {}).join(", ");
  const currencies = Object.values(c.currencies || {})
    .map((curr) => `${curr.name} (${curr.symbol})`)
    .join(", ");
  const drivingSide = c.car?.side ? c.car.side.charAt(0).toUpperCase() + c.car.side.slice(1) : "—";
  const dial = c.idd?.root && c.idd?.suffixes?.[0] ? `${c.idd.root}${c.idd.suffixes[0]}` : "—";

  return (
    <MobileViewLayout
      title={c.name.common}
      showBack
      onBack={() => router.navigate({ to: "/mobile-view/countries" })}
    >
      <div className="pb-24">
        {/* HERO */}
        <div className="relative h-[450px] -mx-4 -mt-4 overflow-hidden">
          <img
            src={heroImg}
            alt={c.name.common}
            className="w-full h-full object-cover animate-ken-burns"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {isMobileImageOnlyFlagExcept(c.cca3) && (
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 shadow-2xl border-2 border-white/30">
                <Star className="h-6 w-6 text-white fill-white" />
              </div>
            )}
            {c.flags?.svg ? (
              <img
                src={c.flags.svg}
                alt={c.flags.alt ?? `${c.name.common} flag`}
                className="h-12 w-auto rounded-md shadow-2xl border-2 border-white/20"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="absolute bottom-10 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              <Sparkles className="h-3 w-3 inline mr-1" /> {c.region}
              {c.subregion ? ` Â· ${c.subregion}` : ""}
            </span>
            <h1 className="text-5xl font-black text-white leading-tight mb-3 tracking-tighter">
              {c.name.common}
            </h1>
            <p className="text-white/70 text-sm max-w-xs font-medium leading-relaxed italic mb-4">
              {c.name.official}
            </p>
          </div>

          {/* HERO QUICK ACTIONS */}
          <div className="absolute bottom-30 right-6">
            {c.maps?.googleMaps ? (
              <a
                href={c.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-extrabold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/25"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-xs leading-none">View on map</span>
              </a>
            ) : (
              <div className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10" />
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-[32px] p-5 shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: MapPin,
                  label: "Capital",
                  value: c.capital?.[0] || "—",
                  bg: "bg-orange-50",
                  color: "text-orange-600",
                },
                {
                  icon: Users,
                  label: "Population",
                  value: formatNumber(c.population),
                  bg: "bg-blue-50",
                  color: "text-blue-600",
                },
                {
                  icon: Globe,
                  label: "Region",
                  value: `${c.region}${c.subregion ? ` Â· ${c.subregion}` : ""}`,
                  bg: "bg-indigo-50",
                  color: "text-indigo-600",
                },
                {
                  icon: Languages,
                  label: "Languages",
                  value: langs,
                  bg: "bg-purple-50",
                  color: "text-purple-600",
                },
                {
                  icon: Coins,
                  label: "Currency",
                  value: currencies,
                  bg: "bg-green-50",
                  color: "text-green-600",
                },
                {
                  icon: Clock,
                  label: "Timezone",
                  value: c.timezones?.[0] || "—",
                  bg: "bg-teal-50",
                  color: "text-teal-600",
                },
                {
                  icon: Car,
                  label: "Driving",
                  value: drivingSide,
                  bg: "bg-pink-50",
                  color: "text-pink-600",
                },
                {
                  icon: Sparkles,
                  label: "Dial Code",
                  value: dial,
                  bg: "bg-amber-50",
                  color: "text-amber-600",
                },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-2">
                  <div
                    className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-1`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-xs font-bold text-gray-800 line-clamp-1">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                to="/mobile-view/contact"
                className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold text-center shadow-lg shadow-orange-200"
              >
                Book Now
              </Link>
              {c.maps?.googleMaps ? (
                <a
                  href={c.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-gray-50 rounded-xl font-bold flex items-center justify-center border border-gray-100"
                >
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100" />
              )}
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="px-4">
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
            Discover
          </h2>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <p className="text-gray-600 leading-relaxed text-sm">
              {guide?.intro ||
                `${c.name.common} offers a unique blend of history, culture, and natural beauty. From its vibrant cities to its serene landscapes, every corner of this country tells a story waiting to be discovered.`}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                <Check className="h-3 w-3 text-green-500" />
                Expert Local Guides
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                <Check className="h-3 w-3 text-green-500" />
                Custom Itineraries
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED PACKAGE (Desktop-like section) */}
        {guide?.packages?.length ? (
          <div className="px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-rose-600 rounded-full" />
              Featured Package
            </h2>

            <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-gray-100">
              <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-bl-2xl font-bold text-sm uppercase tracking-widest shadow-lg">
                  <Sparkles className="h-4 w-4 inline mr-1" /> Best Value
                </div>
              </div>

              {guide.packages.slice(0, 1).map((pkg) => (
                <div key={pkg.name} className="flex flex-col">
<div className="relative h-56 overflow-hidden bg-gray-50">
                    <img
                      src={c.flags.svg}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.05] p-3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-5 right-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-xs font-medium">
                          {c.name.common}
                        </span>
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-white text-xs font-bold">
                          Featured
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold text-white leading-tight">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                          Duration
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-2xl font-black text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mt-1">
                          ₹{pkg.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        What’s Included
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {pkg.highlights.slice(0, 6).map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="p-1.5 bg-orange-100 rounded-full">
                              <Check className="h-3 w-3 text-orange-600" />
                            </div>
                            <span className="text-gray-700">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requested: only Add to Cart + Proceed (WhatsApp) */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => addItem(pkg, c.cca3, c.name.common)}
                        className="flex-1 bg-orange-600 text-white py-3 rounded-2xl font-bold text-center shadow-lg shadow-orange-200"
                      >
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          addItem(pkg, c.cca3, c.name.common);

                          const message = `Hi Vicky Ryoko Tours and Party's,\n\nI want to proceed with this package:\n\n*Country:* ${c.name.common}\n*Package:* ${pkg.name}\n*Duration:* ${pkg.duration}\n*Price:* ₹${pkg.price.toLocaleString()}\n\nPlease share the next steps.`;
                          const url = `https://wa.me/918639888490?text=${encodeURIComponent(message)}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        }}
                        className="px-4 py-3 rounded-2xl bg-white border border-orange-200 text-orange-600 font-bold inline-flex items-center justify-center"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* MUST VISIT (desktop-like cards on mobile; no photo gallery overlay) */}
        {places.length ? (
          <div className="px-4">
            <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-green-600 rounded-full" />
              Must Visit
            </h2>

            <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
              {places.map((place, idx) => (
                <div
                  key={place.name}
                  className="relative flex-shrink-0 w-56 snap-start rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-black/10"
                >
                  <img
                    src={
                      isExcluded
                        ? hasCountryImages(c.cca3) && mustVisitImages[idx]
                          ? mustVisitImages[idx]
                          : unsplash(place.query, 400, 600)
                        : c.flags.svg
                    }
                    alt={place.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-[18px] leading-tight font-extrabold text-white line-clamp-2">
                      {place.name}
                    </h4>

                    {place.city ? (
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
                        {place.city}
                      </p>
                    ) : null}

                    <p className="mt-2 text-white/70 text-xs leading-relaxed line-clamp-2">
                      {place.blurb}
                    </p>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Gallery overlay disabled */}
        {null}

        {/* DETAILS (Desktop-like: Location + Experiences + CTA) */}
        <div className="px-4 space-y-5">
          {c.latlng ? (
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 text-gray-900">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </h3>
              </div>
              <iframe
                title={`Map of ${c.name.common}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.latlng[1] - 8},${c.latlng[0] - 6},${c.latlng[1] + 8},${c.latlng[0] + 6}&layer=mapnik&marker=${c.latlng[0]},${c.latlng[1]}`}
                className="w-full h-[260px] border-0"
                loading="lazy"
              />
            </div>
          ) : null}

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
            <h3 className="text-xl font-black text-gray-900">
              Experiences we craft in {c.name.common}
            </h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Private guided cultural tours",
                "Honeymoon & romance escapes",
                "Group adventures & friend trips",
                "Destination parties & celebrations",
                "Luxury stays & boutique resorts",
                "Visa, flights & 24/7 concierge",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-gray-700">
                  <Sparkles className="h-4 w-4 mt-0.5 text-orange-600" /> {x}
                </li>
              ))}
            </ul>

            {/* keep existing “custom itinerary” as link; this is not the “last two buttons” */}
            <Link
              to="/mobile-view/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-gray-900 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 w-full justify-center"
            >
              Get a custom itinerary <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        {/* QUICK LINKS + TRAVEL TIPS (Desktop-like sidebar cards) */}
        <div className="px-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900">Time zones</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.timezones?.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-gray-700 text-xs font-bold border border-gray-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="text-orange-600 hover:underline inline-flex items-center gap-1"
                  href={c.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  className="text-orange-600 hover:underline inline-flex items-center gap-1"
                  href={c.maps.openStreetMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenStreetMap <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  className="text-orange-600 hover:underline inline-flex items-center gap-1"
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(c.name.common)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikipedia <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900">Travel Tips for {c.name.common}</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {c.cca3 !== "IND" ? (
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>
                    <strong>Best time to visit:</strong>{" "}
                    {c.cca3 === "JPN"
                      ? "March to May or September to November"
                      : c.cca3 === "THA"
                        ? "November to February"
                        : "Check seasonal patterns"}
                  </span>
                </li>
              ) : null}

              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-orange-600 mt-0.5" />
                <span>
                  <strong>Currency:</strong>{" "}
                  {c.currencies
                    ? Object.values(c.currencies)
                        .map((v) => v.name)
                        .join(", ")
                    : "Varies"}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-orange-600 mt-0.5" />
                <span>
                  <strong>Power plugs:</strong>{" "}
                  {c.cca3 === "IND"
                    ? "Type C, D, M"
                    : c.cca3 === "GBR"
                      ? "Type G"
                      : c.cca3 === "USA"
                        ? "Type A, B"
                        : c.cca3 === "JPN"
                          ? "Type A, B"
                          : "Check local requirements"}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-orange-600 mt-0.5" />
                <span>
                  <strong>Language:</strong>{" "}
                  {c.cca3 === "IND"
                    ? "Telugu, Hindi, English (widely spoken)"
                    : c.languages
                      ? Object.values(c.languages).slice(0, 3).join(", ")
                      : "Local language"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* IMPORTANT: Removed the bottom “Plan Your Trip” and “Chat on WhatsApp” blocks as requested */}
      </div>
    </MobileViewLayout>
  );
}

export const Route = createFileRoute("/mobile-view/countries/$code")({
  head: ({ params }) => ({
    meta: [
      { title: `Travel ${params.code.toUpperCase()} | Vicky Ryoko Tours` },
      {
        name: "description",
        content: `Explore ${params.code.toUpperCase()} travel guide and packages.`,
      },
    ],
  }),
  component: MobileCountryDetail,
  notFoundComponent: () => (
    <MobileViewLayout title="Not Found">
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">Country not found</h1>
        <Link to="/mobile-view/countries" className="text-orange-600 mt-4 inline-block">
          Browse Countries â†’
        </Link>
      </div>
    </MobileViewLayout>
  ),
  errorComponent: () => (
    <MobileViewLayout title="Error">
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
        <p className="text-gray-500 mt-2">Unable to load this destination</p>
        <Link to="/mobile-view/countries" className="text-orange-600 mt-4 inline-block">
          Browse Countries â†’
        </Link>
      </div>
    </MobileViewLayout>
  ),
});

function MobileCountryDetail() {
  const { code } = Route.useParams();
  const router = useRouter();
  const isIndia = code.toLowerCase() === "ind";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    router.navigate({
      to: "/countries/$code",
      params: { code },
    });
  }, [code, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isIndia) {
    return (
      <MobileViewLayout
        title="Incredible India"
        showBack
        onBack={() => router.navigate({ to: "/mobile-view/countries" })}
      >
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
          <IndiaExplorer />
        </div>
      </MobileViewLayout>
    );
  }

  if (isLoading) {
    return (
      <MobileViewLayout title="Loading...">
        <div className="p-4 space-y-4">
          <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </MobileViewLayout>
    );
  }

  if (error || !data) {
    return (
      <MobileViewLayout title="Error">
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold text-red-600">Unable to load</h1>
          <p className="text-gray-500 mt-2">Please try again later</p>
          <Link to="/mobile-view/countries" className="text-orange-600 mt-4 inline-block">
            Browse Countries â†’
          </Link>
        </div>
      </MobileViewLayout>
    );
  }

  const country = data.find((c) => c.cca3.toLowerCase() === code.toLowerCase());
  if (!country) throw notFound();

  return <MobileCountryDetailPage c={country} />;
}
