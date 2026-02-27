require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/database');

const app = express();

// Connect to MongoDB database
connectDatabase();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Setup route for HealthData
const Data = require('./models/Data');

app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.find().sort({ date: 1 });
    res.json(allData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const existing = await Data.findOne({ date: req.body.date });

    if (existing) {
      return res.status(409).json(existing);
    }
    const newEntry = await Data.create(req.body);
    res.json(newEntry);

  } catch (err) {
    res.status(400).json({ error: 'Failed to create entry' });
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const updated = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );

    if (!updated) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: 'Failed to update entry' });
  }
});

app.delete("/api/data/:id", async (req, res) => {
  try {
    const deleted = await Data.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});