require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',                    // local dev
    'https://your-app.vercel.app',              // Vercel URL
  ]
}));
app.use(express.json());

// Routes
app.use('/api/menu',   require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/', (req, res) => res.json({ message: 'Foodies API running' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));