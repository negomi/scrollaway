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
      this.el.scrollAway();
      this.plugin = this.el.data('scrollAway');
    },
    teardown: function() {
      this.el.remove();
    }
  });

  test('exists as a collection method', function() {
    expect(1);
    ok($.fn.scrollAway, 'should exist and not be undefined');
  });

  test('is chainable', function() {
    expect(2);
    strictEqual(this.el.scrollAway(), this.el, 'should be chainable');
    this.el.scrollAway().addClass('test');
    ok(this.el.attr('class'), 'test', 'accepts class added by chained function');
  });

  test('has default options', function() {
    expect(3);
    ok(this.plugin.defaults, 'should exist and not be undefined');
    equal(this.plugin.defaults.animation, 'fade', 'should be set');
    this.plugin.defaults.animation = 'slide';
    equal(this.plugin.defaults.animation, 'slide', 'can be modified globally');
  });

  test('scroll event', function() {
    expect(1);
    var scrolled = false;
    this.plugin.handleScroll = function() { scrolled = true; };
    $(window).trigger('scroll');
    equal(scrolled, true, 'should call scroll handler');
  });

  test('handleScroll', function() {
    expect(2);
    this.plugin.handleScroll();
    ok(this.plugin.showConditions, 'sets show conditions');
    equal(this.plugin.currentScroll, 0, 'sets current scroll position');
  });

  test('handleElement', function() {
    expect(2);
    var visible;
    this.plugin.hide = function() { visible = false; };
    this.plugin.show = function() { visible = true; };
    this.plugin.showConditions = [true, true, false];
    this.plugin.handleElement();
    equal(visible, true, 'shows element if any show conditions are true');
    this.plugin.showConditions = [false, false, false];
    this.plugin.handleElement();
    equal(visible, false, 'hides element if no show conditions are true');
  });

  test('setAnimations', function() {
    expect(2);
    this.el.scrollAway({animation: 'slide'});
    equal(this.plugin.show, $.fn.slideDown, 'sets correct slide animation');
    this.el.scrollAway({animation: 'some random value'});
    equal(this.plugin.show, $.fn.show, 'defaults to show');
  });

  test('setOptsByType', function() {
    expect(3);
    this.plugin.setOptsByType(this.plugin.options);
    ok(this.plugin.optsByType.num, 'groups number options');
    ok(this.plugin.optsByType.bool, 'groups boolean options');
    ok(this.plugin.optsByType.animation, 'groups animation options');
  });

  test('setShowConditions', function() {
    expect(1);
    ok(this.plugin.setShowConditions, 'should exist and not be undefined');
  });

  test('validateOptions', function() {
    expect(1);
    ok(this.plugin.validateOptions, 'should exist and not be undefined');
  });

  // test('checkType', function() {

  // });

  // test('throttle', function() {

  // });

  test('isTrue', function() {
    expect(2);
    equal(this.plugin.isTrue(1 < 2), true, 'returns true if an expression is truthy');
    equal(this.plugin.isTrue(''), false, 'returns false if an expression is falsy');
  });

  module('jQuery.scrollAway');

  test('throws an error when called as a static method', function() {
    expect(2);
    throws($.scrollAway, 'should throw an error');
    throws($.scrollAway, /No element specified/, 'should show the right error text');
  });

}(jQuery));
