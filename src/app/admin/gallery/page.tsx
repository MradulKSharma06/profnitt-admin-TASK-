'use client'

import { useEffect, useState } from "react"
import { GalleryImage } from "@/types"
import Link from "next/link"
import { getGalleryImages, deleteImage } from "@/utils/api/gallery"
import { motion } from "framer-motion"
import Image from "next/image"
import toast from "react-hot-toast"

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGallery() {
            try {
                const data = await getGalleryImages()
                setImages(data)
            } catch  {
                toast.error("Failed to fetch gallery images.")
            } finally {
                setLoading(false)
            }
        }
        fetchGallery()
    }, [])

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this image?")
        if (!confirm) return

        try {
            await deleteImage(id)
            setImages(prev => prev.filter(img => img._id !== id))
            toast.success("Image deleted")
        } catch {
            toast.error("Deletion failed")
        }
    }

    return (
        <div className="px-6 py-12 text-gray-100 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-400 tracking-wide">
                        Gallery
                    </h1>
                    <Link href="/admin/gallery/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow">
                        + Add Image
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-400">Loading images...</p>
                ) : images.length === 0 ? (
                    <p className="text-gray-500 italic">No images found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((img) => (
                            <div key={img._id} className="bg-gray-800 rounded-xl border border-gray-700 shadow-md overflow-hidden relative group">
                                <Link href={`/admin/gallery/${img._id}`}>
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={img.imageUrls[0]}
                                            alt="Gallery"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <p className="text-sm text-indigo-300 font-semibold mb-1 truncate">{img.caption || "No Caption"}</p>
                                    {img.tags && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {img.tags.map((tag) => (
                                                <span key={tag} className="text-xs text-indigo-400 bg-indigo-900 px-2 py-0.5 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-4 flex justify-between gap-2">
                                        <Link
                                            href={`/admin/gallery/edit/${img._id}`}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition"
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(img._id!)}
                                            className="text-sm text-red-400 hover:text-red-300 transition"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
