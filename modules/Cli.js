///<reference path='./d.ts/defLoader.d.ts'/>
/**
 * Helper to use the Command Line Interface (CLI) easily with both Windows and Unix environments.
 * Requires underscore or lodash as global through "_".
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
        try {
            Cli.unix(command, options, callback, callbackError);
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * Execute a command on Unix environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param options       Options of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    Cli.unix = function (command, options, callback, callbackError) {
        if (options === void 0) { options = []; }
        try {
            Cli._execute(command, options, callback, callbackError);
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * Execute a command no matters what's the environment.
     *
     * @param command   Command to execute. ('grunt')
     * @param options   Options of the command. ('watch')
     * @param callback
     * @param callbackError
     * @private
     */
    Cli._execute = function (command, options, callback, callbackError) {
        if (options === void 0) { options = []; }
        var child_proces = require('child_process');
        var full_command = command + ' ' + options.join(' ');
        console.info('Trying to execute command: ', full_command);
        // Run the command.
        child_proces.exec(full_command, function (error, stdout, stderr) {
            if (stderr) {
                callbackError(stderr, full_command, error);
            }
            if (stdout) {
                callback(stdout, full_command);
            }
        });
    };
    return Cli;
})();
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map