'use client'

import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MemberData, ProjectData, EventData, ActionLogEntry } from '@/types'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee', '#10b981', '#f59e0b', '#ef4444']

interface ActionLogChartData {
    date: string
    create: number
    update: number
    delete: number
    view: number
}

export default function DashboardCharts() {
    const [memberRoles, setMemberRoles] = useState<{ role: string; count: number }[]>([])
    const [projectStatus, setProjectStatus] = useState<{ status: string; count: number }[]>([])
    const [eventTypes, setEventTypes] = useState<{ type: string; count: number }[]>([])
    const [actionLogChartData, setActionLogChartData] = useState<ActionLogChartData[]>([])

    useEffect(() => {
        const fetchMemberRoles = async () => {
            try {
                const res = await axios.get('/api/members')
                const raw = res.data
                if (!Array.isArray(raw)) return

                const counts = raw.reduce<Record<string, number>>((acc, item) => {
                    const member = item as MemberData
                    if (!member.type) return acc
                    acc[member.type] = (acc[member.type] || 0) + 1
                    return acc
                }, {})

                setMemberRoles(Object.entries(counts).map(([role, count]) => ({ role, count: Number(count) })))
            } catch (err) {
                console.error('Failed to fetch members', err)
            }
        }

        const fetchProjectStatus = async () => {
            try {
                const res = await axios.get('/api/project')
                const raw = res.data
                if (!Array.isArray(raw)) return

                const counts = raw.reduce<Record<string, number>>((acc, item) => {
                    const project = item as ProjectData
                    if (!project.status) return acc
                    acc[project.status] = (acc[project.status] || 0) + 1
                    return acc
                }, {})

                setProjectStatus(Object.entries(counts).map(([status, count]) => ({ status, count: Number(count) })))
            } catch (err) {
                console.error('Failed to fetch projects', err)
            }
        }

        const fetchEventTypes = async () => {
            try {
                const res = await axios.get('/api/events')
                const raw = res.data
                if (!Array.isArray(raw)) return

                const counts = raw.reduce<Record<string, number>>((acc, item) => {
                    const event = item as EventData
                    if (!event.eventType) return acc
                    acc[event.eventType] = (acc[event.eventType] || 0) + 1
                    return acc
                }, {})

                setEventTypes(Object.entries(counts).map(([type, count]) => ({ type, count: Number(count) })))
            } catch (err) {
                console.error('Failed to fetch events', err)
            }
        }

        const fetchActionLogs = async () => {
            try {
                const res = await axios.get('/api/action-log')
                const logs = res.data as ActionLogEntry[]

                const grouped = logs.reduce<Record<string, ActionLogChartData>>((acc, log) => {
                    const date = new Date(log.timestamp || '').toLocaleDateString('en-GB')

                    if (!acc[date]) {
                        acc[date] = {
                            date,
                            create: 0,
                            update: 0,
                            delete: 0,
                            view: 0,
                        }
                    }

                    const action = log.action as keyof Omit<ActionLogChartData, 'date'>

                    if (action in acc[date]) {
                        acc[date][action] += 1
                    }

                    return acc
                }, {})

                setActionLogChartData(Object.values(grouped).reverse())
            } catch (err) {
                console.error('Failed to fetch action logs', err)
            }
        }

        fetchMemberRoles()
        fetchProjectStatus()
        fetchEventTypes()
        fetchActionLogs()
    }, [])

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Member Roles Pie Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Team Member Role Distribution</h3>
                    {memberRoles.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No data available</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={memberRoles}
                                    dataKey="count"
                                    nameKey="role"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                >
                                    {memberRoles.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Project Status Bar Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Project Status Overview</h3>
                    {projectStatus.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No data available</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={projectStatus}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e40" />
                                <XAxis dataKey="status" stroke="#8884d8" />
                                <YAxis stroke="#8884d8" />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366f1" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Action Log: Stacked Bar Graph */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Admin Action Activity</h3>
                    {actionLogChartData.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No actions found.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={actionLogChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2e2e40" />
                                <XAxis dataKey="date" stroke="#8884d8" />
                                <YAxis stroke="#8884d8" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="create" stackId="a" fill="#10b981" />
                                <Bar dataKey="update" stackId="a" fill="#3b82f6" />
                                <Bar dataKey="delete" stackId="a" fill="#ef4444" />
                                <Bar dataKey="view" stackId="a" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Event Types Pie Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Event Type Distribution</h3>
                    {eventTypes.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center">No data available</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={eventTypes}
                                    dataKey="count"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                >
                                    {eventTypes.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    )
}
