import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    datasources: {
        db: {
            url: "file:C:/Users/leona/OneDrive/Escritorio/portal solidia/solidia-partner-portal/dev.db",
        },
    },
});

async function main() {
    try {
        console.log("Connecting to Prisma...");
        const projects = await prisma.project.findMany({
            include: { feedbacks: true }
        });
        console.log("Projects found:", JSON.stringify(projects, null, 2));
    } catch (error) {
        console.error("Prisma Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
