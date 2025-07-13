import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "@/lib/mongodb"
import { Admin } from "@/models/Admin"
import { compare } from "bcryptjs"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB()

        const user = await Admin.findOne({ email: credentials?.email })
        if (!user) throw new Error("No user found with this email.")

        const isValid = await compare(credentials!.password, user.password)
        if (!isValid) throw new Error("Invalid password.")

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: user.name
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && typeof user === "object" && "role" in user) {
        token.role = user.role
        if ("name" in user) token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.name = token.name as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (url.startsWith(baseUrl)) return url
      return baseUrl
    }
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
