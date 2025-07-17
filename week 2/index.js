const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

app.use(express.static("public")); // 🔥 Serve static files

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
