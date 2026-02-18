require('dotenv').config();
const mongoose = require('mongoose');
const Health = require('../models/Health');

const health = [
  { "date": "2025-01-01", "steps": 14211, "sleep": 6.8, "weight": 185 },
  { "date": "2025-01-02", "steps": 12844, "sleep": 5.9, "weight": 184.6 },
  { "date": "2025-01-03", "steps": 13772, "sleep": 6.1, "weight": 184.2 },
  { "date": "2025-01-04", "steps": 14933, "sleep": 7.2, "weight": 183.8 },
  { "date": "2025-01-05", "steps": 13155, "sleep": 4.7, "weight": 183.4 },
  { "date": "2025-01-06", "steps": 14488, "sleep": 6.4, "weight": 183 },
  { "date": "2025-01-07", "steps": 12599, "sleep": 5.2, "weight": 182.6 },
  { "date": "2025-01-08", "steps": 13944, "sleep": 6.9, "weight": 182.2 },
  { "date": "2025-01-09", "steps": 14777, "sleep": 7.1, "weight": 181.8 },
  { "date": "2025-01-10", "steps": 13388, "sleep": 4.9, "weight": 181.4 },
  { "date": "2025-01-11", "steps": 14122, "sleep": 6.3, "weight": 181 },
  { "date": "2025-01-12", "steps": 12955, "sleep": 5.5, "weight": 180.6 },
  { "date": "2025-01-13", "steps": 15001, "sleep": 7.4, "weight": 180.2 },
  { "date": "2025-01-14", "steps": 13477, "sleep": 6.0, "weight": 179.8 },
  { "date": "2025-01-15", "steps": 14333, "sleep": 6.7, "weight": 179.4 },
  { "date": "2025-01-16", "steps": 12688, "sleep": 4.8, "weight": 179 },
  { "date": "2025-01-17", "steps": 13855, "sleep": 5.9, "weight": 178.6 },
  { "date": "2025-01-18", "steps": 14711, "sleep": 7.3, "weight": 178.2 },
  { "date": "2025-01-19", "steps": 13244, "sleep": 5.1, "weight": 177.8 },
  { "date": "2025-01-20", "steps": 14099, "sleep": 6.5, "weight": 177.4 },
  { "date": "2025-01-21", "steps": 12833, "sleep": 4.6, "weight": 177 },
  { "date": "2025-01-22", "steps": 13677, "sleep": 6.2, "weight": 176.6 },
  { "date": "2025-01-23", "steps": 14922, "sleep": 7.1, "weight": 176.2 },
  { "date": "2025-01-24", "steps": 13055, "sleep": 5.4, "weight": 175.8 },
  { "date": "2025-01-25", "steps": 14288, "sleep": 6.8, "weight": 175.6 },
  { "date": "2025-01-26", "steps": 12544, "sleep": 4.9, "weight": 175.4 },
  { "date": "2025-01-27", "steps": 13711, "sleep": 6.3, "weight": 175.2 },
  { "date": "2025-01-28", "steps": 14833, "sleep": 7.2, "weight": 175.1 },
  { "date": "2025-01-29", "steps": 13299, "sleep": 5.8, "weight": 175 },
  { "date": "2025-01-30", "steps": 14044, "sleep": 6.6, "weight": 175 }
]

// Seed the database with health
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing health...');
    await Health.deleteMany({});

    console.log('Inserting new health...');
    const insertedHealth = await Health.insertMany(health);

    console.log(`Successfully seeded ${insertedHealth.length} health!`);
    console.log('\nSample health data:');
    console.log(`Steps: ${insertedHealth[0].steps}, Sleep: ${insertedHealth[0].sleep}, Weight: ${insertedHealth[0].weight}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();