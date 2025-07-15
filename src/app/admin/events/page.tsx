'use client'

import { useEffect, useState } from "react"
import { EventData } from "@/types"
import { getEvents, deleteEvent } from "@/utils/api/events"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function EventsListPage() {
    const [events, setEvents] = useState<EventData[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const data = await getEvents()
            setEvents(data)
        } catch  {
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
        } catch  {
            toast.error("Failed to delete event")
        }
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Events</h1>
                <Link
                    href="/admin/events/new"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                >
                    + Add Event
                </Link>
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-gray-500">No events found.</p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{event.title}</h2>
                                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} • {event.venue}</p>
                            </div>
                            <div className="space-x-2">
                                <Link
                                    href={`/admin/events/${event._id}`}
                                    className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(event._id!)}
                                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
