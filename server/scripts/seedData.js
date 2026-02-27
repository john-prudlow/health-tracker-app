require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Data = require('../models/Data');

// ----------------------
// USER 01 DATA (2026)
// ----------------------
const user01Data = [
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
];

// ----------------------
// USER 02 DATA (2026)
// ----------------------
const user02Data = [
  {"date":"2026-02-01","steps":15888,"sleep":7.1,"weight":177},
  {"date":"2026-02-02","steps":12111,"sleep":5.6,"weight":176.7},
  {"date":"2026-02-03","steps":16555,"sleep":8.2,"weight":176.4},
  {"date":"2026-02-04","steps":13999,"sleep":6.3,"weight":176.1},
  {"date":"2026-02-05","steps":11222,"sleep":7.9,"weight":175.8},
  {"date":"2026-02-06","steps":16888,"sleep":5.4,"weight":175.5},
  {"date":"2026-02-07","steps":14777,"sleep":8.7,"weight":175.2},
  {"date":"2026-02-08","steps":13333,"sleep":6.8,"weight":174.9},
  {"date":"2026-02-09","steps":11999,"sleep":5.2,"weight":174.6},
  {"date":"2026-02-10","steps":16666,"sleep":8.4,"weight":174.3},
  {"date":"2026-02-11","steps":14222,"sleep":7.0,"weight":174},
  {"date":"2026-02-12","steps":12888,"sleep":6.1,"weight":173.7},
  {"date":"2026-02-13","steps":11333,"sleep":5.8,"weight":173.4},
  {"date":"2026-02-14","steps":16900,"sleep":8.9,"weight":173.1},
  {"date":"2026-02-15","steps":15111,"sleep":7.3,"weight":172.8},
  {"date":"2026-02-16","steps":13666,"sleep":6.5,"weight":172.5},
  {"date":"2026-02-17","steps":11000,"sleep":5.1,"weight":172.2},
  {"date":"2026-02-18","steps":16777,"sleep":8.6,"weight":171.9},
  {"date":"2026-02-19","steps":14444,"sleep":7.4,"weight":171.6},
  {"date":"2026-02-20","steps":13000,"sleep":6.0,"weight":171.3},
  {"date":"2026-02-21","steps":11555,"sleep":5.7,"weight":171},
  {"date":"2026-02-22","steps":16222,"sleep":8.1,"weight":170.7},
  {"date":"2026-02-23","steps":14999,"sleep":7.2,"weight":170.4},
  {"date":"2026-02-24","steps":13555,"sleep":6.6,"weight":170.1},
  {"date":"2026-02-25","steps":11888,"sleep":5.3,"weight":169.8},
  {"date":"2026-02-26","steps":16800,"sleep":8.8,"weight":169.5},
  {"date":"2026-02-27","steps":15222,"sleep":7.5,"weight":169.2},
  {"date":"2026-02-28","steps":13777,"sleep":6.4,"weight":168.9},
  {"date":"2026-03-01","steps":11111,"sleep":5.9,"weight":168.6},
  {"date":"2026-03-02","steps":16000,"sleep":8.3,"weight":168.3}
];

// ----------------------
// SEED FUNCTION
// ----------------------
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing users & data...');
    await User.deleteMany({});
    await Data.deleteMany({});

    console.log('Creating users...');
    const passwordHash1 = await bcrypt.hash("pass123", 10);
    const passwordHash2 = await bcrypt.hash("pass456", 10);

    const user01 = await User.create({
      username: "user01",
      passwordHash: passwordHash1
    });

    const user02 = await User.create({
      username: "user02",
      passwordHash: passwordHash2
    });

    console.log('Users created:', user01.username, user02.username);

    console.log('Preparing health data...');
    const user01Docs = user01Data.map(d => ({ ...d, userId: user01._id }));
    const user02Docs = user02Data.map(d => ({ ...d, userId: user02._id }));

    console.log('Inserting health data...');
    const inserted = await Data.insertMany([...user01Docs, ...user02Docs]);

    console.log(`Successfully seeded ${inserted.length} documents!`);
    console.log(`Sample: ${inserted[0].date} — ${inserted[0].steps} steps`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();