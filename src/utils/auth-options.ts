import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 24 * 60 * 60 // 1 day
  },
  providers: [
    CredentialsProvider({
      name: "Email credential",
      id: "EmailCredentials",
      credentials: {
        userId: { label: "userId", type: "text" },
        avatar: { label: "avatar", type: "text" },
        email: { label: "email", type: "text" },
        name: { label: "name", type: "text" }
      },
      // @ts-ignore
      async authorize(credentials) {
        const result = await signInEmailCredentials(credentials);
        return result;
      }
    }),

    CredentialsProvider({
      name: "Wallet credential",
      id: "WalletCredentials",
      credentials: {
        userId: { label: "userId", type: "text" },
        avatar: { label: "avatar", type: "text" },
        wallet: { label: "wallet", type: "text" },
        walletType: { label: "walletType", type: "text" }
      },
      // @ts-ignore
      async authorize(credentials) {
        const result = await signInWalletCredentials(credentials);
        return result;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/error" // Error code passed in query string as ?error=
  },
  callbacks: {
    signIn: async () => true,
    session: async ({ session, token }) => {
      const user = token as any;
      if (session.user.email)
        return {
          ...session,
          user: {
            ...session.user,
            ...user
          }
        };
      return {
        ...session,
        user: {
          ...session.user,
          ...user
        }
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...u
        };
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

// Sign In with email credentials
const signInEmailCredentials = async (
  credentials:
    | Record<"email" | "userId" | "name" | "avatar", string>
    | undefined
) => {
  try {
    return {
      userId: credentials?.userId,
      name: credentials?.name,
      avatar: credentials?.avatar,
      email: credentials?.email
    };
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// Sign In with email credentials
const signInWalletCredentials = async (
  credentials:
    | Record<"wallet" | "userId" | "avatar" | "walletType", string>
    | undefined
) => {
  try {
    return {
      userId: credentials?.userId,
      wallet: credentials?.wallet,
      walletType: credentials?.walletType,
      avatar: credentials?.avatar
    };
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
