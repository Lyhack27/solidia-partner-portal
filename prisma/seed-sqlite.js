const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, '../dev.db');
console.log('Opening DB at:', dbPath);

const db = new Database(dbPath);

async function main() {
    const email = 'info@premiumpromotionsau.com';
    const password = await bcrypt.hash('password123', 10);
    const role = 'admin';

    try {
        db.exec(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'partner'
      );
      CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
    `);
        console.log('Table created or already exists');

        const stmt = db.prepare('INSERT OR IGNORE INTO User (email, password, role) VALUES (?, ?, ?)');
        const info = stmt.run(email, password, role);
        console.log('Insert result:', info);

        if (info.changes === 0) {
            console.log('User already exists, updating...');
            const update = db.prepare('UPDATE User SET password = ?, role = ? WHERE email = ?');
            update.run(password, role, email);
            console.log('Update done');
        }
    } catch (e) {
        console.error('Error inserting user:', e);
    }
}

main();
