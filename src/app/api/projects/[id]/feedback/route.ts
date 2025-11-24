import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects/[id]/feedback - Get all feedback for a project
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const feedbacks = await prisma.feedback.findMany({
            where: { projectId: params.id },
            orderBy: { createdAt: 'asc' }
        });

        return NextResponse.json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
}

// POST /api/projects/[id]/feedback - Create new feedback
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { text } = body;

        const feedback = await prisma.feedback.create({
            data: {
                text,
                projectId: params.id
            }
        });

        return NextResponse.json(feedback);
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
    }
}
