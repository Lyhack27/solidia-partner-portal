import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/projects/[id]/notes - Get all notes for a project
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const notes = await prisma.note.findMany({
            where: { projectId: params.id },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}

// POST /api/projects/[id]/notes - Create a new note
export async function POST(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user from database using email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await request.json();
        const { text } = body;

        if (!text || !text.trim()) {
            return NextResponse.json(
                { error: "Note text is required" },
                { status: 400 }
            );
        }

        const note = await prisma.note.create({
            data: {
                text: text.trim(),
                projectId: params.id,
                userId: user.id,
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: true,
                    },
                },
            },
        });

        return NextResponse.json(note);
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}
