import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plane, PartyPopper, Heart, Users, Briefcase, Camera, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import { useEffect } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content:
          "Custom tours, destination parties, honeymoons, group trips, luxury stays and full concierge — every service you need to travel beautifully.",
      },
      { property: "og:title", content: "Services — Vicky Ryoko Tours and Party's" },
      {
        property: "og:description",
        content: "Custom tours, destination parties and full travel concierge.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Plane,
    title: "Custom Tours",
    desc: "Bespoke itineraries to any country, designed around your interests, pace and budget.",
  },
  {
    icon: PartyPopper,
    title: "Destination Parties",
    desc: "Bachelor/bachelorette, milestone birthdays, anniversaries — celebrations on epic backdrops.",
  },
  {
    icon: Heart,
    title: "Honeymoon Escapes",
    desc: "Romantic getaways with private moments, sunset cruises and curated luxury stays.",
  },
  {
    icon: Users,
    title: "Group Adventures",
    desc: "Friends, family or community trips with seamless coordination for everyone.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Retreats",
    desc: "Offsites, incentive trips and team retreats designed to inspire and bond.",
  },
  {
    icon: Camera,
    title: "Photo & Film Trips",
    desc: "Locations, permits, guides and gear-friendly logistics for creators and crews.",
  },
];

function ServicesPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    router.navigate({ to: "/mobile-view/services" });
  }, [router]);

  return (
    <SiteLayout>
      <section className="pt-32 pb-12 bg-secondary/40 border-b border-border">
        <div className="container-app">
          <span className="chip">What we do</span>
          <DiscoTitle>
            <h1 className="mt-3 text-5xl sm:text-6xl font-bold max-w-3xl">
              Travel done beautifully.
            </h1>
          </DiscoTitle>
          <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Everything from a quiet honeymoon to a 200-person destination party — handled end to
            end.
          </p>
        </div>
      </section>

      <section className="container-app py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="card-elev p-7 hover:-translate-y-1 transition-transform">
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <section className="container-app pb-20">
        <div
          className="card-elev p-10 sm:p-14 text-center"
          style={{ background: "var(--gradient-sunset)", color: "white" }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold">Ready to dream up your trip?</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">
            Tell us your idea — we'll come back with a tailored plan within 24 hours.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 py-3 text-sm font-semibold"
          >
            Start planning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
