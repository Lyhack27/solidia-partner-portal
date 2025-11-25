import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id: projectId } = params;
        const body = await request.json();
        const { name, email, role } = body;

        if (!email || !role) {
            return NextResponse.json(
                { error: "Email and role are required" },
                { status: 400 }
            );
        }

        // 1. Check if user exists
        let user = await prisma.user.findUnique({
            where: { email },
        });

        // 2. If user doesn't exist, create them
        if (!user) {
            const tempPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    role: "partner", // Default system role
                },
            });
            // In a real app, we would send an email here with the temp password
            console.log(`Created new user ${email} with temp password: ${tempPassword}`);
        } else if (name && !user.name) {
            // Update name if provided and not set
            await prisma.user.update({
                where: { id: user.id },
                data: { name }
            });
        }

        // 3. Add to project (upsert to avoid duplicates or update role)
        const member = await prisma.projectMember.upsert({
            where: {
                projectId_userId: {
                    projectId,
                    userId: user.id,
                },
            },
            update: {
                role,
            },
            create: {
                projectId,
                userId: user.id,
                role,
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(member);
    } catch (error: any) {
        console.error("Error adding member:", error);
        return NextResponse.json(
            { error: "Failed to add member", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id: projectId } = params;

        const members = await prisma.projectMember.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                        role: true, // System role
                    },
                },
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(members);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch members", details: error.message },
            { status: 500 }
        );
    }
}
