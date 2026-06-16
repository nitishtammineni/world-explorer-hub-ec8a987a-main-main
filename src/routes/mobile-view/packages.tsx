import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  ArrowRight,
  User,
  Heart,
  Users,
  Bike,
  Backpack,
  Star,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages - Vicky Ryoko Tours" },
      { name: "description", content: "Choose your perfect travel package." },
    ],
  }),
  component: MobileViewPackagesPage,
});

const packageTypes = [
  {
    id: "individual",
    icon: User,
    title: "Individual Tours",
    subtitle: "Solo Adventures",
    desc: "Personalized solo journeys with flexible itineraries",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "family",
    icon: Heart,
    title: "Family Packages",
    subtitle: "Family Getaways",
    desc: "Fun-filled adventures for the whole family",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "group",
    icon: Users,
    title: "Group Tours",
    subtitle: "Team Adventures",
    desc: "Unforgettable group experiences",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "bike",
    icon: Bike,
    title: "Bike Riders",
    subtitle: "Motorcycle Tours",
    desc: "Thrilling bike tours across scenic routes",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "backpack",
    icon: Backpack,
    title: "Backpacking",
    subtitle: "Long-Term Travel",
    desc: "Budget-friendly adventures across India",
    gradient: "from-green-500 to-emerald-600",
  },
];

function PackageCard({
  pkg,
  isOpen,
  onToggle,
}: {
  pkg: (typeof packageTypes)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  // Map to explicit routes
  const routeMap: Record<string, string> = {
    individual: "/package-individual",
    family: "/package-family",
    group: "/package-group",
    bike: "/package-bike",
    backpack: "/package-backpack",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
      <button onClick={onToggle} className="w-full p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-2xl shadow-md`}
          >
            <pkg.icon className="h-7 w-7 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-800">{pkg.title}</h3>
            <p className="text-sm text-gray-500">{pkg.subtitle}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-gray-400" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-gray-600 text-sm">{pkg.desc}</p>
          <Link
            to={routeMap[pkg.id] as any}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center block"
          >
            View Packages â†’
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileViewPackagesPage() {
  const [openPkg, setOpenPkg] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const fullText = "Tour Packages";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const togglePkg = (id: string) => {
    setOpenPkg(openPkg === id ? null : id);
  };

  return (
    <MobileViewLayout title="Tour Packages">
      <div className="p-4">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <h1 className="text-2xl font-bold">🎉 Tour Packages</h1>
          <p className="mt-2 text-white/90 text-sm">Choose your adventure style</p>
          <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
            <Star className="h-4 w-4" />
            <span>4.9 Rating • 10K+ Travelers</span>
          </div>
        </div>

        {/* Package Types */}
        {packageTypes.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isOpen={openPkg === pkg.id}
            onToggle={() => togglePkg(pkg.id)}
          />
        ))}

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white text-center mt-6">
          <h3 className="text-xl font-bold mb-2">Need a Customized Package?</h3>
          <p className="text-gray-400 text-sm mb-4">Tell us your preferences</p>
          <Link
            to="/mobile-view/contact"
            className="inline-flex items-center gap-2 bg-orange-500 px-6 py-3 rounded-xl font-semibold"
          >
            Contact Us <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </MobileViewLayout>
  );
}
