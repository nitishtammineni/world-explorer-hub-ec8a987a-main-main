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
  User,
  Hotel,
  Utensils,
  Car,
  Camera,
  Mountain,
  Palmtree,
  Waves,
  Compass,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { BackButton } from "@/components/ui/BackButton";

export const Route = createFileRoute("/package-individual")({
  head: () => ({
    meta: [
      { title: "Individual Tours - Vicky Ryoko Tours" },
      {
        name: "description",
        content:
          "Solo travel adventures with personalized itineraries. Explore India at your own pace!",
      },
    ],
  }),
  component: PackageIndividualPage,
});

const individualPackages = [
  {
    id: 1,
    name: "Ladakh Expedition",
    description: "Epic motorcycle tour through the Himalayas",
    duration: "10 Days / 9 Nights",
    places: ["Leh", "Nubra Valley", "Pangong Lake", "Kargil"],
    gradient: "from-violet-500 to-purple-600",
    bestTime: "May - September",
    highlights: ["High altitude passes", "Lake camping", "Monasteries"],
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    description: "Relaxing houseboat journey through serene backwaters",
    duration: "6 Days / 5 Nights",
    places: ["Kochi", "Alleppey", "Kumarakom", "Kovalam"],
    gradient: "from-green-500 to-emerald-600",
    bestTime: "October - March",
    highlights: ["Houseboat stay", "Ayurvedic spa", "Beach relaxation"],
  },
  {
    id: 3,
    name: "Himalayan Trek",
    description: "Challenging trek through breathtaking mountain trails",
    duration: "8 Days / 7 Nights",
    places: ["Delhi", "Rishikesh", "Chandrashila", "Tungnath"],
    gradient: "from-orange-500 to-red-500",
    bestTime: "April - June, September - November",
    highlights: ["Temple visit", "Sunrise views", "Yoga sessions"],
  },
  {
    id: 4,
    name: "Goa Beach Escape",
    description: "Solo-friendly beach vacation with adventure activities",
    duration: "5 Days / 4 Nights",
    places: ["North Goa", "South Goa", "Dudhsagar Falls"],
    gradient: "from-blue-500 to-cyan-500",
    bestTime: "October - March",
    highlights: ["Beach parties", "Water sports", "Portuguese heritage"],
  },
  {
    id: 5,
    name: "Sikkim Circuit",
    description: "Explore the beautiful valleys and monasteries",
    duration: "7 Days / 6 Nights",
    places: ["Gangtok", "Pelling", "Gyalshing", "Lachung"],
    gradient: "from-pink-500 to-rose-500",
    bestTime: "March - June, September - December",
    highlights: ["Monasteries", "Mountain views", "Local culture"],
  },
  {
    id: 6,
    name: "Rajasthan Heritage",
    description: "Explore royal palaces and desert landscapes",
    duration: "8 Days / 7 Nights",
    places: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
    gradient: "from-amber-500 to-yellow-500",
    bestTime: "October - March",
    highlights: ["Palace stays", "Camel safari", "Cultural shows"],
  },
];

function PackageIndividualPage() {
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  return (
    <MobileViewLayout title="Individual Tours" showBack={true}>
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Solo Adventures</span>
            </div>
            <h1 className="text-2xl font-bold">Individual Tours</h1>
            <p className="mt-2 text-white/90 text-sm">
              Forge your own path with personalized solo journeys tailored just for you
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>4.9 Rating • 120+ Packages</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Packages</h2>
        <div className="space-y-4">
          {individualPackages.map((pkg) => (
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
                    <Calendar className="h-4 w-4" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {pkg.bestTime}
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
                      Customize This Trip
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
