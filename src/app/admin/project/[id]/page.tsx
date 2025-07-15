'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProjectData } from '@/types'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ProjectDetailsPage() {
    const { id } = useParams() as { id: string }
    const [project, setProject] = useState<ProjectData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchProject()
    }, [id])

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/project/${id}`)
            const data = await res.json()
            setProject(data)
        } catch {
            toast.error('Failed to load project details')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="p-6 text-gray-300">Loading...</div>
    if (!project) return <div className="p-6 text-red-400">Project not found.</div>

    return (
        <div className="min-h-screen px-6 py-16 text-gray-100 max-w-4xl mx-auto">
            <div className="bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-3xl p-10 shadow-lg space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold tracking-wide text-indigo-400">{project.title}</h1>
                    <span className={`text-sm px-4 py-1 rounded-full font-medium ${project.status === 'completed' ? 'bg-green-700 text-green-200' : 'bg-yellow-700 text-yellow-200'}`}>
                        {project.status}
                    </span>
                </div>

                <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                    <div>
                        <h3 className="text-indigo-300 font-semibold mb-2 text-sm">Technologies Used</h3>
                        <div className="flex flex-wrap gap-3">
                            {project.technologies.map(tech => (
                                <span key={tech} className="bg-indigo-700 text-indigo-100 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Links */}
                <div className="space-y-3">
                    {project.githubUrl && (
                        <p className="text-sm text-indigo-300">
                            <span className="font-semibold">GitHub:</span>{' '}
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-200">
                                {project.githubUrl}
                            </a>
                        </p>
                    )}
                    {project.demoUrl && (
                        <p className="text-sm text-indigo-300">
                            <span className="font-semibold">Live Demo:</span>{' '}
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-200">
                                {project.demoUrl}
                            </a>
                        </p>
                    )}
                </div>

                {/* Meta info */}
                <div className="text-xs text-gray-400 mt-6">
                    <p><strong>Created:</strong> {new Date(project.createdAt || '').toLocaleString()}</p>
                    {project.updatedAt && <p><strong>Last Updated:</strong> {new Date(project.updatedAt).toLocaleString()}</p>}
                </div>

                {/* Back Button */}
                <div className="mt-6">
                    <Link href="/admin/project" className="text-indigo-400 hover:text-indigo-300 underline text-sm">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        </div>
    )
}
