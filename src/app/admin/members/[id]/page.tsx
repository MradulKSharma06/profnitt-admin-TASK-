'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getMember, deleteMember } from "@/utils/api/members"
import { MemberData } from "@/types"
import Image from "next/image"
import toast from "react-hot-toast"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MemberDetailPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [member, setMember] = useState<MemberData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMember(id)
                setMember(data)
            } catch  {
                toast.error("Failed to load member")
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchData()
    }, [id])

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this member?")) return
        try {
            await deleteMember(id)
            toast.success("Member deleted")
            router.push("/admin/members")
        } catch{
            toast.error("Failed to delete member")
        }
    }

    if (loading) return <p className="p-6 text-gray-300">Loading...</p>
    if (!member) return <p className="p-6 text-red-500">Member not found.</p>

    return (
        <div className="px-6 py-12 max-w-4xl mx-auto text-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 bg-opacity-50 backdrop-blur-xl p-8 rounded-3xl shadow-lg"
            >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                    {member.photoUrl && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md">
                            <Image
                                src={member.photoUrl}
                                alt={member.name}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-indigo-400">{member.name}</h1>
                        <p className="text-sm mt-1 text-gray-400">{member.type} • {member.role}</p>
                        {member.linkedinUrl && (
                            <a
                                href={member.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-300 underline mt-2 block"
                            >
                                LinkedIn Profile
                            </a>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-indigo-300 mb-2">Bio</h2>
                    <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </div>

                <div className="flex justify-between items-center pt-6">
                    <Link href={`/admin/members/edit/${member._id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300 underline text-sm"
                    >
                        Delete Member
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
