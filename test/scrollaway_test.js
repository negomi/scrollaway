(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#scrollAway', {
    setup: function() {
      this.el = $('#qunit-fixture').children();
    },
    teardown: function() {
      this.el.remove();
    }
  });

  test('exists', function() {
    expect(1);
    ok($.fn.scrollAway, 'should exist and not be undefined');
  });

  test('is chainable', function() {
    expect(2);
    strictEqual(this.el.scrollAway(), this.el, 'should be chainable');
    this.el.scrollAway().addClass("test");
    ok(this.el.attr("class"), "test", 'accepts class added by chained function');
  });

  test('has default options', function() {
    expect(3);
    ok($.fn.scrollAway.defaults, 'should exist and not be undefined');
    equal($.fn.scrollAway.defaults.animation, 'fade', 'should be set');
    $.fn.scrollAway.defaults.animation = 'slide';
    equal($.fn.scrollAway.defaults.animation, 'slide', 'can be modified globally');
  });

  module('jQuery.scrollAway');

  test('throws an error', function() {
    expect(2);
    throws($.scrollAway, 'should throw an error when called as a static method');
    throws($.scrollAway, /No element specified/, 'should show the right error text');
  });

}(jQuery));
