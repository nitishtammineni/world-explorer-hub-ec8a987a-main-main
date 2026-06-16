import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  ChevronRight,
  Check,
  Backpack,
  Globe,
  Bus,
  Hotel,
  Utensils,
  Map,
  Compass,
  Wallet,
  Camera,
  Palmtree,
  Mountain,
  Waves,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { BackButton } from "@/components/ui/BackButton";

export const Route = createFileRoute("/package-backpack")({
  head: () => ({
    meta: [
      { title: "Backpacking Tours - Vicky Ryoko Tours" },
      {
        name: "description",
        content: "Long-duration budget-friendly travel adventures across India.",
      },
    ],
  }),
  component: PackageBackpackPage,
});

const backpackPackages = [
  {
    id: 1,
    name: "Golden Triangle Extended",
    description: "Classic India backpacking route with extended stays",
    duration: "21 Days / 20 Nights",
    places: ["Delhi", "Agra", "Jaipur", "Varanasi", "Rishikesh", "Amritsar"],
    gradient: "from-amber-500 to-orange-500",
    bestTime: "October - March",
    budget: "₹25,000 - ₹40,000",
    style: "Budget",
    highlights: ["Hostels", "Train travel", "Street food", "Temples"],
    transport: "Trains & Buses",
  },
  {
    id: 2,
    name: "South India Explorer",
    description: "Temples, beaches and backwaters of the south",
    duration: "30 Days / 29 Nights",
    places: ["Chennai", "Madurai", "Kodaikanal", "Kochi", "Alleppey", "Munnar", "Kanyakumari"],
    gradient: "from-green-500 to-emerald-600",
    bestTime: "October - March",
    budget: "₹30,000 - ₹50,000",
    style: "Budget",
    highlights: ["Houseboats", "Temple tours", "Tea gardens", "Beaches"],
    transport: "Buses & Trains",
  },
  {
    id: 3,
    name: "Himalayan Trail",
    description: "Mountain villages and spiritual spots in the Himalayas",
    duration: "25 Days / 24 Nights",
    places: ["Delhi", "Rishikesh", "Haridwar", "Manali", "Leh", "Srinagar"],
    gradient: "from-purple-500 to-pink-500",
    bestTime: "May - September",
    budget: "₹35,000 - ₹55,000",
    style: "Adventure",
    highlights: ["Trekking", "Spiritual", "Mountains", "Camping"],
    transport: "Buses & Hitchhike",
  },
  {
    id: 4,
    name: "East Coast Odyssey",
    description: "Beach hopping along India's eastern coast",
    duration: "20 Days / 19 Nights",
    places: ["Kolkata", "Puri", "Konark", "Chennai", "Pondicherry", "Rameshwaram"],
    gradient: "from-cyan-500 to-blue-600",
    bestTime: "October - March",
    budget: "₹20,000 - ₹35,000",
    style: "Beach",
    highlights: ["Beaches", "Temples", "Food", "Culture"],
    transport: "Buses & Trains",
  },
  {
    id: 5,
    name: "Desert Trail",
    description: "Thar Desert and royal cities of Rajasthan",
    duration: "18 Days / 17 Nights",
    places: ["Delhi", "Jaipur", "Jodhpur", "Jaisalmer", "Bikaner", "Udaipur"],
    gradient: "from-yellow-500 to-amber-600",
    bestTime: "October - March",
    budget: "₹22,000 - ₹38,000",
    style: "Cultural",
    highlights: ["Desert", "Forts", "Camel safari", "Havelis"],
    transport: "Jeeps & Trains",
  },
  {
    id: 6,
    name: "Northeast Circuit",
    description: "Offbeat tribes and Himalayan beauty",
    duration: "22 Days / 21 Nights",
    places: ["Guwahati", "Shillong", "Tawang", "Ziro", "Majuli", "Cherrapunji"],
    gradient: "from-teal-500 to-green-600",
    bestTime: "October - April",
    budget: "₹40,000 - ₹60,000",
    style: "Adventure",
    highlights: ["Tribes", "Nature", "Culture", "Offbeat"],
    transport: "Shared jeeps",
  },
];

function PackageBackpackPage() {
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  return (
    <MobileViewLayout title="Backpacking" showBack={true}>
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Backpack className="h-5 w-5" />
              <span className="text-sm font-medium">Long-Term Travel</span>
            </div>
            <h1 className="text-2xl font-bold">Backpacking</h1>
            <p className="mt-2 text-white/90 text-sm">
              Embark on epic journeys with budget-friendly long-duration adventures
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>4.9 Rating • 98+ Trips</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Trips</h2>
        <div className="space-y-4">
          {backpackPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className={`p-5 bg-gradient-to-r ${pkg.gradient} text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-white/80 text-sm">{pkg.description}</p>
                  </div>
                  <button
                    onClick={() => setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)}
                    className="p-2 bg-white/20 rounded-full"
                  >
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${expandedPkg === pkg.id ? "rotate-90" : ""}`}
                    />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Wallet className="h-4 w-4" />
                    {pkg.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <Compass className="h-4 w-4" />
                    {pkg.style}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bus className="h-4 w-4" />
                    {pkg.transport}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {pkg.places.map((place) => (
                    <span
                      key={place}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {place}
                    </span>
                  ))}
                </div>
                {expandedPkg === pkg.id && (
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.highlights.map((hl) => (
                        <span
                          key={hl}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          {hl}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center block"
                    >
                      Plan This Trip
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileViewLayout>
  );
}
