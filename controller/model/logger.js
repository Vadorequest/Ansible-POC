var colors = require('colors/safe');

// Save initial function.
var consoleError = console.error;
var consoleWarn = console.warn;
var consoleInfo = console.info;
var consoleLog = console.log;

/**
 * Display red messages.
 * @param data
 */
console.error = function(data){
    consoleError(colors.red(data));
};

/**
 * Display yellow messages.
 * @param data
 */
console.warn = function(data){
    consoleWarn(colors.yellow(data));
};

/**
 * Display blue messages.
 * @param data
 */
console.info = function(data){
    consoleInfo(colors.blue(data));
};

/**
 * Display green messages.
 * @param data
 */
console.success = function(data){
    consoleLog(colors.green(data));
};

/**
 * Display cyan messages.
 * @param data
 */
console.verbose = function(data){
    consoleLog(colors.cyan(data));
};