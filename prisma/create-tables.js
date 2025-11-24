const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
console.log('Opening DB at:', dbPath);
const db = new Database(dbPath);

try {
    // Create Project table
    db.exec(`
    CREATE TABLE IF NOT EXISTS Project (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
    console.log('✓ Project table created');

    // Create Feedback table
    db.exec(`
    CREATE TABLE IF NOT EXISTS Feedback (
      id TEXT PRIMARY KEY NOT NULL,
      text TEXT NOT NULL,
      projectId TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE CASCADE
    );
  `);
    console.log('✓ Feedback table created');

    // Insert Solar project
    const insertProject = db.prepare(`
    INSERT OR IGNORE INTO Project (id, name, description, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

    const now = new Date().toISOString();
    const projectId = 'solar-automation-project';

    const result = insertProject.run(
        projectId,
        'Solar Automation & AI System',
        'Full ecosystem for solar battery education, automation & quoting',
        'pending',
        now,
        now
    );

    if (result.changes > 0) {
        console.log('✓ Created Solar project');
    } else {
        console.log('✓ Solar project already exists');
    }

} catch (error) {
    console.error('Error:', error);
}

db.close();
console.log('✓ Database setup complete');
