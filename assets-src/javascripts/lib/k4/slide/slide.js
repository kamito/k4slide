goog.provide('k4.slide.Slide');

goog.require('goog.dom.classes');
goog.require('goog.style');
goog.require('goog.string');
goog.require('goog.math.Size');
goog.require('goog.math.Coordinate');
goog.require('goog.ui.Component');
goog.require('logger');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {Element} element Slide element
 * @param {k4.slide.Config} config Config object
 * @param {*} opt_domHelper Dom helper
 */
k4.slide.Slide = function(element, config, opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {k4.slide.Config}
     */
    this.config_ = config;

    // set internal element (this.element_ = element)
    this.setElementInternal(element);
    this.init_();
}
goog.inherits(k4.slide.Slide, goog.ui.Component);

/**
 * show my slide
 */
k4.slide.Slide.prototype.init_ = function() {
    var c = this.config_;
    var el = this.getElement();
    // size
    this.setSizeByConfig();
    // position
    // this.setPositionByConfig();
    this.hide();
};

/**
 * slide size
 * @param {goog.math.Size|number} w width
 * @param {number|null|undefined} opt_h height
 * 
 */
k4.slide.Slide.prototype.setSize = function(w, opt_h) {
    goog.style.setSize(this.getElement(), w, opt_h);
};

k4.slide.Slide.prototype.setSizeByConfig = function() {
    var c = this.config_;
    var slideWidth = c.get('slide.width');
    var slideHeight = c.get('slide.height');
    var size = new goog.math.Size(slideWidth, slideHeight);
    this.setSize(size);
};

/**
 * slide position
 * @param {goog.math.Cordinate|number} left left position
 * @param {number|null|undefined} opt_top top position
 * 
 */
k4.slide.Slide.prototype.setPosition = function(left, opt_top) {
    goog.style.setPosition(this.getElement(), left, opt_top);
};

k4.slide.Slide.prototype.setPositionByConfig = function() {
    var c = this.config_;
    var slideTop = c.get('slide.top');
    var slideLeft = c.get('slide.left');
    var pos = new goog.math.Coordinate(slideLeft, slideTop);
    this.setPosition(pos);
};


/**
 * show my slide
 */
k4.slide.Slide.prototype.show = function() {
    var el = this.getElement();
    goog.style.setOpacity(el, 1);
    // goog.style.showElement(el, true);
};

/**
 * show my slide
 */
k4.slide.Slide.prototype.hide = function() {
    var el = this.getElement();
    goog.style.setOpacity(el, 0);
    // goog.style.showElement(el, false);
};

/**
 * to previous
 */
k4.slide.Slide.prototype.toPrev = function() {
    var c = this.getConfig();
    this.applyClasses(
        [c.get('slide.class.prev')],
        [c.get('slide.class.current', c.get('slide.class.next'))]
    );
    this.hide();
};

/**
 * to next
 */
k4.slide.Slide.prototype.toNext = function() {
    var c = this.getConfig();
    this.applyClasses(
        [c.get('slide.class.next')],
        [c.get('slide.class.current'), c.get('slide.class.prev')]
    );
    this.hide();
};

/**
 * to current
 */
k4.slide.Slide.prototype.toCurrent = function() {
    var c = this.getConfig();
    this.applyClasses(
        [c.get('slide.class.current')],
        [c.get('slide.class.next'), c.get('slide.class.prev')]
    );
    this.show();
};

/**
 * remove and add class
 * @param {array} addClasses Adding css classes
 * @param {array|undefined|null} opt_removeClasses Removing css classes
 */
k4.slide.Slide.prototype.applyClasses = function(addClasses, opt_removeClasses) {
    var el = this.getElement();

    if (goog.isArrayLike(opt_removeClasses)) {
        goog.array.forEach(opt_removeClasses, function(cls, i, arr) {
            goog.dom.classes.remove(el, cls);
        }, this);
    }

    if (goog.isArrayLike(addClasses)) {
        goog.array.forEach(addClasses, function(cls, i, arr) {
            goog.dom.classes.add(el, cls);
        }, this);
    }
};

/**
 * return config instance.
 */
k4.slide.Slide.prototype.getPage = function() {
    var page = null;
    var el = this.getElement();
    if (el) {
        page = el.getAttribute('page');
        page = (!goog.string.isEmpty(page)) ? parseInt(page, 10) : null;
    }
    return page;
};

/**
 * return config instance.
 */
k4.slide.Slide.prototype.getConfig = function() {
    return this.config_;
};
