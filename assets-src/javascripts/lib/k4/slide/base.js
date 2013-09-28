/**
 * k4slide.js
 */
goog.provide('k4.slide.Base');

goog.require('goog.dom');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.ready');
goog.require('goog.ui.Component');
goog.require('logger');
goog.require('k4.slide.Config');
goog.require('k4.slide.Controller');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.domDomHelper|null|undefined} opt_domHelper DOM helper
 */
k4.slide.Base = function(opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {k4slide.Config}
     */
    this.config_ = new k4.slide.Config();

    /**
     * @type {k4slide.SlideController}
     */
    this.controller_ = new k4.slide.Controller(this.config_);


    // ready
    goog.events.ready(goog.bind(this.loaded_, this));
}
goog.inherits(k4.slide.Base, goog.ui.Component);
goog.addSingletonGetter(k4.slide.Base);

/**
 * Initialize Application
 */
k4.slide.Base.prototype.loaded_ = function(event) {
    this.initEvents_();
    this.controller_.init();
    this.controller_.start();
}

k4.slide.Base.prototype.initEvents_ = function() {
    var keyHandler = new goog.events.KeyHandler(goog.dom.getDocument());
    var codes = goog.events.KeyCodes;
    var controller = this.controller_;
    goog.events.listen(keyHandler, goog.events.KeyHandler.EventType.KEY, function(e) {
        switch (e.keyCode) {
          case codes.ENTER:
          case codes.MAC_ENTER:
          case codes.SPACE:
            e.preventDefault();
            e.stopPropagation();
            controller.next();
            break;
          case codes.BACKSPACE:
            e.preventDefault();
            e.stopPropagation();
            controller.back();
            break;
        default:
            // do nothing
            break;
        }
    }, false, this);

    goog.events.listen(this.controller_.getBody(), goog.events.EventType.CLICK, function(e) {
        e.preventDefault();
        e.stopPropagation();
        controller.next();
    }, false, this);

    var vsm = new goog.dom.ViewportSizeMonitor();
    goog.events.listen(vsm, goog.events.EventType.RESIZE, function(e) {
        // e.preventDefault();
        // e.stopPropagation();
        controller.resize();
    }, false, this);
};
