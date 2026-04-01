import { Router } from "express";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
import menuRoutes from "./menuRoutes.js";

const router = Router();

router.use("/menu", menuRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);

export default router;
