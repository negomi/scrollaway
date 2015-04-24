# scrollAway.js

A simple jQuery plugin that hides elements on scroll down, and reveals them on scroll up.

It's useful for things like fixed top navigation bars, particularly on small screens where you want to maximize screen space for reading when scrolling down.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/github.com/negomi.scrollaway/master/dist/scrollaway.min.js
[max]: https://raw.github.com/github.com/negomi.scrollaway/master/dist/scrollaway.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/scrollaway.min.js"></script>
<script>
jQuery(function($) {
  $('#top-bar').scrollAway();
});
</script>
```

## Documentation
scrollAway.js comes with a sensible set of defaults so it will just work without configuration. You can customize it by passing an object to each scrollAway.js instance, specifying some or all of the following options:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>animation</code></td>
      <td>String</td>
      <td><code>&#39;fade&#39;</code></td>
      <td>The jQuery animation to apply when showing/hiding the element. Accepts either <code>fade</code> or <code>slide</code>. Anything else will toggle the element with no animation.</td>
    </tr>
    <tr>
      <td><code>duration</code></td>
      <td>Number</td>
      <td><code>400</code></td>
      <td>The time (in milliseconds) the animation should take to complete.</td>
    </tr>
    <tr>
      <td><code>easing</code></td>
      <td>String</td>
      <td><code>&#39;swing&#39;</code></td>
      <td>The easing function to use for the animation. Accepts <code>swing</code> or <code>linear</code>.</td>
    </tr>
    <tr>
      <td><code>delay</code></td>
      <td>Number</td>
      <td><code>350</code></td>
      <td>How often to fire the scroll event.</td>
    </tr>
    <tr>
      <td><code>topTriggerDistance</code></td>
      <td>Number</td>
      <td><code>0</code></td>
      <td>How far the user should have scrolled down from the top of the page (in pixels) before triggering the plugin.</td>
    </tr>
    <tr>
      <td><code>bottomTriggerDistance</code></td>
      <td>Number</td>
      <td><code>0</code></td>
      <td>How far the user should have scrolled up from the bottom of the page (in pixels) before triggering the plugin.</td>
    </tr>
    <tr>
      <td><code>autoShowAtBottom</code></td>
      <td>Boolean</td>
      <td><code>true</code></td>
      <td>Whether to show the element when the user reaches the bottom of the page.</td>
    </tr>
  </tbody>
</table>

## Examples
Top bar: http://negomi.github.io/scrollaway/
