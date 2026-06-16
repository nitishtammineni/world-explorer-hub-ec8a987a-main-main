import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plane,
  PartyPopper,
  Heart,
  Users,
  Briefcase,
  Camera,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Clock,
  Shield,
  Award,
  ChevronDown,
  MapPin,
  TrendingUp,
  Calendar,
  MessageCircle,
  Sparkles,
  Compass,
  Zap,
  Headphones,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/services")({
  head: () => ({
    meta: [
      { title: "Our Services - Vicky Ryoko Tours" },
      { name: "description", content: "Custom tours, destination parties, honeymoons, and more." },
    ],
  }),
  component: MobileViewServicesPage,
});

const services = [
  {
    icon: Plane,
    title: "Custom Tours",
    desc: "Bespoke itineraries to any country, designed around your interests.",
    color: "from-blue-500 to-indigo-600",
    features: ["Personalized itineraries", "Expert guides", "Flexible dates"],
  },
  {
    icon: PartyPopper,
    title: "Destination Parties",
    desc: "Bachelor/bachelorette, milestone birthdays at exotic locations.",
    color: "from-purple-500 to-pink-600",
    features: ["Unique venues", "Full planning", "VIP experience"],
  },
  {
    icon: Heart,
    title: "Honeymoon Escapes",
    desc: "Romantic getaways with private moments and curated luxury stays.",
    color: "from-rose-500 to-red-600",
    features: ["Romantic settings", "Special perks", "Memory making"],
  },
  {
    icon: Users,
    title: "Group Adventures",
    desc: "Friends, family or community trips with seamless coordination.",
    color: "from-green-500 to-emerald-600",
    features: ["Group discounts", "Shared experiences", "Easy planning"],
  },
  {
    icon: Briefcase,
    title: "Corporate & Retreats",
    desc: "Offsites, incentive trips and team retreats designed to inspire.",
    color: "from-gray-600 to-gray-800",
    features: ["Team building", "Professional planning", "Budget options"],
  },
  {
    icon: Camera,
    title: "Photo & Film Trips",
    desc: "Locations, permits, guides and logistics for creators and crews.",
    color: "from-amber-500 to-orange-600",
    features: ["Location scout", "Permits handled", "Local support"],
  },
  {
    icon: ShieldCheck,
    title: "Passport Services",
    desc: "Fresh applications, renewals, and Tatkaal assistance.",
    color: "from-orange-600 to-red-700",
    features: ["Quick slots", "Doc verification", "Home delivery"],
    to: "/mobile-view/passport",
  },
  {
    icon: Globe,
    title: "Visa Assistance",
    desc: "Expert processing for 150+ countries with high success rate.",
    color: "from-indigo-600 to-blue-700",
    features: ["Tourist/Work/Student", "99% success", "Expert review"],
    to: "/mobile-view/visa",
  },
];

const processSteps = [
  { icon: MessageCircle, title: "Initial Chat", desc: "Tell us your dreams and requirements." },
  { icon: Compass, title: "Custom Plan", desc: "We draft a unique itinerary for you." },
  { icon: Zap, title: "Finalize & Book", desc: "We handle all bookings and logistics." },
  { icon: Sparkles, title: "Travel Time", desc: "Enjoy your seamless, curated journey." },
];

const whyChooseUsStats = [
  { icon: Clock, number: "20+", label: "Years Experience" },
  { icon: Users, number: "5000+", label: "Happy Travelers" },
  { icon: Globe, number: "50+", label: "Destinations" },
  { icon: Award, number: "100%", label: "Satisfaction" },
];

const whyChooseUsFeatures = [
  {
    icon: Shield,
    title: "Secure Bookings",
    desc: "Your payments and travel plans are fully protected",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock assistance wherever you travel",
  },
  {
    icon: Star,
    title: "Best Price Guarantee",
    desc: "We match any competitor price plus offer exclusive deals",
  },
{
    icon: Calendar,
    title: "Flexible Cancellation",
    desc: "Cancellation options available up to 48 hours before departure",
  },
];

