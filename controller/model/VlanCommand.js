// Import global functions for logging using colors.
require('./logger');
var shell = require('shelljs');
var AnsiblePlaybookCli = require('./AnsiblePlaybookCli').AnsiblePlaybookCli;

/**
 * Execute VLAN command.
 */
module.exports.VlanCommand = function(callback, callbackError){
    // Move to the right folder.
    shell.cd('/home/vagrant/ansible-nxos/test');
    console.info('Current location is now:' + shell.pwd());// Echo the current location.

    // Execute Ansible command from the right directory.
    AnsiblePlaybookCli.exec([
        '-v',
        '-M ../library',
        '-i inventory',
        "-e '@credentials.yml'",
        'test.yml'
    ],
        callback,
        callbackError);
};

