import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  Globe,
  Plane,
  PartyPopper,
  MapPin,
  Star,
  Calendar,
  ArrowRight,
  ChevronRight,
  Shield,
  Clock,
  Headphones,
  Home,
  Train,
  Bus,
  Building2,
  MessageCircle,
  Award,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { useState, useEffect, useMemo } from "react";
import { getCountryCardImage, getCountryMainImage } from "@/lib/country-images";
import { getAllCountries } from "@/lib/countries";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/mobile-view/")({
  head: () => ({
    meta: [
      { title: "Vicky Ryoko Tours - Your Adventure Awaits" },
      {
        name: "description",
        content: "Discover amazing tours, parties and travel experiences worldwide.",
      },
    ],
  }),
  component: MobileHomePage,
});

// Hero section statistics
const stats = [
  { value: "50+", label: "Countries" },
  { value: "10K+", label: "Happy Travelers" },
  { value: "500+", label: "Tours" },
  { value: "24/7", label: "Support" },
];

// Quick action cards
const quickActions = [
  {
    icon: Globe,
    label: "Explore",
    desc: "All Countries",
    path: "/mobile-view/countries",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Plane,
    label: "International",
    desc: "Global Packages",
    path: "/mobile-view/international",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: PartyPopper,
    label: "Services",
    desc: "What We Offer",
    path: "/mobile-view/services",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Star,
    label: "About",
    desc: "Who We Are",
    path: "/mobile-view/about",
    color: "from-orange-500 to-red-600",
  },
];

// Featured destinations (with images like desktop)
const destinations = [
  {
    name: "India",
    code: "IND",
    flag: "🇮🇳",
    desc: "Incredible diversity",
    capital: "New Delhi",
    image: "/images/home page/India-card-1.webp",
  },
  {
    name: "Thailand",
    code: "THA",
    flag: "🇹🇭",
    desc: "Beaches & culture",
    capital: "Bangkok",
    image: "/images/explore/thailand/Thailand-main-card.webp",
  },
  {
    name: "Singapore",
    code: "SGP",
    flag: "🇸🇬",
    desc: "Modern marvels",
    capital: "Singapore",
    image: "/images/explore/singapore/singapore-main-image.webp",
  },
  {
    name: "Malaysia",
    code: "MYS",
    flag: "🇲🇾",
    desc: "Truly Asia",
    capital: "Kuala Lumpur",
    image: "/images/explore/malaysia/malasia-main-image.jpg",
  },
  {
    name: "UAE",
    code: "ARE",
    flag: "🇦🇪",
    desc: "Luxury & adventure",
    capital: "Abu Dhabi",
    image: "/images/explore/dubai/dubai-main-image.webp",
  },
  {
    name: "Indonesia",
    code: "IDN",
    flag: "🇮🇩",
    desc: "Tropical paradise",
    capital: "Jakarta",
    image: "/images/explore/indonesia/indonesia-main-image.jpeg",
  },
  {
    name: "Turkey",
    code: "TUR",
    flag: "🇹🇷",
    desc: "Bridge to East",
    capital: "Ankara",
    image: "/images/explore/turkey/turkey-main-images.avif",
  },
  {
    name: "Vietnam",
    code: "VNM",
    flag: "🇻🇳",
    desc: "Timeless charm",
    capital: "Hanoi",
    image: "/images/explore/vietnam/vietnam-main-image.jpeg",
  },
  {
    name: "Egypt",
    code: "EGY",
    flag: "🇪🇬",
    desc: "Ancient wonders",
    capital: "Cairo",
    image: "/images/explore/egypt/egypt-main-image.jpeg",
  },
  {
    name: "Maldives",
    code: "MDV",
    flag: "🇲🇻",
    desc: "Ocean serenity",
    capital: "Male",
    image: "/images/explore/maldives/maldives-main-image.jpg",
  },
];

