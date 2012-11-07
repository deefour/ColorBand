function getChunk(index) {
  return $($('.colorband').find('.chunk')[index]);
}



test('is chainable', function(){
  ok($('.container').colorBand().addClass('chained'), 'is chainable');
  ok($('.container').hasClass('chained'), 'class was added through chaining');
});

test('attaches instance to DOM element', function(){
  $('.container').colorBand();

  notStrictEqual($('.container').data('plugin_colorBand'), null, 'jQuery data storage exists for the plugin');
});

test('can apply to non-.container element', function(){
  $('.container').colorBand();

  equal($('.container').find('.' + $('.container').data('plugin_colorBand').options.containerClass).length, 1, 'can be applied to non-.container element');
});

test('can ignore CSS application', function(){
  $('.container').colorBand({ ignoreCss: true });

  equal($('.container').data('plugin_colorBand').options.ignoreCss, true, 'ignoreCSS option was set properly');
  notEqual($('.container').css('position'), 'relative', 'CSS was ignored for target element');
  notEqual($('.colorband').css('position'), 'relative', 'CSS was ignored for the container');
});

test('appends default unit to height when not provided', function(){
  $('.container').colorBand({ height: 8 });
  
  var plugin = $('.container').data('plugin_colorBand');

  equal(plugin.options.height + plugin.options.units, '8px', 'height has units appended when no units provided');
});

test('strips units applied to height or minWidth or maxWidth', function(){
  $('.container').colorBand({ height: '8em', minWidth: '8ex', maxWidth: 8 });

  var plugin = $('.container').data('plugin_colorBand');

  equal(plugin.options.height, 8, 'height has units stripped');
  equal(plugin.options.minWidth, 8, 'height has units stripped');
  equal(plugin.options.maxWidth, 8, 'height has units stripped');
});

test('units can be overridden', function(){
  $('.container').colorBand({ height: 8, units: 'em' });

  var plugin = $('.container').data('plugin_colorBand');

  equal(plugin.options.height + plugin.options.units, '8em', 'height adopts default units when units are specified through instantiation of the color band');
});

test('units on options will be stripped if units option is specified', function(){
  $('.container').colorBand({ height: '8px', units: 'em' });

  var plugin = $('.container').data('plugin_colorBand');

  equal(plugin.options.height + plugin.options.units, '8em', 'height adopts overridden default unit when specified');
});

test('if canvas is supported it will be used when mode is set to auto', function(){
  $('.container').colorBand();

  ok($('.colorband').prop('tagName').toLowerCase() === 'canvas', 'the color band container is a canvas tag');  
});

test('if html mode is specified, divs will be rendered', function(){
  $('.container').colorBand({ mode: 'html' });

  ok($('.colorband').find('.chunk').length > 0, 'div tags are found within the color band container');
});




test('render pattern is random by default', function(){
  $('.container').colorBand({ 
    mode: 'html',
    colors: ["rgb(255,0,0)", "rgb(255,255,0)", "rgb(255,0,255)", "rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,255,255)"]
  });

  var plugin = $('.container').data('plugin_colorBand');

  equal(plugin.options.pattern, 'random', 'the pattern option is random');
});

test('sequential pattern renders colors sequentially', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];

  $('.container').colorBand({ 
    mode: 'html',
    pattern: 'sequential',
    colors: colors
  });

  var plugin = $('.container').data('plugin_colorBand');

  equal(getChunk(0).css('background-color'), colors[0], 'first chunk color was selected sequentially');
  equal(getChunk(1).css('background-color'), colors[1], 'second chunk color was selected sequentially');

  plugin.render();

  equal(getChunk(0).css('background-color'), colors[0], 'new render: first chunk color was selected sequentially');
  equal(getChunk(1).css('background-color'), colors[1], 'new render: second chunk color was selected sequentially');  
});

test('sequential pattern ignores preventSameColorSiblings option', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];

  $('.container').colorBand({ 
    mode: 'html',
    pattern: 'sequential',
    colors: colors
  });

  equal(getChunk(1).css('background-color'), colors[1], 'second chunk color was selected sequentially; not modified because it was a duplicate of the previous color');
});

test('custom pattern accepts a string of integers', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];
  
  $('.container').colorBand({ 
    mode: 'html',
    pattern: '121213',
    colors: colors
  });

  equal(getChunk(2).css('background-color'), colors[1], 'custom pattern as string is parsed properly');
});

test('custom pattern accepts array of integers', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];

  $('.container').colorBand({ 
    mode: 'html',
    pattern: '121213'.split(''),
    colors: colors
  });

  equal(getChunk(2).css('background-color'), colors[1], 'custom pattern as string is parsed properly');
});

test('custom pattern ignores preventSameColorSiblings option', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];

  $('.container').colorBand({ 
    mode: 'html',
    pattern: '112'.split(''),
    colors: colors
  });

  equal(getChunk(0).css('background-color'), colors[1], 'first chunk is colored properly');
  equal(getChunk(1).css('background-color'), colors[1], 'second chunk match its sibling properly');
});

test('function can be used for pattern', function(){
  var colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 255)"];

  $('.container').colorBand({ 
    mode: 'html',
    pattern: function(lastColorIndex) {
      return 1;
    },
    preventSameColorSiblings: false,
    colors: colors
  });

  equal(getChunk(0).css('background-color'), colors[1], 'first chunk is colored properly');
  equal(getChunk(1).css('background-color'), colors[1], 'second chunk match its sibling properly');
});