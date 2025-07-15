'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProjectData } from '@/types'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProjectListPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/project')
      const data = await res.json()
      setProjects(data)
    } catch {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this project?')
    if (!confirm) return

    try {
      await fetch(`/api/project/${id}`, { method: 'DELETE' })
      setProjects(prev => prev.filter(p => p._id !== id))
      toast.success('Project deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="min-h-screen px-6 py-16 text-gray-100 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold tracking-wide text-indigo-400">Manage Projects</h1>
        <Link href="/admin/project/new" className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-indigo-100 font-medium rounded-md shadow-md transition">
          + New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-gray-900 bg-opacity-40 border border-indigo-700 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-indigo-300 mb-2">{project.title}</h2>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'ongoing' ? 'bg-yellow-700 text-yellow-200' : 'bg-green-800 text-green-300'}`}>
                  {project.status.toUpperCase()}
                </span>
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Link href={`/admin/project/${project._id}`} className="text-indigo-300 hover:text-indigo-200 text-sm underline">
                  View
                </Link>
                <Link href={`/admin/project/edit/${project._id}`} className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(project._id!)} className="text-red-400 hover:text-red-300 text-sm underline">
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
