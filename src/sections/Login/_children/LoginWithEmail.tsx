"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLoginMethodStore } from "../_stores/useLoginMethods.store";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Cookies from "js-cookie";

export default function LoginWithEmail() {
  const { setMethod } = useLoginMethodStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use the Convex login mutation
  const login = useMutation(api.user.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      // Call the Convex login mutation
      const result = await login({ email, password });

      // Store the token in cookies or localStorage based on "remember me" preference
      if (remember) {
        // For persistent auth (14 days)
        Cookies.set("authToken", result.token, { expires: 14 });
      } else {
        // Session cookie that expires when browser is closed
        Cookies.set("authToken", result.token);
      }

      // Store user information if needed
      localStorage.setItem("user", JSON.stringify(result.user));

      // Redirect or update UI state
      // You could redirect to dashboard or update app state here
      console.log("Login successful", result);
    } catch (error) {
      // Handle Convex error
      setError("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md p-8 bg-white">
        <h1 className="mb-1 text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mb-6 text-gray-500">Login with email</p>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border-gray-300 rounded"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <div>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-gray-400 hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Or{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMethod("social");
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              go back to login methods
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
