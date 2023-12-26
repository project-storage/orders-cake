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
const UserRouter = require('./routers/userRoutes')
const DepartmentRouter = require('./routers/DepartmentRoutes')
const YearlevelRouter = require('./routers/YearLevelRoutes')
const TeacherRouter = require('./routers/teacherRoutes')
const StudentRouter = require('./routers/studentsRoutes')
const TeamRouter = require('./routers/TeamRoutes')

// API Routes
app.use('/api/user', UserRouter)
app.use('/api/department', DepartmentRouter)
app.use('/api/year-level', YearlevelRouter)
app.use('/api/teachcer', TeacherRouter)
app.use('/api/student', StudentRouter)
app.use('/api/team', TeamRouter)

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
