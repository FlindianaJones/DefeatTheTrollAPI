const express = require('express')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const feedbackRouter = require('./routes/feedback')
const mongoose = require('mongoose')
require('custom-env').env()

// App constants
const app = express()
const mongoDB = process.env.MONGODB_URI

// Server config
app.use(express.json())
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).catch(reason => {
  console.error(reason)
})
const db = mongoose.connection

// Routing/binding
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/feedback', feedbackRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Finally, HEY! LISTEN!
const server = app.listen(process.env.PORT || 8941)
server.timeoutSeconds = 10
