import { create } from "zustand";

export interface Checkout_Address {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  zipcode: string;
  optional: string;
  saveContact: boolean;
}

interface AddressState {
  addressData: Checkout_Address;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setAddress: (address: string) => void;
  setApartment: (apartment: string) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setZipcode: (zipcode: string) => void;
  setOptional: (optional: string) => void;
  setSaveContact: (saveContact: boolean) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  addressData: {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    zipcode: "",
    optional: "",
    saveContact: false,
  },
  setFirstName: (firstName) =>
    set((state) => ({
      addressData: { ...state.addressData, firstName },
    })),
  setLastName: (lastName) =>
    set((state) => ({
      addressData: { ...state.addressData, lastName },
    })),
  setAddress: (address) =>
    set((state) => ({
      addressData: { ...state.addressData, address },
    })),
  setApartment: (apartment) =>
    set((state) => ({
      addressData: { ...state.addressData, apartment },
    })),
  setCity: (city) =>
    set((state) => ({
      addressData: { ...state.addressData, city },
    })),
  setCountry: (country) =>
    set((state) => ({
      addressData: { ...state.addressData, country },
    })),
  setZipcode: (zipcode) =>
    set((state) => ({
      addressData: { ...state.addressData, zipcode },
    })),
  setOptional: (optional) =>
    set((state) => ({
      addressData: { ...state.addressData, optional },
    })),
  setSaveContact: (saveContact) =>
    set((state) => ({
      addressData: { ...state.addressData, saveContact },
    })),
}));
