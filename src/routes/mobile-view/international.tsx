import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Globe,
  MapPin,
  Clock,
  Plane,
  Ship,
  Palmtree,
  Mountain,
  Building,
  ChevronRight,
  ArrowRight,
  Star,
  Check,
  Calendar,
  Wallet,
  Info,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import {
  INTERNATIONAL_PACKAGES,
  getUniqueDestinations,
  formatPriceDisplay,
  type InternationalPackage,
} from "@/lib/international-packages";
import { getCountryCardImage } from "@/lib/country-images";
import { unsplash } from "@/lib/tourist-data";
import { getAllCountries, FEATURED_CCA3 } from "@/lib/countries";

export const Route = createFileRoute("/mobile-view/international")({
  head: () => ({
    meta: [
      { title: "International Packages - Vicky Ryoko Tours" },
      { name: "description", content: "Explore our international travel packages at best prices." },
    ],
  }),
  component: InternationalPackagesPage,
});

const DESTINATION_ICONS: Record<string, typeof Globe> = {
  Thailand: Palmtree,
  "Singapore & Malaysia": Building,
  "Azerbaijan (Baku)": Building,
  "Indonesia (Bali)": Palmtree,
  Turkey: Building,
  Dubai: Building,
  "Scotland & London": Building,
  Andaman: Palmtree,
  Maldives: Palmtree,
  China: Building,
  Europe: Building,
  "Sri Lanka": Palmtree,
  Vietnam: Mountain,
  Cambodia: Building,
  "Lakshadweep Island": Palmtree,
  Egypt: Building,
  Japan: Building,
  Switzerland: Mountain,
  Mauritius: Palmtree,
  Seychelles: Palmtree,
  Australia: Building,
  "South Korea": Building,
  USA: Building,
  Canada: Mountain,
  "New Zealand": Mountain,
  "South Africa": Palmtree,
};

const DESTINATION_COLORS: Record<string, string> = {
  Thailand: "from-orange-500 to-red-500",
  "Singapore & Malaysia": "from-pink-500 to-rose-500",
  "Azerbaijan (Baku)": "from-cyan-500 to-blue-500",
  "Indonesia (Bali)": "from-green-500 to-emerald-500",
  Turkey: "from-amber-500 to-yellow-500",
  Dubai: "from-purple-500 to-violet-500",
  "Scotland & London": "from-blue-500 to-indigo-500",
  Andaman: "from-teal-500 to-cyan-500",
  Maldives: "from-sky-500 to-blue-500",
  China: "from-red-500 to-orange-500",
  Europe: "from-violet-500 to-purple-500",
  "Sri Lanka": "from-amber-500 to-orange-500",
  Vietnam: "from-green-500 to-teal-500",
  Cambodia: "from-orange-500 to-amber-500",
  "Lakshadweep Island": "from-cyan-500 to-sky-500",
  Egypt: "from-amber-500 to-yellow-600",
  Japan: "from-red-500 to-rose-600",
  Switzerland: "from-blue-400 to-indigo-600",
  Mauritius: "from-teal-400 to-emerald-600",
  Seychelles: "from-sky-400 to-blue-600",
  Australia: "from-amber-400 to-orange-600",
  "South Korea": "from-indigo-500 to-purple-600",
  USA: "from-blue-600 to-red-600",
  Canada: "from-red-500 to-white/50",
  "New Zealand": "from-green-600 to-blue-600",
  "South Africa": "from-yellow-500 to-green-600",
};

