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