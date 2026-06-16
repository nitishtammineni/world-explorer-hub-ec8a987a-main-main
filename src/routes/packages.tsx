import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  User,
  Globe2,
  Users,
  Plane,
  Heart,
  Briefcase,
  ArrowRight,
  MessageCircle,
  Bike,
  Backpack,
  Star,
} from "lucide-react";
import { MobileViewLayout } from "./mobile-view/-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content:
          "Choose your perfect travel package — Individual, Family, Group, Bike Riders, or Backpacking for long-term stays. Pack your bags and let's explore!",
      },
      { property: "og:title", content: "Packages — Vicky Ryoko Tours and Party's" },
      {
        property: "og:description",
        content: "Tailored travel packages for every type of traveler.",
      },
    ],
  }),
  component: PackagesPage,
});

const packages = [
  {
    icon: User,
    title: "Individual Tours",
    desc: "Solo adventures tailored just for you",
    link: "/package-individual",
  },
  {
    icon: Users,
    title: "Family Packages",
    desc: "Perfect getaways for the whole family",
    link: "/package-family",
  },
  {
    icon: Briefcase,
    title: "Group Tours",
    desc: "Team building & group adventures",
    link: "/package-group",
  },
  {
    icon: Bike,
    title: "Bike Riders",
    desc: "Motorcycle & cycling tours",
    link: "/package-bike",
  },
  {
    icon: Backpack,
    title: "Backpacking",
    desc: "Long-duration budget adventures",
    link: "/package-backpack",
  },
];

function PackagesPage() {
  const router = useRouter();
  const [openPkg, setOpenPkg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    router.navigate({ to: "/mobile-view/packages" });
  }, [router]);

  const togglePkg = (id: string) => {
    setOpenPkg(openPkg === id ? null : id);
  };

  return (
    <MobileViewLayout title="Tour Packages">
      <div className="p-4">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <DiscoTitle>
            <h1 className="text-2xl font-bold">🎒 Travel Packages</h1>
          </DiscoTitle>
          <p className="mt-2 text-white/90 text-sm">
            Choose the perfect package for your adventure!
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs bg-white/20 rounded-lg px-3 py-2 inline-flex">
            <Star className="h-4 w-4" />
            <span>4.9 Rating • 120+ Packages</span>
          </div>
        </div>

        {/* Package Types */}
        {packages.map((pkg) => (
          <div key={pkg.title} className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
            <button
              onClick={() => togglePkg(pkg.title)}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <pkg.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800">{pkg.title}</h3>
                  <p className="text-sm text-gray-500">{pkg.desc}</p>
                </div>
              </div>
              <ArrowRight
                className={`h-6 w-6 text-gray-400 transition-transform ${openPkg === pkg.title ? "rotate-90" : ""}`}
              />
            </button>

            {openPkg === pkg.title && (
              <div className="px-5 pb-5 space-y-4">
                <Link
                  to={pkg.link}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center block"
                >
                  View Packages →
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white text-center mt-6">
          <h3 className="text-xl font-bold mb-2">Need Help Choosing?</h3>
          <p className="text-gray-400 text-sm mb-4">Our travel experts are here to help</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 px-6 py-3 rounded-xl font-semibold"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Us <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </MobileViewLayout>
  );
}
