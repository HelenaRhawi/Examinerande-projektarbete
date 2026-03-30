import db from "../data/db.js";

export default function validateOrder(req, res, next) {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ fel: "Ordern måste innehålla items" });
  }

  try {
    const validatedItems = items.map((item) => {
      if (!item.menuId) {
        throw new Error("menuId saknas");
      }

      if (!item.quantity || item.quantity <= 0) {
        throw new Error(`Ogiltig quantity för produkt ${item.menuId}`);
      }

      const menuItem = db
        .prepare("SELECT id, price FROM menu WHERE id = ?")
        .get(item.menuId);

      if (!menuItem) {
        throw new Error(`Produkt ${item.menuId} finns inte`);
      }

      return {
        menu_id: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price,
      };
    });

    req.validatedItems = validatedItems;
    next();
  } catch (error) {
    return res.status(400).json({ fel: error.message });
  }
}
