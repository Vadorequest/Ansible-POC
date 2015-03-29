var chai = require('chai');
var should = chai.should();

var AnsiblePlaybookCli = require('./../AnsiblePlaybookCli').AnsiblePlaybookCli;

/**
 * TODO Doesn't work since the operation is async and the mocha test is sync, don't know how to deal with that yet...
 */
describe('ansible-playbook', function(){
    describe('default', function(){
        AnsiblePlaybookCli.exec([
            'test.yml'
        ]).should.equal('ERROR: nxos_command is not a legal parameter in an Ansible task or handler');
    });

    describe('complex', function(){
        AnsiblePlaybookCli.exec([
            '-v',
            '-M ../library',
            '-i inventory',
            "-e '@credentials.yml'",
            'test.yml',
        ]).should.equal('ERROR: nxos_command is not a legal parameter in an Ansible task or handler');
    });
});