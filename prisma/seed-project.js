const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
const db = new Database(dbPath);

try {
    // Insert Solar project
    const insertProject = db.prepare(`
    INSERT INTO Project (id, name, description, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

    const now = new Date().toISOString();
    const projectId = 'solar-automation-project';

    insertProject.run(
        projectId,
        'Solar Automation & AI System',
        'Full ecosystem for solar battery education, automation & quoting',
        'pending',
        now,
        now
    );

    console.log('✓ Created Solar project');
} catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
        console.log('✓ Solar project already exists');
    } else {
        console.error('Error creating project:', error);
    }
}

db.close();
console.log('✓ Database seeded with project');
