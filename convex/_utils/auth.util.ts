/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Id } from "../_generated/dataModel";
import { UserRole } from "../user/entities/user.type";

const JWT_SECRET = process.env.JWT_SECRET || "thanh364";
const SALT_ROUNDS = 6;

/**
 * Hashes a password using bcrypt
 * @param password - The plain text password to hash
 * @returns Promise resolving to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
}

/**
 * Compares a plain text password with a hashed password
 * @param plainPassword - The plain text password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns Promise resolving to a boolean indicating if passwords match
 */
export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    // Use bcrypt to compare the passwords
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password comparison failed");
  }
}

interface JwtPayload {
  userId: Id<"users">;
  email: string;
  role: UserRole;
}

/**
 * Generates a JSON Web Token (JWT)
 * @param payload - User information to include in the token
 * @returns The generated JWT token
 */
export function generateJWT(payload: JwtPayload): string {
  try {
    // Convert the payload to a plain object
    const plainPayload = {
      userId: String(payload.userId),
      email: payload.email,
      role: payload.role,
    };

    // Create and return the JWT
    return jwt.sign(plainPayload, String(JWT_SECRET));
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("JWT generation failed");
  }
}

/**
 * Verifies a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded token payload if valid
 */
export function verifyJWT(token: string): any {
  try {
    // Verify the token using the secret key
    return jwt.verify(token, String(JWT_SECRET));
  } catch (error) {
    console.error("Error verifying JWT:", error);
    throw new Error("JWT verification failed");
  }
}
