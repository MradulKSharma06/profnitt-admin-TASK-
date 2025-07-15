'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getEvent, updateEvent } from "@/utils/api/events"
import { EventData } from "@/types"
import toast from "react-hot-toast"
import Link from "next/link"

export default function EditEventPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [formData, setFormData] = useState<EventData | null>(null)
    const [tagInput, setTagInput] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchEvent()
    }, [id])

    const fetchEvent = async () => {
        try {
            const event = await getEvent(id)
            setFormData(event)
        } catch  {
            toast.error("Failed to load event")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddTag = () => {
        if (!formData) return
        const tag = tagInput.trim()
        if (tag && !formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: [...formData.tags, tag] })
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        if (!formData) return
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return

        try {
            await updateEvent(id, formData)
            toast.success("Event updated successfully")
            router.push("/admin/events")
        } catch {
            toast.error("Failed to update event")
        }
    }

    if (loading) return <div className="p-6">Loading...</div>
    if (!formData) return <div className="p-6 text-red-500">Event not found</div>

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 shadow rounded">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date?.slice(0, 10)}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Venue</label>
                    <input
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Tags</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="flex-grow border px-3 py-2 rounded"
                            placeholder="Enter tag"
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-4 py-2 bg-gray-700 text-white rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap mt-2 gap-2">
                        {formData.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-red-500 ml-1 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Image URL</label>
                    <input
                        name="imageUrl"
                        value={formData.imageUrl || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <Link href="/admin/events" className="text-gray-500 underline">Cancel</Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    )
}