function InternationalPackagesPage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const destinations = getUniqueDestinations();

  // Filter packages by selected destination
  const filteredPackages = selectedDestination
    ? INTERNATIONAL_PACKAGES.filter((p) => p.destination === selectedDestination)
    : INTERNATIONAL_PACKAGES;

  return (
    <MobileViewLayout title="International Packages">
      <div className="pb-28 space-y-6">
        {/* Hero Section */}
        <div className="relative h-[340px] -mx-4 -mt-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e1b7865fc?auto=format&fit=crop&q=80&w=800"
            alt="International Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute top-6 left-6 right-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" /> Best Prices Guaranteed
            </span>
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <h1 className="text-4xl font-black text-white leading-tight tracking-tighter">
              International
              <span className="text-orange-400 block">Packages</span>
            </h1>
            <p className="text-white/80 text-sm mt-2 font-medium max-w-[260px]">
              Explore the world with our curated international destinations
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 -mt-12 relative z-10">
          <div className="bg-white rounded-[28px] p-5 shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Destinations", value: destinations.length },
                { label: "Packages", value: INTERNATIONAL_PACKAGES.length },
                { label: "Best Price", value: "₹19,999" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Pricing Summary Table (Matching Image Style) */}
        <div className="px-4">
          <div className="bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-gray-800 shadow-2xl">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-white font-black text-xl flex items-center gap-2">
                <Wallet className="h-5 w-5 text-amber-500" />
                Global Pricing Summary
              </h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                Best Rates Guaranteed
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {INTERNATIONAL_PACKAGES.slice(0, 20).map((pkg, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800/50 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-200">{pkg.destination}</span>
                          <span className="text-[10px] text-gray-500">
                            {pkg.description.split(" - ")[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                          {pkg.duration}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white">
                            ₹{pkg.priceINR.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[9px] text-gray-500">
                            {pkg.pricePerPerson ? "per person" : "total"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-gradient-to-t from-black/50 to-transparent">
              <Link
                to="/mobile-view/contact"
                className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all"
              >
                Get Full Rate Card <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Destination Filter */}
        <div className="px-4">
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
            Choose Destination
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
            <button
              onClick={() => setSelectedDestination(null)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                selectedDestination === null
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            {destinations.map((dest) => {
              const IconComponent = DESTINATION_ICONS[dest] || Globe;
              const color = DESTINATION_COLORS[dest] || "from-gray-500 to-gray-600";
              return (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                    selectedDestination === dest
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {dest.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              {selectedDestination ? `${selectedDestination} Packages` : "Popular Packages"}
            </h2>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredPackages.length} available
            </span>
          </div>

          <div className="space-y-4">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="px-4">
          <div className="bg-gray-900 rounded-[32px] p-6 text-white">
            <h3 className="text-lg font-black mb-4">Why Choose Vicky Ryoko?</h3>
            <div className="space-y-3">
              {[
                { icon: Check, text: "Best Price Guarantee" },
                { icon: Check, text: "Expert Local Guides" },
                { icon: Check, text: "24/7 Travel Support" },
                { icon: Check, text: "Transparent Pricing" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-gray-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-4">
          <Link
            to="/mobile-view/contact"
            className="block bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-black text-center shadow-xl shadow-orange-500/25"
          >
            Plan Your Trip â†’
          </Link>
        </div>
      </div>
    </MobileViewLayout>
  );
}

// Package Card Component
function PackageCard({ pkg }: { pkg: InternationalPackage }) {
  const IconComponent = DESTINATION_ICONS[pkg.destination] || Globe;
  const color = DESTINATION_COLORS[pkg.destination] || "from-gray-500 to-gray-600";

  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-50 group active:scale-[0.98] transition-all">
      <div className="relative h-44">
        <img
          src={getCountryCardImage(pkg.countryCode) || unsplash(pkg.image, 600, 400)}
          alt={pkg.destination}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`} />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase">
            <Clock className="h-3 w-3" />
            {pkg.duration}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
            <Star className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-xs font-medium text-white/90">{pkg.destination}</span>
          <div className="flex items-center gap-1">
            {pkg.flightIncluded ? (
              <span className="flex items-center gap-1 px-2 py-1 bg-blue-500 rounded-full text-white text-[10px] font-bold">
                <Plane className="h-3 w-3" /> Flight Included
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 bg-gray-500/50 rounded-full text-white text-[10px] font-bold">
                <Plane className="h-3 w-3" /> Without Flight
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-black text-gray-800">{pkg.destination}</h3>
            <p className="text-xs text-gray-500 line-clamp-2 mt-1">{pkg.description}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 3).map((highlight, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Starting at</p>
            <p className="text-2xl font-black text-orange-600">
              ₹{pkg.priceINR.toLocaleString("en-IN")}
            </p>
            {pkg.pricePerPerson && <p className="text-[10px] text-gray-500">per person</p>}
            {pkg.taxes && <p className="text-[10px] text-gray-400">{pkg.taxes}</p>}
          </div>
          <Link
            to="/mobile-view/contact"
            className="px-5 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg group-hover:bg-orange-600 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
