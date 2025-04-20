import { useAuthStore } from "@/stores/useAuthStore";
import classNames from "classnames";
import { Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MainHeader_MobileContentProps {
  closeMobileMenu: () => void;
}

export default function MainHeader_MobileContent({
  closeMobileMenu,
}: MainHeader_MobileContentProps) {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Mobile Search */}
      <div
        className={classNames(
          "flex items-center border-b transition-colors border-gray-700 text-gray-600"
        )}
      >
        <Search className="h-4 w-4 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="border-none focus-visible:ring-0 focus-visible:outline-none p-0 h-8 text-sm bg-transparent w-full"
        />
      </div>

      {/* Mobile Navigation */}
      <nav className="space-y-4">
        <Link
          href="/shop"
          className="block py-2 text-lg font-medium"
          onClick={closeMobileMenu}
        >
          Shop
        </Link>
        <Link
          href="/stories"
          className="block py-2 text-lg font-medium"
          onClick={closeMobileMenu}
        >
          Stories
        </Link>
        <Link
          href="/about"
          className="block py-2 text-lg font-medium"
          onClick={closeMobileMenu}
        >
          About
        </Link>
      </nav>

      {/* User Section in Mobile Menu */}
      {!isAuthenticated && (
        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/login"
            className="block py-2 text-lg font-medium"
            onClick={closeMobileMenu}
          >
            Login / Register
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="pt-4 border-t border-gray-200">
          <div className="py-2 text-lg font-medium flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>{user?.name || "Profile"}</span>
          </div>
          <div className="space-y-2 pl-7 mt-2">
            <Link
              href="/profile"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              My Profile
            </Link>
            <Link
              href="/orders"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              Orders
            </Link>
            <button
              className="block py-1 text-red-500"
              onClick={() => {
                // Implement logout logic here if needed
                closeMobileMenu();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
