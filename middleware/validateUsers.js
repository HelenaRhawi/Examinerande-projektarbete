import { validate } from "uuid";
import db from "../data/db.js";

export default function validateUser(req, res, next) {
  const { name, email, address } = req.body;

  if (!name || !email || !address) {
    return res.status(400).json({ Error: "Fill in all fields!" });
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
      Error: "Name, e-mail and address had to have valid strings",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ Error: "E-mail is not valid!" });
  }

  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ Error: "This e-mail is already being used!" });
  }

  next();
}
