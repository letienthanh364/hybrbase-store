import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LatestArrivals() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto text-center flex flex-col gap-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 lg:gap-6 items-center">
          <h3 className="text-xl md:text-2xl lg:text-4xl font-bold">
            Our latest arrivals
          </h3>
          <p className="text-[#979797] max-w-2xl mx-auto">
            Create screens directly in Method or add your images from Sketch or
            Figma. You can even sync designs from your cloud storage!
          </p>
          <Link
            href="/shop"
            className="px-16 py-2 h-auto text-base border border-black bg-white text-black hover:bg-gray-100 grow-0"
          >
            Shop All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aspect-[6/9] bg-gray-300 relative">
            <Image
              src={"/images/model1.png"}
              alt={`model 1`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>{" "}
          <div className="aspect-[6/9] bg-gray-300 relative md:mt-16">
            <Image
              src={"/images/model2.png"}
              alt={`model 2`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>{" "}
          <div className="aspect-[6/9] bg-gray-300 relative">
            <Image
              src={"/images/model3.png"}
              alt={`model 3`}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
