import { withAuth } from "@/lib/withAuth"
import ProfileClient from "./ProfileClient"

export default async function ProfilePage() {
    const session = await withAuth("/admin/profile")
    return <ProfileClient session={session} />
}
