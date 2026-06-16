import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  FileText,
  Send,
  Shield,
  CheckCircle,
  Clock,
  Users,
  User,
  Award,
  ChevronRight,
  Star,
  BadgeCheck,
  Zap,
  Phone,
  MessageCircle,
  Calendar,
  Fingerprint,
  BookOpen,
  Building,
  Sparkles,
  RefreshCw as RefreshIcon,
} from "lucide-react";

// ... elsewhere in file where RefreshCw was defined manually ...
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/passport")({
  head: () => ({
    meta: [
      { title: "Passport Services - Vicky Ryoko Tours" },
      {
        name: "description",
        content:
          "Expert passport assistance - fresh applications, renewals, and tatkal processing.",
      },
    ],
  }),
  component: MobileViewPassportPage,
});

const passportTypes = [
  {
    icon: BookOpen,
    title: "Fresh Passport",
    desc: "First-time applicants",
    color: "from-blue-500 to-cyan-500",
    time: "15-20 Days",
  },
  {
    icon: RefreshIcon,
    title: "Renewal",
    desc: "Expired/damaged passports",
    color: "from-emerald-500 to-teal-500",
    time: "10-15 Days",
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "100% Genuine Documentation",
    desc: "All papers verified & authenticated",
  },
  { icon: Clock, title: "Fast Track Processing", desc: "Priority handling at every stage" },
  { icon: Users, title: "Expert Guidance", desc: "Dedicated support throughout process" },
  { icon: BadgeCheck, title: "High Success Rate", desc: "99.5% approval rate guaranteed" },
  { icon: Calendar, title: "Flexible Scheduling", desc: "Book appointments at your convenience" },
  { icon: Phone, title: "24/7 Support", desc: "Always here when you need us" },
];

const documentsRequired = [
  "Aadhaar Card / Voter ID / PAN Card",
  "Address Proof (any one)",
  "Birth Certificate",
  "Passport Size Photos (4 copies)",
  "Previous Passport (if any)",
  "Proof of Indian Citizenship",
];

function MobileViewPassportPage() {
  const [typingText, setTypingText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const fullText = "Your Gateway to the World";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    type: "fresh",
    city: "",
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
    const text = `*ðŸ›‚ New Passport Inquiry*

*Name:* ${form.fullName}
*Email:* ${form.email}
*Phone:* ${form.phone}
*DOB:* ${form.dob}
*City:* ${form.city}
*Service Type:* ${form.type === "fresh" ? "Fresh Passport" : "Renewal"}
*Message:* ${form.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <MobileViewLayout title="Passport Services">
      <div className="pb-10">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-6 py-12 text-white">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-20 right-20 animate-float">
              <Shield className="h-16 w-16 text-blue-400 opacity-30" />
            </div>
            <div className="absolute bottom-20 left-10 animate-float-delay">
              <Fingerprint className="h-12 w-12 text-indigo-400 opacity-30" />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-sm">
              <BadgeCheck className="h-4 w-4 text-yellow-400" />
              Government Authorized
            </div>
            <h1 className="text-4xl font-black mb-3 leading-tight">
              {typingText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-blue-200/80 text-sm max-w-xs mx-auto">
              Expert assistance for fresh passports and renewals. Fast, reliable, stress-free.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">4.9/5</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-1 text-xs">
                <Users className="h-4 w-4 text-white/70" />
                <span className="font-bold">10K+</span> Processed
              </div>
            </div>
          </div>
        </div>

        {/* PASSPORT TYPES */}
        <div className="px-4 mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Choose Your Service</h3>
            <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {passportTypes.map((type, idx) => (
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
                        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
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
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-bold">Why Choose Us?</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {whyChooseUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all"
                  >
                    <item.icon className="h-6 w-6 text-blue-400 mb-2" />
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-blue-200/70 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENTS REQUIRED */}
        <div className="mt-16 px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Documents Checklist</h3>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="space-y-3">
              {documentsRequired.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* APPLICATION FORM */}
        <div className="mt-16 px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-900">Quick Application</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>

            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-blue-600">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none appearance-none"
                >
                  <option value="fresh">Fresh Passport Application</option>
                  <option value="renewal">Passport Renewal</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90 pointer-events-none" />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-4 transition-colors group-focus-within:text-blue-600">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Any special requirements or questions? (Optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all text-sm outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/40 transition-all group"
            >
              <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Apply via WhatsApp
            </button>
          </form>
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-10 text-center text-white shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <h2 className="text-2xl font-black mb-3 relative z-10">Need Personal Guidance?</h2>
            <p className="text-blue-100 mb-6 max-w-xs mx-auto text-sm relative z-10">
              Our experts are ready to help you every step of the way.
            </p>
            <Link
              to="/mobile-view/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-xl transition-transform active:scale-95 relative z-10"
            >
              <Phone className="h-5 w-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </MobileViewLayout>
  );
}
