require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/database');

const app = express();

// Connect to MongoDB database
connectDatabase();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://health-tracker-app-frontend.onrender.com"
  ],
  credentials: true
}));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());

app.options("*", cors({
  origin: [
    "http://localhost:5173",
    "https://health-tracker-app-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT ?? 3001;
console.log("PORT IS: ", PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});