// Why choose us features (matching desktop version with stats)
const features = [
  {
    icon: Shield,
    title: "Trusted Expertise",
    desc: "10+ years experience",
    stat: "10K+",
    color: "bg-blue-500",
  },
  {
    icon: Clock,
    title: "Happy Customers",
    desc: "Satisfied travelers",
    stat: "50K+",
    color: "bg-green-500",
  },
  {
    icon: Star,
    title: "Quick Processing",
    desc: "Fast visa services",
    stat: "48hrs",
    color: "bg-orange-500",
  },
  {
    icon: Award,
    title: "24/7 Support",
    desc: "Always available",
    stat: "Always",
    color: "bg-purple-500",
  },
];

// Featured Packages Data
// Note: Images are now dynamically fetched using getCountryCardImage based on countryCode
const featuredPackages = [
  {
    id: 1,
    name: "Paris Explorer",
    duration: "4 Days / 3 Nights",
    price: 69999,
    destination: "France",
    countryCode: "FRA",
    discount: "20% OFF",
  },
  {
    id: 2,
    name: "Swiss Alps",
    duration: "6 Days / 5 Nights",
    price: 69999,
    destination: "Switzerland",
    countryCode: "CHE",
    discount: "15% OFF",
  },
  {
    id: 3,
    name: "Bali Escape",
    duration: "5 Days / 4 Nights",
    price: 69999,
    destination: "Indonesia",
    countryCode: "IDN",
    discount: "25% OFF",
  },
  {
    id: 4,
    name: "Dubai Luxury",
    duration: "4 Days / 3 Nights",
    price: 69999,
    destination: "UAE",
    countryCode: "ARE",
    discount: "10% OFF",
  },
];

// Our Services Data
const ourServices = [
  {
    id: 1,
    title: "Visa Services",
    description: "Fast and hassle-free visa processing",
    icon: PartyPopper,
    color: "from-blue-500 to-blue-600",
    path: "/mobile-view/visa",
  },
  {
    id: 2,
    title: "Passport Services",
    description: "Fresh passport and renewals",
    icon: Shield,
    color: "from-green-500 to-green-600",
    path: "/mobile-view/passport",
  },
  {
    id: 3,
    title: "Tour Packages",
    description: "Customized itineraries",
    icon: MapPin,
    color: "from-purple-500 to-purple-600",
    path: "/mobile-view/packages",
  },
  {
    id: 4,
    title: "Airport Services",
    description: "Pickup and drop",
    icon: Plane,
    color: "from-orange-500 to-orange-600",
    path: "/mobile-view/services",
  },
];

type TabType = "flights" | "hotels" | "trains" | "buses";

const serviceTabs = [
  { id: "flights" as TabType, label: "Flights", icon: Plane },
  { id: "hotels" as TabType, label: "Hotels", icon: Building2 },
  { id: "trains" as TabType, label: "Trains", icon: Train },
  { id: "buses" as TabType, label: "Buses", icon: Bus },
];

function MobileHomePage() {
  const router = useRouter();

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: 1000 * 60 * 60,
  });

