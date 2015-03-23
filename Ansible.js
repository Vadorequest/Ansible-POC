/**
 * Underscore is a tool library.
 * @type {_|exports}
 * @private
 */
var _ = require('underscore');

/**
 * See https://www.npmjs.com/package/node-ansible
 * Full doc here https://shaharke.github.io/node-ansible/
 * @type {exports}
 */
var Ansible = require('node-ansible');

var Cli = (function () {
    function Cli() {
    }
    /**
     * Execute a CLI command.
     * Manage Windows and Unix environment and try to execute the command on both env if fails.
     * Order: Windows -> Unix.
     *
     * @param command                   Command to execute. ('grunt')
     * @param args                      Args of the command. ('watch')
     * @param callback                  Success.
     * @param callbackErrorWindows      Failure on Windows env.
     * @param callbackErrorUnix         Failure on Unix env.
     */
    Cli.execute = function (command, args, callback, callbackErrorWindows, callbackErrorUnix) {
        if (args === void 0) { args = []; }
        Cli.windows(command, args, callback, function () {
            callbackErrorWindows(command, args, 'Windows');
            try {
                Cli.unix(command, args, callback, callbackErrorUnix);
            }
            catch (e) {
                console.log('------------- Failed to perform the command: "' + command + '" on all environments. -------------');
                console.log(e.message);
            }
        });
    };
    /**
     * Execute a command on Windows environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param args          Args of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    Cli.windows = function (command, args, callback, callbackError) {
        if (args === void 0) { args = []; }
        try {
            Cli._execute(process.env.comspec, _.union(['/c', command], args));
            callback(command, args, 'Windows');
        }
        catch (e) {
            callbackError(command, args, 'Windows', e);
            console.log(e.message);
        }
    };
    /**
     * Execute a command on Unix environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param args          Args of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    Cli.unix = function (command, args, callback, callbackError) {
        if (args === void 0) { args = []; }
        try {
            Cli._execute(command, args);
            callback(command, args, 'Unix');
        }
        catch (e) {
            callbackError(command, args, 'Unix', e);
            console.log(e.message);
        }
    };
    /**
     * Execute a command no matters what's the environment.
     *
     * @param command   Command to execute. ('grunt')
     * @param args      Args of the command. ('watch')
     * @private
     */
    Cli._execute = function (command, args) {
        var spawn = require('child_process').spawn;
        var childProcess = spawn(command, args);
        childProcess.stdout.on("data", function (data) {
            console.log(data.toString());
        });
        childProcess.stderr.on("data", function (data) {
            console.error(data.toString());
        });
    };
    return Cli;
})();


/**
 * Run the CLI command.
 */
Cli.execute('cd', "/vagrant/test && ansible-playbook -v -M ../library -i inventory -e '@credentials.yml' test.yml", function (command, args, env) {
    console.log('Ansible has been automatically executed. (' + env + ')');
}, function (command, args, env, exception) {
    console.error('------------- Windows "' + command + '" command failed, trying Unix... ---------------');
    console.error(args, env);
    console.error(exception);
}, function (command, args, env, exception) {
    console.error('------------- Unix "' + command + '" command failed too. ---------------');
    console.error(args, env);
    console.error(exception);
});

/**
 * Run Ansible using the node-ansible library.
 * Full documentation here: https://shaharke.github.io/node-ansible/
 */
/*
var playbook = new Ansible.Playbook().playbook('my-playbook');
playbook.exec();*/
