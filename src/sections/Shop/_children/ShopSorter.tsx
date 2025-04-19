"use client";

import { ChevronDown } from "lucide-react";
import CustomPopover from "@/components/CustomPopover";
import { useShopFilterStore } from "../_stores/useShopFilter.store";

export default function ShopSorter() {
  const { sortOption, sortOptions, setSortOption } = useShopFilterStore();

  return (
    <div className="flex items-center justify-between">
      <CustomPopover
        trigger={
          <div className="flex items-center border border-black px-4 py-2 bg-white min-w-40">
            <span className="text-gray-500 mr-2 text-sm">Sort By:</span>
            <span className="font-semibold text-sm">{sortOption}</span>
            <span className="ml-auto text-gray-400">
              <ChevronDown />
            </span>
          </div>
        }
        content={
          <div className="flex flex-col w-full">
            {sortOptions.map((option) => (
              <button
                key={option}
                className={`text-left px-3 py-2 hover:bg-gray-100 text-sm ${
                  option === sortOption ? "font-medium" : ""
                }`}
                onClick={() => setSortOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        }
        position="bottom"
        width="w-56"
      />
    </div>
  );
}
