import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Globe,
  Shield,
  MapPin,
  Award,
  MessageCircle,
  Heart,
  Plane,
  Info,
  Phone,
  Mail,
  Home,
  BookOpen,
  GraduationCap,
  Building,
  Compass,
  Landmark,
  Waves,
  Mountain,
  Palmtree,
  Map,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/mobile-view/about")({
  head: () => ({
    meta: [
      { title: "About Vicky Ryoko Tours - From Dreams to Destination" },
      {
        name: "description",
        content:
          "Discover how Vicky Ryoko Tours turns travel dreams into unforgettable stories with personalized service and expertise.",
      },
    ],
  }),
  component: MobileAboutPage,
});

function MobileAboutPage() {
  const [typingText, setTypingText] = useState("");
  const fullText = "Vicky Ryoko Tours";

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
    <MobileViewLayout title="About Us">
      <div className="flex flex-col gap-8 pb-10">
        {/* HERO SECTION */}
        <section className="relative h-[450px] flex items-center overflow-hidden">
          {/* Background Image/Gradient */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white"></div>
          </div>

          <div className="relative z-10 px-6 w-full animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Since 2020
            </span>
            <h1 className="text-orange-400 text-xl font-medium tracking-tight mb-1 italic">
              From Dreams to Destination
            </h1>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Begin your Adventure with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                {typingText}
                <span className="animate-pulse text-white">|</span>
              </span>
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs mb-8">
              Travel effortlessly with Vicky Ryoko Tours. We turn your travel dreams into
              unforgettable stories with personalized service and decades of expertise.
            </p>
            <Link
              to="/mobile-view/contact"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-600/30 active:scale-95 transition-transform"
            >
              Start Your Story <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* INTRODUCTION & STATS */}
        <section className="px-6 -mt-16 relative z-20">
          <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-gray-200 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Reliable Partner For Memorable Getaways
            </h3>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-8">
              <p>
                With decades of experience designing tailor-made journeys, Vicky Ryoko Tours has
                helped thousands of travelers explore over 500 incredible locations worldwide.
              </p>
              <p>
                Our dedicated team ensures each trip is perfectly planned to meet your desires,
                preferences, and budget. Experience seamless travel, unforgettable moments, and
                personalized service with us.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 flex flex-col items-center text-center">
                <div className="text-3xl font-black text-orange-600">500+</div>
                <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                  Locations
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex flex-col items-center text-center">
                <div className="text-3xl font-black text-blue-600">1000s</div>
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  Happy Travelers
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE INDIA */}
        <section className="px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Explore India</h3>
              <p className="text-xs text-gray-500 mt-1">Your Gateway to Unforgettable Adventures</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Compass className="h-6 w-6 text-green-600 animate-spin-slow" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Mountains",
                desc: "Trek & adventure in the majestic peaks of Ladakh and Manali.",
                icon: Mountain,
                color: "bg-blue-500",
                img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
              },
              {
                title: "Beaches",
                desc: "Relax and rejuvenate in the serene shores of Goa, Kerala, and Andaman.",
                icon: Waves,
                color: "bg-cyan-500",
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop",
              },
              {
                title: "Heritage",
                desc: "Experience royal stays and rich culture in Rajasthan, Kashmir, and Ooty.",
                icon: Landmark,
                color: "bg-orange-500",
                img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=200&fit=crop",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative h-44 rounded-[24px] overflow-hidden group shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div
                    className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}
                  >
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white/80 text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNATIONAL GETAWAYS */}
        <section className="bg-gray-900 py-12 px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Our Special International Getaways
            </h3>
            <p className="text-gray-400 text-sm">
              Curated global experiences crafted for the modern explorer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Tropical Paradise Islands",
                desc: "Escape to Maldives overwater villas, Bali beach resorts, and enjoy unique shopping experiences.",
                icon: Palmtree,
                theme: "border-teal-500/20 bg-teal-500/5 text-teal-400",
              },
              {
                title: "European Bespoke Journeys",
                desc: "Explore breathtaking landmarks across London, Paris, and more—crafted itineraries tailored for every explorer.",
                icon: Map,
                theme: "border-blue-500/20 bg-blue-500/5 text-blue-400",
              },
              {
                title: "Middle East Marvels",
                desc: "Experience luxury Dubai desert tours, private yacht rides, and exclusive cultural immersions in Baku.",
                icon: Landmark,
                theme: "border-amber-500/20 bg-amber-500/5 text-amber-400",
              },
              {
                title: "Asian Wonders Await",
                desc: "Discover the vibrant cities of Singapore, Malaysia, and Vietnam with customized sightseeing adventures.",
                icon: Globe,
                theme: "border-rose-500/20 bg-rose-500/5 text-rose-400",
              },
            ].map((dest, idx) => (
              <div
                key={idx}
                className={`border p-6 rounded-[24px] ${dest.theme} flex items-start gap-4 backdrop-blur-sm transition-all hover:bg-white/5`}
              >
                <div className={`p-3 rounded-xl border border-current flex-shrink-0`}>
                  <dest.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-2">{dest.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{dest.desc}</p>
                  <Link
                    to="/mobile-view/contact"
                    className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Enquire Now <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXCLUSIVE TRAVEL SOLUTIONS */}
        <section className="px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Exclusive Travel Solutions</h3>
            <p className="text-sm text-gray-500 mt-2">
              Comprehensive services for every type of journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Business Travel Support",
                desc: "We manage every detail of your corporate travel — flights, hotels, and transfers — for a seamless experience.",
                icon: Building,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                title: "Team Getaways",
                desc: "Boost team spirit with customized retreats, incentive tours, and off-site trips that mix fun with focus.",
                icon: Users,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                title: "Spiritual Journeys",
                desc: "Discover sacred destinations across India and abroad with personalized pilgrimage packages.",
                icon: Heart,
                color: "text-red-600",
                bg: "bg-red-50",
              },
              {
                title: "Student Expeditions",
                desc: "Educational tours designed to inspire learning through exploration, culture, and real-world experiences.",
                icon: GraduationCap,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                title: "Group Escapes",
                desc: "Tailor-made vacations for families, friends, and communities — crafted to fit your style and budget.",
                icon: Home,
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((solution, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className={`p-4 rounded-2xl ${solution.bg} ${solution.color} flex-shrink-0`}>
                  <solution.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{solution.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{solution.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-[28px] text-center text-white shadow-lg">
            <h4 className="text-xl font-bold mb-2">Your World, Our Expertise</h4>
            <p className="text-xs text-orange-100 opacity-90 leading-relaxed">
              Whether it's a solo trip or a large event, we bring professional expertise to every
              mile of your journey.
            </p>
          </div>
        </section>

        {/* EXPERTISE SERVICES */}
        <section className="px-6 py-6 bg-gray-50 rounded-[40px] mx-2 border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Easy Visa Access",
                desc: "Fast-track your travel plans with professional visa support for global destinations.",
                icon: Plane,
                color: "text-blue-600",
                bg: "bg-white shadow-sm",
              },
              {
                title: "Perfect Stay Offers",
                desc: "Get exclusive hotel deals across the world where comfort meets affordability.",
                icon: Home,
                color: "text-orange-600",
                bg: "bg-white shadow-sm",
              },
              {
                title: "Complete Coverage",
                desc: "Travel worry-free with tailored insurance options for every trip type.",
                icon: Shield,
                color: "text-green-600",
                bg: "bg-white shadow-sm",
              },
              {
                title: "Global Education Pathways",
                desc: "We simplify your study abroad process guiding you to the right university, visa, and journey.",
                icon: BookOpen,
                color: "text-purple-600",
                bg: "bg-white shadow-sm",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-[24px] ${item.bg} flex flex-col items-center text-center border border-gray-50 group active:scale-95 transition-transform`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.color} bg-gray-50 group-hover:bg-current transition-colors`}
                >
                  <item.icon className="h-6 w-6 group-hover:text-white" />
                </div>
                <h4 className="font-bold text-[13px] text-gray-900 leading-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY TRAVEL WITH US */}
        <section className="px-6">
          <div className="bg-orange-600 rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-2xl font-bold mb-4 relative z-10">
              Why Travel with Vicky Ryoko Tours?
            </h3>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-8 inline-block relative z-10 border border-white/20">
              <p className="text-sm font-bold flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                Get up to 40% off on over 2,000 select hotels!
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              {[
                {
                  title: "Personalized Journeys",
                  desc: "Unique itineraries crafted for every kind of traveler—families, couples, friends, or solo explorers.",
                  icon: Heart,
                },
                {
                  title: "Special Offers",
                  desc: "From comfort stays to luxury escapes, we bring you the best value for your money.",
                  icon: Award,
                },
                {
                  title: "Complete Travel Care",
                  desc: "From visa processing and hotel bookings to insurance, everything is managed with care.",
                  icon: Shield,
                },
                {
                  title: "Always Here for You",
                  desc: "24/7 expert assistance, making your journey safe, easy, and enjoyable.",
                  icon: Phone,
                },
              ].map((reason, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{reason.title}</h4>
                    <p className="text-white/70 text-xs leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GET IN TOUCH & FOUNDER */}
        <section className="px-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

            <div className="space-y-4 mb-8">
              <a href="tel:+918639888490" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-gray-900">+91 86398 88490</p>
                </div>
              </a>

              <a href="mailto:vickyryoko529@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-sm font-bold text-gray-900 underline">
                    vickyryoko529@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Office
                  </p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    Vicky ryoko, Abhi centre, narsipatnam, Visakhapatnam 531116
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 mb-8"></div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-[32px] flex items-center justify-center">
                  <Users className="h-10 w-10 text-orange-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center border border-gray-50">
                  <Award className="h-5 w-5 text-orange-500" />
                </div>
              </div>
              <h4 className="text-xl font-black text-gray-900">Kamili Vikas Varma</h4>
              <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mt-1">
                Founder and Chairman
              </p>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="px-6">
          <div className="relative bg-black rounded-[40px] p-10 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 to-red-600/40 opacity-50 transition-opacity group-hover:opacity-70"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4">
                Your World,
                <br />
                Our Expertise
              </h3>
              <p className="text-gray-400 text-sm mb-8 max-w-[200px] mx-auto">
                Ready to plan the most incredible trip of your life?
              </p>
              <Link
                to="/mobile-view/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-10 py-5 rounded-3xl font-black text-lg shadow-2xl hover:bg-orange-50 transition-colors"
              >
                Let's Go <MessageCircle className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MobileViewLayout>
  );
}
