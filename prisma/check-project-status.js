const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const project = await prisma.project.findUnique({
            where: { id: 'solar-automation-project' }
        });

        console.log('📊 Estado actual del proyecto:');
        console.log('Nombre:', project.name);
        console.log('Estado:', project.status);
        console.log('');

        if (project.status === 'pending') {
            console.log('✅ El proyecto está en estado "pending"');
            console.log('👉 Al hacer clic en "Approve Project", cambiará a "approved"');
            console.log('👉 El estado se guardará en la base de datos');
            console.log('👉 Al recargar la página, el botón mostrará "✓ Project Approved"');
        } else if (project.status === 'approved') {
            console.log('✅ El proyecto ya está APROBADO');
            console.log('👉 El botón mostrará "✓ Project Approved" y estará deshabilitado');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
