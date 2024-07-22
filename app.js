import app from "./index.js";
import usersRoutes from "./src/components/routes/users.js";
import productRoutes from "./src/components/routes/products.js";
import ordersRoutes from "./src/components/routes/orders.js";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
