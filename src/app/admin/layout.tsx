import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#090b2d] text-white">
            {children}
        </div>
    )
}
