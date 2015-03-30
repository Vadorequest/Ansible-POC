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
        var child_proces = require('child_process');
        var full_command = command + ' ' + options.join(' ');
        console.info('Trying to execute command: ', full_command);
        // Run the command.
        var cli = child_proces.exec(full_command, function (error, stdout, stderr) {
            if (stderr) {
                callbackError(stderr, full_command, error);
            }
            else if (stdout.substring(0, 5).toUpperCase() === 'ERROR') {
                callbackError(stdout, full_command, stdout); // Special case, it's not an error as it, but it's an error for the final user, no exception is raised automatically.
            }
            if (stdout) {
                callback(stdout, full_command);
            }
        });
        cli.stdout.on('data', function (data) {
            callback(data, full_command);
        });
        cli.stderr.on('data', function (data) {
            callbackError(data, full_command);
        });
        cli.on('close', function (code) {
            callback("'close' event detected: " + code, full_command);
        });
        return full_command;
    };
    return Cli;
})();
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map