import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";

const router = Router();

router.get("/", (_req, res) => {
  try {
    const menu = db.prepare("SELECT * FROM menu").all();
    res.json(menu);
  } catch (error) {
    console.error("GET /menu:", error);
    res.status(500).json({ Error: "Server error." });
  }
});
export default router;
