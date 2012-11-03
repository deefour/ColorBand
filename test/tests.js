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

  equal($('.container').data('plugin_colorBand').options.height, '8px', 'height has units appended when no units provided');
});

test('does NOT append default unit to height when units are provided', function(){
  $('.container').colorBand({ height: '8em' });

  equal($('.container').data('plugin_colorBand').options.height, '8em', 'height maintains units when specified through instantiation of the color band');
});

test('units can be overridden', function(){
  $('.container').colorBand({ height: 8, units: 'em' });

  equal($('.container').data('plugin_colorBand').options.height, '8em', 'height adopts default units when units are specified through instantiation of the color band');
});