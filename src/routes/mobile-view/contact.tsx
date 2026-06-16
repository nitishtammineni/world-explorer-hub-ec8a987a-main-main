import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  Plane,
  FileText,
  Briefcase,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Star,
  ShieldCheck,
  Users,
  Headphones,
} from "lucide-react";
import { MobileViewLayout } from "./-MobileViewLayout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/mobile-view/contact")({
  head: () => ({
    meta: [
      { title: "Support - Vicky Ryoko Tours" },
      { name: "description", content: "24/7 Premium Travel Support for all your needs." },
    ],
  }),
  component: MobileViewContactPage,
});

const categories = [
  {
    id: "visa",
    icon: Plane,
    label: "Visa Services",
    desc: "Expert visa assistance",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "passport",
    icon: FileText,
    label: "Passport Help",
    desc: "Renewals & applications",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    id: "tours",
    icon: Star,
    label: "Tour Packages",
    desc: "Customized travel plans",
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "business",
    icon: Briefcase,
    label: "Corporate",
    desc: "Business travel solutions",
    color: "bg-slate-50 text-slate-600",
  },
  {
    id: "general",
    icon: HelpCircle,
    label: "General",
    desc: "Any other questions",
    color: "bg-green-50 text-green-600",
  },
];

const quickActions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    desc: "Instant Chat",
    href: "https://wa.me/918639888490",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Phone,
    label: "Call",
    desc: "Speak with us",
    href: "tel:+918639888490",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Mail,
    label: "Email",
    desc: "Official Support",
    href: "mailto:vikasvarma529@gmail.com",
    color: "from-blue-500 to-indigo-600",
  },
];

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer comprehensive travel services including international & domestic tour packages, visa processing assistance, passport services, hotel bookings, and corporate travel management.",
  },
  {
    q: "How long does visa processing take?",
    a: "Visa processing times vary by country. Typically, it takes 7-15 business days for most countries, but we offer express services for urgent requirements.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes! We provide special rates for groups of 10 or more travelers. Contact our corporate team for a customized quote.",
  },
  {
    q: "Can I customize tour packages?",
    a: "Absolutely. All our packages are 100% customizable to fit your preferences, budget, and travel dates.",
  },
];

function MobileViewContactPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    destination: "",
    travelDate: "",
    travelers: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");
  const fullText = "24/7 Premium Travel Support";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

const cleanedWhatsAppMsg = `
🌍 *VICKY RYOKO TOURS*
📞 *SUPPORT ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✉️ *ENQUIRY TYPE:* ${form.category.toUpperCase()}
â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”

ðŸ‘¤ *PERSONAL INFORMATION*
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
… *Name:* ${form.name}
… *Email:* ${form.email}
… *Phone:* ${form.phone}

âœˆï¸ *TRIP DETAILS*
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
… *Destination:* ${form.destination || "N/A"}
… *Date:* ${form.travelDate || "N/A"}
… *Travelers:* ${form.travelers}

ðŸ’¬ *MESSAGE*
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
${form.message}

â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
ðŸ• *Submitted:* ${new Date().toLocaleString()}
ðŸŒ *Source:* Vicky Ryoko Tours
    `.trim();

const cleanWhatsappMsg = `
🌍 *VICKY RYOKO TOURS*
📞 *SUPPORT ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✉️ *ENQUIRY TYPE:* ${form.category.toUpperCase()}

👤 *PERSONAL INFORMATION*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Name: ${form.name}
• Email: ${form.email}
• Phone: ${form.phone}

🌍 *TRIP DETAILS*
• Destination: ${form.destination || "N/A"}
• Date: ${form.travelDate || "N/A"}
• Travelers: ${form.travelers}

💬 *MESSAGE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${form.message}

📅 *Submitted:* ${new Date().toLocaleString()}
🔗 *Source:* Vicky Ryoko Tours
    `.trim();

