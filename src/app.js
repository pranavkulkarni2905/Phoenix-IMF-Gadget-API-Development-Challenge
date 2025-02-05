require('dotenv').config();

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const gadgetsRoutes = require('./routes/gadgetsRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json()); // To parse incoming JSON bodies

// Routes
app.use('/api', gadgetsRoutes);
app.use('/api', userRoutes); // Add user routes

// Test DB Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models with DB
sequelize.sync();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
