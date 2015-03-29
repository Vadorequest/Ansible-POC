///<reference path='./d.ts/defLoader.d.ts'/>

import cli = require('./Cli');
var Cli = cli.Cli;

/**
 * Run Ansible CLI commands.
 */
export class AnsiblePlaybookCli extends cli.Cli {

    /**
     * Default success callback if none is provided.
     */
    private static defaultCallback = function(message: string, command: string){
        console['success']('Successful command: "' + command + '"');
        console['success'](message);
    };

    /**
     * Default error callback if none is provided.
     */
    private static defaultCallbackError = function(message: string, command: string){
        console['error']('FAILED command: "' + command + '"');
        console['error'](message);
    };

    /**
     * Command name to execute.
     * @type {string}
     * @private
     */
    private static _command: string = 'ansible-playbook';

    /**
     * Execute a Ansible Playbook command.
     * @param options  Options of the command. ('watch')
     * @param callback
     * @param callbackError
     */
    public static exec(options: string[] = [], callback?, callbackError?){
        return Cli.execute(
            AnsiblePlaybookCli._command,
            options,
            callback || AnsiblePlaybookCli.defaultCallback,
            callbackError || AnsiblePlaybookCli.defaultCallbackError
        );
    }
}