'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession()

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="w-full h-24 px-6 md:px-10 flex justify-between items-center bg-[#080b2d] shadow-md z-50 relative text-white">
            <Link href="/">
                <Image
                    src="https://res.cloudinary.com/dz31stmeh/image/upload/v1752304142/logo_m3ieli.png"
                    alt="Logo"
                    width={140}
                    height={40}
                />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center text-sm font-medium">
                <Link
                    href="/"
                    className="relative px-3 py-1 hover:text-blue-400 transition-colors duration-200 group"
                >
                    HOME
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
                </Link>

                {session?.user ? (
                    <>
                        <Link
                            href="admin/dashboard"
                            className="relative px-3 py-1 hover:text-blue-400 transition-colors duration-200 group"
                        >
                            Dashboard
                            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="admin/profile"
                            className="relative px-3 py-1 hover:text-blue-400 transition-colors duration-200 group"
                        >
                            Profile
                            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                        <button
                            onClick={() => signOut({callbackUrl:"/"})}
                            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-all"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => signIn()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
                        >
                            Login
                        </button>
                        <Link
                            href="/signup"
                            className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-100 transition-all"
                        >
                            Signup
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50">
                <button onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {isOpen && (
                    <div className="absolute top-24 right-6 bg-[#0a0a2a] rounded-md p-4 w-44 shadow-xl space-y-3">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-white hover:text-blue-400"
                        >
                            HOME
                        </Link>

                        {session?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm text-white hover:text-blue-400"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm text-white hover:text-blue-400"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        signOut()
                                    }}
                                    className="w-full bg-red-600 text-white px-3 py-2 rounded-full text-sm hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        signIn()
                                    }}
                                    className="w-full bg-blue-600 text-white px-3 py-2 rounded-full text-sm hover:bg-blue-700"
                                >
                                    Login
                                </button>
                                <Link
                                    href="/signup"
                                    className="block w-full text-center bg-white text-blue-600 px-3 py-2 rounded-full text-sm hover:bg-blue-100"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}
