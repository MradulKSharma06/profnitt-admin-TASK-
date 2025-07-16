import { connectDB } from "@/lib/mongodb"
import Gallery from "@/models/Gallery"
import ActionLog from "@/models/ActionLog"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Gallery ID", { status: 400 })
        }

        const image = await Gallery.findById(params.id)
        if (!image) return new NextResponse("Gallery image not found", { status: 404 })

        await ActionLog.create({
            action: "view",
            targetType: "gallery",
            targetId: image._id,
            performedBy,
        })

        return NextResponse.json(image)
    } catch (err) {
        console.error("GET /api/gallery/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Gallery ID", { status: 400 })
        }

        const body = await req.json()
        const updated = await Gallery.findByIdAndUpdate(params.id, body, { new: true })

        if (!updated) return new NextResponse("Gallery image not found", { status: 404 })

        await ActionLog.create({
            action: "update",
            targetType: "gallery",
            targetId: updated._id,
            performedBy,
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error("PUT /api/gallery/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Gallery ID", { status: 400 })
        }

        const deleted = await Gallery.findByIdAndDelete(params.id)
        if (!deleted) return new NextResponse("Gallery image not found", { status: 404 })

        await ActionLog.create({
            action: "delete",
            targetType: "gallery",
            targetId: deleted._id,
            performedBy,
        })

        return NextResponse.json(deleted)
    } catch (err) {
        console.error("DELETE /api/gallery/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
