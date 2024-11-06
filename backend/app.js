const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const testRoutes = require('./routes/testRoutes')
const convertionRoutes = require('./routes/convertionRoutes')
const coinRoutes = require('./routes/coinRoutes')

app.disable('x-powered-by')
app.disable('etag')
app.disable('connection')

// BodyParse
app.use(express.json())

// Default Midleware
app.use((req, res, next) => {
  console.log('Este es un simple midleware')
  next()
})

app.use(testRoutes)
app.use(convertionRoutes)
app.use(coinRoutes)

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  )
)
