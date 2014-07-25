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
          var uniq_stamp = generateUniqStamp();
          var settings = $.extend({}, _defaults);
          var excluded_tags = ["INPUT", "IMG", "SELECT", "IFRAME"];
          settings.unique_identity = uniq_stamp;

          if($.inArray(this.tagName, excluded_tags) == -1) {
            if (options) {
              settings   = $.extend(settings, options);
              settings.limitChars = parseInt(settings.limitChars);
            }

            if (!$.data(this, 'shortened'))
              $this.data('shortened', settings);

            determineTextLength($this, uniq_stamp, settings);

            $(document).on( 'click', '.ui-see_more', function(e) {
              expand($this);
            });

            $(document).on( 'click', '.ui-see_less', function(e) {
              collapse($this);
            });
          }
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

    function collapse(element) {
      options =  element.data('shortened');
      $(".ui-see_less[data-uniq=" + options.unique_identity + "]").removeClass('ui-see_less').
        addClass('ui-see_more').text(options.moreText);
      $(element).addClass(DEFAULT_CLASS);
    };

    function expand(element) {
      options =  element.data('shortened');
      $(".ui-see_more[data-uniq=" + options.unique_identity + "]").removeClass('ui-see_more').
        addClass('ui-see_less').text(options.lessText);
      $(element).removeClass(DEFAULT_CLASS);
    };

    function generateUniqStamp() {
      return Math.round((new Date()).getTime() / 100);
    }

    function determineTextLength(element, stamp, settings) {
      if (element.text().length > settings.limitChars) {
        element.addClass(DEFAULT_CLASS);
        if (element.next('.ui-see_more, .ui-see_less').length > EMPTY) {
          element.next('.ui-see_more, .ui-see_less').remove();
        }
        element.attr('data-uniq', stamp);
        see_more_tag = "<span class='ui-see_more ui-blue' data-uniq=" + stamp + ">See more</span>";
        $(see_more_tag).insertAfter(element);
      }
    }

  // Plugin entry
  $.fn.shortened = function(method)
  {
    if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
    else if(typeof method === 'object' || !method) { return methods.init.apply(this, arguments); }
    else { $.error('Method ' + method + ' does not exist on jQuery.shortened'); }
  }
}(jQuery));
