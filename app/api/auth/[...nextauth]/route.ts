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
      async authorize(credentials:any, req) {
        db.connect();
        const { email, password } = credentials;
        // let email = credentials.email;
        let user = await Users.findOne({ email });

        if (user != null) {
          
          const validPassword = bcrypt.compareSync(password, user.password);

          if (validPassword) return user;
        }
       
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
