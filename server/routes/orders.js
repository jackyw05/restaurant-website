const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// POST /api/orders — place a new order
router.post('/', async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ error: 'Cart is empty' });

    const order = await Order.create({ items, total });
    res.status(201).json({ message: 'Order placed!', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders — get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id — get one order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;