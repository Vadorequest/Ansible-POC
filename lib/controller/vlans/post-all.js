'use strict'

var restify = require('restify')
var selfLink

module.exports = function() {
  return handler
}

function handler(req, res, next) {
  return Promise.try(function() {
    req.log.trace('controller:vlans:postAll')
    selfLink = req.path() + '/' + req.body.id
  }).catch(function(err) {
      if (!err || !err.message) throw err
      if (err.message.contains('"name" violates not-null constraint')) {
        throw new restify.InvalidContentError('Name is required.')
      }
      throw err
    }).then( function(){
      res.status(201)
      res.header('Location', selfLink)
      res.send({selfLink: selfLink})
    }).nodeify(next)
}
