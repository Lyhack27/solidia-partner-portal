import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log("🛠️ Iniciando setup de administrador manual...");

        // 1. Ejecutar migraciones para asegurar que las tablas existen
        try {
            console.log("📦 Ejecutando migraciones de base de datos...");
            // Forzamos la variable de entorno por si acaso, aunque debería tomar la del sistema
            await execPromise("npx prisma migrate deploy");
            console.log("✅ Migraciones completadas exitosamente.");
        } catch (migrateError: any) {
            console.error("⚠️ Error al ejecutar migraciones:", migrateError.message);
            return NextResponse.json(
                { error: "Failed to run migrations", details: migrateError.message },
                { status: 500 }
            );
        }

        const email = "info@premiumpromotionsau.com";
        const password = "password123";

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear o actualizar usuario
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                role: "admin"
            },
            create: {
                email,
                password: hashedPassword,
                role: "admin",
            },
        });

        console.log("✅ Usuario administrador configurado:", user.email);

        // Asegurar que el proyecto existe también
        const projectId = "solar-automation-project";
        await prisma.project.upsert({
            where: { id: projectId },
            update: {},
            create: {
                id: projectId,
                name: "Solar Automation & AI System",
                description: "Full ecosystem for solar battery education, automation & quoting",
                status: "pending",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Database migrated and Admin user configured successfully",
            user: {
                email: user.email,
                role: user.role,
                id: user.id
            }
        });

    } catch (error: any) {
        console.error("❌ Error en setup admin:", error);
        return NextResponse.json(
            { error: "Failed to setup admin", details: error.message },
            { status: 500 }
        );
    }
}
