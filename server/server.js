require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('./config/database');

const app = express();

// Connect to MongoDB
connectDatabase();

// --- CORS MIDDLEWARE (must run before routes) ---
app.use(cors({
  origin: "https://health-tracker-app-frontend.onrender.com",
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// --- EXPLICIT OPTIONS HANDLERS (REQUIRED FOR RENDER/CLOUDFLARE) ---
const sendPreflight = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://health-tracker-app-frontend.onrender.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
};

// Cloudflare will forward these because they are literal prefixes
app.options("/api/auth/*", sendPreflight);
app.options("/api/data/*", sendPreflight);

// --- HELMET (after CORS) ---
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// JSON parsing
app.use(express.json());

// Request logging
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

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});