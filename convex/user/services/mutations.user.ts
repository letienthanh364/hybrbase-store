import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { UserRole } from "../entities/user.type";
import { mutation } from "../../_generated/server";
import {
  comparePasswords,
  generateJWT,
  hashPassword,
} from "../../_utils/auth.util";

// Register a new user
export const register = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(args.password);

    // Create the new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: hashedPassword,
      name: args.name,
      phone: args.phone,
      address: null,
      role: UserRole.USER, // Default role for new users
    });

    // Generate authentication token
    const token = generateJWT({
      userId,
      email: args.email,
      role: UserRole.USER,
    });

    return {
      user: {
        id: userId,
        email: args.email,
        name: args.name,
        phone: args.phone,
        role: UserRole.USER,
      },
      token,
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
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    // If user doesn't exist or password doesn't match
    if (!user) {
      throw new ConvexError("Invalid credentials");
    }

    // Compare password
    const passwordMatch = await comparePasswords(args.password, user.password);
    if (!passwordMatch) {
      throw new ConvexError("Invalid credentials");
    }

    // Generate authentication token
    const token = generateJWT({
      userId: user._id,
      email: user.email,
      role: user.role as UserRole,
    });

    // Return user info (excluding password) and token
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  },
});
