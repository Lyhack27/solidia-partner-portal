const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    try {
        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email: 'info@premiumpromotionsau.com' }
        });

        if (!user) {
            // Create user
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = await prisma.user.create({
                data: {
                    email: 'info@premiumpromotionsau.com',
                    password: hashedPassword,
                    role: 'admin'
                }
            });
            console.log('✅ Usuario creado:', user.email);
        } else {
            console.log('✅ Usuario ya existe:', user.email);
        }

        // Verify password
        const isValid = await bcrypt.compare('password123', user.password);
        console.log('🔑 Contraseña válida:', isValid);

        console.log('\n📧 Credenciales:');
        console.log('Email:', user.email);
        console.log('Password: password123');
        console.log('Role:', user.role);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
