// GET all members, POST new member
import { connectDB } from "@/lib/mongodb"
import Member from "@/models/Member"
import { NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    const members = await Member.find().sort({ createdAt: -1 })
    return NextResponse.json(members)
}

export async function POST(req: Request) {
    await connectDB()
    const body = await req.json()
    const member = await Member.create(body)
    return NextResponse.json(member)
}
