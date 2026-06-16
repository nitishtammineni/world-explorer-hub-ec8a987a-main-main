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
  ArrowRight,
} from "lucide-react";
import { LocationSearch } from "@/components/LocationSearch";

type MobileHomeProps = {
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

export function MobileHome({
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
}: MobileHomeProps) {
  return (
    <div className="md:hidden">
      {/* SEARCH BOX */}
      <div className="bg-white mx-0 mt-4 rounded-2xl shadow-lg overflow-hidden">
        {/* Region Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => handleRegionChange("domestic")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${
              region === "domestic"
                ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Home className="h-4 w-4" />
            Domestic
          </button>
          <button
            onClick={() => handleRegionChange("international")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-all ${
              region === "international"
                ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Globe className="h-4 w-4" />
            International
          </button>
        </div>

        <div className="flex bg-gray-100/50 p-1">
          {serviceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="xs:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 space-y-3">
          {activeTab === "flights" && (
            <>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="From"
                    placeholder="Airport"
                    locations={currentAirports}
                    value={fromLocation}
                    onChange={setFromLocation}
                  />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="To"
                    placeholder="Airport"
                    locations={currentAirports}
                    value={toLocation}
                    onChange={setToLocation}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Departure</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="bg-transparent font-medium text-sm focus:outline-none w-full"
                    />
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="bg-transparent font-medium w-full text-sm mt-1 focus:outline-none"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                    <option>5+ Adults</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === "hotels" && region === "domestic" && (
            <>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <LocationSearch
                  label="City/Hotel Location"
                  placeholder="City"
                  locations={currentCities}
                  value={toLocation}
                  onChange={setToLocation}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="bg-transparent font-medium text-sm w-full mt-1 focus:outline-none"
                  />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="bg-transparent font-medium text-sm w-full mt-1 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "trains" && (
            <>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="From"
                    placeholder="Station"
                    locations={currentStations}
                    value={fromLocation}
                    onChange={setFromLocation}
                  />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="To"
                    placeholder="Station"
                    locations={currentStations}
                    value={toLocation}
                    onChange={setToLocation}
                  />
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <label className="text-xs text-gray-500 block">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent font-medium text-sm w-full mt-1 focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === "buses" && (
            <>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="From"
                    placeholder="City"
                    locations={currentCities}
                    value={fromLocation}
                    onChange={setFromLocation}
                  />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <LocationSearch
                    label="To"
                    placeholder="City"
                    locations={currentCities}
                    value={toLocation}
                    onChange={setToLocation}
                  />
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <label className="text-xs text-gray-500 block">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent font-medium text-sm w-full mt-1 focus:outline-none"
                />
              </div>
            </>
          )}

          <button
            onClick={handleSubmitViaWhatsApp}
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg"
          >
            <MessageCircle className="h-5 w-5" />
            Submit via WhatsApp
          </button>
        </div>
      </div>

      {/* FEATURED DESTINATIONS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Featured Destinations</h2>
          <Link to="/countries" className="text-orange-600 text-sm font-medium">
            View All
          </Link>
        </div>

        {/* SPECIAL EUROPE CARD MOBILE */}
        <Link
          to="/countries?region=Europe"
          className="group relative mb-4 block overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yYzAtMiAxLjQtMyAzLTMgM3YyaDEwYzIuNiAwIDQtMS40IDQtM3YtMmgyMHYyYzAgMiAxLjQgMyAzIDMgNWgyNHYyYzAgMi0xLjQgMy0zIDN6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <div className="relative px-5 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  <Award className="h-3 w-3" />
                  <span>Exclusive Europe</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-1">
                  Explore <span className="text-amber-400">Europe</span>
                </h3>
                <p className="text-indigo-200 text-xs mb-2">
                  20+ Destinations • Paris, Rome, Swiss Alps & more
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-indigo-300 text-[10px] font-medium mb-0.5">From</div>
                <div className="text-2xl font-black text-white">₹3,99,999</div>
                <div className="mt-2 flex items-center gap-1 bg-white text-purple-900 px-3 py-1.5 rounded-full text-xs font-bold">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          {featured.slice(0, 4).map((c) => (
            <Link
              key={c.cca3}
              to="/countries/$code"
              params={{ code: c.cca3 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm block"
            >
              <div className="h-28 bg-gray-200 relative">
                <img src={c.flags.svg} alt={c.name.common} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 z-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full p-1 shadow-md">
                  <Star className="h-3 w-3 fill-white" />
                </div>
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm">{c.name.common}</div>
                <div className="text-[10px] text-gray-500">{c.capital?.[0] ?? "—"}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm"
            >
              <item.icon className="h-6 w-6 text-orange-600" />
              <span className="text-[10px] font-medium text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED PACKAGES */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Popular Packages</h2>
          <Link to="/packages" className="text-orange-600 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredPackages.slice(0, 4).map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-24 bg-gray-200 relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {pkg.discount}
                </div>
              </div>
              <div className="p-3">
                <div className="font-semibold text-xs truncate">{pkg.name}</div>
                <div className="text-[10px] text-gray-500">{pkg.duration}</div>
                <div className="mt-2 text-orange-600 font-bold text-sm">${pkg.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 gap-3">
          {ourServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4"
            >
              <div className={`${service.color} p-3 rounded-xl text-white`}>
                <service.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-sm">{service.title}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{service.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
