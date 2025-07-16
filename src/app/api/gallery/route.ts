import { connectDB } from "@/lib/mongodb"
import Gallery from "@/models/Gallery"
import ActionLog from "@/models/ActionLog"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const images = await Gallery.find().sort({ uploadedAt: -1 })
    return NextResponse.json(images)
}

export async function POST(req: Request) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        const body = await req.json()
        const image = await Gallery.create(body)

        await ActionLog.create({
            action: "create",
            targetType: "gallery",
            targetId: image._id,
            performedBy,
        })

        return NextResponse.json(image)
    } catch (err) {
        console.error("POST /api/gallery error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
