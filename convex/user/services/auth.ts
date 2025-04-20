/* eslint-disable @typescript-eslint/no-explicit-any */
// File: convex/auth.ts
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { mutation, query } from "../../_generated/server";

// Helper to generate a simple token
function generateToken() {
  // Simple non-cryptographic token generator
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

// Register a new user
export const register = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    // Store password directly (not encrypted)
    // NOTE: This is not secure for production, add encryption later
    const passwordRaw = args.password;

    // Generate auth token
    const token = generateToken();

    // Create user with token
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: passwordRaw,
      name: args.name,
      authToken: token,
      createdAt: Date.now(),
      lastLogin: Date.now(),
    });

    // Create empty cart for user
    await ctx.db.insert("carts", {
      userId,
      items: [],
      updatedAt: Date.now(),
    });

    return {
      token,
      userId,
      user: {
        email: args.email,
        name: args.name,
      },
    };
  },
});

// Login user
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user by email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid email or password");
    }

    // Verify password directly
    // NOTE: This is not secure for production, add encryption later
    if (user.password !== args.password) {
      throw new ConvexError("Invalid email or password");
    }

    // Generate new auth token
    const token = generateToken();

    // Update user with new token and login time
    await ctx.db.patch(user._id, {
      authToken: token,
      lastLogin: Date.now(),
    });

    return {
      token,
      userId: user._id,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  },
});

// Get current user profile
export const getMe = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user by token
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("authToken", args.token))
      .first();

    if (!user) {
      return null;
    }

    // Return user without sensitive data
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };
  },
});

// Helper function to validate a token and get user
export const validateToken = async (ctx: any, token: any) => {
  if (!token) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q: any) => q.eq("authToken", token))
    .first();

  if (!user) {
    return null;
  }

  return user;
};

// Middleware to authenticate requests
export const withAuth = async (ctx: any, token: any) => {
  const user = await validateToken(ctx, token);

  if (!user) {
    throw new ConvexError("Authentication required");
  }

  return user;
};
