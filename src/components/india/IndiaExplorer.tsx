import { useState } from "react";
import { Region, State, Package } from "@/lib/india-data";
import { IndiaMainView } from "./IndiaMainView";
import { RegionView } from "./RegionView";
import { StateView } from "./StateView";
import { useCart } from "@/context/CartContext";
import { TravelPackage } from "@/lib/tourist-data";
import { SiteLayout } from "@/components/site/Layout";
import { motion, AnimatePresence } from "framer-motion";

export function IndiaExplorer() {
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3>(1);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const { addItem } = useCart();

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    setCurrentLevel(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setCurrentLevel(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToRegions = () => {
    setCurrentLevel(1);
    setSelectedRegion(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToStates = () => {
    setCurrentLevel(2);
    setSelectedState(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookPackage = (pkg: Package) => {
    // Convert India Package to TravelPackage
    const travelPkg: TravelPackage = {
      name: pkg.name,
      tier: "medium", // Default tier
      duration: pkg.duration,
      price: parseInt(pkg.price.replace(/,/g, "")),
      inclusions: ["Accommodation", "Breakfast", "Sightseeing"], // Default inclusions
      highlights: pkg.highlights,
      query: pkg.name,
    };
    addItem(travelPkg, "IND", "India");
  };

  return (
    <div className="bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {currentLevel === 1 && (
          <motion.div
            key="level1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <IndiaMainView onRegionClick={handleRegionClick} />
          </motion.div>
        )}

        {currentLevel === 2 && selectedRegion && (
          <motion.div
            key="level2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <RegionView
              region={selectedRegion}
              onStateClick={handleStateClick}
              onBack={handleBackToRegions}
            />
          </motion.div>
        )}

        {currentLevel === 3 && selectedState && (
          <motion.div
            key="level3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StateView
              state={selectedState}
              onBack={handleBackToStates}
              onBookPackage={handleBookPackage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
