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
     * @param resolve   Resolve callback, when succeed.
     * @param reject    Reject callback, when fails.
     * @param options   js-yaml options.
     *
     * @see Library documentation at https://github.com/nodeca/js-yaml
     */
    write: function(object, path, filename, resolve, reject, options){
        console.log()
        // Manage default values.
        path = _.isString(path) ? path: './';
        filename = _.isString(filename) ? filename + '.yml': 'yaml.yml';
        var filePath = path + filename;

        var yaml = yamlLib.safeDump(object, _.merge(yamlWriter.defaultOptions, options));

        fs.writeFile(filePath, yaml, function(err){
            if(err){
                reject(err);
            }else{
                if(_.isFunction(resolve)){
                    console.log('The file ' + filePath + ' has been regenerated.');
                    resolve(yaml, filePath);
                }else{
                    reject('Resolve is not a function.');
                }
            }
        });
    }
};

module.exports = function handler(){
    // Calling yamlWriter.write behing the scene and providing it with all arguments.
    return yamlWriter.write.apply(this, arguments);
};