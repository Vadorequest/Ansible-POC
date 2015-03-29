///<reference path='./d.ts/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cli = require('./Cli');
var Cli = cli.Cli;
/**
 * Run Ansible CLI commands.
 */
var AnsiblePlaybookCli = (function (_super) {
    __extends(AnsiblePlaybookCli, _super);
    function AnsiblePlaybookCli() {
        _super.apply(this, arguments);
    }
    /**
     * Execute a Ansible Playbook command.
     * @param options  Options of the command. ('watch')
     * @param callback
     * @param callbackError
     */
    AnsiblePlaybookCli.exec = function (options, callback, callbackError) {
        if (options === void 0) { options = []; }
        Cli.execute(AnsiblePlaybookCli._command, options, callback || AnsiblePlaybookCli.defaultCallback, callbackError || AnsiblePlaybookCli.defaultCallbackError);
    };
    /**
     * Default success callback if none is provided.
     */
    AnsiblePlaybookCli.defaultCallback = function (message, command) {
        console['success']('Successful command: "' + command + '"');
        console['success'](message);
    };
    /**
     * Default error callback if none is provided.
     */
    AnsiblePlaybookCli.defaultCallbackError = function (message, command) {
        console['error']('FAILED command: "' + command + '"');
        console['error'](message);
    };
    /**
     * Command name to execute.
     * @type {string}
     * @private
     */
    AnsiblePlaybookCli._command = 'ansible-playbook';
    return AnsiblePlaybookCli;
})(cli.Cli);
exports.AnsiblePlaybookCli = AnsiblePlaybookCli;
//# sourceMappingURL=AnsiblePlaybookCli.js.map