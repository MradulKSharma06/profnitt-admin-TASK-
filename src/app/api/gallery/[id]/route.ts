// GET/PUT/DELETE single image
import { connectDB } from "@/lib/mongodb"
import Gallery from "@/models/Gallery"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const image = await Gallery.findById(params.id)
    return NextResponse.json(image)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const body = await req.json()
    const updated = await Gallery.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const deleted = await Gallery.findByIdAndDelete(params.id)
    return NextResponse.json(deleted)
}
