'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MemberData } from "@/types"
import { getMember, updateMember } from "@/utils/api/members"
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const ROLES = ["Core", "Manager", "Coordinator"]

export default function EditMemberPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [formData, setFormData] = useState<MemberData>({
        name: "",
        role: "",
        type: "Core",
        photoUrl: "",
        bio: "",
        linkedinUrl: "",
    })

    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (id) fetchMember()
    }, [id])

    const fetchMember = async () => {
        try {
            const data = await getMember(id)
            setFormData({
                name: data.name,
                role: data.role,
                type: data.type,
                photoUrl: data.photoUrl || "",
                bio: data.bio,
                linkedinUrl: data.linkedinUrl || "",
            })
        } catch {
            toast.error("Failed to fetch member")
        } finally {
            setLoading(false)
        }
    }

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
            await updateMember(id, formData)
            toast.success("Member updated successfully")
            router.push("/admin/members")
        } catch {
            toast.error("Failed to update member")
        }
    }

    if (loading) return <p className="p-6 text-gray-300">Loading...</p>

    return (
        <div className="px-6 py-12 max-w-3xl mx-auto text-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-10 shadow-lg"
            >
                <h1 className="text-3xl font-semibold mb-10 text-indigo-400 text-center">
                    Edit Member
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Name */}
                    <div className="relative group">
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Name"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400"
                        >
                            Name
                        </label>
                    </div>

                    {/* Role */}
                    <div className="relative group">
                        <input
                            name="role"
                            type="text"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Role"
                        />
                        <label
                            htmlFor="role"
                            className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400"
                        >
                            Role
                        </label>
                    </div>

                    {/* Type */}
                    <div className="relative group">
                        <label htmlFor="type" className="block text-sm text-indigo-400 mb-2">
                            Member Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-indigo-500"
                        >
                            {ROLES.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Bio */}
                    <div className="relative group">
                        <textarea
                            name="bio"
                            rows={4}
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Bio"
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-transparent resize-none text-lg focus:outline-none focus:border-indigo-500"
                        />
                        <label
                            htmlFor="bio"
                            className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400"
                        >
                            Bio
                        </label>
                    </div>

                    {/* LinkedIn */}
                    <div className="relative group">
                        <input
                            name="linkedinUrl"
                            type="url"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                        />
                        <label
                            htmlFor="linkedinUrl"
                            className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400"
                        >
                            LinkedIn URL (optional)
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-2 text-indigo-400 font-semibold">
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                try {
                                    setUploading(true)
                                    const url = await uploadImageToCloudinary(file)
                                    setFormData({ ...formData, photoUrl: url })
                                    toast.success("Photo uploaded")
                                } catch {
                                    toast.error("Upload failed")
                                } finally {
                                    setUploading(false)
                                }
                            }}
                            className="text-indigo-400 file:bg-indigo-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 hover:file:bg-indigo-700"
                        />
                        {uploading && <div className="mt-2 h-1 bg-indigo-500 animate-pulse rounded-full" />}
                        {formData.photoUrl && (
                            <div className="relative mt-4 w-32 h-32 rounded-full overflow-hidden border border-indigo-700 shadow-md">
                                <Image
                                    src={formData.photoUrl}
                                    alt="Member photo"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-6">
                        <Link href="/admin/members" className="text-indigo-400 hover:text-indigo-300 text-sm underline">
                            ← Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform active:scale-95"
                        >
                            Update Member
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
