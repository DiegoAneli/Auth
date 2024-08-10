/*import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),



    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },



      async authorize(credentials) {
        console.log("authorize function called");
        console.log("credentials:", credentials);

        try {
          const client = await clientPromise;
          const db = client.db('Users_form_registration');
          const usersCollection = db.collection('users');

          console.log("Database connected");

          const email = credentials?.email.toLowerCase();
          const user = await usersCollection.findOne({ email: email });
          console.log("User found:", user);

          if (!user) {
            console.error("User not found");
            return null;
          }
          
          if (!user.isVerified) {
            console.error("User not verified");
            return null;
          }

          const isValid = await bcrypt.compare(credentials!.password, user.password);
          console.log("Password valid:", isValid);

          if (!isValid) {
            console.error("Invalid password");
            return null;
          }

          return { id: user._id.toString(), name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  
  session: {
    strategy: 'jwt',  // Usa JWT per le sessioni
  },


  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      console.log("Session callback called", { session, token });
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      console.log("JWT callback called", { token, user });
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      //console.log("Redirect callback called", { url, baseUrl });
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});*/

/*
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db('Users_form_registration');
          const usersCollection = db.collection('users');

          const email = credentials?.email.toLowerCase();
          const user = await usersCollection.findOne({ email: email });

          if (!user) {
            return null;
          }

          if (!user.isVerified) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials!.password, user.password);

          if (!isValid) {
            return null;
          }

          return { id: user._id.toString(), name: user.name, email: user.email, surname: user.surname, phone: user.phone, address: user.address, city: user.city, postalCode: user.postalCode, fiscalCode: user.fiscalCode, image: user.image, birthdate: user.birthdate };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email,
          name: token.name,
          surname: token.surname,
          phone: token.phone,
          address: token.address,
          city: token.city,
          postalCode: token.postalCode,
          fiscalCode: token.fiscalCode,
          image: token.image,
          birthdate: token.birthdate,
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user?: User }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.name = user.name;
        token.surname = user.surname;
        token.phone = user.phone;
        token.address = user.address;
        token.city = user.city;
        token.postalCode = user.postalCode;
        token.fiscalCode = user.fiscalCode;
        token.image = user.image;
        token.birthdate = user.birthdate;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};

export default NextAuth(authOptions);*/


import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const db = client.db('Users_form_registration');
          const usersCollection = db.collection('users');

          const email = credentials?.email.toLowerCase();
          const user = await usersCollection.findOne({ email: email });

          if (!user) {
            return null;
          }

          if (!user.isVerified) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials!.password, user.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            surname: user.surname,
            phone: user.phone,
            address: user.address,
            city: user.city,
            postalCode: user.postalCode,
            fiscalCode: user.fiscalCode,
            image: user.image,
            birthdate: user.birthdate,
            role: user.role, // Aggiungi il ruolo qui
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email,
          name: token.name,
          surname: token.surname,
          phone: token.phone,
          address: token.address,
          city: token.city,
          postalCode: token.postalCode,
          fiscalCode: token.fiscalCode,
          image: token.image,
          birthdate: token.birthdate,
          role: token.role, // Aggiungi il ruolo nella sessione
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user?: User }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.name = user.name;
        token.surname = user.surname;
        token.phone = user.phone;
        token.address = user.address;
        token.city = user.city;
        token.postalCode = user.postalCode;
        token.fiscalCode = user.fiscalCode;
        token.image = user.image;
        token.birthdate = user.birthdate;
        token.role = user.role; // Aggiungi il ruolo nel token JWT
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
};

export default NextAuth(authOptions);
