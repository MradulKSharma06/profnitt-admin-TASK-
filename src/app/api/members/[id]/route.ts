import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"
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
            return new NextResponse("Invalid Member ID", { status: 400 })
        }

        const member = await Member.findById(params.id)
        if (!member) return new NextResponse("Member not found", { status: 404 })

        await ActionLog.create({
            action: "view",
            targetType: "member",
            targetId: member._id,
            performedBy,
        })

        return NextResponse.json(member)
    } catch (err) {
        console.error("GET /api/members/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Member ID", { status: 400 })
        }

        const body = await req.json()
        const updated = await Member.findByIdAndUpdate(params.id, body, { new: true })
        if (!updated) return new NextResponse("Member not found", { status: 404 })

        await ActionLog.create({
            action: "update",
            targetType: "member",
            targetId: updated._id,
            performedBy,
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error("PUT /api/members/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Member ID", { status: 400 })
        }

        const deleted = await Member.findByIdAndDelete(params.id)
        if (!deleted) return new NextResponse("Member not found", { status: 404 })

        await ActionLog.create({
            action: "delete",
            targetType: "member",
            targetId: deleted._id,
            performedBy,
        })

        return NextResponse.json(deleted)
    } catch (err) {
        console.error("DELETE /api/members/[id] error:", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
