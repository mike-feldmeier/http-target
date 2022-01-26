#! /usr/bin/env node

'use strict'

// Require user libraries...
const bodyparser = require('body-parser')
const envwrapper = require('env-wrapper')
const express = require('express')

// Know thyself...
const self = require('./package.json')

// Create local instances...
const app = express()

// Determine default port...
let defaultPort = 4000
if(process.argv.length > 2) {
  defaultPort = +process.argv[2]
}

// Bring in environment variables with defaults...
envwrapper.load()
const port = envwrapper.require('PORT', defaultPort)

// Register process shutdown hook...
process.on('SIGINT', () => {
  console.log('Process shutdown detected.')
  process.exit(0)
})

// Helper method to output the result of any incoming requests...
const genericReceive = (req, res, next) => {
  console.log(`Received HTTP ${req.method} call to "${req.path}" from ${req.ip}:`)
  console.log(req.body ? req.body.toString() : 'No body was present')
  res.sendStatus(200)
  return true
}

// Configure HTTP Listener...
app.use(bodyparser.raw({ type: '*/*', limit: '100mb' }))
app.use(genericReceive)

// Start HTTP Listener...
app.listen(port, err => {
  if (err) {
    console.error(err, `Could not start the HTTP listener on port ${port}`)
  }
  else {
    console.log(`Successfully started the HTTP listener on port ${port}`)
  }
})