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
