import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Languages,
  Coins,
  Clock,
  Car,
  Phone,
  ExternalLink,
  Map as MapIcon,
  Sparkles,
  Plane,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ImageIcon,
  ShoppingCart,
  Check,
  ArrowRight,
  Star,
  Briefcase,
  Heart,
  Wallet,
  Plus,
  Minus,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { BackButton } from "@/components/ui/BackButton";
import { getAllCountries, formatNumber, FEATURED_CCA3, type Country } from "@/lib/countries";
import {
  getGuide,
  unsplash,
  getGalleryImages,
  type TouristPlace,
  type TravelPackage,
} from "@/lib/tourist-data";
import {
  getCountryMainImage,
  getCountryMustVisitImages,
  hasCountryImages,
} from "@/lib/country-images";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCart, type CartItem } from "@/context/CartContext";
import { IndiaExplorer } from "@/components/india/IndiaExplorer";

// Package actions component with Add to Cart functionality
function PackageActions({
  pkg,
  countryCode,
  countryName,
}: {
  pkg: TravelPackage;
  countryCode: string;
  countryName: string;
}) {
  const { addItem, isInCart, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(countryCode, pkg.name);
  const cartItem = items.find((i) => i.countryCode === countryCode && i.package.name === pkg.name);

  const handleAddToCart = () => {
    addItem(pkg, countryCode, countryName);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleIndividualWhatsApp = () => {
    const message = `Hi Vicky Ryoko Tours and Party's,\n\nI'm interested in the following package:\n\n*Country:* ${countryName}\n*Package:* ${pkg.name}\n*Tier:* ${pkg.tier}\n*Duration:* ${pkg.duration}\n*Price:* $${pkg.price.toLocaleString()}\n\nPlease share more details.`;
    const url = `https://wa.me/918639888490?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (added) {
    return (
      <div
        className={cn(
          "mt-auto flex items-center justify-center gap-2.5 rounded-xl py-4 font-bold",
          pkg.tier === "luxury"
            ? "bg-green-500 text-white"
            : pkg.tier === "medium"
              ? "bg-green-500 text-white"
              : "bg-green-500 text-white",
        )}
      >
        <CheckCircle className="h-5 w-5" />
        <span>Added to Cart!</span>
      </div>
    );
  }

  return (
    <div className="mt-auto flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className={cn(
            "flex-1 flex items-center justify-center gap-2.5 rounded-xl py-4 font-bold transition-all duration-300 hover:shadow-lg",
            pkg.tier === "luxury"
              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 hover:shadow-amber-500/25"
              : pkg.tier === "medium"
                ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/25"
                : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white hover:from-green-500 hover:to-green-700 hover:shadow-green-500/25",
          )}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{inCart ? "Add More" : "Add to Cart"}</span>
        </button>
        <button
          onClick={handleIndividualWhatsApp}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl px-4 py-4 font-bold transition-all duration-300",
            pkg.tier === "luxury"
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300"
              : pkg.tier === "medium"
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300",
          )}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Robust image component with lazy loading, placeholders, and error fallbacks
function SmartImage({
  src,
  alt,
  className,
  aspectRatio = "4/3",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ aspectRatio }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          <span className="mt-2 text-xs text-muted-foreground/50">Image unavailable</span>
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
            isLoading && "opacity-0 scale-105",
            !isLoading && "opacity-100 scale-100",
          )}
        />
      )}
    </div>
  );
}

// Full-screen gallery for place photos
function FullScreenGallery({
  images,
  placeName,
  isOpen,
  onClose,
}: {
  images: string[];
  placeName: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, images.length, onClose]);

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!isOpen) return null;

  const captions = [
    "Main view",
    "Landscape",
    "Sunset",
    "Aerial",
    "Street",
    "Night",
    "People",
    "Food",
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur",
        !isFullscreen && "m-4 rounded-xl",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-white">
          <h3 className="font-display text-xl font-bold">{placeName}</h3>
          <p className="text-sm text-white/70">
            {captions[currentIndex] || `Photo ${currentIndex + 1}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center">
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="relative aspect-[16/9] max-h-full max-w-5xl w-full">
          <SmartImage
            src={images[currentIndex]}
            alt={`${placeName} ${captions[currentIndex]}`}
            className="h-full w-full rounded-lg"
            aspectRatio="16/9"
          />
        </div>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-10"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto py-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                currentIndex === i
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80",
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-white/50">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/countries/$code")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.code.toUpperCase()} — Travel guide | Vicky Ryoko Tours and Party's` },
      {
        name: "description",
        content: `In-depth travel guide for ${params.code.toUpperCase()}. Top tourist places, states, photos and curated experiences with Vicky Ryoko Tours and Party's.`,
      },
      { property: "og:title", content: `Travel guide — Vicky Ryoko Tours and Party's` },
      {
        property: "og:description",
        content: `Discover this destination with Vicky Ryoko Tours and Party's.`,
      },
    ],
  }),
  component: CountryDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-app pt-40 pb-32 text-center">
        <h1 className="text-5xl font-bold">Country not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find that destination.</p>
        <Link to="/countries" className="btn-primary mt-8">
          Browse all countries
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="container-app pt-40 pb-32 text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <Link to="/countries" className="btn-primary mt-6">
          Back to countries
        </Link>
      </div>
    </SiteLayout>
  ),
});

