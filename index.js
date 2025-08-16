const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);


const products = [
    { id: 1, name: "Laptop", description: "A powerful laptop", price: 1200 },
    { id: 2, name: "Phone", description: "A smartphone", price: 700 },
    { id: 3, name: "Tablet", description: "A portable tablet", price: 400 }
];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/products", (req, res) => {
    res.render("products", { products });
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return res.send("Product not found");
    res.render("productDetail", { product });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
