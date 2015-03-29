///<reference path='./../d.ts/defLoader.d.ts'/>
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
     */
    AnsiblePlaybookCli.exec = function (options) {
        if (options === void 0) { options = []; }
        Cli.execute(AnsiblePlaybookCli._command, options, function (command, args, env) {
            console.log('ansible-playbook has been automatically executed. (' + env + ')');
        }, function (command, args, env, e) {
            console.error('------------- Windows "' + command + '" command failed, trying Unix... ---------------');
            console.log(e);
        }, function (command, args, env, e) {
            console.error('------------- Unix "' + command + '" command failed too. ---------------');
            console.log(e);
        });
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