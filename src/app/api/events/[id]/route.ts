// GET/PUT/DELETE single event
import { connectDB } from "@/lib/mongodb"
import Event from "@/models/Event"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const event = await Event.findById(params.id)
        if (!event) return new NextResponse("Event not found", { status: 404 })

        return NextResponse.json(event)
    } catch (err) {
        console.error("GET /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const data = await req.json()
        const updated = await Event.findByIdAndUpdate(params.id, data, { new: true })

        if (!updated) return new NextResponse("Event not found", { status: 404 })

        return NextResponse.json(updated)
    } catch (err) {
        console.error("PUT /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const deleted = await Event.findByIdAndDelete(params.id)
        if (!deleted) return new NextResponse("Event not found", { status: 404 })

        return NextResponse.json(deleted)
    } catch (err) {
        console.error("DELETE /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
