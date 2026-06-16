import { Link } from "@tanstack/react-router";
import {
  Home,
  Globe,
  Plane,
  Building2,
  Train,
  Bus,
  Calendar,
  MessageCircle,
  Star,
  MapPin,
  Award,
  Users,
  Clock3,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import { LocationSearch } from "@/components/LocationSearch";

type DesktopHomeProps = {
  region: "domestic" | "international";
  handleRegionChange: (region: "domestic" | "international") => void;
  activeTab: string;
  handleTabChange: (tab: any) => void;
  serviceTabs: any[];
  fromLocation: string;
  setFromLocation: (loc: string) => void;
  toLocation: string;
  setToLocation: (loc: string) => void;
  currentAirports: any[];
  currentStations: any[];
  currentCities: any[];
  departureDate: string;
  setDepartureDate: (date: string) => void;
  travelers: string;
  setTravelers: (t: string) => void;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  handleSubmitViaWhatsApp: () => void;
  featured: any[];
  quickLinks: any[];
  featuredPackages: any[];
  ourServices: any[];
  testimonials: any[];
  whyChooseUs: any[];
};

export function DesktopHome({
  region,
  handleRegionChange,
  activeTab,
  handleTabChange,
  serviceTabs,
  fromLocation,
  setFromLocation,
  toLocation,
  setToLocation,
  currentAirports,
  currentStations,
  currentCities,
  departureDate,
  setDepartureDate,
  travelers,
  setTravelers,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  travelDate,
  setTravelDate,
  handleSubmitViaWhatsApp,
  featured,
  quickLinks,
  featuredPackages,
  ourServices,
  testimonials,
  whyChooseUs,
}: DesktopHomeProps) {
  return (
    <div className="hidden md:block">
      {/* SEARCH BOX */}
      <div className="bg-white mx-auto mt-8 max-w-4xl py-8 rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Region Tabs */}
        <div className="flex border-b border-gray-100 mb-6">
          <button
            onClick={() => handleRegionChange("domestic")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-bold transition-all ${
              region === "domestic"
                ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Home className="h-5 w-5" />
            Domestic
          </button>
          <button
            onClick={() => handleRegionChange("international")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-bold transition-all ${
              region === "international"
                ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Globe className="h-5 w-5" />
            International
          </button>
        </div>

        <div className="px-8 mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg text-base font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 space-y-4">
          {activeTab === "flights" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <LocationSearch
                  label="From"
                  placeholder="Airport"
                  locations={currentAirports}
                  value={fromLocation}
                  onChange={setFromLocation}
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <LocationSearch
                  label="To"
                  placeholder="Airport"
                  locations={currentAirports}
                  value={toLocation}
                  onChange={setToLocation}
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="text-sm text-gray-500 block mb-1">Departure</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent font-bold text-lg focus:outline-none w-full"
                />
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="text-sm text-gray-500 block mb-1">Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="bg-transparent font-bold text-lg w-full focus:outline-none"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                  <option>5+ Adults</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "hotels" && region === "domestic" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <LocationSearch
                  label="City/Hotel Location"
                  placeholder="City"
                  locations={currentCities}
                  value={toLocation}
                  onChange={setToLocation}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="text-sm text-gray-500 block mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="bg-transparent font-bold text-lg w-full focus:outline-none"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="text-sm text-gray-500 block mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="bg-transparent font-bold text-lg w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmitViaWhatsApp}
            className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02]"
          >
            <MessageCircle className="h-6 w-6" />
            Plan with Experts via WhatsApp
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="mt-16 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 py-20 text-white">
        <div className="container-app">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-black mb-6 leading-tight">
                Your Journey,
                <br />
                Our Expertise.
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Experience seamless travel planning with Vicky Ryoko. We handle the details, you
                make the memories.
              </p>
              <div className="flex gap-8">
                {whyChooseUs.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-4xl font-black mb-1">{stat.stat}</div>
                    <div className="text-white/70 text-sm uppercase tracking-widest">
                      {stat.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ourServices.map((s) => (
                <div
                  key={s.id}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <s.icon className="h-10 w-10 mb-4" />
                  <div className="text-xl font-bold mb-2">{s.title}</div>
                  <div className="text-white/70 text-sm">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED DESTINATIONS */}
      <div className="py-20 bg-gray-50">
        <div className="container-app">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Popular Destinations</h2>
              <p className="text-gray-500 text-lg">Hand-picked locations for your next adventure</p>
            </div>
            <Link
              to="/countries"
              className="text-orange-600 text-lg font-bold hover:underline flex items-center gap-2"
            >
              Explore All Countries <Globe className="h-5 w-5" />
            </Link>
          </div>

          {/* SPECIAL EUROPE CARD */}
          <Link
            to="/countries?region=Europe"
            className="group relative mb-10 block overflow-hidden rounded-3xl shadow-2xl transition-all hover:shadow-3xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yYzAtMiAxLjQtMyAzLTMgM3YyaDEwYzIuNiAwIDQtMS40IDQtM3YtMmgyMHYyYzAgMiAxLjQgMyAzIDMgNWgyNHYyYzAgMi0xLjQgMy0zIDN6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
            <div className="relative px-8 py-10 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="hidden lg:flex items-center gap-3">
                  <div className="relative">
                    <Award className="h-24 w-24 text-amber-400 drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 bg-amber-400 text-purple-900 rounded-full p-1.5 shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                    <Award className="h-4 w-4" />
                    <span>Exclusive Europe Packages</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-white mb-2">
                    Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300">
                      Europe
                    </span>
                  </h3>
                  <p className="text-indigo-200 text-lg max-w-xl mb-4">
                    Discover 20+ magical European destinations — from Paris to Rome, Swiss Alps to
                    Greek Islands. Unforgettable adventures await!
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <span className="ml-2 text-indigo-200 text-sm">4.9 (500+ reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-indigo-300 text-sm font-medium mb-1">Starting from</div>
                <div className="text-5xl lg:text-6xl font-black text-white mb-2">₹3,99,999</div>
                <div className="text-indigo-300 text-sm">per person • 13 Nights / 14 Days</div>
                <div className="mt-4 inline-flex items-center gap-2 bg-white text-purple-900 px-6 py-3 rounded-full font-bold transition-all group-hover:gap-3">
                  Explore Now <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-4 gap-8">
            {featured.slice(0, 8).map((c) => (
              <Link
                key={c.cca3}
                to="/countries/$code"
                params={{ code: c.cca3 }}
                className="group relative h-[400px] rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-2"
              >
                <img
                  src={c.flags.svg}
                  alt={c.name.common}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full p-1.5 shadow-lg shadow-orange-500/40">
                  <Star className="h-3.5 w-3.5 fill-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-3xl font-black mb-2">{c.name.common}</div>
                  <div className="text-white/80 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {c.capital?.[0]}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
