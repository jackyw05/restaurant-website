require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const items = [
  { name: 'Burger',          price: 10, emoji: '🍔', category: 'mains',  description: 'Grass-fed patties topped with lettuce, tomato, cheese, onions, bacon' },
  { name: 'Tacos',           price: 10, emoji: '🌮', category: 'mains',  description: 'Corn-based tortilla filled with seasoned meat, cheese, guacamole, white onions, tomato' },
  { name: 'Burritos',        price: 12, emoji: '🌯', category: 'mains',  description: 'Wrapped with seasoned meat, cheese, rice, beans, salsa' },
  { name: 'Pizza',           price: 10, emoji: '🍕', category: 'mains',  description: 'Plain cheese pizza, or topped with pepperoni' },
  { name: 'Classic Fries',   price: 8,  emoji: '🍟', category: 'sides' },
  { name: 'Chicken Nuggets', price: 8,  emoji: '🍗', category: 'sides' },
  { name: 'Water',           price: 3,  emoji: '💧', category: 'drinks' },
  { name: 'Soda',            price: 3,  emoji: '🥤', category: 'drinks' },
  { name: 'Lemonade',        price: 3,  emoji: '🍋', category: 'drinks' },
  { name: 'Iced Tea',        price: 3,  emoji: '🧋', category: 'drinks' },
  { name: 'Extra Fries',     price: 5,  emoji: '🍟', category: 'extras' },
  { name: 'Extra Sauce',     price: 3,  emoji: '🥫', category: 'extras' },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await MenuItem.deleteMany();       // clear old data
  await MenuItem.insertMany(items);
  console.log('Database seeded!');
  process.exit();
});