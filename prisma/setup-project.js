const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        // Check if project exists
        let project = await prisma.project.findUnique({
            where: { id: 'solar-automation-project' }
        });

        if (!project) {
            // Create project
            project = await prisma.project.create({
                data: {
                    id: 'solar-automation-project',
                    name: 'Solar Automation & AI System',
                    description: 'Full ecosystem for solar battery education, automation & quoting',
                    status: 'pending'
                }
            });
            console.log('✅ Proyecto creado:', project.name);
        } else {
            console.log('✅ Proyecto ya existe:', project.name);
        }

        console.log('\n📊 Estado del proyecto:');
        console.log('ID:', project.id);
        console.log('Nombre:', project.name);
        console.log('Estado:', project.status);
        console.log('Creado:', project.createdAt);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
