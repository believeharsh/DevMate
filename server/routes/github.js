// server/routes/github.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// GitHub OAuth token exchange endpoint
router.post('/token', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }
  
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.error("GitHub credentials not found in environment variables");
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
  console.log("Processing GitHub code:", code);
  console.log("Using client ID:", clientId);
  
  try {
    // Exchange code for token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    
    console.log("GitHub token response:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error('Error exchanging GitHub code:', error);
    return res.status(500).json({ 
      error: 'Failed to exchange GitHub code',
      details: error.message 
    });
  }
});

module.exports = router;
