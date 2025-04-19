import React from "react";
import HeroSection from "./_children/HeroSection";
import LatestArrivals from "./_children/LatestArrivals";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <LatestArrivals />
    </div>
  );
}
