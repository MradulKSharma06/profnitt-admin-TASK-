// GET/PUT/DELETE single event
import { connectDB } from "@/lib/mongodb"
import Event from "@/models/Event"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const event = await Event.findById(params.id)
    return NextResponse.json(event)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const data = await req.json()
    const updated = await Event.findByIdAndUpdate(params.id, data, { new: true })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const deleted = await Event.findByIdAndDelete(params.id)
    return NextResponse.json(deleted)
}
