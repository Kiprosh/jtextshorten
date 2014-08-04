(function($){
  DEFAULT_CLASS = 'ui-shortened';
  EMPTY         = 0;

  var _defaults, methods, see_more_tag;

  var _defaults = {
    lessText:       'See less', // Display text when expanded
    limitChars:     300,        // Limit characters to truncate
    moreText:       'See more'  // Display text when string is truncated
  };

  methods = {
    init: function(options)
      {
        return this.each(function()
        {
          var $this = $(this);
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
          }
          else{
            var tag = $(this).prop("tagName");
            throw new Error("jQuery.shortened cannot be applied on " + tag + " tag.");
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
    var options =  element.data('shortened');
    $(".ui-see_less[data-uniq=" + options.unique_identity + "]").removeClass('ui-see_less').
      addClass('ui-see_more').text(options.moreText);
    $(element).addClass(DEFAULT_CLASS);
    var text = element.text().substr(0, options['limitChars']);
    element.html(text);
  };

  function expand(element) {
    var options =  element.data('shortened');
    $(".ui-see_more[data-uniq=" + options.unique_identity + "]").removeClass('ui-see_more').
      addClass('ui-see_less').text(options.lessText);
    $(element).removeClass(DEFAULT_CLASS);
    $(element).html($(element).attr('data-content'));
  };

  function generateUniqStamp() {
    return Math.round(Math.random()*1E16);
  }

  function determineTextLength(element, stamp, settings) {
    if (element.text().length > settings.limitChars) {
      element.addClass(DEFAULT_CLASS);
      if (element.next('.ui-see_more, .ui-see_less').length > EMPTY) {
        element.next('.ui-see_more, .ui-see_less').remove();
      }
      element.attr({'data-uniq': stamp, 'data-content': element.text()});
      var text = element.text().substr(0, settings.limitChars);
      element.html(text);
      see_more_tag = "<span class='ui-see_more ui-blue' data-uniq=" + stamp + ">See more</span>";
      $(see_more_tag).insertAfter(element);
    }
  }

  // Click on see more
  $(document).on( 'click', '.ui-see_more', function(e) {
    var shortenedDiv = $(this).prev();
    expand(shortenedDiv);
  });

  // Click on see less
  $(document).on( 'click', '.ui-see_less', function(e) {
    var shortenedDiv = $(this).prev();
    collapse(shortenedDiv);
  });

  // Plugin entry
  $.fn.shortened = function(method)
  {
    if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
    else if(typeof method === 'object' || !method) { return methods.init.apply(this, arguments); }
    else { $.error('Method ' + method + ' does not exist on jQuery.shortened'); }
  }
}(jQuery));
