///<reference path='./../d.ts/defLoader.d.ts'/>
/**
 * Helper to use the Command Line Interface (CLI) easily with both Windows and Unix environments.
 * Requires underscore or lodash as global through "_".
 */
var Cli = (function () {
    function Cli() {
    }
    /**
     * Execute a CLI command.
     * Manage Windows and Unix environment and try to execute the command on both env if fails.
     * Order: Windows -> Unix.
     *
     * @param command                   Command to execute. ('grunt')
     * @param options                   Options of the command. ('watch')
     * @param callback                  Success.
     * @param callbackErrorWindows      Failure on Windows env.
     * @param callbackErrorUnix         Failure on Unix env.
     */
    Cli.execute = function (command, options, callback, callbackErrorWindows, callbackErrorUnix) {
        if (options === void 0) { options = []; }
        Cli.windows(command, options, callback, function () {
            callbackErrorWindows(command, options, 'Windows');
            try {
                Cli.unix(command, options, callback, callbackErrorUnix);
            }
            catch (e) {
                console.log('------------- Failed to perform the command: "' + command + '" on all environments. -------------');
                console.log(e);
            }
        });
    };
    /**
     * Execute a command on Windows environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param options       Options of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    Cli.windows = function (command, options, callback, callbackError) {
        if (options === void 0) { options = []; }
        try {
            Cli._execute(process.env.comspec, _.union(['/c', command], options), 'Windows');
            callback(command, options, 'Windows');
        }
        catch (e) {
            callbackError(command, options, 'Windows', e);
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
            Cli._execute(command, options, 'Unix');
            callback(command, options, 'Unix');
        }
        catch (e) {
            callbackError(command, options, 'Unix', e);
        }
    };
    /**
     * Execute a command no matters what's the environment.
     *
     * @param command   Command to execute. ('grunt')
     * @param options   Options of the command. ('watch')
     * @private
     */
    Cli._execute = function (command, options, env) {
        if (options === void 0) { options = []; }
        var spawn = require('child_process').spawn;
        var full_command = command + ' ' + options.join(' ');
        console.log('Trying to execute command under ' + env + ': ', full_command);
        var childProcess = spawn(command, options);
        childProcess.stdout.on("data", function (data) {
            console.log(data.toString());
        });
        childProcess.stderr.on("data", function (data) {
            console.error(data.toString());
        });
    };
    return Cli;
})();
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map