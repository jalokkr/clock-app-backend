import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usersRoutes from "./src/components/routes/users.js";
import productRoutes from "./src/components/routes/products.js";
import ordersRoutes from "./src/components/routes/orders.js";

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Connection to MongoDB
const mongoUri = process.env.DB_HOST;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World! The API is working.");
});

// Define your routes
app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

// Start the Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
