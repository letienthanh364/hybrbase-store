import { Id } from "../../_generated/dataModel";
import { User_ContactInformation } from "./contact.user.type";

// User interfaces
export interface UserDoc extends Omit<User, "id"> {
  _id: Id<"users">;
  _creationTime: number;
}

export interface User {
  id: Id<"users">;
  email: string;
  password: string; // This should be hashed, never stored as plaintext
  name: string;
  phone: string;
  address: User_ContactInformation | null;
  role: UserRole;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
