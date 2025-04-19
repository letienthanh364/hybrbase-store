import { create } from "zustand";

// Define the types
interface Color {
  name: string;
  value: string;
}

// Define the valid sort options
type SortOption =
  | "Popular"
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Best Rated";

interface FilterState {
  // State
  selectedCategories: string[];
  selectedColors: string[];
  categories: string[];
  colors: Color[];
  sortOption: SortOption;
  sortOptions: SortOption[];

  // Actions
  toggleCategory: (category: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;
  setSortOption: (option: SortOption) => void;
}

export const useShopFilterStore = create<FilterState>((set) => ({
  // Initial state
  selectedCategories: ["Jackets"],
  selectedColors: [],
  categories: [
    "Jackets",
    "Fleece",
    "Sweatshirts & Hoodies",
    "Sweaters",
    "Shirts",
    "T-Shirts",
    "Pants & Jeans",
  ],
  colors: [
    { name: "Orange", value: "#F8A878" },
    { name: "Purple", value: "#7B68EE" },
    { name: "Green", value: "#4CAF50" },
    { name: "Blue", value: "#2196F3" },
    { name: "Red", value: "#F44336" },
    { name: "Light Blue", value: "#87CEEB" },
    { name: "Dark Gray", value: "#424242" },
    { name: "Violet", value: "#BA68C8" },
    { name: "White", value: "#FFFFFF" },
    { name: "Mint", value: "#98FB98" },
  ],
  sortOption: "Popular",
  sortOptions: [
    "Popular",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Best Rated",
  ],

  // Actions
  toggleCategory: (category: string) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  toggleColor: (color: string) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(color)
        ? state.selectedColors.filter((c) => c !== color)
        : [...state.selectedColors, color],
    })),

  clearFilters: () =>
    set({
      selectedCategories: [],
      selectedColors: [],
    }),

  setSortOption: (option: SortOption) =>
    set({
      sortOption: option,
    }),
}));
