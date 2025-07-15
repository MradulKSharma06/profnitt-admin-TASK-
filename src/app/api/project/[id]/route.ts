// GET/PUT/DELETE single project
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const project = await Project.findById(params.id)
    return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const body = await req.json()
    const updated = await Project.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const deleted = await Project.findByIdAndDelete(params.id)
    return NextResponse.json(deleted)
}
