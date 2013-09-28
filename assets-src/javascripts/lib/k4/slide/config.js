goog.provide('k4.slide.Config');

goog.require('goog.array');
goog.require('goog.object');


/**
 * @constructor
 * @param {object} opt_config Configuration
 */
k4.slide.Config = function(opt_config) {
    /**
     * @type {object}
     */
    this.config_ = k4.slide.Config.DEFAULT_CONFIG;
}

/**
 * default configuration
 * @type {object}
 */
k4.slide.Config.DEFAULT_CONFIG = {
    'window': {
        'margin': 10, // px
        'null': null
    },
    'slide': {
        'pattern': 'div[role="slide"]',
        'width': 640,
        'height': 480,
        'ratio': 1.0,
        'class': {
            'current': 'current',
            'prev': 'prev',
            'next': 'next',
            'toPrev': 'to-prev',
            'toNext': 'to-next',
            'toCurrent': 'to-current'
        },
        'null': null
    }
};


/**
 * @param {string} key Key
 * @return {object|array|null|undefined}
 */
k4.slide.Config.prototype.get= function(key) {
    var tmp = this.config_;
    var keys = key.split('.');
    goog.array.forEach(keys, function(k, i, arr) {
        tmp = (goog.isDefAndNotNull(tmp) && goog.isObject(tmp)) ? tmp[k] : undefined;
    }, this);
    return tmp;
};


/**
 * @param {string} key Key
 * @param {*} val The value
 */
k4.slide.Config.prototype.set= function(key, val) {
    var tmp = this.config_;
    var keys = key.split('.');
    var lastIndex = keys.length - 1;
    goog.array.forEach(keys, function(k, i, arr) {
        tmp[k] = (goog.isDefAndNotNull(tmp[k]) && goog.isObject(tmp[k])) ? tmp[k] : {};
        if (i == lastIndex) {
            tmp[k] = val;
        } else {
            tmp = (goog.isDefAndNotNull(tmp) && goog.isObject(tmp)) ? tmp[k] : undefined;
        }
    }, this);
};
