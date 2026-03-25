import "dotenv/config";
import express from "express";
import apiRouter from "./routes/api.js";
import menuRouter from "./routes/menuRoutes.js";
import menu from "./data/menu.json" with { type: "json" };
import db from "./data/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const existingMenu = db.prepare("SELECT COUNT(*) as count FROM menu").get();
if (existingMenu.count === 0) {
  const insert = db.prepare(`INSERT INTO  menu(id, title, desc, price) 
    VALUES(?, ?, ?, ?)`);

  for (const item of menu.menu) {
    insert.run(item.id, item.title, item.desc, item.price);
  }
}
app.use(express.json());
app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.json({ meddelande: "Välkommen till Mr Bean API" });
});

app.listen(PORT, () => {
  console.log(`API:et lyssnar på http://localhost:${PORT}`);
});
