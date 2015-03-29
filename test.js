/**
 * Globals.
 * @type {exports}
 * @private
 */
_ = require('lodash');

var AnsiblePlaybookCli = require('./ansible/cli/AnsiblePlaybookCli').AnsiblePlaybookCli;

//console.log('Try running simple Ansible command:')
//AnsiblePlaybookCli.exec([
//    'test.yml'
//]);

console.log('Try running correct Ansible command:')
AnsiblePlaybookCli.exec([
    '-v',
    '-M ../library',
    '-i inventory',
    "-e '@credentials.yml'",
    'test.yml'
]);