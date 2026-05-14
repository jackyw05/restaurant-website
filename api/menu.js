require('dotenv').config();
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name:        String,
  price:       Number,
  emoji:       String,
  description: String,
  category:    String,
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

module.exports = async (req, res) => {
  await connectDB();

  // GET /api/menu
  if (req.method === 'GET') {
    try {
      const items = await MenuItem.find();
      const grouped = { mains: [], sides: [], drinks: [], extras: [] };
      items.forEach(item => grouped[item.category].push(item));
      res.status(200).json(grouped);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch menu' });
    }
  }

  // POST /api/menu
  else if (req.method === 'POST') {
    try {
      const item = await MenuItem.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};