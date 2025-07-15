// GET all gallery images, POST new image
import { connectDB } from "@/lib/mongodb"
import Gallery from "@/models/Gallery"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const images = await Gallery.find().sort({ uploadedAt: -1 })
    return NextResponse.json(images)
}

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const image = await Gallery.create(body)
    return NextResponse.json(image)
}
