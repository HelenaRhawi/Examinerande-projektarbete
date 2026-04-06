import db from "../data/db.js";

export default function validateOrder(req, res, next) {
  const { name, address, items } = req.body;

  if (
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !name ||
    typeof name !== "string" ||
    name.trim() === "" ||
    !address ||
    typeof address !== "string" ||
    address.trim() === ""
  ) {
    return res
      .status(400)
      .json({ Error: "Order must contain name, address and items" });
  }

  try {
    const validatedItems = items.map((item) => {
      if (!item.menuId) {
        return res.status(400).json({ Error: "Missing menuId" });
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 0) {
        return res.status(400).json({
          Error: `Invalid quantity for item ${item.menuId}`,
        });
      }

      const menuItem = db
        .prepare("SELECT id, price FROM menu WHERE id = ?")
        .get(item.menuId);

      if (!menuItem) {
        return res.status(404).json({
          Error: `Product ${item.menuId} does not exist`,
        });
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
    return res.status(500).json({ Error: "Server error." });
  }
}
