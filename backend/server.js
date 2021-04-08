import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cors from "cors";
import morgan from "morgan";
const app = express();
// app.use(cors());
//! This will allow us to have JSON data in the body==========
app.use(express.json());

app.use(morgan("dev"));

//?===========================================================

//! DotENV initialization ====================================
config();
//?===========================================================
//! MongoDB connect ==========================================
connectDB();
//?===========================================================

app.get("/", (req, res) => {
  res.send("API is running");
});

//! Routes ===================================================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

//! PAYPAL Config Route ======================================
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//! 404 error handling =======================================
app.use(notFound);
//?===========================================================

//! Error handling middleware ================================
app.use(errorHandler);
//?===========================================================

//! Server start =============================================
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
//?===========================================================
