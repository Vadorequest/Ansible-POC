///<reference path='./d.ts/defLoader.d.ts'/>

/**
 * Helper to use the Command Line Interface (CLI) easily with both Windows and Unix environments.
 * Requires underscore or lodash as global through "_".
 */
export class Cli {

    /**
     * Execute a CLI command under Unix.
     *
     * @param command                   Command to execute. ('grunt')
     * @param options                   Options of the command. ('watch')
     * @param callback                  Success.
     * @param callbackError
     */
    public static execute(command: string, options: string[] = [], callback?: any, callbackError?: any){
        var child_proces = require('child_process');
        var full_command = command + ' ' + options.join(' ');

        console.info('Trying to execute command: ', full_command);

        // Run the command.
        child_proces.exec(full_command, function(error, stdout, stderr){
            if(stderr){
                callbackError(stderr, full_command, error);
            } else if(stdout.substring(0, 5).toUpperCase() === 'ERROR') {
                callbackError(stdout, full_command, stdout);// Special case, it's not an error as it, but it's an error for the final user, no exception is raised automatically.
            } else if(stdout){
                callback(stdout, full_command);
            }
        });
    }
}