import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="w-full bg-white border-b border-gray-200 text-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="w-full flex justify-start gap-8">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Ecommerce
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm hover:text-gray-600">
              Shop
            </Link>
            <Link href="/stories" className="text-sm hover:text-gray-600">
              Stories
            </Link>
            <Link href="/about" className="text-sm hover:text-gray-600">
              About
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center border-b border-transparent focus-within:border-gray-300 transition-colors">
            <Search className="h-4 w-4 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="border-none focus-visible:ring-0 focus-visible:outline-none p-0 h-8 text-sm"
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
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Login */}
          <Link href="/login" className="text-sm hover:text-gray-600">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
