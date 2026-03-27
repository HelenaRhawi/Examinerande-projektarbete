import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateOrder from "../middelware/validateOrder.js";

const router = Router();

router.get("/", (req, res) => {
  const getAllOrders = db.prepare("SELECT * FROM orders");
  res.json(getAllOrders.all());
});

router.post("/", validateOrder, (req, res) => {
  const { userId } = req.body;
  const validateItems = req.validateItems;
  const orderId = uuidv4;
  const eta = Math.floor(Math.random() * 10) + 5;
  const createdAt = new Date().toISOString();
  try {
    const stmt = db.prepare(`
      INSERT INTO orders (id, userId, ETA, createdAt)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(id, userId, eta, createdAt); //kolla om vi får ett fel
    const insertItem = db.prepare(
      `INSERT INTO orderItems (id, order_Id, menu_Id, quantity, price) VALUES (?, ?, ?, ?, ?)`,
    );
    for (const item of validateItems) {
      insertItem.run(
        uuidv4(),
        orderId,
        item.menu_id,
        item.quantity,
        item.price,
      );
    }
    const itemsName = db
      .prepare(
        ` SELECT oi.quantity, oi.price, m.title 
      FROM orderItems oi 
      JOIN menu m 
      ON oi.menu_Id=m.id 
      WHERE oi.order_id=?`,
      )
      .all(orderId);

    const totalCost = itemsName.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);
    res.status(201).json({
      orderId,
      eta,
      totalCost,
      items: itemsName.map((item) => ({
        name: item.title,
        quantity: item.quantity,
      })),
    });
  } catch (error) {
    console.error("POST /order: ", error);
    res.status(500).json({ Fel: "Kunde inte skapa order.", error });
  }
});

export default router;
