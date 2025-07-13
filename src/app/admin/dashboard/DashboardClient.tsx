'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Users,
    Image as ImageIcon,
    FileText,
    CalendarDays,
    History,
} from 'lucide-react'

const dashboardLinks = [
    {
        title: 'Events',
        description: 'Manage all club events',
        href: '/admin/events',
        icon: CalendarDays,
        color: 'from-indigo-500 to-purple-600',
    },
    {
        title: 'Projects',
        description: 'Add, update, or remove projects',
        href: '/admin/project',
        icon: FileText,
        color: 'from-blue-500 to-sky-600',
    },
    {
        title: 'Team Members',
        description: 'Manage team structure & roles',
        href: '/admin/members',
        icon: Users,
        color: 'from-emerald-500 to-teal-600',
    },
    {
        title: 'Gallery',
        description: 'Add and organize media',
        href: '/admin/gallery',
        icon: ImageIcon,
        color: 'from-fuchsia-500 to-pink-600',
    },
    {
        title: 'Login History',
        description: 'View admin login logs',
        href: '/admin/login-history',
        icon: History,
        color: 'from-rose-500 to-red-600',
    },
]

export default function DashboardClient({ session }: { session: unknown }) {
    return (
        <div className="min-h-screen px-6 py-12 md:px-14 bg-[#090b2d] text-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-700 via-indigo-900 to-transparent opacity-40 blur-3xl animate-pulse-fast z-0" />

            {/* Welcome Message */}
            <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold mb-8 z-10 relative bg-gradient-to-br from-white to-indigo-300 text-transparent bg-clip-text"
            >
                Welcome, {session?.user?.name || 'Admin'} 👋
            </motion.h1>

            <p className="text-white/70 mb-12 text-sm z-10 relative max-w-lg">
                Manage ProfNITT website content and team operations from here.
            </p>

            {/* Cards Grid */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: {
                        transition: {
                            staggerChildren: 0.12,
                        },
                    },
                }}
                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 relative z-10"
            >
                {dashboardLinks.map(({ title, description, href, icon: Icon, color }, i) => (
                    <motion.div
                        key={title}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 250,
                            damping: 20,
                            delay: i * 0.1,
                        }}
                        className="rounded-2xl"
                    >
                        <Link href={href}>
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 250,
                                    damping: 20,
                                    delay: i * 0.1,
                                }}
                                className="group relative flex flex-row md:flex-col items-center md:items-start gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md cursor-pointer overflow-hidden"
                            >
                                {/* Hover Glow */}
                                <div
                                    className="absolute inset-0 z-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                                    }}
                                />

                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg z-10`}
                                >
                                    <Icon size={22} />
                                </div>

                                {/* Text */}
                                <div className="z-10 text-left">
                                    <h3 className="text-base md:text-lg font-semibold text-white">
                                        {title}
                                    </h3>
                                    <p className="text-white/60 text-sm mt-1">{description}</p>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
