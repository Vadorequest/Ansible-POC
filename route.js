'use strict'

//var nodemailer = require('nodemailer')
var controller = require('./controller')
var model = require('./model')

module.exports = function(server, config, env, log) {
  //var auth = model.auth(config, env)
  //server.get('/', controller.api.getRoot)
  //server.head('/', controller.api.getRoot)
  //server.get('/api', controller.api.get)
  //server.head('/api', controller.api.get)
  //server.get('/api/v1', controller.api.getV1)
  //server.head('/api/v1', controller.api.getV1)


  server.post('/api/experimental/vlans'
    , model.vlans.cli()
    , controller.vlans.postAll())
  server.head('/api/experimental/vlans'
    , model.vlans.cli()
    , controller.vlans.postAll())

}

  