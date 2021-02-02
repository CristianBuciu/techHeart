import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserAddresses,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddressById,
  addItemToFavorites,
  getAllFavorites,
  deleteFavoriteProductById,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

//!=============================================================
router.route("/").post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/profile/addresses")
  .get(protect, getUserAddresses)
  .post(protect, addAddress);

router
  .route("/profile/addresses/:id")
  .get(protect, getAddressById)
  .put(protect, updateAddress)
  .delete(protect, deleteAddressById);

router
  .route("/profile/favorites")
  .post(protect, addItemToFavorites)
  .get(protect, getAllFavorites);

router
  .route("/profile/favorites/:id")
  .delete(protect, deleteFavoriteProductById);

export default router;
