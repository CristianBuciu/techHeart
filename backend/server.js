import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
const app = express();

//! DotENV initialization ====================================
config();
//?===========================================================
//! MongoDB connect ==========================================
connectDB();
//?===========================================================

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

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
