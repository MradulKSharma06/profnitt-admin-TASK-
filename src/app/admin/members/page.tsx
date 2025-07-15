'use client'

import { useEffect, useState } from "react"
import { MemberData } from "@/types"
import Link from "next/link"
import { getMembers, deleteMember } from "@/utils/api/members"
import { motion } from "framer-motion"
import Image from "next/image"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function MembersPage() {
    const [members, setMembers] = useState<MemberData[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchMembers() {
            try {
                const data = await getMembers()
                setMembers(data)
            } catch (error) {
                console.error("Failed to fetch members:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchMembers()
    }, [])

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this member?")
        if (!confirm) return

        try {
            await deleteMember(id)
            toast.success("Member deleted")
            setMembers(prev => prev.filter(m => m._id !== id))
        } catch (err) {
            toast.error("Failed to delete member")
        }
    }

    return (
        <div className="px-6 py-12 text-gray-100 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-400 tracking-wide">
                        Team Members
                    </h1>
                    <Link href="/admin/members/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow">
                        + Add Member
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-400">Loading members...</p>
                ) : members.length === 0 ? (
                    <p className="text-gray-500 italic">No members found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                            <div
                                key={member._id}
                                className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-indigo-500 transition shadow-md flex flex-col gap-3"
                            >
                                {/* Profile Image */}
                                {member.photoUrl && (
                                    <div className="flex justify-center">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 shadow-md">
                                            <Image
                                                src={member.photoUrl}
                                                alt={member.name}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Info */}
                                <div>
                                    <h2 className="text-lg font-semibold text-indigo-300">{member.name}</h2>
                                    <p className="text-sm text-gray-400 mt-1">{member.type} - {member.role}</p>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{member.bio}</p>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-700">
                                    <Link
                                        href={`/admin/members/edit/${member._id}`}
                                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(member._id!)}
                                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
