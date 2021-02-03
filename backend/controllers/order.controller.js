import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

//! DESCRIPTION : Create New Order
//! ROUTE       : POST /api/orders
//! ACCESS      : PRIVATE
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    shippingMethod,
    totalPrice,
    itemsPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      shippingMethod,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//! DESCRIPTION : GET Order By ID
//! ROUTE       : GET /api/orders/:id
//! ACCESS      : PRIVATE
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
