import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, MapPin, Users, ArrowRight, Star, Award } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import {
  getAllCountries,
  getEuropeanCountries,
  FEATURED_CCA3,
  formatNumber,
  EUROPEAN_CCA3,
} from "@/lib/countries";
import { getCountryMainImage, hasCountryImages } from "@/lib/country-images";

export const Route = createFileRoute("/countries/")({
  head: () => ({
    meta: [
      { title: "All Countries — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content: "Explore in-depth travel guides for every country in the world.",
      },
      { property: "og:title", content: "All Countries — Vicky Ryoko Tours and Party's" },
    ],
  }),
  component: CountriesPage,
});

const REGIONS = ["Europe", "All", "Asia", "Africa", "Americas", "Oceania", "Antarctic"] as const;

function CountriesPage() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [search, setSearch] = useState("");

  const {
    data: allCountries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
  });

  const { data: europeanData } = useQuery({
    queryKey: ["european-countries"],
    queryFn: getEuropeanCountries,
    staleTime: 1000 * 60 * 60,
  });

  // Calculate counts for each region
  const regionCounts = useMemo(() => {
    if (!allCountries) return {};
    const counts: Record<string, number> = {};

    // Europe count
    counts["Europe"] = europeanData?.length || 0;

    // All count (EXCLUDING Europe)
    counts["All"] = allCountries.filter((c) => c.region !== "Europe").length;

    // Other regions
    REGIONS.filter((r) => r !== "Europe" && r !== "All").forEach((r) => {
      counts[r] = allCountries.filter((c) => c.region === r).length;
    });

    return counts;
  }, [allCountries, europeanData]);

  const filtered = useMemo(() => {
    let list: typeof allCountries = [];

    if (region === "Europe" && europeanData) {
      // Europe: featured first, then alphabetical
      list = [...europeanData];
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    } else if (region === "All") {
      // All (excluding Europe): featured first, then alphabetical
      list = allCountries?.filter((c) => c.region !== "Europe") || [];
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    } else {
      // Other regions: featured first, then alphabetical
      list = allCountries?.filter((c) => c.region === region) || [];
      list.sort((a, b) => {
        const aFeatured = FEATURED_CCA3.includes(a.cca3);
        const bFeatured = FEATURED_CCA3.includes(b.cca3);
        if (aFeatured && !bFeatured) return -1;
        if (!aFeatured && bFeatured) return 1;
        return a.name.common.localeCompare(b.name.common);
      });
    }

    if (search.trim()) {
      const needle = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.common.toLowerCase().includes(needle) ||
          c.name.official.toLowerCase().includes(needle) ||
          (c.capital?.[0] || "").toLowerCase().includes(needle),
      );
    }
    return list;
  }, [allCountries, europeanData, search, region]);

  const isEurope = region === "Europe";

  return (
    <SiteLayout>
      <section
        className={`pt-32 pb-10 border-b border-border ${isEurope ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800" : "bg-secondary/40"}`}
      >
        <div className="container-app">
          {isEurope ? (
            <>
              <span className="chip bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Award className="h-3.5 w-3.5" /> Exclusive European Collection
              </span>
              <DiscoTitle>
                <h1 className="mt-3 text-4xl sm:text-6xl font-bold max-w-3xl text-white">
                  Discover{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300">
                    Europe
                  </span>
                </h1>
              </DiscoTitle>
              <p className="mt-4 max-w-2xl text-indigo-200">
                Explore magical European destinations starting from{" "}
                <span className="font-bold text-white">₹3,99,999</span> per person.
              </p>
            </>
          ) : (
            <>
              <span className="chip">
                <MapPin className="h-3.5 w-3.5" /> Worldwide directory
              </span>
              <DiscoTitle>
                <h1 className="mt-3 text-4xl sm:text-6xl font-bold max-w-3xl">
                  Every country, ready to explore.
                </h1>
              </DiscoTitle>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Search 50+ destinations. Tap any country for an in-depth travel guide.
              </p>
            </>
          )}

          <div className="mt-8 flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 ${isEurope ? "text-indigo-300" : "text-muted-foreground"}`}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by country or capital…"
                className={`w-full rounded-full border pl-11 pr-5 py-3.5 text-sm outline-none focus:ring-2 ${
                  isEurope
                    ? "bg-white/10 border-white/20 text-white placeholder:text-indigo-300 focus:border-amber-400"
                    : "border-border bg-card focus:border-primary"
                }`}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    region === r
                      ? isEurope
                        ? "bg-amber-400 text-purple-900 border-amber-400"
                        : "bg-primary text-primary-foreground border-primary"
                      : isEurope
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-card border-border hover:bg-secondary"
                  }`}
                >
                  {r === "Europe" ? (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400" /> {r} ({regionCounts[r] || 0})
                    </span>
                  ) : (
                    <span>
                      {r} ({regionCounts[r] || 0})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-12">
        {error && <div className="text-destructive">Couldn't load countries. Please refresh.</div>}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="card-elev h-56 bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "country" : "countries"}
              {isEurope && <span className="ml-2 text-amber-400">• Starting from ₹3,99,999</span>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((c) => (
                <Link
                  key={c.cca3}
                  to="/countries/$code"
                  params={{ code: c.cca3 }}
                  className="group card-elev overflow-hidden hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                    <img
                      src={
                        hasCountryImages(c.cca3)
                          ? getCountryMainImage(c.cca3) || c.flags.svg
                          : c.flags.svg
                      }
                      alt={c.name.common}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = c.flags.svg;
                      }}
                    />
                    {FEATURED_CCA3.includes(c.cca3) && (
                      <div className="absolute top-3 right-3 z-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full p-1.5 shadow-lg shadow-orange-500/40">
                        <Star className="h-3.5 w-3.5 fill-white" />
                      </div>
                    )}
                    {isEurope && (
                      <div className="absolute top-3 left-3 z-10 bg-amber-400 text-purple-900 rounded-full p-1.5 shadow-lg">
                        <Award className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {c.region}
                      {c.subregion ? ` · ${c.subregion}` : ""}
                    </div>
                    <div className="font-display text-xl font-bold mt-1 group-hover:text-primary transition-colors">
                      {c.name.common}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {c.capital?.[0] ?? "—"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" /> {formatNumber(c.population)}
                      </span>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Explore{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No countries match your search.
              </div>
            )}
          </>
        )}
      </section>
    </SiteLayout>
  );
}
