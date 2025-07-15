'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EventData } from "@/types"
import { getEvent } from "@/utils/api/events"
import { toast } from "react-hot-toast"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ViewEventPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [event, setEvent] = useState<EventData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchEvent()
    }, [id])

    const fetchEvent = async () => {
        try {
            const data = await getEvent(id)
            setEvent(data)
        } catch {
            toast.error("Failed to load event")
            router.push("/admin/events")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p className="text-indigo-300 animate-pulse p-10">Loading event details...</p>
    if (!event) return null

    return (
        <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto text-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-12 shadow-lg"
            >
                <h1 className="text-4xl font-semibold mb-6 text-indigo-400 select-none">{event.title}</h1>

                {event.imageUrl && (
                    <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden border border-indigo-700 shadow-md">
                        <Image
                            src={event.imageUrl}
                            alt={`${event.title} Image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            style={{ objectFit: 'cover' }}
                            priority={false}
                        />
                    </div>
                )}

                <div className="space-y-4 text-gray-300">
                    <p>
                        <span className="font-semibold text-indigo-400">Type:</span> {event.eventType || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold text-indigo-400">Date:</span>{" "}
                        {new Date(event.date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <p>
                        <span className="font-semibold text-indigo-400">Venue:</span> {event.venue || "N/A"}
                    </p>
                    {event.description && (
                        <div>
                            <span className="font-semibold text-indigo-400">Description:</span>
                            <p className="mt-1 whitespace-pre-wrap">{event.description}</p>
                        </div>
                    )}

                    {event.tags && event.tags.length > 0 && (
                        <div>
                            <span className="font-semibold text-indigo-400">Tags:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {event.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-indigo-800 border border-indigo-700 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium select-none shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex justify-between">
                    <Link
                        href="/admin/events"
                        className="text-indigo-400 hover:text-indigo-300 underline text-sm select-none"
                    >
                        ← Back to Events
                    </Link>
                    <Link
                        href={`/admin/events/edit/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform active:scale-95"
                    >
                        Edit Event
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
