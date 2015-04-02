// This file should be called from a REST client.

'use strict'
var command = require('./model/VlanCommand');

module.exports = function() {
    return vlanGet

    function vlanGet(req, res, next) {
        return Promise.try(function() {
            req.log.trace('controller:vlans:get')

            if(req.body && req.body.id){
                return command.VlanCommand(function(message, command){
                    console.success(message, command);
                    return message;
                }, function(message, command, error){
                    if(typeof error !== 'undefined'){
                        console.error('An unexpected error happened during the following command execution:');
                        console.warn(command);
                        console.error(error);
                    }

                    if(error !== message && typeof message !== 'undefined'){
                        console.warn(message);
                    }

                    return error || message || command;
                });
            }else{
                console.log('No Vlan ID specified.');
            }
        })
            .then(function(value) {
                res.send(value)
            })
            .nodeify(next)
    }
};