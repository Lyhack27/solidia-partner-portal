const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projectId = 'solar-automation-project';

    // Ensure a user exists to be the creator/owner (optional but good practice if we had a relation)
    // In the schema, Project doesn't strictly require a User relation for creation, 
    // but let's make sure we're safe.

    const project = await prisma.project.upsert({
        where: { id: projectId },
        update: {},
        create: {
            id: projectId,
            name: 'Solar Automation & AI System',
            description: 'Full ecosystem for solar battery education, automation & quoting.',
            status: 'pending',
        },
    });

    console.log('Project ensured:', project);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
