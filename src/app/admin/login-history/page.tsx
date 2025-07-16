'use client'

import { useEffect, useState } from 'react'
import { ActionLogEntry } from '@/types'
import axios from 'axios'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Legend
} from 'recharts'

export default function LoginHistoryPage() {
    const [logs, setLogs] = useState<ActionLogEntry[]>([])
    const [loginCounts, setLoginCounts] = useState<{ date: string; count: number }[]>([])

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('/api/action-log')
                const data = res.data as ActionLogEntry[]
                setLogs(data)

                // Filter for only login actions (optional)
                const loginOnly = data.filter((log) => log.action === 'view' && log.targetType === 'member')

                // Group by date
                const countsMap = loginOnly.reduce<Record<string, number>>((acc, log) => {
                    const date = new Date(log.timestamp || '').toLocaleDateString('en-GB')
                    acc[date] = (acc[date] || 0) + 1
                    return acc
                }, {})

                const loginCountsArray = Object.entries(countsMap).map(([date, count]) => ({
                    date,
                    count
                }))

                setLoginCounts(loginCountsArray.reverse()) // recent last
            } catch (err) {
                console.error('Failed to fetch action logs', err)
            }
        }

        fetchLogs()
    }, [])

    return (
        <div className="px-6 py-12 max-w-6xl mx-auto text-white space-y-12">
            {/* Login Activity Chart */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h2 className="text-xl font-bold text-indigo-400 mb-4">Login Activity by Day</h2>
                {loginCounts.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center">No login activity found.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={loginCounts}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e40" />
                            <XAxis dataKey="date" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Action Log Table */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 overflow-auto">
                <h2 className="text-xl font-bold text-indigo-400 mb-4">Recent Action Logs</h2>
                {logs.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center">No logs available.</p>
                ) : (
                    <table className="w-full text-sm text-left text-white border-collapse">
                        <thead className="text-xs uppercase text-indigo-300 border-b border-white/10">
                            <tr>
                                <th className="py-3 px-4">Action</th>
                                <th className="py-3 px-4">Target</th>
                                <th className="py-3 px-4">By</th>
                                <th className="py-3 px-4">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.slice(0, 20).map((log) => (
                                <tr key={log._id} className="border-b border-white/10 hover:bg-white/10">
                                    <td className="py-2 px-4 capitalize">{log.action}</td>
                                    <td className="py-2 px-4 capitalize">{log.targetType}</td>
                                    <td className="py-2 px-4">{log.performedBy}</td>
                                    <td className="py-2 px-4 text-gray-400">
                                        {new Date(log.timestamp || '').toLocaleString('en-GB')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
