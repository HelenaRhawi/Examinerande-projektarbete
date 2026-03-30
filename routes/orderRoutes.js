import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../data/db.js";
import validateOrder from "../middelware/validateOrder.js";

const router = Router();

router.get("/", (req, res) => {
  const getAllOrders = db.prepare("SELECT * FROM orders");
  res.json(getAllOrders.all());
});

router.get("/status/:id", (req, res) => {
  const orderId = req.params.id;
  try {
    const stmt = db.prepare("SELECT ETA FROM orders WHERE id = ?").get(orderId);
    res.json({ Leveranstid: `${stmt.ETA} min kvar` });
  } catch (error) {
    console.error(("GET / status/:id", error));
    res.status(500).json({ fel: "Kunde inte hitta order", error });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
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
      JOIN menu m ON oi.menu_id = m.id 
      WHERE oi.order_id =?`,
        )
        .all(order.id);
      const totalPrice = userOrders.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
      return {
        orderId: order.id,
        createdAt: order.createdAt,
        userOrder: userOrders.map((item) => ({
          name: item.title,
          quantity: `${item.quantity} st`,
          price: `${item.price} SEK per st.`,
        })),
        totalPrice,
      };
    });
    res.json(orderLoops);
  } catch (error) {
    console.error("GET/:id", error);
    res.status(500).json({ fel: "Kunde inte hämta orderhistorik", error });
  }
});

router.post("/", validateOrder, (req, res) => {
  try {
    const { userId } = req.body;
    const validatedItems = req.validatedItems;

    const orderId = uuidv4();
    const eta = Math.floor(Math.random() * 10) + 5;
    const createdAt = new Date().toISOString();

    db.prepare(
      `
      INSERT INTO orders (id, userId, ETA, createdAt)
      VALUES (?, ?, ?, ?)
    `,
    ).run(orderId, userId || null, eta, createdAt);

    const insertItem = db.prepare(`
      INSERT INTO orderItems (id, order_id, menu_id, quantity, price)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const item of validatedItems) {
      insertItem.run(
        uuidv4(),
        orderId,
        item.menu_id,
        item.quantity,
        item.price,
      );
    }

    const items = db
      .prepare(
        `
      SELECT 
        oi.quantity,
        oi.price,
        m.title
      FROM orderItems oi
      JOIN menu m ON oi.menu_id = m.id
      WHERE oi.order_id = ?
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
      address: orderWithUser.address,

      items: items.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: `${item.price} SEK per st.`,
      })),
      eta: `${orderWithUser.ETA} min`,
      totalPrice: `${totalPrice} SEK`,
    });
  } catch (error) {
    console.error("POST /orders:", error);
    res.status(500).json({ fel: "Kunde inte skapa order", error });
  }
});

export default router;
