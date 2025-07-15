'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getImage } from "@/utils/api/gallery"
import { GalleryImage } from "@/types"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Image from "next/image"
import dayjs from "dayjs"

export default function ViewGalleryImagePage() {
    const { id } = useParams()
    const [data, setData] = useState<GalleryImage | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const imageData = await getImage(id as string)
                setData(imageData)
            } catch {
                toast.error("Failed to load image details")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-400">Loading...</div>
        )
    }

    if (!data) {
        return (
            <div className="text-center py-20 text-red-400">Image not found.</div>
        )
    }

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-10 shadow-lg"
            >
                <h1 className="text-3xl font-bold text-indigo-400 mb-6">{data.title || "Untitled Gallery Entry"}</h1>

                {/* Image Carousel */}
                {data.imageUrls && data.imageUrls.length > 0 && (
                    <div className="flex overflow-x-auto gap-4 pb-4 mb-8">
                        {data.imageUrls.map((url, i) => (
                            <div key={i} className="relative w-72 h-44 flex-shrink-0 rounded-lg overflow-hidden border border-indigo-700 shadow-md">
                                <Image
                                    src={url}
                                    alt={`Gallery Image ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Caption */}
                {data.caption && (
                    <p className="text-lg text-gray-300 mb-6 italic">{data.caption}</p>
                )}

                {/* Tags */}
                {data.tags && data.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {data.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-indigo-800 text-indigo-200 px-3 py-1 rounded-full text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Metadata */}
                <div className="text-sm text-gray-400 space-y-1">
                    {data.uploadedAt && (
                        <p>Uploaded on: {dayjs(data.uploadedAt).format("DD MMM YYYY, hh:mm A")}</p>
                    )}
                    {data.uploadedBy && <p>Uploaded by: {data.uploadedBy}</p>}
                    <p>Views: {data.views || 0}</p>
                    <p>Edits: {data.edits || 0}</p>
                    <p>Deletions: {data.deletions || 0}</p>
                </div>
            </motion.div>
        </div>
    )
}
