import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import errorHandler from '../middleware/errorHandler.js';
import eventRoutes from '../routes/eventRoutes.js';
import registrationRoutes from '../routes/registrationRoutes.js';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'production';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '';

// Build allowed origins list
const allowedOrigins = CORS_ORIGIN
  ? CORS_ORIGIN.split(',').map(url => url.trim().replace(/\/$/, ''))
  : [];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // If no allowed origins configured, allow all (non-credentialed)
    if (allowedOrigins.length === 0) return callback(null, true);
    // Normalize the request origin by stripping trailing slash
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB is connected before every request (safe for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(503).json({ success: false, message: 'Database unavailable. Please try again.' });
  }
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Test route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Event Management API is running! 🚀',
    environment: NODE_ENV
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/events', registrationRoutes);

// 404 route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (MUST be last)
app.use(errorHandler);

// Export for Vercel serverless functions
export default app;