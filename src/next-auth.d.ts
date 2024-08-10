import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      surname?: string;
      phone?: string;
      address?: string;
      city?: string;
      postalCode?: string;
      fiscalCode?: string;
      image?: string;
      birthdate?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    surname?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    fiscalCode?: string;
    image?: string;
    birthdate?: string;
    role?:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    surname?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    fiscalCode?: string;
    image?: string;
    birthdate?: string;
    role?:string;
  }
}

interface Collaborator {
  id: string;
  email: string;
  role: string; // Es. "admin", "guest", etc.
}

interface Project {
  isDeleted: boolean;
  isDeleted: unknown;
  isDeleted: any;
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image?: string;
  avatar: string;
  collaborators: Collaborator[];
}