'use strict'

var assert = require('assert')
var restify = require('restify')
var exec = require('child_process').exec
var child
var t = require('../../../lib/integration/local/services.testbed.js')

describe('ITNAPI-128 POST /api/experimental/vlans', function() {
  var entry, invalid, client
  entry = {id:1986}
  invalid = {id:4098}
  client = restify.createJsonClient({
    url: 'http://localhost:8080/:' + t.port(),
    headers: {'Authorization': t.auth()}
  })

  it('should return a 400 if invalid vlanid is sent', function() {
    return client.postAsync('/api/experimental/vlans', invalid).then(function(){
      assert(false, 'request should have failed, invalid properties')
    }, function(err){
      assert.equal(err.statusCode, 400)
    })
  })
  it('should return a 400 if no request body is sent', function() {
    return client.postAsync('/api/experimental/vlans', {}).then(function(){
      assert(false, 'request should have failed, no properties')
    }, function(err){
      assert.equal(err.statusCode, 400)
    })
  })
  it('should return 200 if valid vlanid is sent', function() {
    return client.postAsync('/api/experimental/vlans', entry).spread(function(req, res) {
        assert.equal(res.statusCode, 200)
      })
  })
  it('should return a process id in the request if valid vlanid is sent', function() {
    return client.postAsync('/api/experimental/vlans', entry).spread(function(req, res) {
        assert.equal(typeof((JSON.parse(res.body)).pid), 'number')
      })
  })
  it('should return a process id that corresponds to a running instance of ansible playbook', function() {
    return client.postAsync('/api/experimental/vlans', entry).spread(function(req, res) {
        var responsePid = JSON.parse(res.body).pid
        var cmmd = ''
        var complaintCatcher
        child = exec('ps o comm= -p ' + responsePid,
          function (stderr, stdout, error) {
            complaintCatcher = stderr
            complaintCatcher = error
            cmmd = stdout
            // there is an OS size restriction on the length of
            // a process name, hence 'ansible-playboo' rather than
            // 'ansible-playbook'
            // stdout terminates with a linefeed character
            // hence \n
            assert.equal('ansible-playboo\n', cmmd)
          })
        complaintCatcher += child
      })
  })
})
