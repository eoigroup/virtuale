import { IUser } from "@/types/user";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const isProductionMode = process.env.NODE_ENV === "production";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ensure credentials is defined and has email and password properties
        const email = credentials?.email ?? "";
        const password = credentials?.password ?? "";

        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        // Return user object
        return {
          id: "",
          email: "",
          password: "",
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${isProductionMode ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Ensure this is set only in production
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        // @ts-ignore
        id: token.sub,
        email: token.email,
      };
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: IUser;
  } | null>;
}
