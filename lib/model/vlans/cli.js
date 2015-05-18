'use strict'

var restify = require('restify')
var spawn = require('child_process').spawn
// TODO change settings path, use local file
//var settings = require('../../../settings.json').local.nxos
var path;

module.exports = function() {
  return handler
}

function handler(req, res) {
  return new Promise(function(resolve, reject) {
    var child
    if(req.body){
      if (req.body.id >= 0 && req.body.id < 4096){
        var path = '/local/mnt/ansible_roles/ansible-nxos'
        var out = ''
        var proc
        child = spawn('ansible-playbook',
            ['-v',
              '--inventory-file=' + path + '/development',
              '--extra-vars=nxos_username=' + settings.nxosUsername,
              '--extra-vars=nxos_password=' + settings.nxosPassword,
              '--extra-vars=target=nxos-ar130lab-1',
              '--extra-vars=vlan_name=TEST',
              '--extra-vars=vlan_id=' + req.body.id,
              path + 'vlan.yml']
        )
        proc = child.pid
        res.status(200)
        res.send({'Response':'valid vlan, process started','pid':proc})
      } else {
        res.status(400)
        res.send('error')
      }

      child.stdout.on('data', function(data) {
        out = out + data
      })

      child.stderr.on('data', function(data) {
        out = out + data
      })

      child.on('close', function(code) {
        if (code) {
          // Ansible cli command executed but exited with non-zero status
          reject(new restify.InvalidContentError(out))
        } else {
          //replace with logging system
          //console.log("#FULL OUTPUT#")
          //console.log(out)
          resolve('Ansible Command Successfully Called:)')
        }
      })

      child.on('error', function(e) { // Ansible cli command could not be executed
        reject(new restify.InternalError('Couldn\'t execute cli command: ' + e.message))
      })

    } else {
      reject(new restify.InvalidContentError('no vlanid specified'))
    }
  })
}
