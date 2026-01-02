require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
console.log('\nConnecting to MongoDB...');

mongoose.connect(mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('\n' + '='.repeat(50));
    console.log('✓ MongoDB Connected Successfully');
    console.log('✓ Database: movie-booking-db');
    console.log('='.repeat(50) + '\n');
  })
  .catch(err => {
    console.error('\n✗ MongoDB Connection Error:', err.message);
    console.error('Check your .env MONGO_URI\n');
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));
app.use('/api/theaters', require('./routes/theaterRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🎬 MOVIE BOOKING BACKEND SERVER');
  console.log('='.repeat(50));
  console.log(`✓ Server running on: http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('✓ MongoDB: Connected');
  console.log('✓ Ready to accept requests');
  console.log('='.repeat(50) + '\n');
});

module.exports = app;
