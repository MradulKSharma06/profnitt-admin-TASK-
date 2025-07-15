'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GalleryImage } from "@/types"
import { addImage } from "@/utils/api/gallery"
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AddGalleryImagePage() {
    const router = useRouter()

    const [form, setForm] = useState<Partial<GalleryImage>>({
        title: "",
        imageUrls: [],
        caption: "",
        tags: []
    })

    const [tagInput, setTagInput] = useState("")
    const [uploading, setUploading] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)

    const handleTagAdd = () => {
        if (tagInput.trim() !== "") {
            setForm(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }))
            setTagInput("")
        }
    }

    const handleTagRemove = (tagToRemove: string) => {
        setForm(prev => ({
            ...prev,
            tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
        }))
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setIsUploadingImage(true)
        const uploadedUrls: string[] = []

        try {
            for (const file of Array.from(files)) {
                const url = await uploadImageToCloudinary(file)
                uploadedUrls.push(url)
            }

            setForm(prev => ({
                ...prev,
                imageUrls: [...(prev.imageUrls || []), ...uploadedUrls]
            }))
            toast.success("Images uploaded")
        } catch {
            toast.error("Image upload failed")
        } finally {
            setIsUploadingImage(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.imageUrls || form.imageUrls.length === 0) {
            toast.error("Please upload at least one image.")
            return
        }

        try {
            setUploading(true)
            await addImage(form as GalleryImage)
            toast.success("Gallery images added successfully")
            router.push("/admin/gallery")
        } catch {
            toast.error("Failed to save gallery")
        } finally {
            setUploading(false)
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
                    Add Gallery Images
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    {/* Title */}
                    <div className="relative group">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.title || ""}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Title"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <label htmlFor="title" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Title
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image-upload" className="block mb-2 text-indigo-400 font-medium">
                            Upload Images
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-indigo-400 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-indigo-100 hover:file:bg-indigo-700 hover:file:text-indigo-50 transition-colors cursor-pointer"
                        />
                        {isUploadingImage && (
                            <div className="mt-3 h-1 rounded-full bg-indigo-500 animate-pulse shadow-inner" />
                        )}
                    </div>

                    {/* Image Previews */}
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
                    <div className="relative group">
                        <textarea
                            id="caption"
                            name="caption"
                            rows={3}
                            value={form.caption || ""}
                            onChange={(e) => setForm({ ...form, caption: e.target.value })}
                            placeholder="Caption"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-transparent resize-none text-lg focus:outline-none focus:border-indigo-500"
                        />
                        <label htmlFor="caption" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Caption
                        </label>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-indigo-400 font-medium mb-2">Tags</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white w-full"
                                placeholder="Enter tag"
                            />
                            <button
                                type="button"
                                onClick={handleTagAdd}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {(form.tags || []).map((tag) => (
                                <span key={tag} className="bg-indigo-900 text-indigo-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleTagRemove(tag)}
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
                        disabled={uploading}
                        className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg text-indigo-100 font-semibold shadow-md transition active:scale-95"
                    >
                        {uploading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
