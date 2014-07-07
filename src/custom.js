$(document).ready(function() {
  var text;

  $('.readonly').shortened();

  $('button').click(function() {
    $('#destroy .readonly').shortened('destroy');
  });

  $('#bip .readonly').best_in_place();

  $(document).on('focusout', 'input', function() {
    text = $(this).val();
  });

  $(document).on("best_in_place:error", function(event, request, error) {
      $('#bip .readonly').shortened('destroy');
      $('#bip .readonly').text(text);
      $('#bip .readonly').shortened();
  });
});
