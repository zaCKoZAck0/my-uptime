import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/lib/prisma";
import Github from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
});
