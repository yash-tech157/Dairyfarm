const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const animalRoutes = require('./routes/animalRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: MONGO_URI is not defined in your environment variables. Please check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use('/api/animals', animalRoutes);

// Server start
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
