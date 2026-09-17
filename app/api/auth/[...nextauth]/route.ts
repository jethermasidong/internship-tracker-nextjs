import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await query("SELECT * FROM users WHERE email = $1", [credentials.email]);
          const user = result.rows[0];

          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password as string, 
            user.password
          );

          if (passwordsMatch) {
            return { id: user.id.toString(), name: user.full_name || user.name, email: user.email };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
  ]
});
export { handler as GET, handler as POST };