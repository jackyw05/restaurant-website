const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  emoji:       { type: String, default: '🍽️' },
  description: { type: String, default: '' },
  category:    { type: String, enum: ['mains','sides','drinks','extras'], required: true },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);