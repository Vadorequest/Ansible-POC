// Import global functions for logging using colors.
require('./logger');

var AnsiblePlaybookCli = require('./AnsiblePlaybookCli').AnsiblePlaybookCli;

AnsiblePlaybookCli.exec([
    '-v',
    '-M ../library',
    '-i inventory',
    "-e '@credentials.yml'",
    '../test.yml'
], function(message, command){
    console.success(message, command);
}, function(message, command, error){
    console.error('An unexpected error happened during the following command execution:');
    console.warn(command);
    console.error(error);
});