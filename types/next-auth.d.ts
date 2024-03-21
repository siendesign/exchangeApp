import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
      email: string;
      role: string;
    }
  
    interface User {
      email: string;
      role: string;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      email: string;
      role: string;
    }
  }