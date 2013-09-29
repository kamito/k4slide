goog.provide('k4.slide.Controller');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('goog.History');
goog.require('k4.slide.Slide');
goog.require('k4.slide.Config');


/**
 * @constructor
 * @extends {goog.ui.Component}
 */
k4.slide.Controller = function(config) {
    goog.base(this);

    /**
     * @type {k4.Config}
     */
    this.config_ = config;

    /**
     * @type {array.<k4.slide.>}
     */
    this.slides_ = [];

    /**
     * current slide index
     * @type {number}
     */
    this.current_ = 0;

    /**
     * @type {goog.History}
     */
    this.history_ = new goog.History();
}
goog.inherits(k4.slide.Controller, goog.ui.Component);





/**
 * initialize
 */
k4.slide.Controller.prototype.init = function() {
    this.initWindow_();
    this.calculateSlideSizeAndPosition_();
    this.initSlides_();
};


/**
 * Initialize window
 * TODO: to iPhone and iOS
 */
k4.slide.Controller.prototype.initWindow_ = function() {
    var viewportSize = goog.dom.getViewportSize();
    var c = this.config_;
    c.set('window.width', viewportSize.width);
    c.set('window.height', viewportSize.height);
};

/**
 * calculate slide width & height
 */
k4.slide.Controller.prototype.calculateSlideSizeAndPosition_ = function() {
    var c = this.config_;


    // win size
    var winWidth = c.get('window.width');
    var winHeight = c.get('window.height');
    var winMargin = c.get('window.margin');

    // size
    var isHorizonal = true;
    var slideAspect = winHeight / winWidth;
    var slideWidth = c.get('slide.width');
    var slideHeight = c.get('slide.height');
    var slideRatio = c.get('slide.ratio');
    var aspectRatio = slideHeight / slideWidth;
    var toWidth = 0;
    var toHeight = 0;

    // ratio
    if (aspectRatio > slideAspect) {
        toHeight = Math.floor(winHeight - (winMargin * 2));
        slideRatio = toHeight / slideHeight;
        toWidth = slideWidth * slideRatio;
    } else {
        toWidth = Math.floor(winWidth - (winMargin * 2));
        slideRatio = toWidth / slideWidth;
        toHeight = slideHeight * slideRatio;
        isHorizonal = false;
    }
    c.set('slide.ratio', slideRatio);

    // position
    // current
    var slideTop = Math.round((winHeight - slideHeight) / 2);
    var slideLeft = Math.round((winWidth - slideWidth) / 2);
    c.set('slide.current.top', slideTop);
    c.set('slide.current.left', slideLeft);
    // next
    var nextLeft = ((winWidth + slideWidth) / 2) + (toWidth - slideWidth) + c.get('window.margin');
    c.set('slide.next.left', nextLeft);
    // prev
    var prevLeft = ((winWidth - slideWidth) / 2) - (toWidth) - c.get('window.margin');
    c.set('slide.prev.left', prevLeft);

    // set ratio
    this.setSlideScale_();
};

k4.slide.Controller.prototype.setSlideScale_ = function() {
    var c = this.config_;
    var sTop  = c.get('slide.current.top');
    var sLeft = c.get('slide.current.left');
    var nLeft = c.get('slide.next.left');
    var pLeft = c.get('slide.prev.left');
    var ratio = c.get('slide.ratio');

    var installStyles = [
        'div.current{top:'+ sTop.toString() +'px; left:'+ sLeft.toString() +'px;}',
        'div.next{top:'+ sTop.toString() +'px; left:'+ nLeft.toString() +'px;}',
        'div.prev{top:'+ sTop.toString() +'px; left:'+ pLeft.toString() +'px;}',
        'div[role="slide"]{',
        '-webkit-transform: scale('+ ratio.toString() +');}',
        '-moz-transform: scale('+ ratio.toString() +');',
        '}',
        ''
    ].join("");
    goog.style.installStyles(installStyles);
};

/**
 * Initialize slides
 */
k4.slide.Controller.prototype.initSlides_ = function() {
    var elements = this.findSlideElements_();
    if (goog.isArrayLike(elements) && elements.length > 0) {
        goog.array.forEach(elements, function(el, i, arr) {
            var item = new k4.slide.Slide(el, this.config_);
            this.slides_.push(item);
        }, this);
    }
};

/**
 * Find slide elements
 */
k4.slide.Controller.prototype.findSlideElements_ = function() {
    var pattern = this.config_.get('slide.pattern');
    var elements = goog.dom.query(pattern);
    return elements;
};

/**
 * return body;
 */
k4.slide.Controller.prototype.getBody = function() {
    var body = goog.dom.getDocument().body;
    return body;
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.getCurrent = function() {
    if (goog.isArrayLike(this.slides_) && this.slides_.length > 0) {
        return this.slides_[this.current_];
    } else {
        return null;
    }
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.getNext = function() {
    if (goog.isArrayLike(this.slides_) && this.slides_.length > 0) {
        return this.slides_[this.current_ + 1];
    } else {
        return null;
    }
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.getPrev = function() {
    if (goog.isArrayLike(this.slides_) && this.slides_.length > 0) {
        return this.slides_[this.current_ - 1];
    } else {
        return null;
    }
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.updateTitle = function() {
    var c = this.getCurrent();
    if (c) {
        var p = c.getPage();
        if (p) {
            this.setToken(p);
        }
    }
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.getCurrentPageNumber = function() {
    var page = 0;
    if (this.history_) {
        page = parseInt(this.history_.getToken(), 10);
    }
    return page;
};

/**
 * Get current slide object
 * @return {k4.slide.|null|undefined}
 */
k4.slide.Controller.prototype.setToken = function(val) {
    if (this.history_) {
        this.history_.setToken(val);
    }
};

/**
 * start presentation
 */
k4.slide.Controller.prototype.start = function() {
    var l = 0;
    if (goog.isArrayLike(this.slides_) && this.slides_.length > 0) {
        goog.array.forEach(this.slides_, function(s, i, a) {
            if (i == l) {
                s.toCurrent();
            } else if (i < l) {
                s.toPrev();
            } else if (i > l) {
                s.toNext();
            }
        }, this);
    }
};

/**
 * next
 */
k4.slide.Controller.prototype.next = function() {
    var currentSlide = this.getCurrent();
    var nextSlide = this.getNext();
    if (nextSlide) {
        currentSlide.toPrev();
        nextSlide.toCurrent();
        this.current_++;
        this.updateTitle();
    }
};

/**
 * next
 */
k4.slide.Controller.prototype.back = function() {
    var currentSlide = this.getCurrent();
    var prevSlide = this.getPrev();
    if (prevSlide) {
        currentSlide.toNext();
        prevSlide.toCurrent();
        this.current_--;
        this.updateTitle();
    }
};

/**
 * goto
 */
k4.slide.Controller.prototype.goTo = function(page) {
    var currentSlide = this.getCurrent();
    var gotoSlide = this.slides_[parseInt(page, 10)];
    if (gotoSlide) {
        currentSlide.toNext();
        prevSlide.toCurrent();
        this.current_--;
        this.updateTitle();
    }
};

/**
 * resize
 */
k4.slide.Controller.prototype.resize = function() {
    this.initWindow_();
    this.calculateSlideSizeAndPosition_();
    goog.array.forEach(this.slides_, function(s, i, a) {
        s.setPositionByConfig();
    }, this);
};
