(function($){
  DEFAULT_CLASS = 'ui-shortened';
  EMPTY         = 0;

  var _defaults, methods, see_more_tag;

  var _defaults = {
    lessText:          'See less', // Display text when expanded
    limitChars:        300,        // Limit characters to truncate
    moreText:          'See more'  // Display text when string is truncated
  };

  methods = {
    init: function(options)
      {
        return this.each(function()
        {
          var $this    = $(this);

          var settings = $.extend({}, _defaults);

          if (options) {
            settings   = $.extend(settings, options);
            settings.limitChars = parseInt(settings.limitChars);
          }

          if (!$.data(this, 'shortened'))
            $this.data('shortened', settings);

          if ($this.text().length > settings.limitChars) {
            $this.addClass(DEFAULT_CLASS);
            if($this.siblings('.ui-see_more, .ui-see_less').length > EMPTY) {
              $this.siblings('.ui-see_more, .ui-see_less').remove();
            }
            see_more_tag = "<span class='ui-see_more ui-blue'>See more</span>";
            $(see_more_tag).insertAfter($this);
          }

          // $('span.see_more').live('click', function(e) {
          //   $(this).removeClass('see_more').addClass('see_less').text(settings.lessText).
          //     siblings('.' + settings.elementIdentifier).removeClass(DEFAULT_CLASS);
          // });

          // $('span.see_less').live('click', function(e) {
          //   $(this).removeClass('see_less').addClass('see_more').text(settings.moreText).
          //     siblings('.'+ settings.elementIdentifier).addClass(DEFAULT_CLASS);
          // });
        });
      },

      destroy: function() {
        $this = $(this);

        $this.siblings('.ui-see_more, .ui-see_less').remove();
        $this.removeClass(DEFAULT_CLASS);
        $this.removeData('shortened');
        return $this;
      }
    };

  // Plugin entry
  $.fn.shortened = function(method)
  {
    if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
    else if(typeof method === 'object' || !method) { return methods.init.apply(this, arguments); }
    else { $.error('Method ' + method + ' does not exist on jQuery.shortened'); }
  }
}(jQuery));
