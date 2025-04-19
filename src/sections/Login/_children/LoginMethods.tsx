import React from "react";
import Link from "next/link";
import { useLoginMethodStore } from "../_stores/useLoginMethods.store";

export default function LoginMethods() {
  const { setMethod } = useLoginMethodStore();

  const handleSocialLogin = async (provider: string) => {
    try {
      if (provider === "email") {
        setMethod("email");
        return;
      }

      console.log(`Logging in with ${provider}`);
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full flex-1 shrink-0 ">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h1 className="mb-1 text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p className="mb-6 text-gray-500">Login to continue</p>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin("email")}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Continue with Email
          </button>

          <button
            onClick={() => handleSocialLogin("facebook")}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Continue with Facebook
          </button>

          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
              />
              <path
                fill="#34A853"
                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
              />
              <path
                fill="#FBBC05"
                d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Or{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
