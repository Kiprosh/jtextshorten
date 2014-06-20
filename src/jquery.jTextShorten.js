(function($){
  DEFAULT_CLASS = 'shortened';

  var _defaults, methods, see_more_tag;

  var _defaults = {
    elementIdentifier: 'truncate_identifier',
    ellipsesText: '...',    // To truncate text with
    lessText: 'See less',   // Display text when is expanded
    limitChars: 300,        // Limit characters to truncate
    moreText: 'See more'    // Display text when string is truncated
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
            $this.addClass(DEFAULT_CLASS + ' ' + settings.elementIdentifier);
            if($this.siblings('.see_more, .see_less').length > EMPTY) {
              $this.siblings('.see_more, .see_less').remove();
            }
            see_more_tag = "<span class='see_more blue'>See more</span>";
            $(see_more_tag).insertAfter($this);
          }

          $('span.see_more').live('click', function(e) {
            $(this).removeClass('see_more').addClass('see_less').text(settings.lessText).
              siblings('.' + settings.elementIdentifier).removeClass(DEFAULT_CLASS);
          });

          $('span.see_less').live('click', function(e) {
            $(this).removeClass('see_less').addClass('see_more').text(settings.moreText).
              siblings('.'+ settings.elementIdentifier).addClass(DEFAULT_CLASS);
          });
        });
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
