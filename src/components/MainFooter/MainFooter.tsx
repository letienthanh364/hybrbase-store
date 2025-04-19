import { NavigateItem } from "@/types/_common/navigateItem.type";
import Link from "next/link";
import React from "react";

const ShopNavigateList: NavigateItem[] = [
  {
    name: "Women's",
    url: "#",
  },
  {
    name: "Men's",
    url: "#",
  },
  {
    name: "Kids'",
    url: "#",
  },
  {
    name: "Shoes",
    url: "#",
  },
  {
    name: "Equipment",
    url: "#",
  },
  {
    name: "By Activity",
    url: "#",
  },
  {
    name: "Gift Cards",
    url: "#",
  },
  {
    name: "Sale",
    url: "#",
  },
];

const HelpNavigateList: NavigateItem[] = [
  {
    name: "Help Center",
    url: "#",
  },
  {
    name: "Order Status",
    url: "#",
  },
  {
    name: "Size Chart",
    url: "#",
  },
  {
    name: "Returns & Warranty",
    url: "#",
  },
  {
    name: "Contact Us",
    url: "#",
  },
];

const AboutNavigateList: NavigateItem[] = [
  {
    name: "About Us",
    url: "#",
  },
  {
    name: "Responsibility",
    url: "#",
  },
  {
    name: "Technology & Innovation",
    url: "#",
  },
  {
    name: "Explore our stories",
    url: "#",
  },
];

export default function MainFooter() {
  return (
    <footer className="bg-gray-100 py-16 border-t border-black px-4 md:px-6 lg:px-8 text-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Newsletter Signup */}
          <div className="col-span-1 md:col-span-2">
            <div className="w-full md:w-10/12 space-y-4 ">
              <h2 className="text-2xl font-bold">Sign up for our newsletter</h2>
              <p className="text-sm">
                Be the first to know about our special offers, new product
                launches, and events
              </p>
              <div className="flex mt-4 border border-black p-2 gap-2 items-center overflow-hidden justify-between">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="outline-none border-none w-36 sm:w-48 md:w-64 flex-shrink min-w-0"
                />
                <button
                  type="submit"
                  className="text-black font-semibold whitespace-nowrap flex-shrink-0"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Shop</h3>

            <ul className="space-y-2">
              {ShopNavigateList.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href="#" className="text-gray-600 hover:text-black">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Help Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="space-y-2">
              {HelpNavigateList.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href="#" className="text-gray-600 hover:text-black">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About</h3>
            <ul className="space-y-2">
              {AboutNavigateList.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href="#" className="text-gray-600 hover:text-black">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
