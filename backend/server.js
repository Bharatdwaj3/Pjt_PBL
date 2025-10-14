// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const pgRoutes = require('./routes/pgRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON bodies

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/pgs', pgRoutes);

// Environment variables
const PORT = 5001; // Force port 5001
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pgfinder';
console.log('Using PORT:', PORT);
console.log('Using MONGO_URI:', MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
