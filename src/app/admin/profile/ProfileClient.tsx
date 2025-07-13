'use client'

import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import { motion } from "framer-motion"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Props = {
    session: Session
}

export default function ProfileClient({ session }: Props) {
    const { user } = session

    return (
        <div className="min-h-screen flex flex-col bg-[#090b2d] text-white relative overflow-x-hidden">
            {/* Glow background */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-700 via-indigo-900 to-transparent opacity-40 blur-3xl animate-pulse-fast z-0" />

            {/* Navbar */}
            <Navbar />

            {/* Main Profile Section */}
            <main className="flex-1 px-6 py-12 w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 shadow-xl backdrop-blur-md relative"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text mb-10"
                    >
                        Admin Profile
                    </motion.h2>

                    <div className="grid gap-6 text-white/90">
                        <div>
                            <p className="text-sm text-white/50 mb-1">Full Name</p>
                            <div className="text-xl font-semibold">{user.name}</div>
                        </div>

                        <div>
                            <p className="text-sm text-white/50 mb-1">Email Address</p>
                            <div className="text-base">{user.email}</div>
                        </div>

                        <div>
                            <p className="text-sm text-white/50 mb-1">Admin Role</p>
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-sm">
                                {user.role?.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="my-10 border-t border-white/10" />

                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all shadow-lg font-semibold text-sm"
                        >
                            Logout
                        </motion.button>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
