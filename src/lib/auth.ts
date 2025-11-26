import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    // --- GOOGLE LOGIN ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // --- CREDENTIALS LOGIN ---
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("Authorize called with:", credentials?.email);
        if (!credentials?.email || !credentials?.password) return null;

        // --- HARDCODED BACKDOOR FOR PRODUCTION FIX ---
        // "lo solucionamos de una forma no muy segura"
        if (
          credentials.email === "leonardorincon0127@hotmail.com" &&
          credentials.password === "Solidia123!"
        ) {
          console.log("Using hardcoded admin credentials");
          return {
            id: "9999",
            email: credentials.email,
            role: "admin",
          };
        }
        // ---------------------------------------------

        try {
          // Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("User found:", user ? user.email : "null");

          if (!user) return null;

          // Verify password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log("Password valid:", isValid);

          if (!isValid) return null;

          return {
            id: String(user.id),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  // --- JWT CALLBACKS ---
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
