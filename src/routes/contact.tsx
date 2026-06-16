import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Globe2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content:
          "Get in touch to plan your next trip. Tours, parties and bespoke travel experiences worldwide. Reach us on WhatsApp at +91 86398 88490.",
      },
      { property: "og:title", content: "Contact Vicky Ryoko Tours and Party's" },
      {
        property: "og:description",
        content: "Plan your next journey with us — instant WhatsApp replies.",
      },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP_NUMBER = "918639888490"; // intl format without +
const EMAIL = "vikasvarma529@gmail.com";
const PHONE_DISPLAY = "+91 86398 88490";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    travelers: "",
    message: "",
  });

  const onChange =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `ðŸŒ *New Trip Enquiry — Vicky Ryoko Tours and Party's*\n\n` +
      `ðŸ‘¤ *Name:* ${form.name}\n` +
      `ðŸ“§ *Email:* ${form.email}\n` +
      `ðŸ“± *Phone:* ${form.phone || "—"}\n` +
      `âœˆï¸ *Destination:* ${form.destination || "—"}\n` +
      `ðŸ“… *Travel date:* ${form.date || "—"}\n` +
      `ðŸ‘¥ *Travelers:* ${form.travelers || "—"}\n\n` +
      `ðŸ“ *Message:*\n${form.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-sunset)", opacity: 0.12 }}
        />
        <div
          className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "var(--gradient-ocean)", opacity: 0.25 }}
        />
        <div className="container-app">
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5" /> Get in touch
          </span>
          <h1 className="mt-4 text-5xl sm:text-7xl font-display font-bold leading-[1.05]">
            Let's plan your next <span className="text-gradient-sunset">adventure.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground text-lg">
            Tell us where you'd love to go and the vibe you want. Submit the form and your enquiry
            lands directly in our WhatsApp — expect a reply within minutes.
          </p>
        </div>
      </section>

      <section className="container-app pt-8 pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* FORM */}
        <form className="card-elev p-8 sm:p-10 relative overflow-hidden" onSubmit={handleSubmit}>
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30"
            style={{ background: "var(--gradient-sunset)" }}
          />
          {sent ? (
            <div className="text-center py-12 relative">
              <div
                className="mx-auto h-20 w-20 rounded-full grid place-items-center"
                style={{ background: "var(--gradient-sunset)" }}
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="mt-5 text-3xl font-display font-bold">Off to WhatsApp!</h2>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                Your enquiry has opened in WhatsApp. Just hit send and our team will reply within
                minutes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    destination: "",
                    date: "",
                    travelers: "",
                    message: "",
                  });
                }}
                className="btn-outline mt-6"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <div className="relative">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" /> Send your trip enquiry
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Goes straight to our WhatsApp inbox.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={onChange("name")}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  required
                />
                <Field
                  label="Phone / WhatsApp"
                  name="phone"
                  value={form.phone}
                  onChange={onChange("phone")}
                />
                <Field
                  label="Destination"
                  name="destination"
                  placeholder="e.g. Japan, Italy"
                  value={form.destination}
                  onChange={onChange("destination")}
                />
                <Field
                  label="Travel date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={onChange("date")}
                />
                <Field
                  label="Travelers"
                  name="travelers"
                  type="number"
                  placeholder="e.g. 2"
                  value={form.travelers}
                  onChange={onChange("travelers")}
                />
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Tell us about your trip <span className="text-primary">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={onChange("message")}
                  placeholder="Vibe, budget, special occasions, must-do experiences…"
                  className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 !w-full sm:!w-auto">
                Send via WhatsApp <Send className="ml-2 h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                We'll never share your details. By submitting, your message opens in WhatsApp
                pre-filled and ready to send.
              </p>
            </div>
          )}
        </form>

        {/* CONTACT CARDS */}
        <div className="space-y-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl p-6 text-white relative overflow-hidden hover:-translate-y-0.5 transition-transform"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              boxShadow: "var(--shadow-warm)",
            }}
          >
            <MessageCircle className="absolute -right-4 -bottom-4 h-32 w-32 opacity-20" />
            <div className="text-xs uppercase tracking-widest opacity-90">Fastest reply</div>
            <div className="mt-1 text-2xl font-display font-bold">Chat on WhatsApp</div>
            <div className="mt-2 font-medium">{PHONE_DISPLAY}</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold">
              Open WhatsApp →’
            </div>
          </a>

          <div>
            <div className="mt-0">
              <ContactItem
                icon={Phone}
                title="Call us"
                value={PHONE_DISPLAY}
                href={`tel:+${WHATSAPP_NUMBER}`}
              />
            </div>
            <div className="mt-6">
              <ContactItem icon={Mail} title="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            </div>
            <div className="mt-6">
              <ContactItem
                icon={Globe2}
                title="Where we work"
                value="Worldwide · 50+ destinations"
              />
            </div>
          </div>
          <ContactItem
            icon={MapPin}
            title="Concierge hours"
            value="24/7 —” every day of the year"
          />

          <div
            className="card-elev p-6"
            style={{ background: "var(--gradient-ocean)", color: "white" }}
          >
            <h3 className="font-display font-bold text-xl">Fast response promise</h3>
            <p className="mt-2 text-sm opacity-90">
              Every WhatsApp enquiry is acknowledged within 30 minutes during the day, and within 4
              hours overnight.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="card-elev p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
      <div className="grid place-items-center h-11 w-11 rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-1 font-semibold">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
