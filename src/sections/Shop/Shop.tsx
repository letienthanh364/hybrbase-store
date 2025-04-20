import React from "react";
import ShopHeader from "./_children/ShopHeader";
import ShopFilterBar from "./_children/ShopFilterBar";
import ShopSorter from "./_children/ShopSorter";
import ShopProductList from "./_children/ShopProductList";

export default function Shop() {
  return (
    <div className="w-full bg-gray-50 flex flex-col items-center">
      <ShopHeader />
      <div className="py-8 container px-4 xl:px-6 flex justify-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 ">
          <div className="col-span-2 md:col-span-1">
            <ShopFilterBar />
          </div>
          <div className="col-span-2 md:col-span-3 flex flex-col gap-2">
            <div className="w-full flex justify-end">
              <ShopSorter />
            </div>
            <ShopProductList />
          </div>
        </div>
      </div>
    </div>
  );
}
