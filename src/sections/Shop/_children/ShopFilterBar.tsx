"use client";

import classNames from "classnames";
import React from "react";
import { useShopFilterStore } from "../_stores/useShopFilter.store";

export default function ShopFilterBar() {
  const {
    selectedCategories,
    selectedColors,
    categories,
    colors,
    toggleCategory,
    toggleColor,
    clearFilters,
  } = useShopFilterStore();

  return (
    <div className=" p-4 lg:p-0 rounded-lg w-full max-w-xs">
      <div className="flex gap-4 items-center mb-4">
        <p className="font-bold text-lg">Filters</p>
        <button
          onClick={clearFilters}
          className="text-gray-300 text-sm hover:text-red-600"
        >
          Clear filters
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="text-sm capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={classNames(
                "h-8 w-8 rounded-full",
                {
                  "border-gray-300": color.value === "#FFFFFF",
                  "border-transparent": color.value !== "#FFFFFF",
                  "ring-2 ring-black ring-offset-1": selectedColors.includes(
                    color.name
                  ),
                },
                "border"
              )}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
