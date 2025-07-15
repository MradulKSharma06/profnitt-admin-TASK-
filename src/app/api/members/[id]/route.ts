// GET/PUT/DELETE single member
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const member = await Member.findById(params.id)
    return NextResponse.json(member)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const body = await req.json()
    const updated = await Member.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB()
    const deleted = await Member.findByIdAndDelete(params.id)
    return NextResponse.json(deleted)
}
