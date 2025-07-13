'use client'

import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#22d3ee', '#10b981', '#f59e0b', '#ef4444']

const memberRoles = [
    { role: 'Core', count: 4 },
    { role: 'Manager', count: 6 },
    { role: 'Coordinator', count: 12 },
]

const projectStatus = [
    { status: 'Ongoing', count: 5 },
    { status: 'Completed', count: 10 },
]

const loginHistory = [
    { day: 'Mon', logins: 2 },
    { day: 'Tue', logins: 5 },
    { day: 'Wed', logins: 4 },
    { day: 'Thu', logins: 6 },
    { day: 'Fri', logins: 3 },
    { day: 'Sat', logins: 1 },
    { day: 'Sun', logins: 0 },
]

const eventTypes = [
    { type: 'Workshop', count: 6 },
    { type: 'Talk', count: 4 },
    { type: 'Competition', count: 3 },
]

export default function DashboardCharts() {
    return (
        <div className="space-y-12">
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* Team Member Roles Pie */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full ">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Team Member Role Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={memberRoles} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={100}>
                                {memberRoles.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Project Status Overview */}
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

            <div className='flex flex-col lg:flex-row gap-6'>
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

                {/* Event Type Breakdown */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-300">Event Type Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={eventTypes} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={100}>
                                {eventTypes.map((entry, index) => (
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
