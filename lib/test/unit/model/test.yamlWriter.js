var assert = require('assert');
var yamlLib = require('js-yaml');
var yamlWriter = require('./../../../model/vlans/yamlWriter');
var fs = require('fs');

describe('YAML Writer', function() {
    // Object to convert to YAML.
    var object = {
        vlans: [
            {
                id: 100,
                name: 'web_vlan'
            },{
                id: 200,
                name: 'app_vlan'
            }
        ]
    };
    var directory = __dirname + '/.tmp/';// Dir where to store the YAML file.
    var filename = 'yaml_writer';// Filename


    it('should create a file named "' + filename + '".', function(done){
        // Creating the file.
        yamlWriter.write(object, directory, filename, function(yaml, path){
            assert.equal(fs.existsSync(path), true);
            done();
        });
    });

    it('should generate a readable YAML file.', function(done){
        // Creating the file.
        yamlWriter.write(object, directory, filename, function(yaml, path){
            // We load the generated YAML from the yaml string and convert it into a JS object.
            var object = yamlLib.safeLoad(yaml);
            assert.equal(object.vlans[0].id, 100);
            assert.equal(object.vlans[1].id, 200);
            done();
        });
    });

    it('should delete the generated YAML file.', function(done){
        // Creating the file.
        yamlWriter.write(object, directory, filename, function(yaml, path){
            assert.equal(fs.existsSync(path), true);
            fs.unlink(path, function(){
                assert.equal(fs.existsSync(path), false);
                console.log('The generated YAML file at ' + path + ' has been deleted, end of the test.')
                done();
            });
        });
    });

});
