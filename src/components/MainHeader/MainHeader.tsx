"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import CustomPopover from "../CustomPopover";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfilePopoverContent from "./ProfilePopoverContent";

export default function MainHeader() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  const isHomePage = pathname === "/";

  const navigateItemClassname = classNames("font-medium", {
    "hover:text-gray-600": isHomePage,
    "hover:text-gray-300": !isHomePage,
  });

  // Profile popover content

  return (
    <header
      className={classNames("w-full border-b", {
        "bg-white border-gray-200 text-black": isHomePage,
        "bg-black border-gray-200 text-white": !isHomePage,
      })}
    >
      <div className="container px-4 xl:px-6 mx-auto h-16 flex items-center justify-between">
        <div className="w-full flex justify-start gap-8">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Ecommerce
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className={navigateItemClassname}>
              Shop
            </Link>
            <Link href="/stories" className={navigateItemClassname}>
              Stories
            </Link>
            <Link href="/about" className={navigateItemClassname}>
              About
            </Link>
          </div>

          {/* Search */}
          <div
            className={classNames(
              "hidden md:flex items-center border-b border-transparent focus-within:border-gray-300 transition-colors",
              {
                "text-gray-500": isHomePage,
                "text-gray-300": !isHomePage,
              }
            )}
          >
            <Search className="h-4 w-4 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className={classNames(
                "border-none focus-visible:ring-0 focus-visible:outline-none p-0 h-8 text-sm",
                {
                  "placeholder:text-gray-500 bg-white": isHomePage,
                  "placeholder:text-gray-300 bg-black": !isHomePage,
                }
              )}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          {/* Mobile Menu Button (only shows on mobile) */}
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Cart */}
          <Link href="/cart" className={classNames("flex items-center gap-2")}>
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">3</span>
          </Link>

          {/* Conditional Login/Profile with Popover */}
          {isAuthenticated ? (
            <CustomPopover
              trigger={
                <div
                  className={`flex items-center gap-2 ${navigateItemClassname}`}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">
                    {user?.name || "Profile"}
                  </span>
                </div>
              }
              content={<ProfilePopoverContent />}
              position="bottom"
              width="w-56"
            />
          ) : (
            <Link href="/login" className={navigateItemClassname}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
