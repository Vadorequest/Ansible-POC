// Import global functions for logging using colors.
require('./logger');
var shell = require('shelljs');
var AnsiblePlaybookCli = require('./AnsiblePlaybookCli').AnsiblePlaybookCli;

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
], function(message, command){
    console.success(message, command);
}, function(message, command, error){
    if(typeof error !== 'undefined'){
        console.error('An unexpected error happened during the following command execution:');
        console.warn(command);
        console.error(error);
    }

    if(error !== message && typeof message !== 'undefined'){
        console.warn(message);
    }
});