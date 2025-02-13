import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import Users from "@/models/usersmodel";
import bcrypt from "bcrypt";
import db from "@/lib/db";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        db.connect();
        const { email, password } = credentials;
        // let email = credentials.email;
        const data = await Users.findOne({ email });

        const user = JSON.parse(JSON.stringify(data));

        console.log(user);

        if (user != null) {
          const validPassword = bcrypt.compareSync(password, user.password);

          console.log({ ...user, password: null, role: user.role });

          if (user.status  === "suspended") return null;
          if (user.status  === "deleted") return null;
          
          if (validPassword) return { ...user, password: null, role: user.role };
        }


        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     if (user) {
  //       console.log(user);
  //       token.role = user.role;
  //       console.log(token);
  //       console.log(account?.access_token);

  //       return token
  //     }
  //   },
  //   async session({ session, token, user }) {
  //     if (session?.user) session.user.role = token.role;
  //     console.log(token.email);
  //     console.log(user.email);

  //     console.log(session?.user);

  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
