import { connectDB } from "@/lib/mongodb"
import Event from "@/models/Event"
import ActionLog from "@/models/ActionLog"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse, NextRequest } from "next/server"
import mongoose from "mongoose"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        const { id } = context.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const event = await Event.findById(id)
        if (!event) return new NextResponse("Event not found", { status: 404 })

        await ActionLog.create({
            action: "view",
            targetType: "event",
            targetId: event._id,
            performedBy,
        })

        return NextResponse.json(event)
    } catch (err) {
        console.error("GET /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        const { id } = context.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const data = await req.json()
        const updated = await Event.findByIdAndUpdate(id, data, { new: true })
        if (!updated) return new NextResponse("Event not found", { status: 404 })

        await ActionLog.create({
            action: "update",
            targetType: "event",
            targetId: updated._id,
            performedBy,
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error("PUT /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        const { id } = context.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new NextResponse("Invalid Event ID", { status: 400 })
        }

        const deleted = await Event.findByIdAndDelete(id)
        if (!deleted) return new NextResponse("Event not found", { status: 404 })

        await ActionLog.create({
            action: "delete",
            targetType: "event",
            targetId: deleted._id,
            performedBy,
        })

        return NextResponse.json(deleted)
    } catch (err) {
        console.error("DELETE /api/events/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
