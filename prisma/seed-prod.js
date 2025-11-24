const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting production seed...');

    // 1. Create User
    const email = 'info@premiumpromotionsau.com';
    const password = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { password }, // Update password just in case
        create: {
            email,
            password,
            role: 'admin',
        },
    });
    console.log(`✅ User ensured: ${user.email}`);

    // 2. Create Project
    const projectId = 'solar-automation-project';
    const project = await prisma.project.upsert({
        where: { id: projectId },
        update: {},
        create: {
            id: projectId,
            name: 'Solar Automation & AI System',
            description: 'Full ecosystem for solar battery education, automation & quoting',
            status: 'pending',
        },
    });
    console.log(`✅ Project ensured: ${project.name}`);

    console.log('🚀 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
