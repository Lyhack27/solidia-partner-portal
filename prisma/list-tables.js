const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../dev.db');
console.log('Opening DB at:', dbPath);

const db = new Database(dbPath);

try {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Tables:', tables);
} catch (e) {
    console.error('Error listing tables:', e);
}