// Use direct URL redirect for proper WhatsApp redirect
    window.location.href = `https://wa.me/918639888490?text=${encodeURIComponent(cleanWhatsappMsg)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <MobileViewLayout title="Support">
        <div className="p-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-bounce-in">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle className="h-12 w-12 text-green-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Thank You, {form.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs">
            Your enquiry has been formatted and opened in WhatsApp. Our team will contact you
            shortly!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200"
          >
            New Inquiry
          </button>
          <Link to="/mobile-view" className="mt-6 text-orange-600 font-medium">
            Back to Home
          </Link>
        </div>
      </MobileViewLayout>
    );
  }

  return (
    <MobileViewLayout title="Support Center">
      <div className="pb-10">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden bg-gray-900 px-6 py-12 text-white">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-10 right-10 animate-float">
              <Plane className="h-12 w-12 text-orange-400" />
            </div>
            <div className="absolute bottom-10 left-10 animate-float-delay">
              <Star className="h-10 w-10 text-yellow-400" />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-600/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-600/30">
              Reliable & Fast
            </div>
            <h1 className="text-3xl font-extrabold mb-3 leading-tight">
              Need Some <span className="text-orange-500">Expert</span> Help?
            </h1>
            <div className="h-6 font-medium text-orange-200/80">
              {typingText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {/* QUICK CONNECT GRID */}
        <div className="px-4 mt-8">
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex flex-col items-center text-center transition-transform active:scale-95"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 shadow-md`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="mt-12 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Select Service</h3>
            <span className="text-xs text-gray-400">Choose one</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setForm({ ...form, category: cat.id })}
                className={`flex-shrink-0 w-32 p-4 rounded-2xl border-2 transition-all ${
                  form.category === cat.id
                    ? "border-orange-500 bg-orange-50/50 shadow-md scale-105"
                    : "border-transparent bg-white shadow-sm"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mb-3`}
                >
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="font-bold text-xs text-gray-800 mb-1">{cat.label}</div>
                <div className="text-[10px] text-gray-500 leading-tight">{cat.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* MULTI-STEP FORM */}
        <div className="mt-4 px-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800">Tell us more</h3>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${step >= i ? "bg-orange-600" : "bg-gray-100"}`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">FULL NAME</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">PHONE NUMBER</label>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => form.name && form.email && form.phone && setStep(2)}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4"
                  >
                    Continue <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">DESTINATION</label>
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 ml-1">TRAVEL DATE</label>
                      <input
                        type="date"
                        value={form.travelDate}
                        onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 ml-1">TRAVELERS</label>
                      <select
                        value={form.travelers}
                        onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                      >
                        {[1, 2, 3, 4, 5, "6+"].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Person" : "People"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                    >
                      Final Step <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 ml-1">
                      MESSAGE / REQUIREMENTS
                    </label>
                    <textarea
                      placeholder="Tell us more about your trip, preferences, or specific questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-800 font-medium focus:ring-2 focus:ring-orange-500/20 outline-none h-40 resize-none"
                      required
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-2xl font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 animate-pulse-glow"
                    >
                      Send to WhatsApp <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-10 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-2xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <ShieldCheck className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-xl font-bold text-gray-800">100%</div>
              <div className="text-xs text-gray-500 font-medium">Safe & Secure</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-800">5K+</div>
              <div className="text-xs text-gray-500 font-medium">Happy Clients</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-xl font-bold text-gray-800">24/7</div>
              <div className="text-xs text-gray-500 font-medium">Support Ready</div>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                <Headphones className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-xl font-bold text-gray-800">Expert</div>
              <div className="text-xs text-gray-500 font-medium">Guidance</div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-10 px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4 ml-1">Common Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-sm text-gray-700">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SOCIAL & FOOTER */}
        <div className="mt-12 px-6 text-center">
          <h4 className="font-bold text-gray-800 mb-6 uppercase tracking-widest text-xs">
            Connect With Us
          </h4>
          <div className="flex justify-center gap-5">
            {[
              { icon: Instagram, color: "bg-pink-500 shadow-pink-200" },
              { icon: Facebook, color: "bg-blue-600 shadow-blue-200" },
              { icon: Twitter, color: "bg-sky-500 shadow-sky-200" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className={`w-14 h-14 rounded-2xl ${social.color} text-white flex items-center justify-center shadow-lg transition-transform active:scale-90`}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium">
              &copy; 2026 Vicky Ryoko Tours & Parties.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </MobileViewLayout>
  );
}
