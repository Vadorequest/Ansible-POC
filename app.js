/**
 * File to run using "node app.js".
 *
 */
var yamlWriter = require('./lib/model/yamlWriter');
yamlWriter.write(
    {
        vlans: [
            {
                id: 100,
                name: 'web_vlan'
            },{
                id: 200,
                name: 'app_vlan'
            }
        ]
    },
    './yaml/',
    'myYaml', function(yaml, path){

    }
);
