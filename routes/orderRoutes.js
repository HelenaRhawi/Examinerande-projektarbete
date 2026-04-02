import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateOrder from "../middleware/validateOrder.js";
import validateID from "../middleware/validateID.js";
import validateOptionalUser from "../middleware/validateOptionalUser.js";

const router = Router();

router.get("/", (_req, res) => {
  try {
    const getAllOrders = db.prepare("SELECT * FROM orders");
    res.json(getAllOrders.all());
  } catch (error) {
    console.error(("GET /", error));
    res.status(500).json({ Error: "Server error." });
  }
});

router.get("/status/:id", validateID("orders"), (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare("SELECT ETA FROM orders WHERE id = ?").get(id);
    res.json({ ETA: `${stmt.ETA} minutes left` });
  } catch (error) {
    console.error(("GET / status/:id", error));
    res.status(500).json({ Error: "Server error." });
  }
});

router.get("/user/:id/orders", validateID("users"), (req, res) => {
  const { id } = req.params;
  try {
    const orders = db
      .prepare("SELECT id, createdAt FROM orders WHERE userId = ?")
      .all(id);

    const orderLoops = orders.map((order) => {
      const userOrders = db
        .prepare(
          `SELECT 
      oi.quantity, oi.price, m.title 
      FROM orderItems oi 
      JOIN menu m ON oi.menuId = m.id 
      WHERE oi.orderId =?`,
        )
        .all(order.id);
      const totalPrice = userOrders.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
      return {
        id: order.id,
        createdAt: order.createdAt,
        userOrder: userOrders.map((item) => ({
          name: item.title,
          quantity: `${item.quantity} unit`,
          price: `${item.price} SEK per unit.`,
        })),
        totalPrice: `${totalPrice} SEK`,
      };
    });
    res.json(orderLoops);
  } catch (error) {
    console.error("GET/:id", error);
    res.status(500).json({ Error: "Server error." });
  }
});

router.post("/", validateOptionalUser, validateOrder, (req, res) => {
  try {
    const validatedItems = req.validatedItems;
    const orderId = uuidv4();
    const eta = Math.floor(Math.random() * 10) + 5;
    const createdAt = new Date().toISOString();

    const userId = req.user ? req.user.id : null;

  

    db.prepare(
      `
      INSERT INTO orders (id, userId, ETA, createdAt)
      VALUES (?, ?, ?, ?)
    `,
    ).run(orderId, userId, eta, createdAt);

    const insertItem = db.prepare(`
      INSERT INTO orderItems (id, orderId, menuId, quantity, price)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const item of validatedItems) {
      insertItem.run(uuidv4(), orderId, item.menuId, item.quantity, item.price);
    }

    const items = db
      .prepare(
        `
      SELECT 
        oi.quantity,
        oi.price,
        m.title
      FROM orderItems oi
      JOIN menu m ON oi.menuId = m.id
      WHERE oi.orderId = ?
    `,
      )
      .all(orderId);

    const orderWithUser = db
      .prepare(
        `
      SELECT 
        o.id,
        o.ETA,
        u.name,
        u.address
      FROM orders o
      LEFT JOIN users u ON o.userId = u.id
      WHERE o.id = ?
    `,
      )
      .get(orderId);

    const totalPrice = items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    res.status(201).json({
      orderId: orderWithUser.id,
      name: orderWithUser.name || null,
      address: orderWithUser.address || null,

      items: items.map((item) => ({
        name: item.title,
        quantity: `${item.quantity} unit.`,
        price: `${item.price} SEK per unit.`,
      })),
      eta: `${orderWithUser.ETA} minutes`,
      totalPrice: `${totalPrice} SEK`,
    });
  } catch (error) {
    console.error("POST /orders:", error);
    res.status(500).json({ Error: "Server error." });
  }
});

export default router;
