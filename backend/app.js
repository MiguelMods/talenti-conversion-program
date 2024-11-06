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
app.use(bodyParser.json())

// Default Midleware
app.use((req, res, next) => {
  console.log('Este es un simple midleware')
  next()
})

app.get('/api', (req, res) => res.send('Hello World!'))
app.use(testRoutes)
app.use(convertionRoutes)
app.use(coinRoutes)

// Default Controller for not found
app.use((req, res) => {
  res.status(404).send({ message: 'Not found' })
})

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  )
)
