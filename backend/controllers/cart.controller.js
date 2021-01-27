import asyncHandler from "express-async-handler";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

//! DESCRIPTION : Add product to the cart
//! ROUTE       : PUT /api/cart
//! ACCESS      : Private

export const addProductToCart = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body._id);

  if (product) {
    const cartProduct = await Cart.findOne({
      user: req.user._id,
    });
    const findSameProduct = cartProduct.cartProducts.find(
      (x) => x.product._id.toString() === req.body._id
    );
    if (findSameProduct && cartProduct) {
      findSameProduct.quantity = req.body.quantity;
      await cartProduct.save();
      res.json({ message: "Product added to cart succesfully" });
    } else {
      await Cart.updateOne(
        { user: req.user._id },
        {
          $push: {
            cartProducts: [
              {
                product,
                quantity: req.body.quantity,
              },
            ],
          },
        },
        { upsert: true }
      );

      res.json({
        message: "Product added to cart succesfully",
      });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//! DESCRIPTION : Get full cart
//! ROUTE       : GET /api/cart
//! ACCESS      : Private

export const getAllCartProducts = asyncHandler((req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate("cartProducts.product")
    .exec(function (err, products) {
      if (products !== null) {
        res.json(products.cartProducts);
      } else {
        res.status(404);
        throw new Error(`An error has ocured : ${err}`);
      }
    });
});
