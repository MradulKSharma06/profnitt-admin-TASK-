'use client'

import React from 'react'
import DashboardChart from './DashboardChart'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0c2a] text-white flex flex-col">
            {/* Global Navbar */}
            <Navbar />

            {/* Content Section: Sidebar + Main */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Sidebar (Fixed Height, No Scroll) */}
                <aside className="w-full lg:w-2/5 xl:w-2/5 p-6 md:p-10 bg-gradient-to-br from-[#0b0f3a] to-[#12162f] border-r border-white/10 shadow-xl z-20">
                    <div
                        className="relative text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide select-none
                        before:absolute before:-bottom-1 before:left-0 before:w-20 before:h-1 before:rounded-full before:bg-pink-500 before:opacity-70 before:blur-sm
                        after:absolute after:-bottom-2 after:left-0 after:w-32 after:h-1 after:rounded-full after:bg-purple-500 after:opacity-40 after:blur-lg
                        animate-fadeInUp"
                    >
                        Admin Panel
                    </div>
                    {children /* Dashboard Cards (e.g., Events, Projects...) */}
                </aside>

                {/* Main Content (Scrolls independently) */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 relative h-[calc(100vh-4rem)] lg:h-auto">
                    {/* Glow Background */}
                    <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-600 via-blue-900 to-transparent opacity-30 blur-3xl animate-pulse-slow z-0" />

                    <div className="relative z-10 space-y-6 pb-20">
                        <div className="mb-6">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text animate-fadeInUp">
                                    Dashboard Insights
                                </div>
                                <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-full animate-pulse-fast"></div>
                            </div>

                            <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl border-l-4 border-indigo-500 pl-4 italic">
                                Explore actionable insights from real-time event activity, team structure, member logins, project analytics, and gallery uploads — all dynamically synced from the ProfNITT database.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <DashboardChart />
                        </div>
                    </div>
                </main>
            </div>

            {/* Global Footer */}
            <Footer />
        </div>
    )
}
