import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    // --- GOOGLE LOGIN ---
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // --- CREDENTIALS LOGIN ---
    Credentials({
      name: "credentials",

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return user;
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
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
