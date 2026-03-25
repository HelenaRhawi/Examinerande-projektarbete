import Database from "better-sqlite3";

const db = new Database("./data/airbean.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  adress TEXT NOT NULL,
  createdAt TEXT
)
  `);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId TEXT,
    ETA INTEGER,
    createdAt TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS menu (
    id TEXT PRIMARY KEY,
    title TEXT,
    desc TEXT,
    price INTEGER
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orderItems (
    id TEXT PRIMARY KEY,
    oder_id TEXT,
    menu_id TEXT,
    quantity INTEGER
    price INTEGER
  );
`);

export default db;
