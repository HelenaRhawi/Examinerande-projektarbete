import Database from "better-sqlite3";

const db = new Database("./data/airbean.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  createdAt TEXT
)
  `);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId TEXT,
    ETA INTEGER NOT NULL,
    createdAt TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS menu (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    price INTEGER NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orderItems (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    menuId TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id),
    FOREIGN KEY(menuId) REFERENCES menu(id)
  );
`);

export default db;
