import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:C:/Users/leona/OneDrive/Escritorio/portal solidia/solidia-partner-portal/dev.db",
        },
    },
});

async function main() {
    try {
        console.log("Cleaning database...");
        // Delete all feedbacks first (foreign key)
        await prisma.feedback.deleteMany();
        console.log("Feedbacks deleted.");

        // Delete all projects
        await prisma.project.deleteMany();
        console.log("Projects deleted.");

        // Re-seed project
        console.log("Seeding project...");
        await prisma.project.create({
            data: {
                id: 'solar-automation-project',
                name: 'Solar Automation & AI System',
                description: 'Full ecosystem for solar battery education, automation & quoting',
                status: 'pending'
            }
        });
        console.log("Project seeded successfully.");

    } catch (error) {
        console.error("Error fixing data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
