import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Globe,
  ArrowRight,
  Star,
  TreePine,
  Landmark,
  Palmtree,
  Award,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { getAllCountries, getEuropeanCountries, FEATURED_CCA3 } from "@/lib/countries";
import { getCountryCardImage, getCountryMainImage, hasCountryImages } from "@/lib/country-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/countries/")({
  head: () => ({
    meta: [
      { title: "Explore Countries - Vicky Ryoko Tours" },
      { name: "description", content: "Explore travel guides for every country in the world." },
    ],
  }),
  component: MobileViewCountriesPage,
});

// Europe first, then others with counts (calculated dynamically)
const CONTINENTS = [
  { id: "Europe", name: "⭐ Europe", icon: Award, color: "from-indigo-600 to-purple-700" },
  { id: "All", name: "All", icon: Globe, color: "from-gray-600 to-gray-800" },
  { id: "Asia", name: "Asia", icon: Globe, color: "from-red-600 to-rose-700" },
  { id: "Africa", name: "Africa", icon: TreePine, color: "from-amber-600 to-orange-700" },
  { id: "Americas", name: "Americas", icon: Landmark, color: "from-blue-600 to-indigo-700" },
  { id: "Oceania", name: "Oceania", icon: Palmtree, color: "from-teal-600 to-cyan-700" },
] as const;

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
  "LKA",
  "VNM",
  "KHM",
  "EGY",
]);

function MobileViewCountriesPage() {
  const { data: allCountries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
  });

  const { data: europeanData } = useQuery({
    queryKey: ["european-countries"],
    queryFn: getEuropeanCountries,
    staleTime: 1000 * 60 * 60,
  });

  const [q, setQ] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(20);

  // Calculate country counts for each region
  const regionCounts = useMemo(() => {
    if (!allCountries) return {};
    const counts: Record<string, number> = {};

    counts["Europe"] = europeanData?.length || 0;
    counts["All"] = allCountries.filter((c) => c.region !== "Europe").length;

    CONTINENTS.filter((c) => c.id !== "Europe" && c.id !== "All").forEach((c) => {
      counts[c.id] = allCountries.filter((x) => x.region === c.id).length;
    });

    return counts;
  }, [allCountries, europeanData]);

  const filtered = useMemo(() => {
    let list = allCountries ?? [];

    if (region === "Europe" && europeanData) {
      list = [...europeanData];
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    } else if (region === "All") {
      list = list.filter((c) => c.region !== "Europe");
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    } else if (region !== "All") {
      list = list.filter((c) => c.region === region);
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    }

    if (q.trim()) {
      list = list.filter((c) => c.name.common.toLowerCase().includes(q.toLowerCase()));
    }
    return list;
  }, [allCountries, europeanData, region, q]);

  const isEurope = region === "Europe";

  useEffect(() => {
    setVisibleCount((prev) => Math.min(prev, filtered.length) || 20);
  }, [filtered.length]);

  const getContinentDisplay = (c: (typeof CONTINENTS)[number], count: number) => {
    return `${c.name} (${count})`;
  };

  return (
    <MobileViewLayout title="Explore Countries">
      <div className="p-4 space-y-5">
        <div className="text-center py-6">
          {isEurope ? (
            <>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3">
                <Award className="h-3 w-3" /> EUROPE
              </div>
              <DiscoTitle>
                <h1 className="text-3xl font-black text-white mb-2">
                  Discover{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">
                    Europe
                  </span>
                </h1>
              </DiscoTitle>
              <p className="text-sm text-indigo-200">
                Starting from <span className="font-bold text-white">₹3,99,999</span> per person
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full text-orange-600 text-xs font-bold uppercase tracking-widest mb-3">
                <Globe className="h-3 w-3" /> Explore the World
              </div>
              <DiscoTitle>
                <h1 className="text-3xl font-black text-gray-900 mb-2">
                  Every Country <span className="text-orange-600">awaits you</span>
                </h1>
              </DiscoTitle>
              <p className="text-sm text-gray-500">Tap a continent below to explore</p>
            </>
          )}
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-3">
            {CONTINENTS.map((continent) => (
              <CarouselItem key={continent.id} className="pl-3 basis-auto">
                <button
                  onClick={() => setRegion(continent.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-[1.5rem] bg-gradient-to-r ${continent.color} text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
                    region === continent.id ? "ring-4 ring-white/50" : ""
                  }`}
                >
                  <continent.icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-bold text-sm">
                      {continent.id === "Europe" ? "⭐ Europe" : continent.id}
                    </div>
                    <div className="text-xs text-white/70">
                      {regionCounts[continent.id] || 0} countries
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/70" />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 bg-white shadow-lg" />
          <CarouselNext className="-right-2 bg-white shadow-lg" />
        </Carousel>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search countries..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm text-gray-700"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filtered.length} {filtered.length === 1 ? "country" : "countries"} found
            {isEurope && <span className="ml-2 text-amber-400">• ₹3,99,999</span>}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 h-40 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              {filtered.slice(0, visibleCount).map((c) => (
                <Link
                  key={c.cca3}
                  to="/mobile-view/countries/$code"
                  params={{ code: c.cca3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-95 block"
                >
                  <div className="h-24 bg-gray-100 relative">
                    <img
                      src={
                        hasCountryImages(c.cca3)
                          ? getCountryMainImage(c.cca3) ||
                            getCountryCardImage(c.cca3) ||
                            c.flags.svg
                          : c.flags.svg
                      }
                      alt={c.name.common}
                      className="w-full h-full object-cover"
                    />
                    {MOBILE_IMAGE_ONLY_FLAG_EXCEPT_CCA3.has(c.cca3) &&
                      hasCountryImages(c.cca3) &&
                      c.flags.svg && (
                        <div className="absolute top-2 left-2 z-10 shadow-md">
                          <img
                            src={c.flags.svg}
                            alt={c.name.common}
                            className="h-4 w-auto rounded-sm border border-white/50"
                          />
                        </div>
                      )}
                    {isEurope && (
                      <div className="absolute top-2 left-2 z-10 bg-amber-400 text-purple-900 rounded-full p-1 shadow-md">
                        <Award className="h-3 w-3" />
                      </div>
                    )}
                    {FEATURED_CCA3.includes(c.cca3) && !isEurope && (
                      <div className="absolute top-2 right-2 z-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full p-1 shadow-md">
                        <Star className="h-3 w-3 fill-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-3">
                    <div className="font-bold text-sm truncate text-gray-800">{c.name.common}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="h-3 w-3" /> {c.capital?.[0] ?? "—"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 20)}
                className="w-full py-4 mt-4 bg-orange-100 text-orange-600 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <span>Show More ({filtered.length - visibleCount} more)</span>
              </button>
            )}
          </>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No countries found.</p>
          </div>
        )}
      </div>
    </MobileViewLayout>
  );
}
