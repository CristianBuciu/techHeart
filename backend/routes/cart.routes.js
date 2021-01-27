import express from "express";
import {
  addProductToCart,
  getAllCartProducts,
} from "../controllers/cart.controller.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .put(protect, addProductToCart)
  .get(protect, getAllCartProducts);

export default router;
