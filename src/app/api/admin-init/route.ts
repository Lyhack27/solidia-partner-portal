import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    try {
        const email = "leonardorincon0127@hotmail.com";
        const password = await bcrypt.hash("Solidia123!", 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: { password, role: "admin" },
            create: {
                email,
                password,
                role: "admin",
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
