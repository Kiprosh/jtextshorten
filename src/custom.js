$(document).ready(function() {
  $('.readonly').shortened();

  $('button').click(function() {
    $('#destroy .readonly').shortened('destroy');
  });
});
