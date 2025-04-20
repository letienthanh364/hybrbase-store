import AppPath from "@/constants/path.const";
import { useAuthStore } from "@/stores/useAuthStore";
import { Heart, LogOut, Settings, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePopoverContent() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push(AppPath.login);
  };

  return (
    <div className="flex flex-col space-y-3 text-black">
      <div className="pb-2 border-b border-gray-100">
        <p className="font-semibold">{user?.name || "User"}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <Link
        href="/profile"
        className="flex items-center gap-2 py-1 hover:text-blue-600"
      >
        <User className="h-4 w-4" />
        <span>My Profile</span>
      </Link>

      <Link
        href="/orders"
        className="flex items-center gap-2 py-1 hover:text-blue-600"
      >
        <ShoppingBag className="h-4 w-4" />
        <span>My Orders</span>
      </Link>

      <Link
        href="/wishlist"
        className="flex items-center gap-2 py-1 hover:text-blue-600"
      >
        <Heart className="h-4 w-4" />
        <span>Wishlist</span>
      </Link>

      <Link
        href="/settings"
        className="flex items-center gap-2 py-1 hover:text-blue-600"
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 py-1 text-red-500 hover:text-red-700 mt-2 w-full text-left"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}
