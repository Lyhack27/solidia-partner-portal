const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        // Reset project to pending
        const project = await prisma.project.update({
            where: { id: 'solar-automation-project' },
            data: { status: 'pending' }
        });

        console.log('✅ Proyecto reseteado a estado "pending"');
        console.log('');
        console.log('📝 Ahora puedes probar:');
        console.log('1. Recargar la página en el navegador');
        console.log('2. El botón mostrará "🎯 Approve Project"');
        console.log('3. Hacer clic en el botón');
        console.log('4. El botón cambiará a "✓ Project Approved"');
        console.log('5. Recargar la página nuevamente');
        console.log('6. El botón seguirá mostrando "✓ Project Approved" (PERSISTENTE)');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
