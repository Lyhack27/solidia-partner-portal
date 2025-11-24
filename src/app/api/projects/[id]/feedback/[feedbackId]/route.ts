import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/projects/[id]/feedback/[feedbackId] - Update feedback
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string; feedbackId: string } }
) {
    try {
        const body = await request.json();
        const { text } = body;

        const feedback = await prisma.feedback.update({
            where: { id: params.feedbackId },
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
    { params }: { params: { id: string; feedbackId: string } }
) {
    try {
        await prisma.feedback.delete({
            where: { id: params.feedbackId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
    }
}