const faqs = [
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 2-3 weeks in advance for domestic trips and 4-6 weeks for international destinations. However, we can also arrange last-minute getaways depending on availability.",
  },
  {
    question: "Are the prices shown per person or for the whole group?",
    answer:
      "Our pricing varies by service. Custom tours are priced per person based on group size, while destination parties and corporate retreats are typically quoted as total package prices.",
  },
  {
    question: "Do you handle visa applications?",
    answer:
      "Yes! We provide complete visa assistance including documentation preparation, application submission, and tracking until approval. Some nationalities may require additional time.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-3 animate-slide-up">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-sm text-gray-700 pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0 animate-fade-in-up">
          <p className="text-gray-500 text-xs leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function MobileViewServicesPage() {
  const [typingText, setTypingText] = useState("");
  const fullText = "Travel Done Beautifully";

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
    <MobileViewLayout title="Our Services">
      <div className="pb-10">
        {/* HERO SECTION */}
        <div className="relative z-10 overflow-hidden bg-gray-900 px-6 py-12 text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 right-10 animate-float">
              <Sparkles className="h-12 w-12 text-orange-400" />
            </div>
            <div className="absolute bottom-10 left-10 animate-float-delay">
              <Globe className="h-10 w-10 text-blue-400" />
            </div>
          </div>

          <div className="relative z-10 text-center mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-600/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-600/30">
              Premium Experiences
            </div>
            <h1 className="text-3xl font-extrabold mb-3 leading-tight">
              {typingText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-orange-200/70 text-sm max-w-xs mx-auto">
              From quiet honeymoons to grand celebrations — handled end to end with expert care.
            </p>
          </div>
        </div>

        {/* Spacer to ensure visible gap below title/hero */}
        <div className="h-8" />

        {/* SERVICES LIST */}
        <div className="px-4 mt-24 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">What We Offer</h3>
            <div className="h-1 w-12 bg-orange-600 rounded-full"></div>
          </div>

          {services.map((s, idx) => {
            const Content = (
              <div className="flex items-start gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{s.title}</h4>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{s.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {s.features.map((f, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-[10px] font-bold bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg text-gray-600"
                      >
                        <CheckCircle className="h-3 w-3 text-orange-500" />
                        {f.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            return "to" in s ? (
              <Link
                key={idx}
                to={s.to as string}
                className="block group bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all active:scale-95 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {Content}
              </Link>
            ) : (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {Content}
              </div>
            );
          })}
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-16 px-4">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>

              <div className="space-y-8">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    {idx !== processSteps.length - 1 && (
                      <div className="absolute left-6 top-10 w-0.5 h-10 bg-gradient-to-b from-orange-500 to-transparent opacity-20"></div>
                    )}
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/5">
                      <step.icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-100">{step.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STATS & FEATURES */}
        <div className="mt-16 px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Why Vicky Ryoko?</h3>
            <p className="text-gray-500 text-sm mt-2">The trusted name in premium travel</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {whyChooseUsStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 text-center shadow-lg border border-gray-50"
              >
                <stat.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-black text-gray-900">{stat.number}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {whyChooseUsFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-50"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">{feature.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-16 px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Common Questions</h3>
          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-16 px-4">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-[2.5rem] p-10 text-center text-white shadow-2xl shadow-orange-200 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-3xl font-black mb-4">Ready to start?</h2>
            <p className="text-orange-100 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
              Tell us your idea — we'll come back with a tailored plan within 24 hours.
            </p>
            <Link
              to="/mobile-view/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-2xl font-black shadow-xl transition-transform active:scale-95"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* SOCIAL & FOOTER */}
        <div className="mt-16 px-6 text-center">
          <div className="flex justify-center gap-4 mb-10">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            &copy; 2026 Vicky Ryoko Tours & Parties
          </p>
        </div>
      </div>
    </MobileViewLayout>
  );
}
