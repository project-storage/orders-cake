const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });
require('./auth/passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Use Morgan for logging

// Routers
const userRouter = require('./routers/userRoutes');
const teamRouter = require('./routers/teamRoutes')
const departmentRouter = require('./routers/departmentRoutes');
const groupRouter = require('./routers/groupRoutes')
const degreeRouter = require('./routers/degreeRoutes')
const teacherRouter = require('./routers/teacherRoutes');
const studentRouter = require('./routers/studentsRoutes');
const cakeRouter = require('./routers/CakeRoutes');
// const orderMasterRouter = require('./routers/orderDetailsRouters')
const orderRouter = require('./routers/ordersRoutes')
const statusRouter = require('./routers/statusesRoutes')

// API Routes with Prefixes and Versioning
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter)
app.use('/api/groups', groupRouter)
app.use('/api/departments', departmentRouter);
app.use('/api/degrees', degreeRouter)
app.use('/api/teachers', teacherRouter);
app.use('/api/students', studentRouter);
app.use('/api/cakes', cakeRouter);
// app.use('/api/order-masters', orderMasterRouter)
app.use('/api/orders', orderRouter)
app.use('/api/status', statusRouter)

// Test Routes
app.get('/api', (req, res) => {
  res.send('Hello from the backend');
});

app.get('/api/user-test', (req, res) => {
  res.send('Hello User');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
