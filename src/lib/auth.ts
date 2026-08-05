import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const adminEmails = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(',').map(e => e.trim()) : [];
      
      console.log("LOGIN ATTEMPT - User Email:", user.email, "Allowed Admin Emails:", adminEmails);

      // If no admin email is set, warn but allow for dev purposes
      if (adminEmails.length === 0) {
        console.warn("ADMIN_EMAIL is not set in .env! Allowing all logins.");
        return true; 
      }

      // Restrict login to ONLY the specified admin emails
      if (user.email && adminEmails.includes(user.email)) {
        return true;
      }

      // Reject anyone else
      return false;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).role = (user as any).role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
