///<reference path='./../d.ts/defLoader.d.ts'/>

/**
 * Helper to use the Command Line Interface (CLI) easily with both Windows and Unix environments.
 * Requires underscore or lodash as global through "_".
 */
export class Cli {

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
    public static execute(command: string, options: string[] = [], callback?: any, callbackErrorWindows?: any, callbackErrorUnix?: any){
//        Cli.windows(command, options, callback, function(){
//            callbackErrorWindows(command, options, 'Windows');

            try{
                Cli.unix(command, options, callback, callbackErrorUnix);
            }catch(e){
                console.log('------------- Failed to perform the command: "' + command + '" on all environments. -------------');
                console.log(e);
            }
//        });
    }

    /**
     * Execute a command on Windows environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param options       Options of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    public static windows(command: string, options: string[] = [], callback?: any, callbackError?: any){
        try{
            Cli._execute(process.env.comspec, _.union(['/c', command], options), 'Windows');
            callback(command, options, 'Windows');
        }catch(e){
            callbackError(command, options, 'Windows', e);
        }
    }

    /**
     * Execute a command on Unix environment.
     *
     * @param command       Command to execute. ('grunt')
     * @param options       Options of the command. ('watch')
     * @param callback      Success callback.
     * @param callbackError Failure callback.
     */
    public static unix(command: string, options: string[] = [], callback?: any, callbackError?: any){
        try{
            Cli._execute(command, options, 'Unix');
            callback(command, options, 'Unix');
        }catch(e){
            callbackError(command, options, 'Unix', e);
        }
    }

    /**
     * Execute a command no matters what's the environment.
     *
     * @param command   Command to execute. ('grunt')
     * @param options   Options of the command. ('watch')
     * @private
     */
    private static _execute(command, options: string[] = [], env?){
        var child_proces = require('child_process');
        var full_command = command + ' ' + options.join(' ');

        console.log('Trying to execute command under ' + env + ': ', full_command);

        // Run the command.
        child_proces.exec(full_command, function(error, stdout, stderr){
            if(error){
                throw error;
            }
            if(stderr){
                throw stderr;
            }

            console.log(stdout);
        });
    }
}