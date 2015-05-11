var restify = require('restify');
var yamlWriter = require('./lib/model/yamlWriter');
var _ = require('lodash');

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
server.post('/api/experimental/vlans', function(req, res){
    if(_.isUndefined(req.params.id)){
        return returnHTTPError400(res, 'VLAN ID is required');
    }
    //if(!_.isNumber(req.params.id)){
    //    return returnHTTPError400(res, 'VLAN ID must be a number');
    //}
    if(_.isUndefined(req.params.name)){
        return returnHTTPError400(res, 'VLAN name is required');
    }

    yamlWriter.write(
        {
            vlans: [
                {
                    id: req.params.id,
                    name: req.params.name
                }
            ]
        },
        './yaml/',
        'myYaml', function(yaml, path){
            req.log.debug('HTTP POST request has been received.', 'A YAML configuration file has been generated:');
            req.log.debug(yaml);

            // Return the process ID. TODO Faked it for the moment, need to get it from Ansible.
            res.send(200, {pid: 5});
        }
    );
});

// Start the server.
server.listen(2222, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var returnHTTPError400 = function(res, message){
    return res.send(400, JSON.stringify({message: message}));
};