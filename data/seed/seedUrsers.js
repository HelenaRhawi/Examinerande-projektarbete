import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import users from "../users.json" with { type: "json" };

export function seedUsersIfEmpty() {
  try {
    const existingUsers = db
      .prepare("SELECT COUNT(*) as count FROM users")
      .get();

    if (existingUsers.count === 0) {
      const insert = db.prepare(`
    INSERT INTO users (id, name, email, address, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `);

      const now = new Date().toISOString();

      for (const user of users.users) {
        insert.run(user.id, user.name, user.email, user.address, now);
      }
    }
  } catch (error) {
    console.error("Seeding users failed:", error);
    throw error;
  }
}
