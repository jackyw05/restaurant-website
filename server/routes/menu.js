const express  = require('express');
const router   = express.Router();
const MenuItem = require('../models/MenuItem');

// GET /api/menu — all items grouped by category
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    const grouped = { mains: [], sides: [], drinks: [], extras: [] };
    items.forEach(item => grouped[item.category].push(item));
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// GET /api/menu/:category — items in one category
router.get('/:category', async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// POST /api/menu — add a menu item (admin use)
router.post('/', async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/menu/:id — update a menu item
router.put('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/menu/:id — remove a menu item
router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;