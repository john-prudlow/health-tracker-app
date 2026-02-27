require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/database');

const app = express();

connectDatabase();

const allowedOrigins = [
  "http://localhost:5173",
  "https://health-tracker-app-frontend.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});