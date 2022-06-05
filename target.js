#! /usr/bin/env node

'use strict'

// Require user libraries...
const args = require('args')
const bodyparser = require('body-parser')
const express = require('express')

// Know thyself...
const self = require('./package.json')

// Create local instances...
const app = express()

// Defaults...
let defaultPort = 4000
let defaultReturnCode = 200

// Process command line...
const flags = args
  .option('port', 'The port on which to run', defaultPort)
  .option('code', 'The HTTP code to return', defaultReturnCode)
  .parse(process.argv)

// Register process shutdown hook...
process.on('SIGINT', () => {
  console.log('Process shutdown detected.')
  process.exit(0)
})

// Helper method to output the result of any incoming requests...
const genericReceive = (req, res, next) => {
  console.log(`Received HTTP ${req.method} call to "${req.path}" from ${req.ip}:`)
  console.log(req.body ? req.body.toString() : 'No body was present')
  res.sendStatus(flags.code)
  return true
}

// Configure HTTP Listener...
app.use(bodyparser.raw({ type: '*/*', limit: '100mb' }))
app.use(genericReceive)

// Start HTTP Listener...
app.listen(flags.port, err => {
  if (err) {
    console.error(err, `Could not start the HTTP listener on port ${flags.port}`)
  }
  else {
    console.log(`Successfully started the HTTP listener on port ${flags.port}.  Returning HTTP ${flags.code} to clients.`)
  }
})