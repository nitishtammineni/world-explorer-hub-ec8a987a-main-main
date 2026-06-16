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
  Heart,
  Users,
  Baby,
  Hotel,
  Utensils,
  Car,
  Palmtree,
  Waves,
  Park,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { BackButton } from "@/components/ui/BackButton";

export const Route = createFileRoute("/package-family")({
  head: () => ({
    meta: [
      { title: "Family Packages - Vicky Ryoko Tours" },
      {
        name: "description",
        content: "Family-friendly vacation packages. Fun for all ages!",
      },
    ],
  }),
  component: PackageFamilyPage,
});

const familyPackages = [
  {
    id: 1,
    name: "Kerala Backwaters & Beach",
    description: "Perfect family houseboat adventure with beach fun",
    duration: "6 Days / 5 Nights",
    places: ["Kochi", "Alleppey", "Kovalam", "Varkala"],
    gradient: "from-pink-500 to-rose-500",
    bestTime: "October - March",
    highlights: ["Houseboat", "Beach", "Ayurveda"],
    familyRating: 5,
  },
  {
    id: 2,
    name: "Goa Beach Vacation",
    description: "Fun-filled beach holiday for the whole family",
    duration: "5 Days / 4 Nights",
    places: ["North Goa", "South Goa", "Dudhsagar Falls"],
    gradient: "from-blue-500 to-cyan-500",
    bestTime: "October - March",
    highlights: ["Water sports", "Beach", "Kids club"],
    familyRating: 5,
  },
  {
    id: 3,
    name: "Ooty & Munnar Hill Station",
    description: "Scenic mountain retreat with toy train adventure",
    duration: "5 Days / 4 Nights",
    places: ["Ooty", "Coonoor", "Munnar", "Kodaikanal"],
    gradient: "from-green-500 to-emerald-600",
    bestTime: "April - June, September - November",
    highlights: ["Toy train", "Tea gardens", "Nature walks"],
    familyRating: 4,
  },
  {
    id: 4,
    name: "Andaman Islands",
    description: "Crystal clear waters and sandy beaches adventure",
    duration: "6 Days / 5 Nights",
    places: ["Port Blair", "Havelock", "Neil Island"],
    gradient: "from-cyan-500 to-blue-600",
    bestTime: "October - March",
    highlights: ["Scuba", "Beach", "Snorkeling"],
    familyRating: 5,
  },
  {
    id: 5,
    name: "Darjeeling & Kalimpong",
    description: "Toy train rides and mountain views",
    duration: "5 Days / 4 Nights",
    places: ["Darjeeling", "Kalimpong", "Gangtok"],
    gradient: "from-orange-500 to-amber-500",
    bestTime: "April - June, September - November",
    highlights: ["Toy train", "Monasteries", "Toy factory"],
    familyRating: 4,
  },
  {
    id: 6,
    name: "Jim Corbett Safari",
    description: "Exciting wildlife adventure for families",
    duration: "4 Days / 3 Nights",
    places: ["Ramnagar", "Corbett", "Nainital"],
    gradient: "from-amber-500 to-yellow-600",
    bestTime: "November - June",
    highlights: ["Safari", "Elephant ride", "Bird watching"],
    familyRating: 4,
  },
];

function PackageFamilyPage() {
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  return (
    <MobileViewLayout title="Family Packages" showBack={true}>
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Family Getaways</span>
            </div>
            <h1 className="text-2xl font-bold">Family Packages</h1>
            <p className="mt-2 text-white/90 text-sm">
              Create priceless memories with fun-filled adventures for the whole family
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>4.9 Rating • 85+ Packages</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Packages</h2>
        <div className="space-y-4">
          {familyPackages.map((pkg) => (
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
