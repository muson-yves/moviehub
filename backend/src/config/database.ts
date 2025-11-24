import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATABASE_PATH: string = (process.env.DATABASE_PATH as string) || path.join(__dirname, '../../data/movies.db');

const db = new sqlite3.Database(DATABASE_PATH, (err: Error | null) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Movies table
      db.run(`
        CREATE TABLE IF NOT EXISTS movies (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          year INTEGER,
          rating REAL,
          category TEXT,
          imageUrl TEXT,
          duration INTEGER,
          director TEXT,
          cast TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err: Error | null) => {
        if (err) reject(err);
      });

      // Seasons table
      db.run(`
        CREATE TABLE IF NOT EXISTS seasons (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          year INTEGER,
          rating REAL,
          imageUrl TEXT,
          episodes INTEGER,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err: Error | null) => {
        if (err) reject(err);
      });

      // Contact Messages table
      db.run(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'unread',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err: Error | null) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

export const runAsync = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err: Error | null) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

export const getAsync = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const allAsync = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err: Error | null, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
};

export default db;
