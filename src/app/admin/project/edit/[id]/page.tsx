'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProjectData } from '@/types'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function EditProjectPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const [formData, setFormData] = useState<ProjectData>({
        title: '',
        description: '',
        technologies: [],
        status: 'ongoing',
        githubUrl: '',
        demoUrl: '',
    })
    const [techInput, setTechInput] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchProject()
    }, [id])

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/project/${id}`)
            const project = await res.json()
            setFormData({
                title: project.title || '',
                description: project.description || '',
                technologies: project.technologies || [],
                status: project.status || 'ongoing',
                githubUrl: project.githubUrl || '',
                demoUrl: project.demoUrl || '',
            })
        } catch {
            toast.error('Failed to load project')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleAddTech = () => {
        const tech = techInput.trim()
        if (tech && !formData.technologies.includes(tech)) {
            setFormData({ ...formData, technologies: [...formData.technologies, tech] })
            setTechInput('')
        }
    }

    const handleRemoveTech = (techToRemove: string) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter(t => t !== techToRemove)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.description || !formData.status) {
            toast.error('Title, description, and status are required.')
            return
        }

        try {
            const res = await fetch(`/api/project/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error()
            toast.success('Project updated successfully')
            router.push('/admin/project')
        } catch {
            toast.error('Failed to update project')
        }
    }

    if (loading) return <div className="p-6 text-gray-300">Loading...</div>

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-4xl mx-auto">
            <div className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-12 shadow-lg">
                <h1 className="text-4xl font-semibold mb-12 text-center tracking-wide text-indigo-400 select-none">Edit Project</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

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
                        <label htmlFor="title" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Title
                        </label>
                    </div>

                    {/* Status */}
                    <div className="relative group">
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <label htmlFor="status" className="absolute left-0 top-[-0.75rem] text-xs text-indigo-400 select-none">Status</label>
                    </div>

                    {/* GitHub */}
                    <div className="relative group md:col-span-2">
                        <input
                            id="githubUrl"
                            name="githubUrl"
                            type="url"
                            value={formData.githubUrl}
                            onChange={handleChange}
                            placeholder="GitHub Repository"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                        />
                        <label htmlFor="githubUrl" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            GitHub URL
                        </label>
                    </div>

                    {/* Demo */}
                    <div className="relative group md:col-span-2">
                        <input
                            id="demoUrl"
                            name="demoUrl"
                            type="url"
                            value={formData.demoUrl}
                            onChange={handleChange}
                            placeholder="Live Demo URL"
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 placeholder-transparent focus:outline-none focus:border-indigo-500"
                        />
                        <label htmlFor="demoUrl" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Demo URL
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
                            className="peer w-full bg-transparent border-b border-gray-600 py-3 px-0 text-lg text-gray-100 resize-none placeholder-transparent focus:outline-none focus:border-indigo-500"
                        />
                        <label htmlFor="description" className="absolute left-0 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.75rem] peer-focus:text-xs peer-focus:text-indigo-400">
                            Description
                        </label>
                    </div>

                    {/* Technologies */}
                    <div className="md:col-span-2">
                        <label className="block mb-3 text-indigo-400 font-semibold select-none">Technologies Used</label>
                        <div className="flex gap-3 flex-wrap">
                            <input
                                type="text"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder="Type tech and press Add"
                                className="flex-grow bg-transparent border-b border-gray-600 py-3 px-0 text-gray-100 placeholder-gray-500 placeholder:italic focus:outline-none focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddTech}
                                className="bg-indigo-600 hover:bg-indigo-700 text-indigo-100 px-6 py-2 rounded-lg font-semibold shadow-sm transition-transform active:scale-95"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {formData.technologies.map((tech) => (
                                <span key={tech} className="flex items-center gap-2 bg-indigo-800 border border-indigo-700 text-indigo-300 px-4 py-1 rounded-full text-sm font-medium select-none shadow-sm">
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTech(tech)}
                                        className="text-red-400 hover:text-red-600 font-extrabold"
                                        aria-label={`Remove ${tech}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-between items-center mt-8">
                        <Link href="/admin/project" className="text-indigo-400 hover:text-indigo-300 transition text-sm underline select-none">
                            ← Cancel
                        </Link>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-indigo-100 px-8 py-3 rounded-lg font-semibold tracking-wide shadow-md transition-transform active:scale-95">
                            Update Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
