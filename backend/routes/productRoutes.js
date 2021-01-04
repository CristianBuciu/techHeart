import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

//! DESCRIPTION : FETCH ALL ROUTES
//! ROUTE       : GET /API/PRODUCTS
//! ACCESS      : PUBLIC
//

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

//! DESCRIPTION : FETCH A SINGLE PRODUCT
//! ROUTE       : GET /API/PRODUCTS/:ID
//! ACCESS      : PUBLIC

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
