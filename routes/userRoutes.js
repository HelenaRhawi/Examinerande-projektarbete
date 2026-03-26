import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";

const router = Router();

router.get("/", (req, res) => {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  } catch (error) {
    console.error("GET /user:", error);
    res.status(500).json({ fel: "Kunde inte hämta användare", error });
  }
});

router.post("/", (req, res) => {
  const { name, email, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ Fel: "Namn, email och adress krävs." });
  }

  const id = uuidv4();
  const createdAt = new Date().toISOString();
  try {
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, address, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, email, address, createdAt);

    const newUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("POST /user: ", error);
    res.status(500).json({ Fel: "Kunde inte skapa användare." });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).json({ fel: "Body saknas" });
  }

  const { name, email, address } = req.body;
  if (!name || !email || !address) {
    return res.status(400).json({ fel: "Name, email och adress krävs" });
  }

  try {
    const stmt = db.prepare(`
      UPDATE users
      SET name = ?, email = ?, address = ?
      WHERE id = ?
    `);
    const result = stmt.run(name, email, address, id);

    if (result.changes === 0) {
      return res.status(404).json({ fel: "Användaren hittades inte" });
    }

    const updateUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    res.json(updateUser);
  } catch (error) {
    console.error("PUT /users/:id:", error);
    res.status(500).json({ fel: "Kunde inte uppdatera användaren", error });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ fel: "Användaren hittades inte" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(("DELETE /users/:id", error));
    res.status(500).json({ fel: "Kunde inte ta bort användaren", error });
  }
});

export default router;
