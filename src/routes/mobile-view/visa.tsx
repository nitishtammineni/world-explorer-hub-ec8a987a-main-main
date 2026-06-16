import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Globe,
  Send,
  ShieldCheck,
  CheckCircle,
  Clock,
  Users,
  User,
  FileText,
  MapPin,
  Award,
  ChevronRight,
  Star,
  BadgeCheck,
  Zap,
  Phone,
  MessageCircle,
  Calendar,
  Plane,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/visa")({
  head: () => ({
    meta: [
      { title: "Visa Services - Vicky Ryoko Tours" },
      {
        name: "description",
        content: "Hassle-free visa processing for over 150+ countries. Fast, secure & reliable.",
      },
    ],
  }),
  component: MobileViewVisaPage,
});

const visaTypes = [
  {
    icon: Plane,
    title: "Tourist Visa",
    desc: "For leisure & sightseeing",
    color: "from-blue-500 to-indigo-500",
    time: "3-7 Days",
  },
];

const whyChooseUs = [
  { icon: ShieldCheck, title: "Expert Verification", desc: "Thorough check of all documents" },
  { icon: Clock, title: "Speedy Process", desc: "Minimized turnaround time" },
  { icon: Globe, title: "150+ Countries", desc: "Global coverage for all visas" },
  { icon: Award, title: "99% Success Rate", desc: "Proven track record of approvals" },
  { icon: Users, title: "End-to-End Support", desc: "Personalized assistance" },
  { icon: Phone, title: "Real-time Updates", desc: "Stay informed about your status" },
];

const commonDocuments = [
  "Valid Passport (6 months validity)",
  "Recent Passport Size Photos",
  "Bank Statements (Last 6 months)",
  "Proof of Accommodation",
  "Flight Itinerary / Return Tickets",
  "Employment Proof / NOC Letter",
];

function MobileViewVisaPage() {
  const [typingText, setTypingText] = useState("");
  const fullText = "Global Visas Made Simple";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    type: "tourist",
    duration: "",
    message: "",
  });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918639888490";
    const text = `*ðŸŒ New Visa Inquiry*

*Name:* ${form.fullName}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Destination:* ${form.destination}
*Visa Type:* ${form.type.charAt(0).toUpperCase() + form.type.slice(1)} Visa
*Duration:* ${form.duration}
*Message:* ${form.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

return (
    <MobileViewLayout title="Visa Services">
      <div className="pb-10">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 px-6 py-12 text-white">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-20 right-20 animate-float opacity-20">
              <Globe className="h-20 w-20" />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              Premium Visa Assistance
            </div>
            <h1 className="text-4xl font-black mb-3 leading-tight">
              {typingText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-indigo-200/80 text-sm max-w-xs mx-auto">
              Hassle-free visa processing for over 150+ countries. Fast, secure & reliable.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">4.9/5</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 text-xs">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="font-bold">99%</span> Success
              </div>
            </div>
          </div>
        </div>

        {/* VISA TYPES */}
        <div className="px-4 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Visa Categories</h3>
            <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {visaTypes.map((type, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all hover:shadow-2xl animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <type.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{type.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
                          {type.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-16 px-4">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-bold">Why Trust Us?</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {whyChooseUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
                  >
                    <item.icon className="h-6 w-6 text-indigo-400 mb-2" />
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-indigo-200/70 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENTS CHECKLIST */}
        <div className="mt-16 px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Common Documents</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="space-y-3">
              {commonDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INQUIRY FORM */}
        <div className="mt-16 px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Visa Inquiry</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-200/50 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>

            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone *"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Destination Country *"
                  required
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm appearance-none outline-none"
                >
                  <option value="tourist">Tourist Visa</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-600">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Planned Stay Duration"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-4 transition-colors group-focus-within:text-indigo-600">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Any specific country requirements or questions?"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 active:scale-95 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all group"
            >
              <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Inquire via WhatsApp
            </button>
          </form>
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2rem] p-10 text-center text-white shadow-2xl shadow-indigo-500/20 overflow-hidden relative group">
            <h2 className="text-2xl font-black mb-3 relative z-10">Start Your Journey Today</h2>
            <p className="text-indigo-100 mb-6 max-w-xs mx-auto text-sm relative z-10">
              Get expert visa counseling and seamless application support.
            </p>
            <Link
              to="/mobile-view/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-xl transition-transform active:scale-95 relative z-10"
            >
              <Phone className="h-5 w-5" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </MobileViewLayout>
  );
}
