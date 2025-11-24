const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const path = require("path");

const dbPath = path.join(__dirname, "../dev.db");
const dbUrl = `file:${dbPath}`;

console.log("Explicit Database URL:", dbUrl);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: dbUrl,
        },
    },
});

async function main() {
    console.log("Seeding database...");

    const email = "admin@solidia.com";
    const password = await bcrypt.hash("password123", 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password,
            role: "admin",
        },
    });

    console.log("User created:", user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("FULL ERROR:", JSON.stringify(e, null, 2));
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
