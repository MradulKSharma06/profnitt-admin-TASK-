import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function withAuth(redirectTo?: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    const callbackUrl = redirectTo || "/"
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }

  return session
}
