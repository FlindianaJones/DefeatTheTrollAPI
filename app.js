const express = require('express')
const usersRouter = require('./routes/users')
const mongoose = require('mongoose')

//App constants
const port = 8941
const app = express()
const mongoDB = 'mongodb://127.0.0.1/troll_db'

//Server config
app.use(express.json())
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).catch(reason => {
  console.error(reason)
})
const db = mongoose.connection

//Routing/binding
app.use('/users', usersRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Finally, HEY! LISTEN!
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))