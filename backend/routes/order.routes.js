import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
} from "../controllers/order.controller.js";

router.route("/").post(protect, addOrderItems);

//! Make sure this one is at the bottom /:id
router.route("/:id").get(protect, getOrderById);

export default router;
