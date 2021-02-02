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

//! DESCRIPTION : Add user that liked the product to the product database
//! ROUTE       : PUT /API/PRODUCTS/
//! ACCESS      : Private

const likedByUser = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body._id);

  if (product) {
    const findUser = product.likedBy.find((x) => x.equals(req.user._id));
    if (findUser) {
      null;
    } else {
      product.likedBy.push(req.user._id);
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, likedByUser };
