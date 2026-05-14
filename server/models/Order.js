const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
  emoji: { type: String },
  qty:   { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  items:      { type: [orderItemSchema], required: true },
  total:      { type: Number, required: true },
  status:     { type: String, enum: ['pending','confirmed','ready','completed'], default: 'pending' },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);