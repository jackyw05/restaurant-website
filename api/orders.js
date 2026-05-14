const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:  String,
  price: Number,
  emoji: String,
  qty:   Number,
});

const orderSchema = new mongoose.Schema({
  items:     [orderItemSchema],
  total:     Number,
  status:    { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

module.exports = async (req, res) => {
  await connectDB();

  // POST /api/orders
  if (req.method === 'POST') {
    try {
      const { items, total } = req.body;
      if (!items || items.length === 0)
        return res.status(400).json({ error: 'Cart is empty' });

      const order = await Order.create({ items, total });
      res.status(201).json({ message: 'Order placed!', order });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // GET /api/orders
  else if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};