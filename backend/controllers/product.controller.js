import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

//! DESCRIPTION : FETCH ALL PRODUCTS
//! ROUTE       : GET /API/PRODUCTS
//! ACCESS      : PUBLIC
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = JSON.parse(req.query.search);
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//! DESCRIPTION : FETCH A SINGLE PRODUCT
//! ROUTE       : GET /API/PRODUCTS/:ID
//! ACCESS      : PUBLIC

export const getProductById = asyncHandler(async (req, res) => {
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

export const likedByUser = asyncHandler(async (req, res) => {
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

//! DESCRIPTION : Create new review
//! ROUTE       : POST /API/PRODUCTS/:id/reviews
//! ACCESS      : Private

export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const { rating, comment, title } = req.body;

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    const hasBoughtTheProduct = await Order.findOne({
      user: req.user._id,
      "orderItems.product._id": req.params.id,
    });

    if (alreadyReviewd) {
      res.status(400);
      throw new Error("Product already reviewd");
    }
    if (hasBoughtTheProduct) {
      const review = {
        name: req.user.name,
        title: title,
        rating: Number(rating),
        comment: comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numReviews;
      await product.save();

      res.status(201).json({ message: "Review added" });
    } else {
      res
        .status(401)
        .json({ message: "You need to buy the product in order to review it" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//! DESCRIPTION : FETCH ALL CATEGFORIES
//! ROUTE       : GET /API/PRODUCTS/category
//! ACCESS      : PUBLIC
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: "$subcategory",
        image: { $last: "$image" },
        category: { $first: "$category" },
      },
    },
    { $sort: { _id: 1 } },
    { $project: { category: 1, subcategory: 1, image: 1 } },
  ]);

  if (categories) {
    res.json(categories);
  } else {
    res.status(404);
    throw new Error("There are no products");
  }
});
