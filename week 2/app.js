
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    const featuredProducts = await Product.find().limit(4);
    res.render('home', { products: featuredProducts });
});

app.get('/products', async (req, res) => {
    const { search } = req.query;
    let products;
    if (search) {
        const regex = new RegExp(search, 'i');
        products = await Product.find({ $or: [{ name: regex }, { category: regex }] });
    } else {
        products = await Product.find();
    }
    res.render('products', { products });
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('productDetail', { product });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
