/*! ColorBand - v1.1.0 - 2012-11-03
* https://github.com/deefour/colorBand
* Copyright (c) 2012 Jason Daly and other contributors; Licensed MIT */

;(function ( $, window, undefined ) {
  "use strict";
        
  // Create the defaults once
  var pluginName = 'colorBand',
      document = window.document,
      defaults = {
          height: 8,
          minWidth: 10,
          maxWidth: 50,
          regenOnResize: true,
          regenOnOrientationChange: true,
          ignoreCss: false,
          containerClass: 'colorband',
          units: 'px',
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

      this.options = $.extend( {}, defaults, options);

      var self = this;
      $.each(['height', 'minWidth', 'maxWidth'], function(){
        if (defaults.units != self.options.units || /^\d+$/.test(self.options[this])) {
          self.options[this] = self.options[this].toString().replace(/\D/g, '') + self.options.units;
        }
      });

      this._defaults = defaults;
      this._name = pluginName;
        
      this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.$container = $('<div />').addClass(this.options.containerClass);
      this.$element.prepend(this.$container);

      if (!this.options.ignoreCss) {
        this.$element.css({
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
          height: this.options.height,
          'white-space': 'nowrap',
          'overflow-x': 'hidden',
          'overflow-y': 'visible',
          'line-height': this.options.height
        });
      }

      if (this.options.regenOnResize) {
        $(window).on('resize', $.proxy(this.render, this));
      }

      if (this.options.regenOnOrientationChange) {
        $(window).on('orientationchange', $.proxy(this.render, this));
      }

      this.render();
    },

    render: function(){
      this.$container.width(this.$element.width());
      this.$container.empty();
 
      var chunkCount     = Math.ceil(this.$container.width()/this.options.minWidth),
          containerWidth = this.$container.width(),
          colorCount     = this.options.colors.length,
          lastColorIndex = -1,
          colorBandWidth    = 0,
          colorIndex, chunk, chunkWidth;
    
      while (--chunkCount > 0 && colorBandWidth < containerWidth) {
        colorIndex = Math.floor(Math.random()*colorCount);

        if (this.options.preventSameColorSiblings) {
          while (colorIndex === lastColorIndex) {
            colorIndex = Math.floor(Math.random()*colorCount);
          }
          lastColorIndex = colorIndex;
        }
       
        chunkWidth = Math.floor(Math.random()*(this.options.maxWidth-this.options.minWidth)+this.options.minWidth);
        colorBandWidth += chunkWidth;

        chunk = $('<div />').addClass('chunk').css({
          background: this.options.colors[colorIndex],
          width: chunkWidth + this.options.units
        });

        if (!this.options.ignoreCss) {
          chunk.css({
            height: this.options.height,
            'line-height': this.options.height,
            display: 'inline-block',
            padding: 0,
            margin: 0
          });
        }
       
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

}(jQuery, window));
