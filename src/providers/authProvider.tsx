// File: lib/auth.tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { ReactNode, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { api } from "../../convex/_generated/api";
import { UserDoc } from "../../convex/user/entities/user.type";
import AppPath, { ProtectedPaths } from "@/constants/path.const";

// Export the store for direct access when needed
export { useAuthStore };

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Access auth store
  const { token, setToken, setUser, setLoading } = useAuthStore();

  // Convex mutations
  const loginMutation = useMutation(api.auth.login);
  const registerMutation = useMutation(api.auth.register);

  // Convex query
  const userData = useQuery(api.auth.getMe, token ? { token } : "skip");

  // Implement login method
  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const result = await loginMutation({ email, password });

        // Save token to store (which persists to localStorage through zustand middleware)
        setToken(result.token);

        // No need to set user - it will be fetched by the useQuery hook
        router.push(AppPath.home);
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [loginMutation, router, setLoading, setToken]
  );

  // Implement register method
  const register = useCallback(
    async (userData: {
      email: string;
      password: string;
      name: string;
      phone: string;
      role?: string;
    }) => {
      setLoading(true);
      try {
        const result = await registerMutation(userData);

        setToken(result.token);
        router.push(AppPath.home);
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [registerMutation, router, setLoading, setToken]
  );

  // Override store methods with implementations
  useEffect(() => {
    const storeState = useAuthStore.getState();

    // Patch the auth store with our implementation
    useAuthStore.setState({
      ...storeState,
      login,
      register,
    });
  }, [login, register]);

  // Update user when userData changes
  useEffect(() => {
    // console.log(userData);
    // if (userData === undefined) {
    //   // Still loading
    //   // setLoading(true);
    //   return;
    // }

    if (userData === null || userData === undefined) {
      // Not authenticated
      setUser(null);
      setLoading(false);

      // Redirect to login if on protected route
      if (
        pathname !== AppPath.login &&
        pathname !== "/register" &&
        !pathname.startsWith("/auth/") &&
        ProtectedPaths.includes(pathname)
      ) {
        router.push(AppPath.login);
      }
      return;
    }

    // User is authenticated, update store
    setUser(userData as unknown as UserDoc);
    setLoading(false);

    if (
      pathname === AppPath.login ||
      pathname === "/register" ||
      pathname === "/"
    ) {
      router.push(AppPath.home);
    }
  }, [userData, pathname, router, setLoading, setUser]);

  // Handle token on initial load
  useEffect(() => {
    // Token is already loaded from localStorage by Zustand persist middleware
    // Only need to set loading to false if no token exists
    if (!token) {
      setLoading(false);
    }
  }, [token, setLoading]);

  return <>{children}</>;
}

// Auth protection wrapper for client components
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push(AppPath.login);
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Custom hook to access auth store directly
export function useAuth() {
  return useAuthStore();
}
