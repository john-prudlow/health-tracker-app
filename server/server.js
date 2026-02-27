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
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(helmet());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

// Preflight handlers for Express 5 (NO WILDCARDS)
app.options("/api/auth/login", cors());
app.options("/api/auth/signup", cors());
app.options("/api/auth", cors());

app.options("/api/data", cors());
app.options("/api/data/:id", cors());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});