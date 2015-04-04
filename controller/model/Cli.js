///<reference path='./d.ts/defLoader.d.ts'/>
/**
 * Helper to use the Command Line Interface (CLI) easily with both Windows and Unix environments.
 */
var Cli = (function () {
    function Cli() {
    }
    /**
     * Execute a CLI command under Unix.
     *
     * @param command                   Command to execute. ('grunt')
     * @param options                   Options of the command. ('watch')
     * @param callback                  Success.
     * @param callbackError
     */
    Cli.execute = function (command, options, callback, callbackError) {
        if (options === void 0) { options = []; }
        var childProcess = require('child_process');
        var fullCommand = command + ' ' + options.join(' ');
        console.info('Trying to execute command: ', fullCommand);
        var cli = childProcess.spawn(command, options);
        cli.stdout.on("data", function (data) {
            callback(data, fullCommand);
        });
        cli.stderr.on("data", function (data) {
            callbackError(data, fullCommand, data);
        });
        cli.on('close', function (code) {
            callback("'close' event detected: " + code, fullCommand);
        });
        return fullCommand;
        //
        //        // Run the command.
        //        var cli = childProcess.exec(fullCommand, function(error, stdout, stderr){
        //            if(stderr){
        //                callbackError(stderr, fullCommand, error);
        //            } else if(stdout.substring(0, 5).toUpperCase() === 'ERROR') {
        //                callbackError(stdout, fullCommand, stdout);// Special case, it's not an error as it, but it's an error for the final user, no exception is raised automatically.
        //            }
        //
        //            if(stdout){
        //                callback(stdout, fullCommand);
        //            }
        //        });
        //
        //        cli.stdout.on('data', function(data) {
        //            callback(data, fullCommand);
        //        });
        //        cli.stderr.on('data', function(data) {
        //            callbackError(data, fullCommand, data);
        //        });
        //        cli.on('close', function(code) {
        //            callback("'close' event detected: " + code, fullCommand);
        //        });
        //
    };
    return Cli;
})();
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map