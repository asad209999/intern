
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'));

const products = [
    {
        name: 'Laptop',
        price: 1200,
        category: 'Electronics',
        image: '/images/laptop.jpg',
        description: 'High-performance laptop',
        stock: 10
    },
    {
        name: 'Smartphone',
        price: 800,
        category: 'Electronics',
        image: '/images/phone.jpg',
        description: 'Latest smartphone with great features',
        stock: 20
    }
];

Product.insertMany(products).then(() => {
    console.log('Data seeded');
    mongoose.connection.close();
});
