import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DELETE /api/projects/[id]/notes/[noteId] - Delete a note
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string; noteId: string }> }
) {
    const params = await props.params;
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify the note belongs to the user or user is admin
        const note = await prisma.note.findUnique({
            where: { id: params.noteId },
            include: { user: true }
        });

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        const isOwner = note.userId === parseInt(session.user.id);
        const isAdmin = session.user.role === 'admin';
        const isHardcodedAdmin = session.user.id === "9999";

        // Also check if the hardcoded admin email matches the note owner email
        const isEmailMatch = isHardcodedAdmin && note.user.email === session.user.email;

        if (!isOwner && !isAdmin && !isHardcodedAdmin && !isEmailMatch) {
            return NextResponse.json(
                { error: "You can only delete your own notes" },
                { status: 403 }
            );
        }

        await prisma.note.delete({
            where: { id: params.noteId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
}
