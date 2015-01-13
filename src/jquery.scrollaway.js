/*
 * jQuery ScrollAway
 * https://github.com/negomi/scrollaway
 *
 * Copyright (c) 2015 Imogen Wentworth
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.scrollAway = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.scrollAway = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.scrollAway.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.scrollAway.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].scrollAway = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
