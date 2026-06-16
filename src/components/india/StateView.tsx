import { motion } from "framer-motion";
import { State, Package } from "@/lib/india-data";
import {
  ArrowLeft,
  Clock,
  Star,
  Heart,
  Share2,
  MapPin,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { formatPriceInRupees } from "@/lib/countries";

interface StateViewProps {
  state: State;
  onBack: () => void;
  onBookPackage: (pkg: Package) => void;
}

export function StateView({ state, onBack, onBookPackage }: StateViewProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Header */}
      <section className="relative h-[40vh] overflow-hidden">
        <img src={state.image} className="w-full h-full object-cover" alt={state.name} />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all border border-white/30"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Region
          </motion.button>

          <div className="container-app">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
                {state.name}
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">{state.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Package Listings */}
      <section className="container-app py-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900">Available Packages</h2>
            <p className="text-slate-500 mt-2">Discover curated experiences in {state.name}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
              Filter by Price
            </button>
            <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
              Duration
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {state.packages.map((pkg, idx) => (
            <PackageCard key={pkg.name} pkg={pkg} index={idx} onBook={() => onBookPackage(pkg)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PackageCard({ pkg, index, onBook }: { pkg: Package; index: number; onBook: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
    >
      {/* Image Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-900 shadow-lg">
            <Clock className="h-3.5 w-3.5 text-orange-600" />
            {pkg.duration}
          </div>
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-orange-600 hover:text-white transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Package Details */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
            {pkg.name}
          </h3>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-6">{pkg.description}</p>

        <div className="space-y-3 mb-8">
          {pkg.highlights.slice(0, 3).map((high) => (
            <div key={high} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              {high}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Starting Price
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">₹{pkg.price}</span>
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>
          <button
            onClick={onBook}
            className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 transition-all active:scale-95"
          >
            Book <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
