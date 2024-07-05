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
  }
}
