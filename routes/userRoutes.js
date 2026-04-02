import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateUser from "../middleware/validateUsers.js";
import validateUserUpdate from "../middleware/validateUserUpdate.js";
import validateID from "../middleware/validateID.js";
const router = Router();

router.get("/", (req, res) => {
  try {
    if (req.query.fail === "true") {
      throw new Error("Simulated failure");
    }

    const users = db.prepare("SELECT * FROM users").all();
    res.json(users);
  } catch (error) {
    console.error("GET /user:", error);
    res.status(500).json({ Error: "Server error." });
  }
});

router.post("/", validateUser, (req, res) => {
  const { name, email, address } = req.body;

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
    res.status(500).json({ Error: "Server error." });
  }
});

router.put("/:id", validateID("users"), validateUserUpdate, (req, res) => {
  const { id } = req.params;
  const { name, email, address } = req.body;

  try {
    const stmt = db.prepare(`
      UPDATE users
      SET name = ?, email = ?, address = ?
      WHERE id = ?
    `);

    const result = stmt.run(name.trim(), email.trim(), address.trim(), id);

    if (result.changes === 0) {
      return res.status(404).json({ Error: "User not found" });
    }

    const updateUser = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    res.json(updateUser);
  } catch (error) {
    console.error("PUT /users/:id:", error);
    res.status(500).json({ Error: "Server error." });
  }
});

router.delete("/:id", validateID("users"), (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ Error: "User was not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(("DELETE /users/:id", error));
    res.status(500).json({ Error: "Server error." });
  }
});

export default router;
