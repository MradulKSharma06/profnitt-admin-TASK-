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
import { MemberData, ProjectData, EventData } from '@/types'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee', '#10b981', '#f59e0b', '#ef4444']

const loginHistory = [
    { day: 'Mon', logins: 2 },
    { day: 'Tue', logins: 5 },
    { day: 'Wed', logins: 4 },
    { day: 'Thu', logins: 6 },
    { day: 'Fri', logins: 3 },
    { day: 'Sat', logins: 1 },
    { day: 'Sun', logins: 0 }
]

export default function DashboardCharts() {
    const [memberRoles, setMemberRoles] = useState<{ role: string; count: number }[]>([])
    const [projectStatus, setProjectStatus] = useState<{ status: string; count: number }[]>([])
    const [eventTypes, setEventTypes] = useState<{ type: string; count: number }[]>([])

    useEffect(() => {
        const fetchMemberRoles = async () => {
            try {
                const res = await axios.get<MemberData[]>('/api/members')
                const counts = res.data.reduce<Record<string, number>>((acc, member) => {
                    acc[member.type] = (acc[member.type] || 0) + 1
                    return acc
                }, {})
                setMemberRoles(Object.entries(counts).map(([role, count]) => ({ role, count })))
            } catch {
                console.error('Failed to fetch members')
            }
        }

        const fetchProjectStatus = async () => {
            try {
                const res = await axios.get<ProjectData[]>('/api/projects')
                const counts = res.data.reduce<Record<string, number>>((acc, project) => {
                    acc[project.status] = (acc[project.status] || 0) + 1
                    return acc
                }, {})
                setProjectStatus(Object.entries(counts).map(([status, count]) => ({ status, count })))
            } catch {
                console.error('Failed to fetch projects')
            }
        }

        const fetchEventTypes = async () => {
            try {
                const res = await axios.get<EventData[]>('/api/events')
                const counts = res.data.reduce<Record<string, number>>((acc, event) => {
                    acc[event.eventType] = (acc[event.eventType] || 0) + 1
                    return acc
                }, {})
                setEventTypes(Object.entries(counts).map(([type, count]) => ({ type, count })))
            } catch {
                console.error('Failed to fetch events')
            }
        }

        fetchMemberRoles()
        fetchProjectStatus()
        fetchEventTypes()
    }, [])

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Member Roles Pie Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Team Member Role Distribution</h3>
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
                </div>

                {/* Project Status Bar Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Project Status Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={projectStatus}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e40" />
                            <XAxis dataKey="status" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Login History */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Login Activity This Week</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={loginHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e40" />
                            <XAxis dataKey="day" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Bar dataKey="logins" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Event Types Pie Chart */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Event Type Distribution</h3>
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
                </div>
            </div>
        </div>
    )
}
