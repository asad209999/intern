const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Week 4+ routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/cart', cartRoutes);

// Week 5+ routes
try {
  const orderRoutes = require('./routes/orderRoutes');
  app.use('/orders', orderRoutes);
} catch (e) {}

// Week 6+ routes
try {
  const adminRoutes = require('./routes/adminRoutes');
  app.use('/admin', adminRoutes);
} catch (e) {}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
