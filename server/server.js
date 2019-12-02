require('./tools/db')
const express = require('express')
const bodyparser = require('body-parser')

const battleController = require('./controllers/battleController')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(
  bodyparser.urlencoded({
    extended: true
  })
)
app.use(bodyparser.json())

// LISTENING PORT
app.listen(5000, () => {
  console.log('Listening on port 5000!')
})

app.use('/', battleController)
