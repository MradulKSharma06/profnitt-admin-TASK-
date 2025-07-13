import { withAuth } from '../../../lib/withAuth'
import DashboardClient from './DashboardClient'

export default async function AdminDashboardPage() {
    const session = await withAuth('/admin/dashboard')

    return <DashboardClient session={session} />
}
