require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')

const app = express()

const logFormat = {
  remote: ':remote-addr',
  user: ':remote-user',
  method: ':method',
  path: ':url',
  code: ':status',
  size: ':res[content-length]',
  agent: ':user-agent',
  responseTime: ':response-time'
}

if (process.env.NODE_ENV !== 'development') {
  app.use(logger(JSON.stringify(logFormat)))
} else {
  app.use(logger('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

app.use(cors())
app.options('*', cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const ErrorHandler = require('./src/utils/exception.util')

const routesDir = path.join(__dirname, 'src/routes')

fs.readdirSync(routesDir).forEach((file) => {
  const fullPath = path.join(routesDir, file)
  if (fs.statSync(fullPath).isFile()) {
    const route = require(fullPath)
    app.use('/', route)
  }
})

const errorHandler = new ErrorHandler()
app.use((err, req, res, next) => {
  errorHandler.handle(err, req, res, next)
})

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
