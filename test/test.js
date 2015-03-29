var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var sinonChai = require("sinon-chai");
var chaiAsPromised = require('chai-as-promised');
chai.use(sinonChai);
chai.use(chaiAsPromised);

var AnsiblePlaybookCli = require('./../models/AnsiblePlaybookCli').AnsiblePlaybookCli;

/**
 * TODO Doesn't work since the operation is async and the mocha test is sync, don't know how to deal with that yet...
 */
describe('ansible-playbook', function(){
    /*describe('default', function(){
        it('should fail because of missing credentials', function(done){
            AnsiblePlaybookCli.exec([
                'test.yml'
            ]);

            done();
        });
    });*/

    var execSpy;

    before(function () {
        execSpy = sinon.spy(require('shelljs'), 'exec');
    });

    beforeEach(function() {
        execSpy.reset();
    });

    it('should execute the test playbook', function (done) {
        expect(AnsiblePlaybookCli.exec(['test.yml'], function(message, command){
            command.should.be.equal('ansible-playbook test.yml');
            done();
        }, function(message, command, error){
            command.should.be.equal('ansible-playbook test.yml');
            done();
        }));

    });

    //describe('complex', function(){
    //    AnsiblePlaybookCli.exec([
    //        '-v',
    //        '-M ../library',
    //        '-i inventory',
    //        "-e '@credentials.yml'",
    //        'test.yml',
    //    ]).should.equal('ERROR: nxos_command is not a legal parameter in an Ansible task or handler');
    //});
});