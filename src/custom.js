$(document).ready(function() {
  var text;

  $('.jt-default').shortened();
  $('.jt-bip').shortened();
  $('.jt-destroy').shortened();

  $('button').click(function() {
    $('.jt-destroy').shortened('destroy');
  });

  $('.jt-bip').best_in_place();

  $(document).on('focusout', 'input', function() {
    text = $(this).val();
  });

  $(document).on("best_in_place:error", function(event, request, error) {
      $('.jt-bip').shortened('destroy');
      $('.jt-bip').text(text);
      $('.jt-bip').shortened();
  });
});
