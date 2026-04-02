import { validate as validateUUID } from "uuid";
import db from "../data/db.js";

export default function validateID(table, idColumn = "id") {
  return function (req, res, next) {
    const { id } = req.params;

    if (!validateUUID(id)) {
      return res.status(400).json({ Error: "Invalid ID-format" });
    }

    const query = `SELECT * FROM ${table} WHERE ${idColumn} = ?`;
    const record = db.prepare(query).get(id);

    if (!record) {
      return res.status(404).json({ Error: `${table} could not be found` });
    }

    req.record = record;

    next();
  };
}
