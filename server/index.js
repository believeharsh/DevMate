const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Match your React app's URL
}));
app.use(express.json());

// Import routes
const githubRoutes = require('./routes/github');

// Use routes
app.use('/api/github', githubRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
