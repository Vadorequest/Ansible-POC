// This file should be called from a REST client.

var command = require('./model/VlanCommand');

var restify = require('restify')

module.exports = function() {
    return controller;

    function controller(req, res, next) {
        return Promise.try(function() {
            req.log.trace('controller:vlans:post');

            if (!req.body || !req.body.id)
                return Promise.reject(new restify.InvalidContentError('Request body is required.'))

            var promises = [];
            promises.push(
                command.VlanCommand(
                    // Callback
                    function(message, command){
                        console.success(message, command);
                        return message;
                    },
                    // CallbackError
                    function(message, command, error){
                        if(typeof error !== 'undefined'){
                            console.error('An unexpected error happened during the following command execution:');
                            console.warn(command);
                            console.error(error);
                        }

                        if(error !== message && typeof message !== 'undefined'){
                            console.warn(message);
                        }

                        return error || message || command;
                    })
            );

            return Promise.all(promises)
        })
            .then(send)
            .nodeify(next)

        function send() {
            res.status(200)
            res.send({vlan: 'Vlan has been executed.'})
        }
    }
};