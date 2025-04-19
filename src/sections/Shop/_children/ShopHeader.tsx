import React from "react";

export default function ShopHeader() {
  return (
    <div className="bg-black py-8 w-full text-white flex flex-col items-center">
      <div className="container px-4 xl:px-6 w-full flex flex-col gap-4 lg:gap-6 items-start">
        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold">
          Shop Men’s
        </h3>
        <div className="max-w-[476px] text-wrap">
          Revamp your style with the latest designer trends in men’s clothing or
          achieve a perfectly curated wardrobe thanks to our line-up of timeless
          pieces.
        </div>
      </div>
    </div>
  );
}
