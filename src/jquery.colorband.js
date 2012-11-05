;(function ( $, window, undefined ) {
  "use strict";
        
  // Create the defaults once
  var pluginName = 'colorBand',
      document = window.document,
      defaults = {
          height: 8,
          minWidth: 10,
          maxWidth: 50,
          mode: 'auto',
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
        self.options[this] = +self.options[this].toString().replace(/\D/g, '');
      });

      this._mode = this.options.mode;
      if (this._mode === 'auto') {
        this._mode = this._isCanvasSupported() ? 'canvas' : 'html';
      } else if (this._mode === 'canvas' && !this._isCanvasSupported()) {
        return; // die if 'canvas' mode was specified but it's not supported by the client
      }

      this._defaults = defaults;
      this._name = pluginName;
        
      this.init();
  }

  Plugin.prototype = {
    init: function () {
      if (!this.options.ignoreCss) {
        this.$element.css({
          position: 'relative',
          'padding-top': 0,
          'padding-left': 0,
          'padding-right': 0,
          'margin-top': 0,
          'margin-left': 0,
          'margin-right': 0,
          'line-height': 1
        });
      }

      if (this._mode === 'html') {
        this.$container = $('<div />').addClass(this.options.containerClass);

        if (!this.options.ignoreCss) {
          this.$container.css({
            position: 'relative',
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            height: this.options.height + this.options.units,
            'white-space': 'nowrap',
            'overflow-x': 'hidden',
            'overflow-y': 'visible',
            'line-height': this.options.height + this.options.units
          });
        }
      } else { // 'canvas' mode
        this.$container = $('<canvas />').addClass(this.options.containerClass);

        this.$container.attr({
          height: this.options.height
        });

        if (!this.options.ignoreCss) {
          this.$container.css({
            position: 'relative',
            margin: 0,
            padding: 0,
            'line-height': this.options.height + this.options.units
          });
        }
      }

      this.$element.prepend(this.$container);

      if (this.options.regenOnResize) {
        $(window).on('resize', $.proxy(this.render, this));
      }

      if (this.options.regenOnOrientationChange) {
        $(window).on('orientationchange', $.proxy(this.render, this));
      }

      this.render();
    },

    _reset: function(){
      if (this._mode === 'html') {
        this.$container.empty();
        this.$container.width(this.$element.width());
      } else {
        var c   = this.$container.get(0),
            ctx = c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);
        this.$container.attr('width', this.$element.width());
      }
    },

    _renderChunk: function(colorIndex, chunkWidth, colorBandWidth) {
      if (this._mode === 'html') {
        var chunk = $('<div />').addClass('chunk').css({
          background: this.options.colors[colorIndex],
          width: chunkWidth + this.options.units
        });

        if (!this.options.ignoreCss) {
          chunk.css({
            height: this.options.height + this.options.units,
            'line-height': this.options.height + this.options.units,
            display: 'inline-block',
            padding: 0,
            margin: 0
          });
        }
       
        this.$container.prepend(chunk);
      } else {
        var ctx = this.$container.get(0).getContext('2d');
        ctx.fillStyle = this.options.colors[colorIndex];
        ctx.fillRect(colorBandWidth+1, 0, colorBandWidth+1+chunkWidth, this.options.height);
      }
    },

    render: function(){
      this._reset();
 
      var chunkCount     = Math.ceil(this.$container.width()/this.options.minWidth),
          containerWidth = this.$container.width(),
          colorCount     = this.options.colors.length,
          lastColorIndex = -1,
          colorBandWidth = -1,
          colorIndex, chunkWidth;
      
      while (--chunkCount > 0 && colorBandWidth < containerWidth) {
        colorIndex = Math.floor(Math.random()*colorCount);

        if (this.options.preventSameColorSiblings) {
          while (colorIndex === lastColorIndex) {
            colorIndex = Math.floor(Math.random()*colorCount);
          }
          lastColorIndex = colorIndex;
        }
       
        chunkWidth = Math.floor(Math.random()*(this.options.maxWidth-this.options.minWidth)+this.options.minWidth);
        
        this._renderChunk(colorIndex, chunkWidth, colorBandWidth);

        colorBandWidth += chunkWidth;
      }
    },

    // @see http://goo.gl/9PYP3
    _isCanvasSupported: function(){
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
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