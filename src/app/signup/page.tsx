'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const passwordValidations = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password),
    }

    const isPasswordStrong = Object.values(passwordValidations).every(Boolean)

    useEffect(() => {
        const newErrors = { name: '', email: '', password: '', confirmPassword: '' }

        if (!name.trim()) newErrors.name = 'Name is required'
        if (!email.includes('@')) newErrors.email = 'Invalid email address'
        if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match'

        if (!isPasswordStrong) newErrors.password = 'Password does not meet all criteria'

        setErrors(newErrors)
    }, [name, email, password, confirmPassword])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name && !email && !password && !confirmPassword) {
            toast.error('🚫 Please fill in all the fields')
            return
        }

        if (!agreeTerms) {
            toast.error('✅ Almost there! Please agree to the Terms & Conditions')
            return
        }

        if (errors.name) {
            toast.error(`👤 ${errors.name}`)
            return
        }

        if (errors.email) {
            toast.error(`📧 ${errors.email}`)
            return
        }

        if (errors.password) {
            toast.error(`🔒 ${errors.password}`)
            return
        }

        if (errors.confirmPassword) {
            toast.error(`🔁 ${errors.confirmPassword}`)
            return
        }

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(`${data.message || "Signup failed"}`)
                return
            }

            toast.success("Signup successful! Redirecting to login...")
            setTimeout(() => {
                window.location.href = "/login"
            }, 1500)
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong. Please try again.")
        }
    }

    const renderValidation = (label: string, passed: boolean) => (
        <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className={`flex items-center gap-2 text-sm ${passed ? 'text-green-400' : 'text-red-400'}`}
        >
            {passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {label}
        </motion.li>
    )

    const renderError = (message: string | undefined) =>
        message && (
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex items-center gap-2 text-red-400 text-sm mt-1"
            >
                <AlertCircle size={16} />
                <span>{message}</span>
            </motion.div>
        )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0c1026] to-[#1e293b] px-4">
            <Toaster position="top-right" />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl text-white overflow-hidden"
            >
                {/* Glows inside card but under content */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse z-0" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500 opacity-20 rounded-full blur-3xl animate-pulse z-0" />

                {/* Content wrapper for z-index layering */}
                <div className="relative z-10 space-y-6">
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        Create Your Account
                    </h1>
                    <p className="text-center text-sm text-white/70">
                        Join the ProfNITT Admin Panel and manage your workspace
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-emerald-400'}`}
                            />
                            {renderError(errors.name)}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-emerald-400'}`}
                            />
                            {renderError(errors.email)}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-emerald-400'}`}
                            />
                            <AnimatePresence>
                                {!isPasswordStrong && password && (
                                    <motion.ul
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute z-20 left-0 mt-2 w-full bg-[#1e293b] border border-white/10 rounded-xl p-4 space-y-1 text-xs shadow-2xl"
                                    >
                                        {renderValidation('8 characters', passwordValidations.length)}
                                        {renderValidation('1 lowercase letter', passwordValidations.lowercase)}
                                        {renderValidation('1 uppercase letter', passwordValidations.uppercase)}
                                        {renderValidation('1 number', passwordValidations.number)}
                                        {renderValidation('1 special character (!@#$%^&*)', passwordValidations.special)}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                            {renderError(errors.password)}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-emerald-400'}`}
                            />
                            {renderError(errors.confirmPassword)}
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2 text-sm text-white/70">
                            <input
                                type="checkbox"
                                className="accent-green-500 mt-1"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            <span>
                                I agree to the{' '}
                                <a href="#" className="text-green-400 hover:underline" onClick={(e) => e.preventDefault()}>
                                    Terms & Conditions
                                </a>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!agreeTerms}
                            className={`w-full py-3 rounded-full transition-all shadow-md font-medium ${agreeTerms
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                                : 'bg-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-white/60">Already have an account? </span>
                        <Link href="/login" className="text-blue-400 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
