import NextAuth from "next-auth";
import { nextAuthOptions } from "src/utils/auth-options";

const handler = NextAuth(nextAuthOptions);
export default handler;
