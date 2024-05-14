const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require('dotenv').config({ path: './config.env' });
require('./configs/passport');

const app = express()

// midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

// router
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

//static Images Folder
app.use('/Images/users', express.static('./Images/users'))

// api router with prefixes and versioning
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/students', studentRouter)
app.use('/api/teams', teamRouter)
app.use('/api/degrees', degreeRouter)
app.use('/api/departments', departmentRouter)
app.use('/api/group', groupRouter)
app.use('/api/cakes', cakeRouter)
app.use('/api/orders', orderRouter)
app.use('/api/status', statusRouter)

// Test Routes
app.get('/api', (req, res) => {
    res.send('Hello from the backend');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//   port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})