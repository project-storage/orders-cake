const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
require('./auth/passport')

const app = express()

const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
const userRouter = require('./routers/userRoutes')
const departmentRouter = require('./routers/DepartmentRoutes')
const YearlevelRouter = require('./routers/YearLevelRoutes')
const TeacherRouter = require('./routers/teacherRoutes')
const StudentRouter = require('./routers/studentsRoutes')

// API Routes
app.use('/api/user', userRouter)
app.use('/api/department', departmentRouter)
app.use('/api/year-level', YearlevelRouter)
app.use('/api/teachcer', TeacherRouter)
app.use('/api/student', StudentRouter)

// Test Routes
app.get('/api', (req, res) => {
  res.send('Hello from backend')
})

app.get('/api/user-test', (req, res) => {
  res.send('Hello User')
})

// Port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
