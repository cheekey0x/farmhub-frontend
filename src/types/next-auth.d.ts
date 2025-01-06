import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      userId: string;
      name: string;
      email: string;
      avatar: string;
      wallet: string;
      walletType: string;
    } & DefaultSession["user"];
  }

  interface User {
    user: {
      userId: string;
      name?: string;
      email?: string;
      avatar?: string;
      wallet?: string;
      walletType?: string;
    } & DefaultUser;
  }
}
