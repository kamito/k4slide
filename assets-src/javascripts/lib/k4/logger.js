goog.provide('k4.Logger');
goog.provide('logger');


/**
 * @constructor
 */
k4.Logger = function() {
    // constructor
};
goog.addSingletonGetter(k4.Logger);

/**
 * @type {object}
 */
k4.Logger.LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 7,
    ERROR: 8,
    CRITICAL: 9
};

/**
 * Logging level
 */
k4.Logger.LEVEL = k4.Logger.LEVELS.DEBUG;

/**
 * @type {function|null|undefined}
 */
k4.Logger.LOGGING_FUNCTION = null;


/**
 * logging with console.log
 * @param {number} level logging level
 * @param {*} args logging arguments
 */
k4.Logger.prototype.logging = function(level, args) {
    if (level >= k4.Logger.LEVEL) {
        var fn = (goog.isDefAndNotNull(k4.Logger.LOGGING_FUNCTION) && goog.isFunction(k4.Logger.LOGGING_FUNCTION))
               ? k4.Logger.LOGGING_FUNCTION : ((this.enableConsole()) ? function(a){console.log(a);} : goog.nullFunction);
        fn(args);
    }
};

/**
 * Arguments object convert to Array
 */
k4.Logger.prototype.argumentsToArray = function(args) {
    return Array.prototype.slice.call(args);
};

/**
 * Check enabled console.log function.
 */
k4.Logger.prototype.enableConsole = function() {
    return (console && console.log && goog.isFunction(console.log));
};


/**
 * logging DEBUG
 */
k4.Logger.prototype.debug = function() {
    this.logging(k4.Logger.LEVELS.DEBUG, this.argumentsToArray(arguments));
};

/**
 * logging INFO
 */
k4.Logger.prototype.info = function() {
    this.logging(k4.Logger.LEVELS.INFO, this.argumentsToArray(arguments));
};

/**
 * logging WARN
 */
k4.Logger.prototype.warn = function() {
    this.logging(k4.Logger.LEVELS.WARN, this.argumentsToArray(arguments));
};

/**
 * logging ERROR
 */
k4.Logger.prototype.error = function() {
    this.logging(k4.Logger.LEVELS.ERROR, this.argumentsToArray(arguments));
};

/**
 * logging CRITICAL
 */
k4.Logger.prototype.critilcal = function() {
    this.logging(k4.Logger.LEVELS.CRITICAL, this.argumentsToArray(arguments));
};



// logger
logger = k4.Logger.getInstance();
