'use strict'

var restify = require('restify')
var _ = require('lodash');
var yamlWriter = require('../../model/vlans/yamlWriter');
var config = require('../../../config');
var mkdirp = require('mkdirp');
var fs = require('fs');

module.exports = function handler(req, res){
    return new Promise(function(resolve, reject) {
        var id = parseInt(req.params.id);
        var name = req.params.name;
        var filename = req.params.filename || config.default_ansible_filename;// TODO check the filename maybe? Avoid special chars and so on?
        var path = config[config.env]['ansible_path'];// Path, depending on the environment.
        var host_name = req.params.host_name;
        
        if(_.isUndefined(id)){
            return sendHTTPError400(res, 'VLAN ID is required. (id)', reject);
        }
        if(_.isUndefined(name)){
            return sendHTTPError400(res, 'VLAN name is required. (name)', reject);
        }
        if(!_.isFinite(id) || id < 0 || id > 4096){
            return sendHTTPError400(res, 'VLAN ID must be between 0 and 4096. (id)', reject);
        }
        if(_.isUndefined(host_name)){
            return sendHTTPError400(res, 'Host name is required. (host_name)', reject);
        }
        // data about SVI must be stored inside the host_vars/ folder. fields: (ip, description, id, vlan)

        // Ensure the folders exist before to write anything inside. TODO Execute that code somewhere else, at the app root probably, shouldn't be done in each http request!
        mkdirp(path + config.group_vars_dirname, function(err){
            if(err){
                console.log(err);
                reject(err);
            }

            // We overwrite the YAML file or create a new one if it already exists.
            // TODO take into account the fact that we can have to merge YAML config between HTTP requests.
            yamlWriter(
                // Data to write.
                {
                    vlans: [
                        {
                            id: id,
                            name: name
                        }
                    ]
                },
                path + config.group_vars_dirname + '/',
                filename,
                function(yaml, path){
                    // Return the process ID. TODO Faked it for the moment, need to get it from Ansible.
                    res.send(200, {pid: 5, path: path, env: config.env});
                    resolve();
                },
                reject
            );

            // Ensure the folders exist before to write anything inside. TODO Execute that code somewhere else, at the app root probably, shouldn't be done in each http request!
            mkdirp(path + config.host_vars_dirname, function(err){
                if(err){
                    console.log(err);
                    reject(err);
                }

                // We create the SVI config file insite host_vars. TODO Write actual data in it.
                fs.writeFile(path + config.host_vars_dirname + '/' + host_name + '.yml', '', function(err){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve();
                    }
                });
            })
        });
    });
};

var sendHTTPError400 = function(res, message, reject){
    res.send(400, JSON.stringify({message: message}));
    reject(message);
};