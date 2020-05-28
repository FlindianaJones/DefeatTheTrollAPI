const express = require('express')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const feedbackRouter = require('./routes/feedback')
const mongoose = require('mongoose')
require('custom-env').env()

// App constants
const port = process.env.HOST_PORT ? process.env.PORT : 8080
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
const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
server.timeoutSeconds = 10
