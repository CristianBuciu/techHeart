import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

//! DESCRIPTION : FETCH ALL ROUTES
//! ROUTE       : GET /API/PRODUCTS
//! ACCESS      : PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//! DESCRIPTION : FETCH A SINGLE PRODUCT
//! ROUTE       : GET /API/PRODUCTS/:ID
//! ACCESS      : PUBLIC

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
