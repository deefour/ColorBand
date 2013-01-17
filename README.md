# ColorBand

[![Build Status](https://secure.travis-ci.org/deefour/ColorBand.png)](http://travis-ci.org/deefour/ColorBand)

Decorative bands for DOM elements with jQuery

(c) 2012 Jason Daly <jason@deefour.me> (http://deefour.me)

Released under The MIT License.

## Description

ColorBand is a simple jQuery plugin for rendering decorative color bands on DOM elements.

## Source

Browse at http://github.com/deefour/ColorBand/tree/master or clone from `git://github.com/deefour/ColorBand.git`.

## Usage

 1. Include a copy of `dist/jquery.colorband.js` or `dist/jquery.colorband.min.js` in your application's assets directory.
 2. Insert the necessary `<script>` element in your document, just before the `</body>` tag.

      ```html
        <script src="/assets/jquery.colorband.min.js"></script>
      </body>
      ```

 3. Initialize ColorBand on the element(s) in a `$.ready` event handler.

      ```javascript
      $(function(){
        $('body').colorBand();
      });
      ```

### Examples

Add a band across the top of the viewport by attaching it to the `<body>`

```javascript
$('body').colorBand();
```

or to a series of elements using any valid jQuery selector

```javascript
$('.widget .header').colorBand();
```

Make the band as thick as you want

```javascript
$('body').colorBand({ height: '32px' });
```

Provide your own set of colors

```javascript
$('body').colorBand({ 
  colors: [ // Solarized colors from http://ethanschoonover.com/solarized
    '#B58900',
    '#CB4B16',
    '#DC322F',
    '#D33682',
    '#6C71C4',
    '#268BD2',
    '#2AA198',
    '#859900',
  ]
});
```

Use only long 'chunks'

```javascript
$('body').colorBand({
  minWidth: '100',
  maxWidth: '200'
});
```

Make every chunk the same size

```javascript
$('body').colorBand({
  minWidth: '100',
  maxWidth: '100'
});
```

Specify a custom pattern

```javascript
$('body').colorBand({
  pattern: '1637482642742', // each character maps to an index in the colors option
  colors: [ // Solarized colors from http://ethanschoonover.com/solarized
    '#B58900',
    '#CB4B16',
    '#DC322F',
    '#D33682',
    '#6C71C4',
    '#268BD2',
    '#2AA198',
    '#859900',
  ]
});
```

User-defined functions can be used to specify custom patterns too

```javascript
$('body').colorBand({
  pattern: function (lastColorIndex) { // selects random index from 1/3 of this.options.colors based on hour in the day
    var min = Math.floor((new Date).getHours() / this.options.colors.length) * 3;
    return Math.round(min + Math.random()*2);
  },
  colors: [ // Solarized colors from http://ethanschoonover.com/solarized
    '#B58900',
    '#CB4B16',
    '#DC322F',
    '#D33682',
    '#6C71C4',
    '#268BD2',
    '#2AA198',
    '#859900',
  ]
});
```

### Options

Below are the options that can be passed to a `.colorBand()` invocation as an `options` object.

```javascript
height: 8,                      // The thickness of the band
minWidth: 10,                   // Minimum width of each 'chunk' in the band
maxWidth: 50,                   // Maximum width of each 'chunk' in the band
mode: 'auto',                   // Method for rendering the band  auto|html|canvas
pattern: 'random',              // Specifies the pattern to use for the colored ordering of the chunks
                                //   - 'random': selects a random color from the colors option
                                //   - 'sequential': repeatedly loops through the colors option in the order they appear in the array
                                //   - '12121234' or [1,2,1,2,1,2,3,4]: (custom) per-character index mapping agains the colors option
                                //   - (function): A user-defined function, returning an integer matching an index value in the range of the colors option's array
regenOnResize: true,            // Causes the band to re-render when the browser resizes
regenOnOrientationChange: true, // Causes the band to re-render when the 
ignoreCss: false,               // Skips the application of CSS to make the band look 'right'.
                                // When true you must provide your own CSS for the band's container and chunks
containerClass: 'colorband',    // Class name to apply to each color band
units: 'px',                    // Unit of measure for the width and height each 'chunk' and the color band itself
preventSameColorSiblings: true, // Prevents chunks that are side by side from being the same color as one another
colors: [                       // Array of arbitrary length containing valid CSS background-color values (rgb strings are fine)
  '#94BFB1',
  '#719071',
  '#EB6861',
  '#F09862',
  '#F8B56C',
  '#FBE688'
]
```

### Notes

 - Units of measure set directly on the `height`, `minWidth`, or `maxWidth` options are stripped. The `units` option should be used to alter the unit of measure for the color band.
 - The `mode` option is set to `auto` by default. If the client supports the HTML `<canvas>` tag, a single canvas will be used for each color band rendered. If the `mode` is explicitly set to `html` or the client does not support the `<canvas>` tag, HTML `<div>` elements will be used for each chunk in each color band.
 - The `preventSameColorSiblings` option is ignored unless the `pattern` option is set to `random` *(the default)* or a user-defined function.
 - The user-defined function `pattern` option's `this` context is bound to the ColorBand instance itself, giving you full access and control over
 the class instance including manipulating existing properties and options, as well as adding your own.

## Changelog

### Version 1.4.0 - November 07 2012

User-defined function now accepted as pattern mode

 - Passing a function to the `pattern` option that returns an in-range index corresponding to an item in `this.options.colors` is now supported

### Version 1.3.0 - November 05 2012

Pattern modes available

 - New `pattern` option now available for specifying the selection method for the color of each chunk in the color bar

### Version 1.2.0 - November 04 2012

Render modes available

 - New `mode` option now available for specifying how the color bands should be rendered
 - Color bands will now be rendered via a `<canvas>` tag by default *(as long as the client supports it)*

### Version 1.1.0 - November 03 2012

 - `units` option added
 - `height` option can now have a unit specified or omitted; when specified they will simply be stripped and the `units` option will be appended as the unit of measure

### Version 1.0.0 - November 03 2012

Initial project release

 - Minimal tests using [Qunit](http://qunitjs.com/)
 - Build process is done with [grunt](https://github.com/gruntjs/grunt)