// GET/PUT/DELETE single project
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const project = await Project.findById(params.id)
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }
        return NextResponse.json(project)
    } catch (err) {
        console.error(" GET project error:", err)
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const body = await req.json()
        const updated = await Project.findByIdAndUpdate(params.id, body, { new: true })
        if (!updated) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }
        return NextResponse.json(updated)
    } catch (err) {
        console.error(" PUT project error:", err)
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB()
        const deleted = await Project.findByIdAndDelete(params.id)
        if (!deleted) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 })
        }
        return NextResponse.json(deleted)
    } catch (err) {
        console.error(" DELETE project error:", err)
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
    }
}
