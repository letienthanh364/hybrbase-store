import { toast } from "sonner";
import { create } from "zustand";

// Define the possible checkout sections
export type CheckoutSection = "address" | "shipping" | "payment";

// Define the store state type
interface CheckoutState {
  // Current active section
  currentSection: CheckoutSection;

  // Coupon code
  coupon: string;

  // Actions to change the state
  setSection: (section: CheckoutSection) => void;

  // Set coupon code
  setCoupon: (coupon: string) => void;

  // Apply coupon code
  applyCoupon: () => void;

  // Navigate to next section or back to previous section
  goToNextSection: () => void;
  goToPreviousSection: () => void;

  // Utility to check if a specific section is active
  isSectionActive: (section: CheckoutSection) => boolean;
}

// Create the Zustand store
const useCheckoutStore = create<CheckoutState>((set, get) => ({
  // Initial state
  currentSection: "address",
  coupon: "",

  // Set the current section
  setSection: (section) => set({ currentSection: section }),

  // Set the coupon code
  setCoupon: (coupon) => set({ coupon }),

  // Apply the coupon code
  applyCoupon: () => {
    const { coupon } = get();

    if (!coupon) {
      toast.error("Please enter a coupon code");
      return;
    }

    // Here you would typically validate the coupon with an API call
    // For now, we'll just show a success message
    toast.success(`Coupon "${coupon}" applied successfully!`);
  },

  // Navigate to the next section based on the current state
  goToNextSection: () => {
    const { currentSection } = get();

    // Move to the next checkout section
    switch (currentSection) {
      case "address":
        set({ currentSection: "shipping" });
        break;
      case "shipping":
        set({ currentSection: "payment" });
        break;
      case "payment":
        // This would be the final step, maybe trigger order submission
        toast.success("Checkout complete!");
        break;
    }
  },

  // Navigate to the previous section based on the current state
  goToPreviousSection: () => {
    const { currentSection } = get();

    // Move to the previous checkout section
    switch (currentSection) {
      case "address":
        // Go back to cart page
        window.location.href = "/cart";
        break;
      case "shipping":
        set({ currentSection: "address" });
        break;
      case "payment":
        set({ currentSection: "shipping" });
        break;
    }
  },

  // Check if a specific checkout section is active
  isSectionActive: (section) => {
    return get().currentSection === section;
  },
}));

export default useCheckoutStore;
