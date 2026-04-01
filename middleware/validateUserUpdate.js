import db from "../data/db.js";

export default function validateUserUpdate(req, res, next) {
  const { name, email, address } = req.body;
  const { id } = req.params;
  if (!name || !email || !address) {
    return res.status(400).json({
      Error: "Name, e-mail and address is manditory!",
    });
  }

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof address !== "string" ||
    address.trim() === ""
  ) {
    return res.status(400).json({
      Error: "Name, e-mail and address has to be valid strings!",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      Error: "E-mail format is not valid!",
    });
  }

  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ? AND id != ?")
    .get(email, id);

  if (existingUser) {
    return res.status(400).json({
      Error: "This e-mail is already being used!",
    });
  }

  next();
}
