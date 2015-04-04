//var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
//var sinon = require('sinon');
var shell = require('shelljs');
var assert = require('assert');
var fs = require('fs');

var sinonChai = require("sinon-chai");
var chaiAsPromised = require('chai-as-promised');
chai.use(sinonChai);
chai.use(chaiAsPromised);

var AnsiblePlaybookCli = require('./../../../controller/model/AnsiblePlaybookCli').AnsiblePlaybookCli;
var rootFolder = '/home/vagrant/ansible-nxos/test';

/**
 * TODO Doesn't work since the operation is async and the mocha test is sync, don't know how to deal with that yet...
 */
describe('ansible-playbook', function(){
    describe('shelljs', function(){
        it('should be in the home folder', function(){
            shell.cd('/home');

            assert.equal(shell.pwd(), '/home')
        });

        it('should be in the ansible working folder', function(){
            if(fs.existsSync(rootFolder)){
                shell.cd(rootFolder);

                assert.equal(shell.pwd(), rootFolder);
            }else{
                shell.cd(rootFolder);

                // If the folder doesn't exist, then we should be in the /home directory.
                assert.equal(shell.pwd(), '/home');
            }
        });
    });

    describe('ansible', function(){
        it('should generate a simple CLI command', function(){
            var command = AnsiblePlaybookCli.exec([
                'test.yml'
            ]);

            assert.equal(command, 'ansible-playbook test.yml')
        });

        it('should generate a complex CLI command', function(){
            var command = AnsiblePlaybookCli.exec([
                '-v',
                '-M ../library',
                '-i inventory',
                "-e '@credentials.yml'",
                'test.yml'
            ]);

            assert.equal(command, "ansible-playbook -v -M ../library -i inventory -e '@credentials.yml' test.yml")
        });
    });
});