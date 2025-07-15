'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getImage, updateImage } from "@/utils/api/gallery"
import { GalleryImage } from "@/types"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Image from "next/image"

export default function EditImagePage() {
    const { id } = useParams()
    const router = useRouter()

    const [form, setForm] = useState<Partial<GalleryImage>>({})
    const [tagInput, setTagInput] = useState("")
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        async function fetchImage() {
            try {
                const data = await getImage(id as string)
                setForm(data)
            } catch {
                toast.error("Failed to fetch image data")
            } finally {
                setLoading(false)
            }
        }
        fetchImage()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            setForm(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }))
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setForm(prev => ({
            ...prev,
            tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.imageUrls || form.imageUrls.length === 0) {
            toast.error("At least one image is required")
            return
        }

        try {
            setSubmitting(true)
            await updateImage(id as string, form)
            toast.success("Gallery image updated")
            router.push("/admin/gallery")
        } catch {
            toast.error("Update failed")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="px-6 py-12 max-w-3xl mx-auto text-white">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-indigo-400 mb-8">Edit Gallery Image</h1>

                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-xl border border-gray-700 shadow">
                        {/* Title */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title || ""}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-sm text-white"
                                placeholder="e.g. Annual Retreat"
                            />
                        </div>

                        {/* Image Carousel */}
                        {form.imageUrls && form.imageUrls.length > 0 && (
                            <div className="flex overflow-x-auto gap-4 pb-2">
                                {form.imageUrls.map((url, i) => (
                                    <div key={i} className="relative w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden border border-indigo-700 shadow-md">
                                        <Image src={url} alt={`Image ${i}`} fill style={{ objectFit: "cover" }} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Caption */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Caption</label>
                            <textarea
                                name="caption"
                                value={form.caption || ""}
                                onChange={handleChange}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-sm text-white"
                                placeholder="Enter caption"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Tags</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white w-full"
                                    placeholder="Enter tag and press add"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {(form.tags || []).map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="text-red-400 ml-1"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-white rounded font-semibold"
                        >
                            {submitting ? "Updating..." : "Update"}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    )
}
