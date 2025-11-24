import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // 1. Create User
    const email = "info@premiumpromotionsau.com";
    const password = await bcrypt.hash("password123", 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: { password },
        create: {
            email,
            password,
            role: "admin",
        },
    });

    // 2. Create Project
    const projectId = "solar-automation-project";
    const project = await prisma.project.upsert({
        where: { id: projectId },
        update: {},
        create: {
            id: projectId,
            name: "Solar Automation & AI System",
            description: "Full ecosystem for solar battery education, automation & quoting",
            status: "pending",
        },
    });

    console.log({ user, project });

    console.log({ user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
