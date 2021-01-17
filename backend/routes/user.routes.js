import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserAddresses,
  addAddress,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

//!=============================================================
router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/profile/addresses").get(protect, getUserAddresses);
router.route("/profile/addresses").put(protect, addAddress);

export default router;
