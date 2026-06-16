import { motion } from "framer-motion";
import { INDIA_REGIONS, Region } from "@/lib/india-data";
import { ArrowRight, Star, MapPin, Sparkles } from "lucide-react";

interface IndiaMainViewProps {
  onRegionClick: (region: Region) => void;
}

export function IndiaMainView({ onRegionClick }: IndiaMainViewProps) {
  return (
    <div className="space-y-12 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative text-center py-24 px-4 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-black uppercase tracking-widest mb-8 shadow-sm"
          >
            <Sparkles className="h-4 w-4" /> Incredible India
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-display font-black text-slate-900 mb-8 tracking-tight">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-amber-600">
              Travel Experience
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Embark on a journey through time and tradition. From the heights of the Himalayas to the
            tranquil backwaters of the South.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-12">
            {[
              { label: "Destinations", value: "500+" },
              { label: "Happy Travelers", value: "50K+" },
              { label: "Experiences", value: "1000+" },
            ].map((stat, i) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                key={stat.label}
                className="text-center"
              >
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Regions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto pb-32">
        {INDIA_REGIONS.map((region, idx) => (
          <RegionCard
            key={region.id}
            region={region}
            index={idx}
            onClick={() => onRegionClick(region)}
          />
        ))}
      </div>
    </div>
  );
}

function RegionCard({
  region,
  index,
  onClick,
}: {
  region: Region;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Background Image with Zoom Effect */}
      <img
        src={region.image}
        alt={region.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-3xl font-bold group-hover:text-orange-400 transition-colors">
              {region.name}
            </h3>
            <motion.div
              whileHover={{ x: 5 }}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </div>

          <p className="text-white/80 line-clamp-2 text-sm md:text-base leading-relaxed">
            {region.description}
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            {region.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] md:text-xs"
              >
                <span className="text-white/60 mr-1">{stat.label}:</span>
                <span className="font-bold">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Highlights Preview */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                >
                  <img
                    src={`https://picsum.photos/seed/${region.id}-${i}/100/100`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-xs font-medium text-white/90">
              Popular: {region.popularDestinations.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Light Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/40 transition-all" />
    </motion.div>
  );
}
