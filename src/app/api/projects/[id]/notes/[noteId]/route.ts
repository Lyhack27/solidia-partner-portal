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

        // Verify the note belongs to the user
        const note = await prisma.note.findUnique({
            where: { id: params.noteId },
        });

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        if (note.userId !== parseInt(session.user.id)) {
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
