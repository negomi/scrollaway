/*
 * scrollAway.js
 * https://github.com/negomi/scrollaway
 *
 * Copyright (c) 2015 Imogen Wentworth
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  // Collection method.
  $.fn.scrollAway = function(options) {
    // Override default options with passed in options.
    options = $.extend({}, $.fn.scrollAway.defaults, options || {});

    // Limit the scroll event to firing every n milliseconds, determined by
    // the specified delay. A small delay is recommended because triggering
    // immediately can be annoying due to scroll sensitivity.
    var throttle = function(fn, delay) {
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

    // Check type of all the values of a given object. Input must be an object
    // as the keys are used with msg to create a meaningful error message.
    var checkType = function(input, type, msg) {
      if (typeof input === 'object') {
        $.each(input, function(key, val) {
          if (typeof val !== type) {
            $.error(key + ' ' + msg + '.');
          }
        });
      }
    };

    // Check if a given value or expression is truthy.
    var isTrue = function(exp) { return !!exp; };

    // Hide or show each element on which scrollAway() is executed.
    return this.each(function() {
      var $element = $(this);
      var previousScroll = 0;
      var show, hide;

      var numberOptions = {
        duration: options.duration,
        delay: options.delay,
        topTriggerDistance: options.topTriggerDistance,
        bottomTriggerDistance: options.bottomTriggerDistance
      };

      var booleanOptions = {
        autoShowAtBottom: options.autoShowAtBottom
      };

      // Check supplied options to make sure their types make sense.
      checkType(numberOptions, 'number', 'must be a number');
      checkType(booleanOptions, 'boolean', 'must be true or false');

      // Set show/hide functions to the most appropriate jQuery function.
      switch (options.animation) {
        case 'fade':
          show = $.fn.fadeIn;
          hide = $.fn.fadeOut;
          break;
        case 'slide':
          show = $.fn.slideDown;
          hide = $.fn.slideUp;
          break;
        default:
          show = $.fn.show;
          hide = $.fn.hide;
          break;
      }

      // Define options object to pass to show/hide.
      var animationOptions = {
        easing: options.easing,
        duration: options.duration
      };

      // Determine desired element state on scroll event.
      $(window).scroll(throttle(function() {
        var currentScroll = $(this).scrollTop();
        var scrollUpEvent = currentScroll < previousScroll;
        var atTop = currentScroll <= 0 + options.topTriggerDistance;
        var atBottom;
        var showConditions = [scrollUpEvent, atTop];

        if (options.autoShowAtBottom) {
          atBottom = currentScroll + $(window).height() >=
                     $(document).height() - options.bottomTriggerDistance;
          showConditions.push(atBottom);
        }

        // Check if any of the specified show conditions are satisfied,
        // and then show/hide the element as necessary. Any errors thrown
        // will be due to an unrecognised easing value.
        try {
          if (showConditions.some(isTrue)) {
            show.call($element, animationOptions);
          } else {
            hide.call($element, animationOptions);
          }
        }
        catch(err) {
          $.error('Unknown easing value. ' +
                  'Core jQuery options are \'swing\' or \'linear\'.');
        }

        previousScroll = currentScroll;
      }, options.delay));
    });
  };

  // Set default options.
  $.fn.scrollAway.defaults = {
    animation: 'fade',
    duration: 400,
    easing: 'swing',
    delay: 350,
    topTriggerDistance: 0,
    bottomTriggerDistance: 0,
    autoShowAtBottom: true
  };

  // Throw error if called as a static method.
  $.scrollAway = function() {
    $.error('No element specified for scrollAway. ' +
            'Try: $("#your-element").scrollAway();');
  };

}(jQuery));
