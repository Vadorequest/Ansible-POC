var yamlLib = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');

/**
 * YAML formatter.
 * Based on the js-yaml lib.
 */
var yamlWriter = {
    /**
     * Default options.
     *
     * @see Configuration documentation at https://github.com/nodeca/js-yaml
     */
    defaultOptions: {
        indent: 2,
        skipInvalid: false
    },

    /**
     * Creates a YAML file to the specified path from a JS object.
     *
     * @param object    JS object.
     * @param path      Path. ['./']
     * @param filename  Filename, without the extension. ['yaml.yml']
     * @param callback  Callback to execute when success.
     * @param options   js-yaml options.
     *
     * @see Library documentation at https://github.com/nodeca/js-yaml
     */
    write: function(object, path, filename, callback, options){
        // Manage default values.
        path = _.isString(path) ? path: './';
        filename = _.isString(filename) ? filename + '.yml': 'yaml.yml';
        var filePath = path + filename;

        var yaml = yamlLib.safeDump(object, _.merge(yamlWriter.defaultOptions, options));

        fs.writeFile(filePath, yaml, function(err){
            if(err){
                console.error('An unexpected error happened while writting the YAML file in the disk at "' + filePath + '".');
                console.error(err);
                console.error('Dump of the YAML content:')
                console.error(yaml);
            }else{
                if(_.isFunction(callback)){
                    console.log('The file ' + filePath + ' has been regenerated.');
                    callback(yaml, filePath);
                }
            }
        });
    }
};

module.exports = yamlWriter;