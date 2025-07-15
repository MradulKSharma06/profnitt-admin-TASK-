'use client'

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getEvent, updateEvent } from "@/utils/api/events"
import { EventData } from "@/types"
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary"
import toast from "react-hot-toast"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const EVENT_TYPES = [
    "Seminar",
    "Workshop",
    "Competition",
    "Guest Lecture",
    "Social",
    "Other",
]

export default function EditEventPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [formData, setFormData] = useState<EventData>({
        title: "",
        eventType: "",
        description: "",
        date: "",
        venue: "",
        tags: [],
        imageUrl: "",
    })
    const [tagInput, setTagInput] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch event data once ID is available
        if (id) fetchEvent()
    }, [id])

    // Close dropdown when clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
                setHighlightedIndex(-1)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const fetchEvent = async () => {
        try {
            const event = await getEvent(id)
            console.log(event);
            
            setFormData({
                title: event.title || "",
                eventType: event.eventType || "",
                description: event.description || "",
                date: event.date ? event.date.slice(0, 10) : "",
                venue: event.venue || "",
                tags: event.tags || [],
                imageUrl: event.imageUrl || "",
            })
        } catch {
            toast.error("Failed to load event")
        } finally {
            setLoading(false)
        }
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!dropdownOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setDropdownOpen(true)
                setHighlightedIndex(0)
            }
        } else {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setHighlightedIndex((prev) => (prev + 1) % EVENT_TYPES.length)
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setHighlightedIndex((prev) => (prev - 1 + EVENT_TYPES.length) % EVENT_TYPES.length)
            } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                if (highlightedIndex >= 0) {
                    setFormData({ ...formData, eventType: EVENT_TYPES[highlightedIndex] })
                    setDropdownOpen(false)
                    setHighlightedIndex(-1)
                }
            } else if (e.key === "Escape") {
                e.preventDefault()
                setDropdownOpen(false)
                setHighlightedIndex(-1)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddTag = () => {
        const tag = tagInput.trim()
        if (tag && !formData.tags.includes(tag)) {
            setFormData({ ...formData, tags: [...formData.tags, tag] })
            setTagInput("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.date || !formData.venue || !formData.eventType) {
            toast.error("Title, Date, Venue, and Event Type are required.")
            return
        }

        try {
            await updateEvent(id, formData)
            toast.success("Event updated successfully")
            router.push("/admin/events")
        } catch {
            toast.error("Failed to update event")
        }
    }

    if (loading) return <div className="p-6 text-gray-300">Loading...</div>

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-12 shadow-lg"
            >
                <h1 className="text-4xl font-semibold mb-12 text-center tracking-wide text-indigo-400 select-none">
                    Edit Event
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2" noValidate>

                    {/* Title */}
                    <div className="relative group">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Title"
                            autoComplete="off"
                        />
                        <label
                            htmlFor="title"
                            className="absolute left-0 top-3 text-gray-500 text-sm cursor-text transition-all
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400 select-none"
                        >
                            Title
                        </label>
                    </div>

                    {/* Custom Event Type Dropdown */}
                    <div className="relative group md:flex md:flex-col" ref={dropdownRef}>
                        <label
                            htmlFor="eventType"
                            className={`absolute left-0 top-3 text-gray-500 text-sm select-none pointer-events-none transition-all
                ${formData.eventType || dropdownOpen ? 'top-[-0.75rem] text-xs text-indigo-400' : 'top-3 text-base text-gray-400'}`}
                        >
                            Event Type
                        </label>
                        <button
                            type="button"
                            id="eventType"
                            aria-haspopup="listbox"
                            aria-expanded={dropdownOpen}
                            onClick={() => setDropdownOpen((open) => !open)}
                            onKeyDown={handleKeyDown}
                            className={`peer w-full text-left bg-transparent border-b border-gray-600 py-3 px-2 text-lg text-gray-100 focus:outline-none focus:border-indigo-500 flex justify-between items-center rounded-none ${dropdownOpen ? 'border-indigo-500' : ''}`}
                        >
                            <span className={`block truncate ${formData.eventType ? 'text-gray-100' : 'text-gray-500 italic'}`}>
                                {formData.eventType || ""}
                            </span>
                            <svg
                                className={`ml-2 h-5 w-5 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.ul
                                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 border border-indigo-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="listbox"
                                    aria-labelledby="eventType"
                                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    tabIndex={-1}
                                >
                                    {EVENT_TYPES.map((type, i) => (
                                        <li
                                            key={type}
                                            role="option"
                                            aria-selected={formData.eventType === type}
                                            onClick={() => {
                                                setFormData({ ...formData, eventType: type })
                                                setDropdownOpen(false)
                                                setHighlightedIndex(-1)
                                            }}
                                            onMouseEnter={() => setHighlightedIndex(i)}
                                            className={`cursor-pointer select-none px-4 py-2 text-gray-300 ${highlightedIndex === i ? "bg-indigo-600 text-white" : ""} ${formData.eventType === type ? "font-semibold" : "font-normal"}`}
                                        >
                                            {type}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Date */}
                    <div className="relative group">
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 appearance-none focus:outline-none focus:border-indigo-500"
                        />
                        <label
                            htmlFor="date"
                            className="absolute left-0 top-3 text-gray-500 text-sm cursor-text transition-all peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400 select-none"
                        >
                            Date
                        </label>
                    </div>

                    {/* Venue */}
                    <div className="relative group md:col-span-2">
                        <input
                            id="venue"
                            name="venue"
                            type="text"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                            placeholder="Venue"
                            autoComplete="off"
                        />
                        <label
                            htmlFor="venue"
                            className="absolute left-0 top-3 text-gray-500 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400 select-none"
                        >
                            Venue
                        </label>
                    </div>

                    {/* Description */}
                    <div className="relative group md:col-span-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-transparent resize-none text-lg focus:outline-none focus:border-indigo-500"
                        />
                        <label
                            htmlFor="description"
                            className="absolute left-0 top-3 text-gray-500 text-sm cursor-text transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400 select-none"
                        >
                            Description
                        </label>
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2">
                        <label className="block mb-3 text-indigo-400 font-semibold select-none">Tags</label>
                        <div className="flex gap-3 flex-wrap">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Type tag and press Add"
                                className="flex-grow bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-gray-500 placeholder:italic focus:outline-none focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="bg-indigo-600 hover:bg-indigo-700 text-indigo-100 px-6 py-2 rounded-lg font-semibold shadow-sm transition-transform active:scale-95"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {formData.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-2 bg-indigo-800 border border-indigo-700 text-indigo-300 px-4 py-1 rounded-full text-sm font-medium select-none shadow-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-red-400 hover:text-red-600 font-extrabold"
                                        aria-label={`Remove tag ${tag}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="image-upload" className="block mb-3 text-indigo-400 font-semibold select-none">
                            Event Image
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                try {
                                    setIsUploading(true)
                                    const url = await uploadImageToCloudinary(file)
                                    setFormData({ ...formData, imageUrl: url })
                                    toast.success("Image uploaded successfully")
                                } catch {
                                    toast.error("Image upload failed")
                                } finally {
                                    setIsUploading(false)
                                }
                            }}
                            className="block w-full text-sm text-indigo-400 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-indigo-100 hover:file:bg-indigo-700 hover:file:text-indigo-50 transition-colors cursor-pointer"
                        />
                        {isUploading && (
                            <div className="mt-3 h-1 rounded-full bg-indigo-500 animate-pulse shadow-inner" />
                        )}
                        {formData.imageUrl && (
                            <div className="relative mt-6 w-full h-56 rounded-lg overflow-hidden border border-indigo-700 shadow-md">
                                <Image
                                    src={formData.imageUrl}
                                    alt="Event Preview"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    style={{ objectFit: 'cover' }}
                                    priority={false}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-between items-center mt-8">
                        <Link href="/admin/events" className="text-indigo-400 hover:text-indigo-300 transition text-sm underline select-none">
                            ← Cancel
                        </Link>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-indigo-100 px-8 py-3 rounded-lg font-semibold tracking-wide shadow-md transition-transform active:scale-95">
                            Update Event
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
