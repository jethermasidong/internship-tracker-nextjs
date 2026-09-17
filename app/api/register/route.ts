import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    try {
        const { full_name, email, password } = await request.json();

        if (!full_name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields"}, {status: 400 });
        }

        const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await query(
            "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3)",
            [full_name, email, hashedPassword] 
        );

        return NextResponse.json({ success: true, message: "Account created successfully!"}, { status: 201 });
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}