'use strict'

var assert = require('assert')
var restify = require('restify')
var exec = require('child_process').exec

/**
 * This tests require the server to be running on port 2222!
 */
describe('AnsiblePOC POST /api/experimental/vlans', function() {
    var valid = {
        id: 1986,
        name: 'testVlans'
    };
    var invalid = {
        id: '4098'
    };

    // Create a fake http server.
    var client = restify.createJsonClient({
        url: 'http://localhost:2222/'
    });

    it('should return a 400 if invalid vlan id is sent', function(done) {
        return client.post('/api/experimental/vlans', invalid, function(err, req, res, obj){
            assert.equal(res.statusCode, 400);
            done();
        });
    });
    it('should return a 400 if no request body is sent', function(done) {
        return client.post('/api/experimental/vlans', {}, function(err, req, res, obj){
            assert.equal(res.statusCode, 400);
            done();
        });
    });
    it('should return 200 if valid vlan id and the name are sent', function(done) {
        return client.post('/api/experimental/vlans', valid, function(err, req, res, obj){
            console.log(obj)
            assert.equal(res.statusCode, 200);
            done();
        });
    });
    it('should return a process id in the request, if valid vlan id/name are sent', function(done) {
        return client.post('/api/experimental/vlans', valid, function(err, req, res, obj){
            assert.equal(typeof((JSON.parse(res.body)).pid), 'number');
            done();
        });
    })
});
