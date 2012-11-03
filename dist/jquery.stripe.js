/*! ColorBand - v1.0.0 - 2012-11-03
* https://github.com/deefour/colorBand
* Copyright (c) 2012 Jason Daly and other contributors; Licensed MIT */

;(function ( $, undefined ) {
  "use strict";
        
  // Create the defaults once
  var pluginName = 'colorBand',
      document = window.document,
      defaults = {
          propertyName: "value",
          height: "5px",
          minWidth: 10,
          maxWidth: 50,
          regenOnResize: true,
          regenOnOrientationChange: true,
          ignoreCss: false,
          containerId: 'colorBand',
          preventSameColorSiblings: true,
          colors: [
            '#94BFB1',
            '#719071',
            '#EB6861',
            '#F09862',
            '#F8B56C',
            '#FBE688'
          ]
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
      this.element  = element;
      this.$element = $(this.element);

      this.options = $.extend( {}, defaults, options) ;
        
      this._defaults = defaults;
      this._name = pluginName;
        
      this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.$container = $('<div />').prop('id', this.options.containerId);

      if (!this.options.ignoreCss) {
        this.$el.css({
          position: 'relative',
          'padding-top': 0,
          'padding-left': 0,
          'padding-right': 0,
          'margin-top': 0,
          'margin-left': 0,
          'margin-right': 0
        });

        this.$container.css({
          position: 'relative',
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
          height: this.options.height
        });
      }

      if (this.options.regenOnResize) {
        $(window).resize(this.render);
      }

      if (this.options.regenOnOrientationChange) {
        $(window).bind('orientationchange', this.render);
      }

      this.render();
    },

    render: function(){
      this.$container.width(this.$el.width());
      this.$container.empty();
 
      var chunkCount     = Math.ceil(this.$container.width()/this.options.minWidth),
          colorCount     = this.options.colors.length,
          lastColorIndex = -1,
          colorIndex;
    
      while (--chunkCount > 0) {
        colorIndex = Math.floor(Math.random()*colorCount);

        if (this.options.preventSameColorSiblings) {
          while (colorIndex === lastColorIndex) {
            colorIndex = Math.floor(Math.random()*colorCount);
          }
          lastColorIndex = colorIndex;
        }
       
        var chunk = $('<div />').addClass('chunk').css({
          background: this.options.colors[colorIndex],
          width: Math.floor(Math.random()*(this.options.maxWidth-this.options.minWidth)+this.options.minWidth) + 'px'
        });
       
        this.$container.prepend(chunk);
      }
    }
  };

  $.fn[pluginName] = function ( options ) {
      return this.each(function () {
          if (!$.data(this, 'plugin_' + pluginName)) {
              $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
          }
      });
  };

}(jQuery));