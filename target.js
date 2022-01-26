'use strict'

// Require user libraries...
const bodyparser = require('body-parser')
const bunyan = require('bunyan')
const envwrapper = require('env-wrapper')
const express = require('express')

// Know thyself...
const self = require('./package.json')

// Create local instances...
const app = express()
const logger = bunyan.createLogger({ name: self.name })

// Bring in environment variables with defaults...
envwrapper.load()
const port = envwrapper.require('PORT', 4000)

// Register process shutdown hook...
process.on('SIGINT', () => {
  logger.info('Process shutdown detected.')
  process.exitCode = 0
})

// Helper method to inject the logger into requests...
const injectLogger = (req, res, next) => {
  req.logger = logger
  next()
}

// Helper method to output the result of any incoming requests...
const genericReceive = (req, res, next) => {
  console.log(`Received HTTP ${req.method} call to "${req.path}" from ${req.ip}:`)
  console.log(req.body ? req.body.toString() : 'No body was present')
  res.sendStatus(200)
  return true
}

// Configure HTTP Listener...
app.use(bodyparser.raw({ type: '*/*' }))
app.use(injectLogger)
app.use(genericReceive)

// Start HTTP Listener...
app.listen(port, err => {
  if (err) {
    logger.error(err, `Could not start the HTTP listener on port ${port}`)
  }
  else {
    logger.info(`Successfully started the HTTP listener on port ${port}`)
  }
})