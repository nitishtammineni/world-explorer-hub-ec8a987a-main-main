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
  Bike,
  Zap,
  Map,
  Gauge,
  Wrench,
  Shield,
  Mountain,
  Hotel,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { BackButton } from "@/components/ui/BackButton";

export const Route = createFileRoute("/package-bike")({
  head: () => ({
    meta: [
      { title: "Bike Riders Tours - Vicky Ryoko Tours" },
      {
        name: "description",
        content: "Motorcycle tours and cycling adventures in India.",
      },
    ],
  }),
  component: PackageBikePage,
});

const bikePackages = [
  {
    id: 1,
    name: "Ladakh Bike Expedition",
    description: "The ultimate motorcycle adventure through Himalayas",
    duration: "12 Days / 11 Nights",
    places: ["Leh", "Nubra", "Pangong", "Kargil", "Manali"],
    gradient: "from-orange-500 to-amber-500",
    bestTime: "June - September",
    difficulty: "Extreme",
    distance: "1500 km",
    highlights: ["High passes", "Lake camping", "Mountain roads"],
    includes: ["Bike rental", "Support vehicle", "Mechanic", "Guide"],
  },
  {
    id: 2,
    name: "Spiti Valley Circuit",
    description: "Remote mountain roads through ancient villages",
    duration: "8 Days / 7 Nights",
    places: ["Manali", "Kaza", "Tabo", "Kalpa"],
    gradient: "from-red-500 to-pink-500",
    bestTime: "June - September",
    difficulty: "Hard",
    distance: "900 km",
    highlights: ["Roads", "Villages", "Monasteries"],
    includes: ["Bike rental", "Support vehicle", "Mechanic"],
  },
  {
    id: 3,
    name: "Himalayan Circuit",
    description: "Scenic mountain rides through valleys",
    duration: "7 Days / 6 Nights",
    places: ["Darjeeling", "Gangtok", "Kalimpong"],
    gradient: "from-purple-500 to-pink-500",
    bestTime: "March - June, September - November",
    difficulty: "Moderate",
    distance: "700 km",
    highlights: ["Tea gardens", "Monasteries", "Views"],
    includes: ["Bike rental", "Guide"],
  },
  {
    id: 4,
    name: "Coastal Ride",
    description: "Beach highway motorcycle tour",
    duration: "6 Days / 5 Nights",
    places: ["Mumbai", "Goa", "Gokarna", "Kochi"],
    gradient: "from-blue-500 to-cyan-500",
    bestTime: "October - March",
    difficulty: "Easy",
    distance: "850 km",
    highlights: ["Beaches", "Coastal roads", "Food"],
    includes: ["Bike rental", "Support vehicle"],
  },
  {
    id: 5,
    name: "Rajasthan Desert Ride",
    description: "Royal Rajasthan on two wheels",
    duration: "8 Days / 7 Nights",
    places: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur"],
    gradient: "from-amber-500 to-yellow-500",
    bestTime: "October - March",
    difficulty: "Easy",
    distance: "1200 km",
    highlights: ["Palaces", "Desert", "Forts"],
    includes: ["Bike rental", "Guide", "Hotel"],
  },
  {
    id: 6,
    name: "Northeast Adventure",
    description: "Explore the seven sisters on bike",
    duration: "10 Days / 9 Nights",
    places: ["Guwahati", "Shillong", "Tawang", "Ziro"],
    gradient: "from-green-500 to-emerald-600",
    bestTime: "October - April",
    difficulty: "Hard",
    distance: "1100 km",
    highlights: ["Mountains", "Tribal areas", "Nature"],
    includes: ["Bike rental", "Support vehicle", "Permits"],
  },
];

function PackageBikePage() {
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  return (
    <MobileViewLayout title="Bike Riders" showBack={true}>
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Bike className="h-5 w-5" />
              <span className="text-sm font-medium">Motorcycle Tours</span>
            </div>
            <h1 className="text-2xl font-bold">Bike Riders</h1>
            <p className="mt-2 text-white/90 text-sm">
              Hit the open road with thrilling motorcycle and cycling adventures
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>4.9 Rating • 52+ Tours</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Tours</h2>
        <div className="space-y-4">
          {bikePackages.map((pkg) => (
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
                    <Gauge className="h-4 w-4" />
                    {pkg.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Map className="h-4 w-4" />
                    {pkg.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {pkg.duration}
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
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">What's Included</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.includes.map((inc) => (
                        <span
                          key={inc}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          {inc}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center block"
                    >
                      Book This Ride
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
