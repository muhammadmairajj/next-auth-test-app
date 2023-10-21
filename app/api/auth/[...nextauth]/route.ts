import NextAuth from "next-auth";
import CredentialProviders from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialProviders({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const response = await sql`
        SELECT * FROM users WHERE email=${credentials?.email}`;
        const user = response.rows[0];
        if(!user) return null;
        
        const matchCorrectPassword = await compare(
          credentials?.password || '',
          user.password
        )
        console.log({ matchCorrectPassword });
        if (matchCorrectPassword) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      }
    })
  ]
})

export { handler as GET, handler as POST };