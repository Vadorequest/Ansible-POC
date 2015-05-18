'use strict'

var restify = require('restify')
var _ = require('lodash');
var yamlWriter = require('../../model/vlans/yamlWriter');
var config = require('../../../config');

module.exports = function handler(req, res){
    return new Promise(function(resolve, reject) {
        var id = parseInt(req.params.id);
        var name = req.params.name;
        var filename = req.params.filename || config.default_ansible_filename;// TODO check the filename maybe? Avoid special chars and so on?
        var path = config[config.env]['ansible_path'];// Path, depending on the environment.
        
        if(_.isUndefined(id)){
            return sendHTTPError400(res, 'VLAN ID is required', reject);
        }
        if(_.isUndefined(name)){
            return sendHTTPError400(res, 'VLAN name is required', reject);
        }
        if(!_.isFinite(id) || id < 0 || id > 4096){
            return sendHTTPError400(res, 'VLAN ID must be between 0 and 4096', reject);
        }

        // We overwrite the YAML file or create a new one if it already exists.
        // TODO take into account the fact that we can have to merge YAML config between HTTP requests.
        yamlWriter.write(
            // Data to write.
            {
                vlans: [
                    {
                        id: id,
                        name: name
                    }
                ]
            },
            path,
            filename,
            function(yaml, path){
                // Return the process ID. TODO Faked it for the moment, need to get it from Ansible.
                res.send(200, {pid: 5, path: path, env: config.env});
                resolve();
            },
            reject
        );
    });
};

var sendHTTPError400 = function(res, message, reject){
    res.send(400, JSON.stringify({message: message}));
    reject(message);
};