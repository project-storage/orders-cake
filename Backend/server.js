const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
require('./auth/passport')

const app = express()

var corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

// middleware
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
const userRouter = require('./routers/userRoutes')

// api
app.use('/api/user', userRouter)

// test api
app.get('/api', (req, res) => {
  res.send('Hello from backend')
})

app.get('/api/user-test', (req, res) => {
  res.send('Hello User')
})

// port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
