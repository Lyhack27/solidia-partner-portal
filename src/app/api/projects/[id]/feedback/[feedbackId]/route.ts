import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/projects/[id]/feedback/[feedbackId] - Update feedback
export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string; feedbackId: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const { text } = body;

        const feedback = await prisma.feedback.update({
            where: {
                id: params.feedbackId,
                projectId: params.id
            },
            data: { text }
        });

        return NextResponse.json(feedback);
    } catch (error) {
        console.error("Error updating feedback:", error);
        return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
    }
}

// DELETE /api/projects/[id]/feedback/[feedbackId] - Delete feedback
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string; feedbackId: string }> }
) {
    const params = await props.params;
    try {
        await prisma.feedback.delete({
            where: {
                id: params.feedbackId,
                projectId: params.id
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
    }
}
