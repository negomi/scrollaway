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

| Option | Type | Default | Description |
| ------------------------------------- |
| `animation` | String | `'fade'` | The jQuery animation to apply when showing/hiding the element. Accepts either `fade` or `slide`. Anything else will toggle the element with no animation. |
| `duration` | Number | `400` | The time (in milliseconds) the animation should take to complete. |
| `easing` | String | `'swing'` | The easing function to use for the animation. Accepts `swing` or `linear`. |
| `delay` | Number | `350` | How often to fire the scroll event. |
| `topTriggerDistance` | Number | `0` | How far the user should have scrolled from the top of the page (in pixels) before triggering the plugin on scroll down. |
| `bottomTriggerDistance` | Number | `0` | How far the user should be from the bottom of the page (in pixels) before triggering the plugin on scroll up. |
| `autoShowAtBottom` | Boolean | `true` | Whether to show the element regardless of scroll direction when the user has reached the bottom of the page. |


## Examples
_(Coming soon)_
