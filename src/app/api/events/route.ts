// GET all events, POST new event
import { connectDB } from "../../../lib/mongodb"
import Event from "@/models/Event"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const events = await Event.find().sort({ date: -1 })
    return NextResponse.json(events)
}

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const event = await Event.create(body)
    return NextResponse.json(event)
}

