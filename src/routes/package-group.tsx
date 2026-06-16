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
  Users,
  Building,
  Award,
  Car,
  Utensils,
  Palmtree,
  Briefcase,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { BackButton } from "@/components/ui/BackButton";

export const Route = createFileRoute("/package-group")({
  head: () => ({
    meta: [
      { title: "Group Tours - Vicky Ryoko Tours" },
      {
        name: "description",
        content: "Corporate retreats, school trips & team building adventures.",
      },
    ],
  }),
  component: PackageGroupPage,
});

const groupPackages = [
  {
    id: 1,
    name: "Rajasthan Heritage",
    description: "Royal palaces and desert adventure for large groups",
    duration: "6 Days / 5 Nights",
    places: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"],
    gradient: "from-blue-500 to-cyan-500",
    bestTime: "October - March",
    highlights: ["Palace stay", "Camel safari", "Cultural show"],
    minGroup: 10,
  },
  {
    id: 2,
    name: "Kerala Corporate",
    description: "Relaxing backwaters for team building",
    duration: "5 Days / 4 Nights",
    places: ["Kochi", "Alleppey", "Munnar"],
    gradient: "from-green-500 to-emerald-600",
    bestTime: "October - March",
    highlights: ["Houseboat", "Ayurveda", "Team activities"],
    minGroup: 15,
  },
  {
    id: 3,
    name: "Goa Beach Club",
    description: "Beach fun and water sports for groups",
    duration: "4 Days / 3 Nights",
    places: ["North Goa", "South Goa"],
    gradient: "from-purple-500 to-pink-500",
    bestTime: "October - March",
    highlights: ["Water sports", "Beach parties", "Group discounts"],
    minGroup: 20,
  },
  {
    id: 4,
    name: "Himachal Adventure",
    description: "Mountain trek and camping for adventure groups",
    duration: "6 Days / 5 Nights",
    places: ["Manali", "Solang", "Kasol"],
    gradient: "from-orange-500 to-amber-500",
    bestTime: "April - June, September - November",
    highlights: ["Trekking", "Camping", "Bonfire"],
    minGroup: 12,
  },
  {
    id: 5,
    name: "Andaman Expedition",
    description: "Island hopping for large groups",
    duration: "6 Days / 5 Nights",
    places: ["Port Blair", "Havelock", "Neil Island"],
    gradient: "from-cyan-500 to-blue-600",
    bestTime: "October - March",
    highlights: ["Snorkeling", "Beach", "Scuba"],
    minGroup: 15,
  },
  {
    id: 6,
    name: "Buddhist Circuit",
    description: "Spiritual journey for group pilgrimages",
    duration: "7 Days / 6 Nights",
    places: ["Bodh Gaya", "Rajgir", "Nalanda", "Varanasi"],
    gradient: "from-amber-500 to-yellow-600",
    bestTime: "October - March",
    highlights: ["Temples", "Pilgrimage", "Spiritual"],
    minGroup: 20,
  },
];

function PackageGroupPage() {
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);

  return (
    <MobileViewLayout title="Group Tours" showBack={true}>
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Team Adventures</span>
            </div>
            <h1 className="text-2xl font-bold">Group Tours</h1>
            <p className="mt-2 text-white/90 text-sm">
              Unforgettable group experiences with team building and shared joy
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
              <Star className="h-4 w-4 text-yellow-300" />
              <span>4.9 Rating • 65+ Packages</span>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Packages</h2>
        <div className="space-y-4">
          {groupPackages.map((pkg) => (
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
                    <Users className="h-4 w-4" />
                    Min {pkg.minGroup}+
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
