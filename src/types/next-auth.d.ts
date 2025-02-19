import { DefaultSession } from "next-auth";
import "next/server";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

declare module "next/server" {
  interface NextRequest {
    user?: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
