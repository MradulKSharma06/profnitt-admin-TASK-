'use client'

import { useEffect, useState } from "react"
import { EventData } from "@/types"
import { getEvents, deleteEvent } from "@/utils/api/events"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function EventsListPage() {
    const [events, setEvents] = useState<EventData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const data = await getEvents()
            setEvents(data)
        } catch {
            toast.error("Failed to load events")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this event?")
        if (!confirm) return

        try {
            await deleteEvent(id)
            toast.success("Event deleted")
            fetchEvents()
        } catch {
            toast.error("Failed to delete event")
        }
    }

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-10 shadow-lg"
            >
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold tracking-wide text-indigo-400">Manage Events</h1>
                    <Link
                        href="/admin/events/new"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-transform active:scale-95"
                    >
                        + Add Event
                    </Link>
                </div>

                {loading ? (
                    <p className="text-indigo-300 animate-pulse">Loading events...</p>
                ) : events.length === 0 ? (
                    <p className="text-gray-400 text-lg">No events found.</p>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {events.map((event) => (
                                <motion.div
                                    key={event._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-sm flex justify-between items-center group hover:shadow-md transition"
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-indigo-300 group-hover:text-indigo-200">
                                            {event.title}
                                        </h2>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {new Date(event.date).toLocaleDateString(undefined, {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}{" "}
                                            • {event.venue}
                                        </p>
                                    </div>
                                    <div className="space-x-3">
                                        <Link
                                            href={`/admin/events/${event._id}`}
                                            className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium shadow-sm"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/events/edit/${event._id}`}
                                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium shadow-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(event._id!)}
                                            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-medium shadow-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
