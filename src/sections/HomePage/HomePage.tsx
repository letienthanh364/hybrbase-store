import React from "react";
import HeroSection from "./_children/HeroSection";
import LatestArrivals from "./_children/LatestArrivals";

export default function HomePage() {
  return (
    <div className=" flex flex-col gap-6 items-center">
      <HeroSection />
      <div className="container">
        <div className="border-t border-black w-full"></div>
      </div>
      <LatestArrivals />
    </div>
  );
}
