require('dotenv').config();
const mongoose = require('mongoose');
const Data = require('../models/Data');

const data = [
  { "date": "2026-01-01", "steps": 14211, "sleep": 6.8, "weight": 185 },
  { "date": "2026-01-02", "steps": 12844, "sleep": 5.9, "weight": 184.6 },
  { "date": "2026-01-03", "steps": 13772, "sleep": 6.1, "weight": 184.2 },
  { "date": "2026-01-04", "steps": 14933, "sleep": 7.2, "weight": 183.8 },
  { "date": "2026-01-05", "steps": 13155, "sleep": 4.7, "weight": 183.4 },
  { "date": "2026-01-06", "steps": 14488, "sleep": 6.4, "weight": 183 },
  { "date": "2026-01-07", "steps": 12599, "sleep": 5.2, "weight": 182.6 },
  { "date": "2026-01-08", "steps": 13944, "sleep": 6.9, "weight": 182.2 },
  { "date": "2026-01-09", "steps": 14777, "sleep": 7.1, "weight": 181.8 },
  { "date": "2026-01-10", "steps": 13388, "sleep": 4.9, "weight": 181.4 },
  { "date": "2026-01-11", "steps": 14122, "sleep": 6.3, "weight": 181 },
  { "date": "2026-01-12", "steps": 12955, "sleep": 5.5, "weight": 180.6 },
  { "date": "2026-01-13", "steps": 15001, "sleep": 7.4, "weight": 180.2 },
  { "date": "2026-01-14", "steps": 13477, "sleep": 6.0, "weight": 179.8 },
  { "date": "2026-01-15", "steps": 14333, "sleep": 6.7, "weight": 179.4 },
  { "date": "2026-01-16", "steps": 12688, "sleep": 4.8, "weight": 179 },
  { "date": "2026-01-17", "steps": 13855, "sleep": 5.9, "weight": 178.6 },
  { "date": "2026-01-18", "steps": 14711, "sleep": 7.3, "weight": 178.2 },
  { "date": "2026-01-19", "steps": 13244, "sleep": 5.1, "weight": 177.8 },
  { "date": "2026-01-20", "steps": 14099, "sleep": 6.5, "weight": 177.4 },
  { "date": "2026-01-21", "steps": 12833, "sleep": 4.6, "weight": 177 },
  { "date": "2026-01-22", "steps": 13677, "sleep": 6.2, "weight": 176.6 },
  { "date": "2026-01-23", "steps": 14922, "sleep": 7.1, "weight": 176.2 },
  { "date": "2026-01-24", "steps": 13055, "sleep": 5.4, "weight": 175.8 },
  { "date": "2026-01-25", "steps": 14288, "sleep": 6.8, "weight": 175.6 },
  { "date": "2026-01-26", "steps": 12544, "sleep": 4.9, "weight": 175.4 },
  { "date": "2026-01-27", "steps": 13711, "sleep": 6.3, "weight": 175.2 },
  { "date": "2026-01-28", "steps": 14833, "sleep": 7.2, "weight": 175.1 },
  { "date": "2026-01-29", "steps": 13299, "sleep": 5.8, "weight": 175 },
  { "date": "2026-01-30", "steps": 14044, "sleep": 6.6, "weight": 175 }
]

// Seed the database with data
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing data...');
    await Data.deleteMany({});

    console.log('Inserting new data...');
    const inserteddata = await Data.insertMany(data);

    console.log(`Successfully seeded ${inserteddata.length} data!`);
    console.log('\nSample data data:');
    console.log(`Steps: ${inserteddata[0].steps}, Sleep: ${inserteddata[0].sleep}, Weight: ${inserteddata[0].weight}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();