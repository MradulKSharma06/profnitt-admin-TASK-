'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MemberData } from "@/types"
import { createMember } from "@/utils/api/members"
import toast from "react-hot-toast"
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const MEMBER_TYPES = ["Core", "Manager", "Coordinator"]

export default function NewMemberPage() {
    const router = useRouter()

    const [formData, setFormData] = useState<MemberData>({
        name: "",
        role: "",
        type: "Core",
        bio: "",
        linkedinUrl: "",
        photoUrl: "",
    })

    const [isUploading, setIsUploading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.role || !formData.bio) {
            toast.error("Name, Role, and Bio are required.")
            return
        }

        try {
            await createMember(formData)
            toast.success("Member added successfully")
            router.push("/admin/members")
        } catch {
            toast.error("Failed to add member")
        }
    }

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-12 shadow-lg"
            >
                <h1 className="text-4xl font-semibold mb-12 text-center tracking-wide text-indigo-400 select-none">
                    Add New Member
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2" noValidate>
                    {/* Name */}
                    <div className="relative group">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Name"
                        />
                        <label htmlFor="name" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Name
                        </label>
                    </div>

                    {/* Role */}
                    <div className="relative group">
                        <input
                            id="role"
                            name="role"
                            type="text"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Role"
                        />
                        <label htmlFor="role" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Role
                        </label>
                    </div>

                    {/* Type */}
                    <div className="md:col-span-2">
                        <label htmlFor="type" className="block mb-2 text-indigo-400 font-medium select-none">
                            Member Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:border-indigo-500"
                        >
                            {MEMBER_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative group md:col-span-2">
                        <input
                            id="linkedinUrl"
                            name="linkedinUrl"
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="LinkedIn URL"
                        />
                        <label htmlFor="linkedinUrl" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            LinkedIn URL
                        </label>
                    </div>

                    {/* Bio */}
                    <div className="relative group md:col-span-2">
                        <textarea
                            id="bio"
                            name="bio"
                            rows={5}
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Bio"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-transparent resize-none text-lg focus:outline-none focus:border-indigo-500"
                        />
                        <label htmlFor="bio" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Bio
                        </label>
                    </div>

                    {/* Photo Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="photo-upload" className="block mb-3 text-indigo-400 font-semibold select-none">
                            Member Photo
                        </label>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                try {
                                    setIsUploading(true)
                                    const url = await uploadImageToCloudinary(file)
                                    setFormData({ ...formData, photoUrl: url })
                                    toast.success("Photo uploaded successfully")
                                } catch {
                                    toast.error("Photo upload failed")
                                } finally {
                                    setIsUploading(false)
                                }
                            }}
                            className="block w-full text-sm text-indigo-400 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-indigo-100 hover:file:bg-indigo-700 hover:file:text-indigo-50 transition-colors cursor-pointer"
                        />
                        {isUploading && (
                            <div className="mt-3 h-1 rounded-full bg-indigo-500 animate-pulse shadow-inner" />
                        )}
                        {formData.photoUrl && (
                            <div className="relative mt-6 w-full h-56 rounded-lg overflow-hidden border border-indigo-700 shadow-md">
                                <Image
                                    src={formData.photoUrl}
                                    alt="Member Preview"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-between items-center mt-8">
                        <Link href="/admin/members" className="text-indigo-400 hover:text-indigo-300 transition text-sm underline select-none">
                            ← Cancel
                        </Link>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-indigo-100 px-8 py-3 rounded-lg font-semibold tracking-wide shadow-md transition-transform active:scale-95">
                            Add Member
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
