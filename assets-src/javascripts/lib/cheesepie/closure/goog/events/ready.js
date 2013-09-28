/**
 * @fileoverview Handle DOMContentLoaded event.
 * @author http://d.hatena.ne.jp/cheesepie
 */
goog.provide('goog.events.ready');

goog.require('goog.events');


/**
 * Handle DOMContentLoaded event.
 * <pre>
 * Example:
 * goog.events.ready(function() {
 *   // some action...
 * });
 * goog.events.listen(document, 'ready', function() {
 *   // some action...
 * }, false);
 * </pre>
 *
 * @param  {function} callback Event listener
 * @return {function.<goog.events.ready>}
 */
goog.events.ready = function(fn) {
  // Attach the listeners
  goog.events.readyObj.bindReady();

  // If element is already ready
  if (goog.events.readyObj.isReady) {
    fn.call(document, goog);
  } else {
    goog.events.readyObj.readyList.push(fn);
  }
  return this;
};

/**
 * The object related goog.events.ready.
 */
goog.events.readyObj = {
  /**
   * @type {boolean}
   */
  isReady: false,
  /**
   * @type {Array}
   */
  readyList: [],
  /**
   * @type {boolean}
   */ 
  readyBound: false,

  /**
   * bind DOMContentLoaded event.
   */
  bindReady: function() {
    var ro = goog.events.readyObj;
    if (ro.readyBound) { return; }
    ro.readyBound = true;

    // Mozilla, Opera and webkit
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        ro.ready();
      }, false);

    // If IE event model is used
    } else if (document.attachEvent) {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === "complete") {
          document.detachEvent('onreadystatechange', arguments.callee);
          ro.ready();
        }
      });

      // If IE and not an iframe
      if (document.documentElement.doScroll && window == window.top) (function() {
        if (ro.isReady) { return; }

        try {
          // If IE us used, use the trick
          // http://javascript.nwbox.com/IEContentLoaded
          document.documentElement.doScroll("left");
        } catch (error) {
          setTimeout(arguments.callee, 0);
          return;
        }
        // and execute any waiting functions
        ro.ready();
      })();
    }

    // A failback to window.onload, that will always work
    goog.events.listenOnce(window, 'load', ro.ready, false);
  },

  /**
   * Call functions in readyList
   */
  ready: function() {
    var ro = goog.events.readyObj;
    if (! ro.isReady) {
      // Remember that the DOM is ready
      ro.isReady = true;

      if (ro.readyList) {
        // Execute all of them
        goog.array.forEach(ro.readyList, function(fn, idx) {
          fn.call(document);
        });
        // Reset the list of functions
        ro.readyList = null;
      }
      goog.events.fireListeners(document, 'ready', false);
    }
  }
};
