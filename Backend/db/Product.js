const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Changed type to Number
  category: { type: String, required: true },
  company: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('products', productSchema);