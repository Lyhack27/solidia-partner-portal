const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, '../dev.db');
console.log('Opening DB at:', dbPath);

const db = new Database(dbPath);

async function main() {
    try {
        const user = db.prepare('SELECT * FROM User WHERE email = ?').get('info@premiumpromotionsau.com');
        console.log('User found:', user);

        if (user) {
            const isValid = await bcrypt.compare('password123', user.password);
            console.log('Password valid:', isValid);
        }
    } catch (e) {
        console.error('Error querying user:', e);
    }
}

main();
