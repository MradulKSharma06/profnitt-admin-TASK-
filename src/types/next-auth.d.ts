import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string
      role: string
    }
  }

  interface User extends DefaultUser {
    id: string
    email: string
    role: string
  }

  interface JWT {
    role: string
  }
}
