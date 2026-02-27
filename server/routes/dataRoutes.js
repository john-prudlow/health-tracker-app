const express = require('express');
const Data = require('../models/Data');
const auth = require('../middleware/authHandler');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const allData = await Data.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(allData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const existing = await Data.findOne({
      userId: req.user.id,
      date: req.body.date
    });

    if (existing) {
      return res.status(409).json(existing);
    }
    const newEntry = await Data.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(newEntry);

  } catch (err) {
    res.status(400).json({ error: 'Failed to create entry' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Data.findOneAndUpdate( 
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: 'Failed to update entry' });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Data.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;