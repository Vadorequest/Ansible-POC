///<reference path='./../d.ts/defLoader.d.ts'/>

import cli = require('./Cli');
var Cli = cli.Cli;

/**
 * Run Ansible CLI commands.
 */
export class AnsiblePlaybookCli extends cli.Cli {

    /**
     * Command name to execute.
     * @type {string}
     * @private
     */
    private static _command: string = 'ansible-playbook';

    /**
     * Execute a Ansible Playbook command.
     * @param options  Options of the command. ('watch')
     */
    public static exec(options: string[] = []){
        Cli.execute(AnsiblePlaybookCli._command, options, function(command, args, env){
            console.log('ansible-playbook has been automatically executed. ('+env+')');

        }, function(command, args, env, e){
            console.error('------------- Windows "' + command + '" command failed, trying Unix... ---------------');
            console.log(e)
        }, function(command, args, env, e){
            console.error('------------- Unix "' + command + '" command failed too. ---------------');
            console.log(e)
        });
    }
}