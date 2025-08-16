const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      const newCart = new Cart({ user: req.user.id, products: [{ product: req.body.productId, quantity: req.body.quantity || 1 }] });
      await newCart.save();
      return res.status(201).json(newCart);
    }
    cart.products.push({ product: req.body.productId, quantity: req.body.quantity || 1 });
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};