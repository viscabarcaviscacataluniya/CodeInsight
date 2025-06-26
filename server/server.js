
// server/server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JUDGE0_URL =
  'URL';
const API_KEY = process.env.JUDGE0_API_KEY;
const API_HOST = process.env.JUDGE0_API_HOST;

if (!API_KEY) {
  console.error('❌ ERROR: Missing JUDGE0_API_KEY in .env file.');
  process.exit(1);
}

app.post('/run', async (req, res) => {
  try {
    const response = await axios.post(JUDGE0_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error from Judge0 API:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
