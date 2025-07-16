import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
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
            return new NextResponse("Invalid Project ID", { status: 400 })
        }

        const project = await Project.findById(params.id)
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        await ActionLog.create({
            action: "view",
            targetType: "project",
            targetId: project._id,
            performedBy,
        })

        return NextResponse.json(project)
    } catch (err) {
        console.error(" GET project error:", err)
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Project ID", { status: 400 })
        }

        const body = await req.json()
        const updated = await Project.findByIdAndUpdate(params.id, body, { new: true })
        if (!updated) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        await ActionLog.create({
            action: "update",
            targetType: "project",
            targetId: updated._id,
            performedBy,
        })

        return NextResponse.json(updated)
    } catch (err) {
        console.error(" PUT project error:", err)
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const session = await getServerSession(authOptions)
        const performedBy = session?.user?.name || "unknown"

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new NextResponse("Invalid Project ID", { status: 400 })
        }

        const deleted = await Project.findByIdAndDelete(params.id)
        if (!deleted) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }

        await ActionLog.create({
            action: "delete",
            targetType: "project",
            targetId: deleted._id,
            performedBy,
        })

        return NextResponse.json(deleted)
    } catch (err) {
        console.error(" DELETE project error:", err)
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }
}
