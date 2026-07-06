const fs = require('fs');
const path = require('path');

let db = null;

function initDatabase() {
  if (process.env.DB_TYPE === 'postgres') {
    // PostgreSQL connection
    const { Pool } = require('pg');
    db = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log('📦 Connected to PostgreSQL');
  } else {
    // SQLite connection (default)
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = process.env.DB_FILE || './data/frotapm.db';
    
    // Create data directory if it doesn't exist
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Error opening database:', err);
      } else {
        console.log('📦 Connected to SQLite:', dbPath);
        createTables();
      }
    });
  }
  
  return db;
}

function createTables() {
  if (process.env.DB_TYPE === 'postgres') {
    // PostgreSQL tables
    db.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        plate VARCHAR(10) UNIQUE NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER,
        mileage INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'available',
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        last_maintenance TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS maintenance_schedules (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
        maintenance_type VARCHAR(100) NOT NULL,
        interval_km INTEGER,
        interval_days INTEGER,
        last_done TIMESTAMP,
        next_due TIMESTAMP,
        priority VARCHAR(20) DEFAULT 'normal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS maintenance_records (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
        maintenance_type VARCHAR(100) NOT NULL,
        description TEXT,
        cost DECIMAL(10, 2),
        performed_by VARCHAR(100),
        performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } else {
    // SQLite tables
    const sql = `
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plate TEXT UNIQUE NOT NULL,
        model TEXT NOT NULL,
        year INTEGER,
        mileage INTEGER DEFAULT 0,
        status TEXT DEFAULT 'available',
        latitude REAL,
        longitude REAL,
        last_maintenance DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS maintenance_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER NOT NULL,
        maintenance_type TEXT NOT NULL,
        interval_km INTEGER,
        interval_days INTEGER,
        last_done DATETIME,
        next_due DATETIME,
        priority TEXT DEFAULT 'normal',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
      );
      
      CREATE TABLE IF NOT EXISTS maintenance_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER NOT NULL,
        maintenance_type TEXT NOT NULL,
        description TEXT,
        cost REAL,
        performed_by TEXT,
        performed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
      );
    `;
    
    db.exec(sql, (err) => {
      if (err) {
        console.error('❌ Error creating tables:', err);
      } else {
        console.log('✅ Database tables created successfully');
      }
    });
  }
}

module.exports = {
  initDatabase,
  getDb: () => db,
};
