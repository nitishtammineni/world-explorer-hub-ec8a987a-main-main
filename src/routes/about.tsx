import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { DiscoTitle } from "@/components/ui/DiscoTitle";
import {
  Plane,
  MapPin,
  Mountain,
  Palmtree,
  Building2,
  Globe,
  Users,
  Handshake,
  BookOpen,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Award,
  Globe2,
  Milestone,
  Heart,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vicky Ryoko Tours and Party's" },
      {
        name: "description",
        content: "Your reliable partner for memorable getaways, from dreams to destination.",
      },
      { property: "og:title", content: "About Vicky Ryoko Tours and Party's" },
      {
        property: "og:description",
        content: "Decades of experience designing tailor-made journeys worldwide.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop"
            alt="World Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-primary/10" />
        </div>
        <div className="container-app text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Plane className="w-4 h-4" />
            <span>From Dreams to Destination</span>
          </div>
          <DiscoTitle>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Begin your Adventure with <br />
              <span className="text-gradient-sunset">Vicky Ryoko Tours</span>
            </h1>
          </DiscoTitle>
          <p className="max-w-2xl mx-auto text-xl text-white/80 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Travel effortlessly with Vicky Ryoko Tours. We turn your travel dreams into
            unforgettable stories with personalized service and decades of expertise.
          </p>
        </div>
      </section>

      {/* Reliable Partner Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                  alt="Adventure traveler"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div>
              <DiscoTitle>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Your Reliable Partner For <span className="text-primary">Memorable Getaways</span>
                </h2>
              </DiscoTitle>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With decades of experience designing tailor-made journeys, Vicky Ryoko Tours has
                helped thousands of travelers explore over 500 incredible locations worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our dedicated team ensures each trip is perfectly planned to meet your desires,
                preferences, and budget. Experience seamless travel, unforgettable moments, and
                personalized service with us.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl">500+</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Locations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl">1000s</h4>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Happy Travelers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore India Section */}
      <section className="py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <DiscoTitle>
              <h2 className="text-4xl font-bold mb-4">
                Explore <span className="text-orange-500">India</span>
              </h2>
            </DiscoTitle>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your Gateway to Unforgettable Adventures across the subcontinent.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border bg-card transition-all hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mountain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mountains</h3>
              <p className="text-muted-foreground">
                Trek & adventure in the majestic peaks of <strong>Ladakh</strong> and{" "}
                <strong>Manali</strong>.
              </p>
            </div>
            <div className="group p-8 rounded-2xl border bg-card transition-all hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palmtree className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Beaches</h3>
              <p className="text-muted-foreground">
                Relax and rejuvenate in the serene shores of <strong>Goa, Kerala,</strong> and{" "}
                <strong>Andaman</strong>.
              </p>
            </div>
            <div className="group p-8 rounded-2xl border bg-card transition-all hover:shadow-xl hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Heritage</h3>
              <p className="text-muted-foreground">
                Experience royal stays and rich culture in <strong>Rajasthan, Kashmir,</strong> and{" "}
                <strong>Ooty</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Getaways */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
        <div className="container-app relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <DiscoTitle>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our Special <span className="text-primary">International</span> Getaways
                </h2>
              </DiscoTitle>
              <p className="text-slate-400 max-w-xl">
                Curated global experiences crafted for the modern explorer.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Enquire Now
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Tropical Paradise Islands",
                desc: "Escape to Maldives overwater villas, Bali beach resorts, and enjoy unique shopping experiences.",
                icon: <Palmtree className="w-6 h-6" />,
                img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
              },
              {
                title: "European Bespoke Journeys",
                desc: "Explore breathtaking landmarks across London, Paris, and more—crafted itineraries tailored for every explorer.",
                icon: <Globe className="w-6 h-6" />,
                img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Middle East Marvels",
                desc: "Experience luxury Dubai desert tours, private yacht rides, and exclusive cultural immersions in Baku.",
                icon: <Milestone className="w-6 h-6" />,
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Asian Wonders Await",
                desc: "Discover the vibrant cities of Singapore, Malaysia, and Vietnam with customized sightseeing adventures.",
                icon: <MapPin className="w-6 h-6" />,
                img: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-3xl overflow-hidden h-64 shadow-lg border border-white/10"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 backdrop-blur-md rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 line-clamp-2 max-w-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Travel Solutions */}
      <section className="py-24 bg-muted/50">
        <div className="container-app">
          <div className="text-center mb-16">
            <DiscoTitle>
              <h2 className="text-4xl font-bold mb-4">
                Exclusive <span className="text-primary">Travel Solutions</span>
              </h2>
            </DiscoTitle>
            <p className="text-muted-foreground">
              Comprehensive services for every type of journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Business Travel Support",
                desc: "We manage every detail of your corporate travel — flights, hotels, and transfers — for a seamless experience.",
                icon: <Building2 className="text-blue-500" />,
              },
              {
                title: "Team Getaways",
                desc: "Boost team spirit with customized retreats, incentive tours, and off-site trips that mix fun with focus.",
                icon: <Users className="text-green-500" />,
              },
              {
                title: "Spiritual Journeys",
                desc: "Discover sacred destinations across India and abroad with personalized pilgrimage packages.",
                icon: <Heart className="text-red-500" />,
              },
              {
                title: "Student Expeditions",
                desc: "Educational tours designed to inspire learning through exploration, culture, and real-world experiences.",
                icon: <BookOpen className="text-purple-500" />,
              },
              {
                title: "Group Escapes",
                desc: "Tailor-made vacations for families, friends, and communities — crafted to fit your style and budget.",
                icon: <Users className="text-orange-500" />,
              },
              {
                title: "Your World, Our Expertise",
                desc: "Whether it's a solo trip or a large event, we bring professional expertise to every mile of your journey.",
                icon: <Award className="text-yellow-500" />,
              },
            ].map((sol, i) => (
              <div
                key={i}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {sol.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{sol.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24">
        <div className="container-app">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <DiscoTitle>
                <h2 className="text-4xl font-bold mb-8">
                  Your World, <br />
                  <span className="text-primary">Our Expertise</span>
                </h2>
              </DiscoTitle>
              <div className="space-y-8">
                {[
                  {
                    title: "Easy Visa Access",
                    desc: "Fast-track your travel plans with professional visa support for global destinations.",
                    icon: <CheckCircle2 className="text-primary" />,
                  },
                  {
                    title: "Perfect Stay Offers",
                    desc: "Get exclusive hotel deals across the world where comfort meets affordability.",
                    icon: <CheckCircle2 className="text-primary" />,
                  },
                  {
                    title: "Complete Coverage",
                    desc: "Travel worry-free with tailored insurance options for every trip type.",
                    icon: <CheckCircle2 className="text-primary" />,
                  },
                  {
                    title: "Global Education Pathways",
                    desc: "We simplify your study abroad process guiding you to the right university, visa, and journey.",
                    icon: <CheckCircle2 className="text-primary" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img
                  src="https://picsum.photos/id/1015/600/800"
                  alt="Travel"
                  className="rounded-2xl shadow-lg aspect-[3/4] object-cover"
                />
                <img
                  src="https://picsum.photos/id/1016/600/600"
                  alt="Travel"
                  className="rounded-2xl shadow-lg aspect-square object-cover"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://picsum.photos/id/1018/600/600"
                  alt="Travel"
                  className="rounded-2xl shadow-lg aspect-square object-cover"
                />
                <img
                  src="https://picsum.photos/id/1019/600/800"
                  alt="Travel"
                  className="rounded-2xl shadow-lg aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Special Offers */}
      <section className="py-24 bg-primary text-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <DiscoTitle>
              <h2 className="text-4xl font-bold mb-4">Why Travel with Vicky Ryoko Tours?</h2>
            </DiscoTitle>
            <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-bold border border-white/20">
              Get up to 40% off on over 2,000 select hotels!
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Personalized Journeys",
                desc: "Unique itineraries crafted for every kind of traveler—families, couples, friends, or solo explorers.",
                icon: <Heart />,
              },
              {
                title: "Special Offers",
                desc: "From comfort stays to luxury escapes, we bring you the best value for your money.",
                icon: <Award />,
              },
              {
                title: "Complete Travel Care",
                desc: "From visa processing and hotel bookings to insurance, everything is managed with care.",
                icon: <ShieldCheck />,
              },
              {
                title: "Always Here for You",
                desc: "24/7 expert assistance, making your journey safe, easy, and enjoyable.",
                icon: <Clock />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Founder Section */}
      <section className="py-24 border-t">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <DiscoTitle>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              </DiscoTitle>
              <div className="flex flex-wrap justify-center gap-8 text-lg font-medium">
                <a
                  href="tel:+918639888490"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Clock className="w-5 h-5" /> +91 8639888490
                </a>
                <a
                  href="mailto:vickyryoko529@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Globe className="w-5 h-5" /> vickyryoko529@gmail.com
                </a>
              </div>
              <p className="mt-4 text-muted-foreground">
                Vicky ryoko, Abhi centre, narsipatnam, Visakhapatnam 531116
              </p>
            </div>

            <div className="p-10 rounded-3xl bg-muted/30 border">
              <div className="inline-flex items-center gap-4 text-left">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">
                    Kamili Vikas Varma
                  </h3>
                  <p className="text-primary font-medium tracking-widest uppercase text-xs">
                    Founder and Chairman
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
