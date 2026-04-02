import menu from "../menu.json" with { type: "json" };
import db from "../db.js";

export function seedMenuIfEmpty() {
  try {
    const existingMenu = db.prepare("SELECT COUNT(*) as count FROM menu").get();

    if (existingMenu.count === 0) {
      const insert = db.prepare(`INSERT INTO  menu(id, title, desc, price) 
    VALUES(?, ?, ?, ?)`);

      for (const item of menu.menu) {
        insert.run(item.id, item.title, item.desc, item.price);
      }
    }
  } catch (error) {
    console.error("Seeding menu failed:", error);
    throw error;
  }
}
