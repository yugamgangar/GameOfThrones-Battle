const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/gotBattleDb'

// CONNECT TO DATABASE
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  err => {
    !err
      ? console.log('Database connected!')
      : console.log('Database connection failed!')
  }
)

require('../Models/battleRecordSchema')
