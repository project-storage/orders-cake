const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passport = require('passport');
const logger = require('./helpers/logger');
const { autoCreateAllUsers } = require('./helpers/autoCreateUsers');
require('dotenv').config({ path: './config.env' });
require('./configs/passport');

const app = express();

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session()); // Only needed if using persistent login sessions

// Security middleware
app.use(helmet()); // Sets security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined'));

// Log startup
logger.info('Server starting up...', {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080
});

// Static files
app.use('/Images/users', express.static('./Images/users'));

// Router imports
const authRouter = require('./routers/auth.router');
const userRouter = require("./routers/user.router");
const statusRouter = require("./routers/status.router");
const studentRouter = require("./routers/student.router");
const teamRouter = require("./routers/team.router");
const cakeRouter = require("./routers/cake.router");
const degreeRouter = require("./routers/degree.router");
const departmentRouter = require("./routers/department.router");
const groupRouter = require("./routers/group.router");
const orderRouter = require("./routers/order.router");

// API routes with versioning
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/students', studentRouter);
app.use('/api/teams', teamRouter);
app.use('/api/degrees', degreeRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/groups', groupRouter);
app.use('/api/cakes', cakeRouter);
app.use('/api/orders', orderRouter);
app.use('/api/status', statusRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Hello from the backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    status_code: 404,
    msg: 'Route not found'
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  // Log the error
  logger.error('Unhandled application error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    logger.warn('Validation error:', { message: err.message, url: req.url });
    return res.status(400).json({
      status_code: 400,
      msg: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    logger.warn('Unauthorized access attempt:', { url: req.url, ip: req.ip });
    return res.status(401).json({
      status_code: 401,
      msg: 'Unauthorized - Invalid token'
    });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    logger.warn('Database validation error:', { message: err.message, url: req.url });
    return res.status(400).json({
      status_code: 400,
      msg: 'Database Validation Error',
      details: err.message
    });
  }

  // Default error response
  res.status(500).json({
    status_code: 500,
    msg: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  logger.info(`Server is running on port ${PORT}`, {
    port: PORT,
    env: process.env.NODE_ENV || 'development'
  });

  // Auto-create default users if they don't exist
  try {
    await autoCreateAllUsers();
  } catch (error) {
    logger.error('Error during auto-creation of default users:', error);
  }
});

module.exports = app;