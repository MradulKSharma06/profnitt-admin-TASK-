'use client'

import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [errors, setErrors] = useState({ email: '', password: '' })

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || "/"


    useEffect(() => {
        const newErrors = { email: '', password: '' }

        if (!email.includes('@')) newErrors.email = 'Invalid email address'
        if (!password.trim()) newErrors.password = 'Password is required'

        setErrors(newErrors)
    }, [email, password])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (Object.values(errors).some(Boolean)) {
            if (errors.email) toast.error(`📧 ${errors.email}`)
            if (errors.password) toast.error(`🔒 ${errors.password}`)
            return
        }

        setIsSubmitting(true)

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: callbackUrl,
        })

        setIsSubmitting(false)

        if (res?.error) {
            toast.error(`${res.error}`)
        } else {
            toast.success("Logged in! Redirecting...")
            setTimeout(() => {
                window.location.href = callbackUrl
            }, 1500)
        }
    }

    const renderError = (msg: string | undefined) =>
        msg && (
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex items-center gap-2 text-red-400 text-sm mt-1"
            >
                <AlertCircle size={16} />
                <span>{msg}</span>
            </motion.div>
        )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0c1026] to-[#1e293b] px-4">
            <Toaster position="top-right" />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl text-white space-y-6 overflow-hidden"
            >
                {/* Glow Orbs */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
                <div className="absolute -bottom-28 -right-28 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse z-0" />

                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-center text-sm text-white/70 mt-1">
                        Enter your credentials to access the ProfNITT Admin Panel
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <AnimatePresence>{renderError(errors.email)}</AnimatePresence>
                        </div>

                        {/* Password Field with Toggle */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={`w-full px-4 py-3 pr-10 h-12 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 leading-normal ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center mb-5">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="text-white/70 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <AnimatePresence>{renderError(errors.password)}</AnimatePresence>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="text-center text-sm mt-4">
                        <span className="text-white/60">Don&apos;t have an account? </span>
                        <Link href="/signup" className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
