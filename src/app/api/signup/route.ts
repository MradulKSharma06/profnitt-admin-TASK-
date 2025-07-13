import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        console.log("Received signup request");

        await connectDB();
        console.log("Connected to MongoDB");

        const body = await req.json();
        console.log("Request body:", body);

        const { name, email, password } = body;

        // Validate fields
        if (!name || !email || !password) {
            console.warn("Missing fields in request");
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.warn("Email already registered:", email);
            return NextResponse.json(
                { success: false, message: "Email already registered." },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        // Create and save new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        await newAdmin.save();
        console.log("New admin saved:", email);

        return NextResponse.json(
            { success: true, message: "Admin account created successfully." },
            { status: 201 }
        );
    } catch (err: unknown) {
        console.error("Signup error:", err);
        const message = err instanceof Error ? err.message : "Something went wrong."
        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
