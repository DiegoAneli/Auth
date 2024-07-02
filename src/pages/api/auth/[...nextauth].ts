import NextAuth from "next-auth";
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



  /*callbacks: {


    async session({ session, token }) {
      console.log("Session callback called", { session, token });
      if (token && typeof token.id === 'string') {
        session.user!.id = token.id;
      }
      console.log("Updated session:", session);
      return session;
    },



    async jwt({ token, user }) {
      console.log("JWT callback called", { token, user });
      if (user) {
        token.id = user.id;
      }
      console.log("Updated token:", token);
      return token;
    },


    async redirect({ url, baseUrl }) {
      console.log("Redirect callback called", { url, baseUrl });
      // Reindirizza sempre alla pagina privata dopo il login
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/private`;
      } else if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },*/

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
      console.log("Redirect callback called", { url, baseUrl });
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
  },
});
