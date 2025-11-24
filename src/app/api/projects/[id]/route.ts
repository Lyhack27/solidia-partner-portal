import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// PATCH /api/projects/[id] - Update project status
export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const body = await request.json();
        const { status } = body;

        const project = await prisma.project.update({
            where: { id: params.id },
            data: { status }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}
