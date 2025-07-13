'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const words = ['Profit', 'Research', 'Quant', 'Finance']

export default function Hero() {
    const [index, setIndex] = useState(0)
    const { data: session } = useSession()

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {/* HERO TOP */}
            <section className="relative px-6 md:px-[6vw] pt-16 pb-8 flex flex-col md:flex-row items-center gap-10">
                {/* Animated Background Glow */}
                <div className="absolute h-[550px] w-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.indigo.900),#010725)] blur-[150px] bottom-[35%] right-[-5%] z-0 animate-pulse-slow" />

                {/* Left Text Section */}
                <div className="md:w-1/2 space-y-6 z-10 relative">
                    <Image
                        src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752312061/ProfNITT_text_sgoqey.svg"
                        alt="ProfNITT"
                        width={350}
                        height={80}
                        className="w-3/4"
                    />
                    <p className="text-2xl font-light font-mono">
                        The Finance and Investments club of NIT Trichy
                    </p>

                    <div className="text-3xl font-light font-mono flex items-center gap-3 h-[40px]">
                        <span>We are</span>
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-indigo-300"
                        >
                            {words[index]} !
                        </motion.span>
                    </div>
                    <p className="text-sm text-white/60 italic mt-1 ml-1">
                        Driving financial literacy at NIT Trichy.
                    </p>

                    {/* CTA or Welcome */}
                    <div className="pt-4">
                        {!session ? (
                            <Link
                                href="/login"
                                className="inline-block px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md ring-1 ring-indigo-400/30"
                            >
                                Login to Admin Panel
                            </Link>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="px-5 py-3 rounded-2xl bg-gradient-to-br from-indigo-800/40 to-blue-700/30 backdrop-blur-sm border border-indigo-400/30 shadow-md max-w-fit flex items-center gap-2 text-white"
                            >
                                <span className="text-2xl animate-pulse">👋</span>
                                <p className="text-white/90 text-base sm:text-lg font-light">
                                    Welcome back,&nbsp;
                                    <span className="text-indigo-300 font-semibold">
                                        {session.user?.name || 'Admin'}
                                    </span>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Laptop Graphics with Floating Animation */}
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="md:w-1/2 w-full z-10 flex justify-center ml-[-1rem]"
                >
                    <motion.div
                        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                        className="relative flex flex-col items-center w-full max-w-[720px] mr-[-8rem]"
                    >
                        <div className="relative w-full max-w-[600px] mb-4 -mr-30 shadow-xl border border-white/10 rounded-xl overflow-hidden">
                            <Image
                                src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752311972/laptop_body_q15pjh.svg"
                                alt="Laptop Body"
                                width={600}
                                height={405}
                                className="w-full object-contain"
                            />
                            <Image
                                src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752304110/laptop_hy1l5i.svg"
                                alt="Laptop Screen"
                                width={600}
                                height={400}
                                className="absolute top-0 left-0 w-full object-contain pointer-events-none"
                            />
                        </div>
                        <div className="w-[110%] max-w-[720px] mt-[-1rem]">
                            <Image
                                src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752304279/BaseBody_ub7p6e.svg"
                                alt="Base Body"
                                width={720}
                                height={100}
                                className="w-full object-contain"
                            />
                        </div>
                        <div className="w-[80%] max-w-[480px] sm:ml-[-10rem] ml-[-5rem]">
                            <Image
                                src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752304278/FootBase_zscd6z.svg"
                                alt="Foot Base"
                                width={300}
                                height={80}
                                className="w-full object-contain"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section Divider */}
            <hr className="border-white/10 my-12 mx-auto w-[60%]" />

            {/* ABOUT US */}
            <section className="relative mt-10 z-10 px-4 md:px-0">
                <div className="absolute h-[550px] w-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-900 to-[#010725] bottom-[40%] right-[60%] z-0 blur-[150px]" />
                <div className="max-w-3xl mx-auto z-10 relative">
                    <div className="p-6 text-center border border-gray-600 rounded-[10px] backdrop-blur-sm bg-white/5">
                        <h2 className="font-black text-white text-3xl md:text-5xl font-clashDisplay">
                            About Us.
                        </h2>
                        <p className="text-cyan-400 font-light text-base md:text-lg">
                            Want to know who we are?
                        </p>
                        <p className="text-white font-light mt-4 text-sm md:text-base leading-relaxed">
                            ProfNITT is the official Finance and Investment club of NIT
                            Tiruchirapalli. We are a close-knit community of finance
                            enthusiasts from diverse backgrounds who take an interest in
                            finance, stock markets, options, and quants to spread the elegance
                            of finance among the student community of NIT Trichy.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
