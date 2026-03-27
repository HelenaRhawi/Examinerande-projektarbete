import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";

const router = Router();

router.get("/", (req, res) => {
  const getAllOrders = db.prepare("SELECT * FROM orders");
  res.json(getAllOrders.all());
});

export default router;
