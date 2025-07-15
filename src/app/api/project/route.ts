// GET all projects, POST new project
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/Project"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const projects = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(projects)
}

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const project = await Project.create(body)
    return NextResponse.json(project)
}
