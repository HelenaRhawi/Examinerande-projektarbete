import db from "../data/db.js";

export default function validateOrder(req, res, next) {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ Error: "Order must contain items" });
  }

  try {
    const validatedItems = items.map((item) => {
      if (!item.menuId) {
        throw new Error("missing menuId");
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 0) {
        throw new Error(` quantity for item not valid ${item.menuId}`);
      }

      const menuItem = db
        .prepare("SELECT id, price FROM menu WHERE id = ?")
        .get(item.menuId);

      if (!menuItem) {
        throw new Error(`Product ${item.menuId} does not exist`);
      }

      return {
        menuId: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price,
      };
    });

    req.validatedItems = validatedItems;
    next();
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }
}
