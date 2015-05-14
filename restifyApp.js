var restify = require('restify');
var yamlWriter = require('./lib/model/vlans/yamlWriter');
var _ = require('lodash');
var post_all = require('./lib/controller/vlans/post-all');

// Create Ansible server API.
var server = restify.createServer({
    name: 'AnsiblePOC2',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Redirect, just to have the right url directly.
server.get('/', function (req, res, next) {
    res.header('Location', '/api/experimental/vlans');
    res.send(302);
});

// Handle VLAN post requests.
server.post('/api/experimental/vlans', post_all);

// Start the server.
server.listen(2222, function () {
    console.log('%s listening at %s', server.name, server.url);
});