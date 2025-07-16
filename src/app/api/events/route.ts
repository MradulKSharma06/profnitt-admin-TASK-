import { connectDB } from "@/lib/mongodb"
import Event from "@/models/Event"
import ActionLog from "@/models/ActionLog"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const events = await Event.find().sort({ date: -1 })
    return NextResponse.json(events)
}

export async function POST(req: Request) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        const body = await req.json()
        const event = await Event.create(body)

        await ActionLog.create({
            action: "create",
            targetType: "event",
            targetId: event._id,
            performedBy,
        })

        return NextResponse.json(event)
    } catch (err) {
        console.error("POST /api/events error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
