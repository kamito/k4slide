/**
 * k4slide.js
 */
goog.provide('k4slide.App');

goog.require('k4.slide.Base');


/**
 * @constructor
 * @extends {k4.slide.Base}
 * @param {goog.domDomHelper|null|undefined} opt_domHelper DOM helper
 */
k4slide.App = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
}
goog.inherits(k4slide.App, k4.slide.Base);
goog.addSingletonGetter(k4slide.App);

k4slide.App.getInstance();
