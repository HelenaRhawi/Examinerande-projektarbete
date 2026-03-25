import { Router } from "express";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
import menuRoutes from "./menuRoutes.js";
import orderItemRoutes from "./orderItemRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/menu", menuRoutes);
router.use("/orderItem", orderItemRoutes);

export default router;
