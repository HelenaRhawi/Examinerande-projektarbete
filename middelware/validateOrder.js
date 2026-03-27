import db from "../data/db.js";

export default function validateOrder(req, res, next) {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ fel: "Varukorgen är tom!" });
  }

  try {
    const menu = db.prepare("SELECT * FROM menu").all();

    const validateItems = items.map((item) => {
      const menuItem = menu.find((m) => m.id === item.id);
      if (!items) {
        res.status(400).json({ fel: `${item.title}Saknas i menyn` });
      }

      return {
        menu_id: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price,
      };
    });
    req.validateItems = validateItems;
    next();
  } catch (error) {
    return res.status(500).json({ fel: "Serverfel vid validering", error });
  }
}