// Call all hooks first (required by React)
  const [region, setRegion] = useState<"domestic" | "international">("domestic");
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [typingText, setTypingText] = useState("");
  const fullText = "Vicky Ryoko Tours";

  // Form state for WhatsApp submission
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [travelers, setTravelers] = useState("1 Adult");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [hotelCity, setHotelCity] = useState("");

  // WhatsApp number
  const WHATSAPP_NUMBER = "918639888490";

  // Handle submit via WhatsApp
  const handleSubmitViaWhatsApp = () => {
    let message = `*🌍 New Travel Inquiry - Vicky Ryoko Tours*\n\n`;
    message += `*Region:* ${region === "domestic" ? "🏠 Domestic" : "✈️ International"}\n`;
    message += `*Service:* ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}\n\n`;

    if (activeTab === "flights") {
      message += `*Journey Details:*\n`;
      message += `*From:* ${fromLocation || "Not specified"}\n`;
      message += `*To:* ${toLocation || "Not specified"}\n`;
      message += `*Departure Date:* ${departureDate || "Not specified"}\n`;
      message += `*Travelers:* ${travelers}\n`;
    } else if (activeTab === "hotels") {
      message += `*Hotel Booking:*\n`;
      message += `*City:* ${hotelCity || "Not specified"}\n`;
      message += `*Check-in:* ${checkInDate || "Not specified"}\n`;
      message += `*Check-out:* ${checkOutDate || "Not specified"}\n`;
      message += `*Guests:* ${travelers}\n`;
    } else if (activeTab === "trains") {
      message += `*Train Journey:*\n`;
      message += `*From:* ${fromLocation || "Not specified"}\n`;
      message += `*To:* ${toLocation || "Not specified"}\n`;
      message += `*Travel Date:* ${travelDate || "Not specified"}\n`;
      message += `*Passengers:* ${travelers}\n`;
    } else if (activeTab === "buses") {
      message += `*Bus Journey:*\n`;
      message += `*From:* ${fromLocation || "Not specified"}\n`;
      message += `*To:* ${toLocation || "Not specified"}\n`;
      message += `*Travel Date:* ${travelDate || "Not specified"}\n`;
      message += `*Passengers:* ${travelers}\n`;
    }

    message += `\n*Please share the booking details and pricing.*`;
    
    // Use location.href for proper redirect
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Redirect desktop users back to main site
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      router.navigate({ to: "/" });
    }
  }, [router]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <MobileViewLayout title="Discover the World">
      <div className="p-4 space-y-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 p-6 text-white shadow-xl">
          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-2 -bottom-2 w-24 h-24 bg-white/10 rounded-full blur-xl" />

          <div className="relative z-10">
            <p className="text-orange-100 font-medium mb-3">Welcome to</p>
            <h1 className="text-3xl font-bold mb-4">
              {typingText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-white/90 text-sm mb-6">
              Your gateway to unforgettable adventures around the world
            </p>

            <Link
              to="/mobile-view/contact"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg"
            >
              Plan Your Trip <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* DOMESTIC/INTERNATIONAL TABS & SEARCH */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Region Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setRegion("domestic")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
                region === "domestic"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Home className="h-4 w-4" />
              Domestic
            </button>
            <button
              onClick={() => setRegion("international")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
                region === "international"
                  ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Globe className="h-4 w-4" />
              International
            </button>
          </div>

          {/* Service Tabs */}
          <div className="flex bg-gray-100/50 p-1 mx-3 mt-3 rounded-xl">
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="h-3 w-3" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="p-4 space-y-3">
{activeTab === "flights" && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">From</label>
                    <input
                      type="text"
                      placeholder="City/Airport"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">To</label>
                    <input
                      type="text"
                      placeholder="City/Airport"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">Departure</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">Travelers</label>
                    <select 
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
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

{activeTab === "hotels" && (
              <>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">City/Hotel</label>
                  <input
                    type="text"
                    placeholder="Enter city or hotel name"
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    className="w-full bg-transparent font-medium text-sm focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">Check-in</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">Check-out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Guests</label>
                  <select 
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-transparent font-medium text-sm focus:outline-none"
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
              </>
            )}

{activeTab === "trains" && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">From</label>
                    <input
                      type="text"
                      placeholder="Station"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">To</label>
                    <input
                      type="text"
                      placeholder="Station"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent font-medium text-sm focus:outline-none"
                  />
                </div>
              </>
            )}

{activeTab === "buses" && (
              <>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">From</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <label className="text-xs text-gray-500 block">To</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full bg-transparent font-medium text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <label className="text-xs text-gray-500 block">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent font-medium text-sm focus:outline-none"
                  />
                </div>
              </>
            )}

            <button 
              onClick={handleSubmitViaWhatsApp}
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              Submit via WhatsApp
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <div className="text-xl font-bold text-orange-600">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 shadow-md mx-auto`}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-bold text-gray-800 text-xs text-center">{action.label}</div>
                <div className="text-xs text-gray-500 text-center hidden sm:block">
                  {action.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED DESTINATIONS */}
        <div className="space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Featured Destinations</h2>
            <Link
              to="/mobile-view/countries"
              className="text-sm text-orange-600 font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* SPECIAL EUROPE CARD FOR MOBILE */}
          <Link
            to="/mobile-view/countries"
            search={{ region: "Europe" }}
            className="block relative overflow-hidden rounded-3xl shadow-xl transition-all active:scale-[0.98] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800" />
            <div className="relative p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <Award className="h-3 w-3" /> Exclusive Europe
                </div>
                <div className="text-right">
                  <div className="text-indigo-300 text-[10px] font-medium">Starting from</div>
                  <div className="text-2xl font-black text-white leading-none">₹3,99,999</div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                Explore{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">
                  Europe
                </span>
              </h3>

              <p className="text-indigo-200 text-xs leading-relaxed mb-4 line-clamp-2">
                Discover 29+ magical European destinations — from Paris to Rome, Swiss Alps to Greek
                Islands.
              </p>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-indigo-900 bg-indigo-700 flex items-center justify-center overflow-hidden"
                    >
                      <Star className="h-2 w-2 text-amber-400 fill-current" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-900 bg-indigo-800 flex items-center justify-center text-[8px] text-white font-bold">
                    +5k
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full group-hover:gap-2 transition-all">
                  Discover Now <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>

            <Award className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5 opacity-10 rotate-12 pointer-events-none" />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            {destinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.name}
                to="/mobile-view/countries"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-28 bg-gray-200 relative">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <div className="text-white font-bold text-lg">
                      {dest.flag} {dest.name}
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500">{dest.capital}</div>
                  <div className="text-xs text-gray-400 mt-1">{dest.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED PACKAGES */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Featured Packages</h2>
            <Link
              to="/mobile-view/packages"
              className="text-sm text-orange-600 font-medium flex items-center gap-1"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

<div className="grid grid-cols-2 gap-3">
            {featuredPackages.slice(0, 4).map((pkg) => {
              // Use actual destination image from country-images, fallback to flag
              const packageImage = getCountryMainImage(pkg.countryCode) || 
                (countries?.find((c) => c.cca3 === pkg.countryCode)?.flags.svg) || "";
              
              return (
                <Link
                  key={pkg.id}
                  to="/mobile-view/packages"
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-24 bg-gray-50 relative flex items-center justify-center p-0 overflow-hidden">
                    <img
                      src={packageImage}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {pkg.discount}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-sm truncate">{pkg.name}</div>
                    <div className="text-[10px] text-gray-500">{pkg.duration}</div>
                    <div className="text-orange-600 font-bold mt-1 text-sm">₹{pkg.price}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* OUR SERVICES */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Our Services</h2>
          <div className="grid grid-cols-2 gap-3">
            {ourServices.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-2`}
                >
                  <service.icon className="h-5 w-5 text-white" />
                </div>
                <div className="font-semibold text-sm">{service.title}</div>
                <div className="text-xs text-gray-500">{service.description}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* PROMO SECTION */}
        <Link
          to="/mobile-view/services"
          className="block relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white shadow-xl"
        >
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <PartyPopper className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-medium text-sm">Special Offers</span>
            </div>
            <h3 className="text-xl font-bold mb-1">Destination Parties</h3>
            <p className="text-gray-400 text-sm mb-3">
              Bachelor/bachelorette celebrations at exotic locations
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-400">
              Learn More <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* WHY CHOOSE US - Moved after Special Offers */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                <div
                  className={`w-14 h-14 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{feature.stat}</div>
                <div className="font-bold text-gray-800 text-sm mt-1">{feature.title}</div>
                <div className="text-xs text-gray-500 mt-1">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-orange-50 rounded-3xl p-6 text-center border border-orange-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Ready for Your Adventure?</h3>
          <p className="text-gray-500 text-sm mb-4">
            Contact us for a personalized travel experience
          </p>
          <Link
            to="/mobile-view/contact"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-orange-200"
          >
            <Headphones className="h-5 w-5" />
            Get in Touch
          </Link>
        </div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </MobileViewLayout>
  );
}
