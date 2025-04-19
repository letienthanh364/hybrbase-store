import React from "react";
import ShopHeader from "./_children/ShopHeader";
import ShopFilterBar from "./_children/ShopFilterBar";
import ShopSorter from "./_children/ShopSorter";

export default function Shop() {
  return (
    <div className="w-full bg-gray-50 flex flex-col items-center">
      <ShopHeader />
      <div className="py-8 container px-4 xl:px-6 flex justify-center">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="col-span-1">
            <ShopFilterBar />
          </div>
          <div className="col-span-2 lg:col-span-3 flex flex-col gap-4">
            <div className="w-full flex justify-end">
              <ShopSorter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
