# ColorBand

Decorative bands for DOM elements with jQuery

(c) 2012 Jason Daly (jason@deefour.me)

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

### Options

Below are the options that can be passed to a `.colorBand()` invocation as an `options` object.

```javascript
height: 8,                  // The thickness of the band
minWidth: 10,                   // Minimum width of each 'chunk' in the band
maxWidth: 50,                   // Maximum width of each 'chunk' in the band
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

## Changelog

### Version 1.1.0 - November 03 2012

 - `units` option added
 - `height` option can now have a unit specified or omitted; when specified they will simply be stripped and the `units` option will be appended as the unit of measure

### Version 1.0.0 - November 03 2012

Initial project release

 - Minimal tests using [Qunit](http://qunitjs.com/)
 - Build process is done with [grunt](https://github.com/gruntjs/grunt)