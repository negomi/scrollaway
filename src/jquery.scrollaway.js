/*
 * scrollAway.js
 * https://github.com/negomi/scrollaway
 *
 * Copyright (c) 2015 Imogen Wentworth
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  // Set element and override default options with passed in options.
  function ScrollAway(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, this.defaults, options || {});
    this.init();
  }

  ScrollAway.prototype.init = function() {
    var self = this;

    this.setOptsByType(this.options);
    this.validateOptions();
    this.setAnimations(this.options.animation);

    this.previousScroll = 0;

    $(window).scroll(this.throttle(function() {
      self.handleScroll();
    }, this.options.delay));
  };

  // Set current scroll position, set show conditions, and call
  // function responsible for hiding/showing the element.
  ScrollAway.prototype.handleScroll = function() {
    this.currentScroll = $(window).scrollTop();
    this.setShowConditions();
    this.handleElement();
    this.previousScroll = this.currentScroll;
  };

  // Check if any of the specified show conditions are satisfied,
  // and then show/hide the element as necessary. Any errors thrown
  // will be due to an unrecognised easing value.
  ScrollAway.prototype.handleElement = function() {
    try {
      if (this.showConditions.some(this.isTrue)) {
        this.show.call(this.$element, this.optsByType.animation);
      } else {
        this.hide.call(this.$element, this.optsByType.animation);
      }
    }
    catch(err) {
      $.error('Unknown easing value. ' +
              'Core jQuery options are \'swing\' or \'linear\'.');
    }
  };

  // Set the conditions on which to show the element. It will always show on
  // scroll up, or at the top of the page. Showing it at the bottom is optional
  // and determined by the autoShowAtBottom option.
  ScrollAway.prototype.setShowConditions = function() {
    var scrollUpEvent, atTop, atBottom;

    if (this.showConditions) {
      this.showConditions.length = 0;
    } else {
      this.showConditions = [];
    }

    scrollUpEvent = this.currentScroll < this.previousScroll;
    this.showConditions.push(scrollUpEvent);

    atTop = this.currentScroll <= 0 + this.options.topTriggerDistance;
    this.showConditions.push(atTop);

    if (this.options.autoShowAtBottom) {
      atBottom = this.currentScroll + $(window).height() >=
      $(document).height() - this.options.bottomTriggerDistance;
      this.showConditions.push(atBottom);
    }
  };

  // Set show/hide to the most appropriate jQuery function.
  ScrollAway.prototype.setAnimations = function(animation) {
    switch (animation) {
      case 'fade':
        ScrollAway.prototype.show = $.fn.fadeIn;
        ScrollAway.prototype.hide = $.fn.fadeOut;
        break;
      case 'slide':
        ScrollAway.prototype.show = $.fn.slideDown;
        ScrollAway.prototype.hide = $.fn.slideUp;
        break;
      default:
        ScrollAway.prototype.show = $.fn.show;
        ScrollAway.prototype.hide = $.fn.hide;
        break;
    }
  };

  // Store options grouped for easy access/type checking.
  ScrollAway.prototype.setOptsByType = function(options) {
    this.optsByType = {
      num: {
        duration: options.duration,
        delay: options.delay,
        topTriggerDistance: options.topTriggerDistance,
        bottomTriggerDistance: options.bottomTriggerDistance
      },
      bool: {
        autoShowAtBottom: options.autoShowAtBottom
      },
      animation: {
        easing: options.easing,
        duration: options.duration
      }
    };
  };

  // Check supplied options to make sure their types make sense.
  ScrollAway.prototype.validateOptions = function() {
    this.checkType(this.optsByType.num, 'number', 'must be a number');
    this.checkType(this.optsByType.bool, 'boolean', 'must be true or false');
  };

  // Check type of all the values of a given object. Input must be an object
  // as the keys are used with msg to create a meaningful error message.
  ScrollAway.prototype.checkType = function(input, type, msg) {
    if (input.constructor === Object) {
      $.each(input, function(key, val) {
        if (typeof val !== type) {
          $.error(key + ' ' + msg + '.');
        }
      });
    } else {
      $.error('Input must be an object.');
    }
  };

  // Limit the scroll event to firing every n milliseconds, determined by
  // the specified delay. A small delay is recommended because it can reduce
  // immediate triggering, which can be annoying due to scroll sensitivity.
  ScrollAway.prototype.throttle = function(fn, delay) {
    var last, deferTimer;
    return function () {
      var context = this;
      var now = new Date().getTime(), args = arguments;
      if (last && now < last + delay) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, delay);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };

  // Check if a given value or expression is truthy.
  ScrollAway.prototype.isTrue = function(exp) {
    return !!exp;
  };

  // Collection method.
  $.fn.scrollAway = function(options) {
    // Hide or show each element to which scrollAway() is applied.
    return this.each(function() {
      $.data(this, 'scrollAway', new ScrollAway(this, options));
    });
  };

  // Throw error if called as a static method.
  $.scrollAway = function() {
    $.error('No element specified for scrollAway. ' +
            'Try: $("#your-element").scrollAway();');
  };

  // Set default options.
  ScrollAway.prototype.defaults = {
    animation: 'fade',
    duration: 400,
    easing: 'swing',
    delay: 350,
    topTriggerDistance: 0,
    bottomTriggerDistance: 0,
    autoShowAtBottom: true
  };

}(jQuery));
