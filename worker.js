'use strict'

require('./lib/extensions')

// Dependencies
var bunyan = require('bunyan')
var commander = require('commander')
var restify = require('restify')

var formatters = require('./lib/formatters')
var middleware = require('./lib/middleware')
var pg = require('./lib/pg')
var route = require('./lib/route')
var version = require('./package.json').version

// Restore Node 8.x SSL cert behaivor
// See: https://github.com/joyent/node/issues/3949
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

exports.run = run

function main() {
  commander
    .version(version)
    .option('-c, --config <file>', 'configuration file')
    .option('-e, --env <environment>', 'production|staging|development|local')
    .parse(process.argv)

  if (! /production|staging|development|local/.test(commander.env)) {
    throw new Error('Environment must be specified.')
  }

  // configuration path can be specified via CLI or environment variables
  var configFilePath = commander.config || process.env.SERVICES_CONFIG || './settings'

  // configuration can be JavaScript or JSON
  run(require(configFilePath), commander.env)
}

/**
 * Starts the Restify server
 * @param  {Object} config - configuration object
 * @param  {string} env    - environment
 * @return {http.Server}   - Node.js HTTP Server
 * @public
 */
function run(config, env) {
  var log = bunyan.createLogger({
    name: 'restify',
    level: config[env].log,
    serializers: bunyan.stdSerializers,
    stream: config[env].log ? process.stdout : new bunyan.RingBuffer(),
    src: env !== 'production'
  })
  var server = restify.createServer({
    log: log, formatters: {'text/csv; q=0.1' : formatters.csv}
  })
  pg.defaults(config[env])

  middleware(server, config, env, log)
  route(server, config, env, log)

  server.listen(config[env].port, config[env].ip)
  server.once('listening', function() {
    log.info('worker listening on %s:%s', config[env].ip, config[env].port)
  })
  // return lower-level NodeJS server, inside the restify server
  return server.server
}

if (require.main === module) {
  main()
}