function CountryDetail() {
  const { code } = Route.useParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    router.navigate({
      to: "/mobile-view/countries/$code",
      params: { code },
    });
  }, [code, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container-app pt-32 pb-20">
          <div className="h-72 rounded-2xl bg-muted animate-pulse" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  }

  const country = data?.find((c) => c.cca3.toLowerCase() === code.toLowerCase());
  if (!country) throw notFound();

  // Render IndiaExplorer for India (desktop view with regions: North, South, East, West, Island)
  if (code.toLowerCase() === "ind") {
    return (
      <SiteLayout>
        <IndiaExplorer />
      </SiteLayout>
    );
  }

  return <CountryView country={country} all={data ?? []} />;
}

const EXCLUDED_FROM_FLAG_IMAGE = new Set([
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

function CountryView({ country: c, all }: { country: Country; all: Country[] }) {
  const guide = getGuide(c.cca3);
  const [openPlace, setOpenPlace] = useState<TouristPlace | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const isExcluded = EXCLUDED_FROM_FLAG_IMAGE.has(c.cca3);
  const mustVisitImages = getCountryMustVisitImages(c.cca3);

  const heroImg = isExcluded
    ? getCountryMainImage(c.cca3) || unsplash(guide?.hero ?? `${c.name.common} travel`, 1920, 1080)
    : c.flags.svg;

  const langs =
    c.cca3 === "IND"
      ? "Telugu, Hindi, Bengali, Marathi, Gujarati, English"
      : c.languages
        ? Object.values(c.languages).join(", ")
        : "—";
  const currencies = c.currencies
    ? Object.entries(c.currencies)
        .map(([code, v]) => `${v.name} (${v.symbol ?? code})`)
        .join(", ")
    : "—";
  const dial = c.idd?.root ? `${c.idd.root}${c.idd.suffixes?.[0] ?? ""}` : "—";
  const borders = (c.borders ?? [])
    .map((b) => all.find((x) => x.cca3 === b))
    .filter(Boolean) as Country[];

  const stats = [
    { icon: MapPin, label: "Capital", value: c.capital?.[0] ?? "—" },
    { icon: Users, label: "Population", value: formatNumber(c.population) },
    {
      icon: Globe,
      label: "Region",
      value: `${c.region}${c.subregion ? ` · ${c.subregion}` : ""}`,
    },
    { icon: Languages, label: "Languages", value: langs },
    { icon: Coins, label: "Currency", value: currencies },
    { icon: Clock, label: "Timezone", value: c.timezones[0] ?? "—" },
    {
      icon: Car,
      label: "Driving side",
      value:
        c.cca3 === "IND"
          ? "Right-hand side (RHD)"
          : c.car?.side
            ? c.car.side.toLowerCase() === "left"
              ? "Left-hand side (LHD)"
              : c.car.side.toLowerCase() === "right"
                ? "Right-hand side (RHD)"
                : c.car.side.charAt(0).toUpperCase() + c.car.side.slice(1)
            : "—",
    },
    { icon: Phone, label: "Dial code", value: dial },
  ];

  const mapEmbed = c.latlng
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${c.latlng[1] - 8},${c.latlng[0] - 6},${c.latlng[1] + 8},${c.latlng[0] + 6}&layer=mapnik&marker=${c.latlng[0]},${c.latlng[1]}`
    : null;

  return (
    <SiteLayout>
      {/* HERO with cinematic image */}
      <section className="relative h-[85vh] min-h-[580px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt={`${c.name.common} cinematic landscape`}
          className="absolute inset-0 h-full w-full object-cover scale-105 motion-safe:animate-[zoom_18s_ease-out_forwards]"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-app pb-16">
            <div className="mb-8" />

            <div className="mt-4 flex flex-wrap items-end gap-6">
              <img
                src={c.flags.svg}
                alt={c.flags.alt || `Flag of ${c.name.common}`}
                className="h-20 w-32 rounded-lg shadow-2xl object-cover ring-2 ring-white/30"
              />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  <Sparkles className="h-3.5 w-3.5" /> {c.region}
                  {c.subregion ? ` · ${c.subregion}` : ""}
                </span>
                <div className="flex items-center gap-4 mt-3">
                  <h1 className="font-display text-5xl sm:text-7xl font-bold text-white drop-shadow-2xl leading-[1.05]">
                    {c.name.common}
                  </h1>
                </div>
                <p className="mt-2 text-white/80 italic text-lg">{c.name.official}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Plan a trip to {c.name.common} <Plane className="ml-2 h-4 w-4" />
              </Link>
              <a href={c.maps.googleMaps} target="_blank" rel="noreferrer" className="btn-ghost">
                <MapIcon className="mr-2 h-4 w-4" /> View on map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-app py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-elev p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </div>
              <div className="mt-2 text-base font-semibold text-foreground">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PACKAGE - Single Enhanced Package Card */}
      {guide?.packages?.length ? (
        <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-amber-50">
          <div className="container-app">
            <div className="text-center mb-10">
              <span className="chip mx-auto w-fit bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Sparkles className="h-3.5 w-3.5" /> Featured Package
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                Special Offer
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Exclusive package curated just for you with the best value and experience.
              </p>
            </div>

            {/* Single Enhanced Package Card */}
            <div className="max-w-4xl mx-auto">
              {guide.packages.slice(0, 1).map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className="group relative flex flex-col rounded-3xl overflow-hidden bg-white shadow-2xl shadow-orange-500/20 transition-all duration-500 hover:shadow-3xl hover:shadow-orange-500/30 hover:scale-[1.02]"
                >
                  {/* Animated Badge */}
                  <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-bl-2xl font-bold text-sm uppercase tracking-widest shadow-lg animate-pulse">
                      <Sparkles className="h-4 w-4 inline mr-1" /> Best Value
                    </div>
                  </div>

{/* Hero Image */}
                  <div className="relative h-80 overflow-hidden bg-gray-50">
                    <img
                      src={c.flags.svg}
                      alt={pkg.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
                          {c.name.common}
                        </span>
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full text-white text-xs font-bold">
                          Featured
                        </span>
                      </div>
                      <h3 className="font-display text-4xl font-bold text-white leading-tight">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Side - Details */}
                    <div className="flex-1 space-y-6">
                      {/* Price & Duration */}
                      <div className="flex items-end justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-orange-100 rounded-xl">
                            <Clock className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                              Duration
                            </p>
                            <p className="text-xl font-bold text-gray-900">{pkg.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className="text-4xl font-black text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                            ₹{pkg.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-orange-600 font-medium">per person</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                          <Star className="h-4 w-4 text-orange-500" /> What's Included
                        </p>
                        <div className="grid grid-cols-2 gap-3">
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

                      {/* Inclusions Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.slice(0, 5).map((inc, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800"
                          >
                            {inc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Action */}
                    <div className="lg:w-72 flex flex-col gap-4">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-lg mb-2">Book Now</h4>
                          <p className="text-gray-400 text-sm">
                            Get exclusive discounts and premium services
                          </p>
                        </div>
                        <div className="space-y-3 mt-4">
                          <PackageActions
                            pkg={pkg}
                            countryCode={c.cca3}
                            countryName={c.name.common}
                          />
                        </div>
                      </div>

{/* Quick Info - Removed Free Cancellation */}
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Best Price Match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* TOURIST PLACES */}
      {guide?.places?.length ? (
        <section
          className="py-16"
          style={{ background: "linear-gradient(180deg, transparent, var(--secondary))" }}
        >
          <div className="container-app">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="chip">
                  <Camera className="h-3.5 w-3.5" /> Must-visit
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold">
                  Top tourist places in {c.name.common}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tap any place to open its photo gallery.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guide.places.map((p, idx) => {
                const mustVisitImages = getCountryMustVisitImages(c.cca3);
                const imageUrl = isExcluded
                  ? hasCountryImages(c.cca3) && mustVisitImages[idx]
                    ? mustVisitImages[idx]
                    : unsplash(p.query, 800, 600)
                  : c.flags.svg;
                return (
                  <button
                    key={p.name}
                    onClick={() => {
                      setOpenPlace(p);
                      setGalleryImages(getGalleryImages(p.query, 8));
                      setShowGallery(true);
                    }}
                    className="group text-left card-elev overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = unsplash(p.query, 800, 600);
                        }}
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold inline-flex items-center gap-1">
                        <Camera className="h-3 w-3" /> Gallery
                      </div>
                    </div>
                    <div className="p-5">
                      {p.city && (
                        <div className="text-xs uppercase tracking-widest text-primary font-semibold">
                          {p.city}
                        </div>
                      )}
                      <h3 className="mt-1 font-display text-xl font-bold">{p.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.blurb}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* DETAILS */}
      <section className="container-app py-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {mapEmbed && (
            <div className="card-elev overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <MapIcon className="h-4 w-4 text-primary" /> Location
                </h3>
                <a
                  href={c.maps.openStreetMaps}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                >
                  Open full map <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <iframe
                title={`Map of ${c.name.common}`}
                src={mapEmbed}
                className="w-full h-[420px] border-0"
                loading="lazy"
              />
            </div>
          )}

          <div
            className="card-elev p-7"
            style={{ background: "var(--gradient-sunset)", color: "white" }}
          >
            <h3 className="text-2xl font-bold">Experiences we craft in {c.name.common}</h3>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Private guided cultural tours",
                "Honeymoon & romance escapes",
                "Group adventures & friend trips",
                "Destination parties & celebrations",
                "Luxury stays & boutique resorts",
                "Visa, flights & 24/7 concierge",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 mt-0.5" /> {x}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-white/90"
            >
              Get a custom itinerary <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-elev p-6">
            <h3 className="font-bold">Time zones</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.timezones.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="card-elev p-6">
            <h3 className="font-bold">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="text-primary hover:underline inline-flex items-center gap-1"
                  href={c.maps.googleMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  className="text-primary hover:underline inline-flex items-center gap-1"
                  href={c.maps.openStreetMaps}
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenStreetMap <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  className="text-primary hover:underline inline-flex items-center gap-1"
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(c.name.common)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikipedia <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Travel Tips Section - fills empty space */}
          <div className="card-elev p-6">
            <h3 className="font-bold">Travel Tips for {c.name.common}</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {c.cca3 !== "IND" && (
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Best time to visit:</strong>{" "}
                    {c.cca3 === "JPN"
                      ? "March to May or September to November"
                      : c.cca3 === "THA"
                        ? "November to February"
                        : "Check seasonal patterns"}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
        </aside>
      </section>

      {/* FULLSCREEN GALLERY */}
      {showGallery && openPlace && (
        <FullScreenGallery
          images={galleryImages}
          placeName={openPlace.name}
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
        />
      )}
    </SiteLayout>
  );
}
