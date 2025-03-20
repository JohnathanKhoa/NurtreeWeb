import NextAuth, { NextAuthOptions } from "next-auth";
import authOptions from "@/lib/configs/auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
