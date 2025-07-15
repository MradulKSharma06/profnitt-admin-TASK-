// GET all logs or POST a new action log
import { connectDB } from "@/lib/mongodb"
import ActionLog from "@/models/ActionLog"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const logs = await ActionLog.find().sort({ timestamp: -1 })
    return NextResponse.json(logs)
}

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const log = await ActionLog.create(body)
    return NextResponse.json(log)
}
