import React from "react";
import { useCheckoutStore_Address } from "../_stores/useCheckout_Address.store";
import CustomPopover from "@/components/CustomPopover";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";

const countries = [
  "Vietnam",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "India",
];

const cities: Record<string, string[]> = {
  Vietnam: [
    "Ha Noi",
    "Ho Chi Minh City",
    "Da Nang",
    "Hai Phong",
    "Hue",
    "Can Tho",
  ],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa"],
  "United Kingdom": [
    "London",
    "Manchester",
    "Birmingham",
    "Glasgow",
    "Liverpool",
  ],
  // Add more countries and cities as needed
};

interface CheckoutAddressProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function CheckoutAddress({ onContinue }: CheckoutAddressProps) {
  const {
    addressData,
    setFirstName,
    setLastName,
    setAddress,
    setApartment,
    setCity,
    setCountry,
    setZipcode,
    setOptional,
    setSaveContact,
  } = useCheckoutStore_Address();

  const { city } = addressData;

  // Generate city options based on selected country
  const cityOptions =
    addressData.country && cities[addressData.country]
      ? cities[addressData.country]
      : [];

  const inputClassnames = `p-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600 `;

  return (
    <div className="w-full">
      <p className="text-xl font-medium mb-4">Shipping Information</p>

      <div className="space-y-4 text-sm">
        {/* Name fields */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={addressData.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={classNames("w-1/2 ", inputClassnames)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={addressData.lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={classNames("w-1/2 ", inputClassnames)}
          />
        </div>

        {/* Address field */}
        <input
          type="text"
          placeholder="Address"
          value={addressData.address}
          onChange={(e) => setAddress(e.target.value)}
          className={classNames("w-full", inputClassnames)}
        />

        {/* Apartment field */}
        <input
          type="text"
          placeholder="Apartment, suite, etc.(optional)"
          value={addressData.apartment}
          onChange={(e) => setApartment(e.target.value)}
          className={classNames("w-full", inputClassnames)}
        />

        {/* City field */}
        <input
          type="text"
          placeholder="City"
          value={addressData.city}
          onChange={(e) => setCity(e.target.value)}
          className={classNames("w-full", inputClassnames)}
        />

        {/* Country, City, Zipcode row */}
        <div className="flex gap-2">
          <div className="w-1/3">
            <CustomPopover
              trigger={
                <div className="p-2 border border-gray-600 flex gap-2 items-center justify-between">
                  <span className="text-gray-500">
                    {addressData.country || "Country"}
                  </span>
                  <ChevronDown />
                </div>
              }
              content={
                <div className="max-h-48 overflow-y-auto">
                  {countries.map((c) => (
                    <div
                      key={c}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setCountry(c);
                        // Reset city if country changes
                        if (city && !cities[c]?.includes(city)) {
                          setCity("");
                        }
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              }
              width="w-full"
            />
          </div>

          <div className="w-1/3">
            <CustomPopover
              trigger={
                <div className="p-2 border border-gray-600 gap-2 flex items-center justify-between">
                  <span className="text-gray-500">
                    {addressData.city || "City"}
                  </span>
                  <ChevronDown />
                </div>
              }
              content={
                <div className="max-h-48 overflow-y-auto">
                  {cityOptions.length > 0 ? (
                    cityOptions.map((c) => (
                      <div
                        key={c}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setCity(c)}
                      >
                        {c}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">
                      Select a country first
                    </div>
                  )}
                </div>
              }
              width="w-full"
            />
          </div>

          <input
            type="text"
            placeholder="Zipcode"
            value={addressData.zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-1/3 p-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Optional field */}
        <input
          type="text"
          placeholder="Optional"
          value={addressData.optional}
          onChange={(e) => setOptional(e.target.value)}
          className={classNames("w-full", inputClassnames)}
        />

        {/* Save contact checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-contact"
            checked={addressData.saveContact}
            onChange={(e) => setSaveContact(e.target.checked)}
            className="h-4 w-4 text-black focus:ring-0"
          />
          <label htmlFor="save-contact" className=" text-sm text-gray-600">
            Save contact information
          </label>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="w-full bg-black text-base text-white py-3 font-medium hover:bg-gray-800 transition-colors"
        >
          Continue to shipping
        </button>
      </div>
    </div>
  );
}
