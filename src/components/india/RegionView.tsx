import { motion } from "framer-motion";
import { Region, State } from "@/lib/india-data";
import { ArrowLeft, MapPin, Navigation, Thermometer, Sparkles, Compass } from "lucide-react";

interface RegionViewProps {
  region: Region;
  onStateClick: (state: State) => void;
  onBack: () => void;
}

export function RegionView({ region, onStateClick, onBack }: RegionViewProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cinematic Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src={region.image}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/40 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Regions
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-lg">
              {region.name}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              {region.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* States Section */}
      <section className="container-app -mt-20 relative z-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {region.states.map((state, idx) => (
            <StateCard
              key={state.id}
              state={state}
              index={idx}
              onClick={() => onStateClick(state)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function StateCard({
  state,
  index,
  onClick,
}: {
  state: State;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative h-[500px] bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 cursor-pointer"
    >
      {/* State Image */}
      <div className="h-2/3 overflow-hidden">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {state.categories.map((cat) => (
            <div key={cat} className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg">
              {cat === "adventure" && <Navigation className="h-4 w-4 text-orange-600" />}
              {cat === "spiritual" && <Sparkles className="h-4 w-4 text-amber-600" />}
              {cat === "nature" && <Compass className="h-4 w-4 text-green-600" />}
              {cat === "cultural" && <MapPin className="h-4 w-4 text-blue-600" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 bg-white p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              {state.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
              <Thermometer className="h-3 w-3" />
              <span>{state.weather}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Starting from
            </p>
            <p className="text-xl font-bold text-orange-600">{state.startingPrice}</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2">{state.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin className="h-4 w-4 text-orange-500" />
            <span>{state.placesCount} destinations</span>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-orange-600 font-bold text-sm"
          >
            Explore <Navigation className="h-4 w-4" />
          </motion.div>
        </div>
      </div>

      {/* Interactive Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
