import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  likedByUser,
} from "../controllers/product.controller.js";

router.route("/").get(getProducts).put(protect, likedByUser);

router.route("/:id").get(getProductById);

export default router;
