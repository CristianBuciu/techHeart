import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getProducts,
  getProductById,
  likedByUser,
  createProductReview,
  getCategories,
} from "../controllers/product.controller.js";

router.route("/").get(getProducts).put(protect, likedByUser);

router.route("/:id/reviews").post(protect, createProductReview);

router.route("/category").get(getCategories);
//! Make sure this one is at the bottom /:id

router.route("/:id").get(getProductById);

export default router;
