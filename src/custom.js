$( document ).ready(function() {
  var text, data;
  $( '.jt-default' ).shortened();
  $( '.jt-bip' ).shortened();
  $( '.jt-destroy' ).shortened();
  $( '.jt-limitchar' ).shortened( { limitChars: 100 } );
  $( 'button' ).click(function() {
    $( '.jt-destroy' ).shortened( 'destroy' );
  });
  $( '.jt-bip' ).best_in_place();

  $( document ).on( 'focusout', 'input', function() {
    text = $( this ).val();
  });

  $( document ).on( 'focusin', 'input', function() {
    data = $( this ).closest( '.jt-bip' ).attr( 'data-content' );
    $( this ).val( data );
  });

  $( document ).on( "best_in_place:error", function( event, request, error ) {
    if ( text != "" ){
      $( '.jt-bip' ).text( text );
      $( '.jt-bip' ).attr( 'data-content', text );
    }
    else {
      $( '.jt-bip' ).text( "default" );
      $( '.jt-bip' ).attr( 'data-content', "default" );
    }
    $( '.jt-bip' ).shortened( 'destroy' );
    $( '.jt-bip' ).shortened();
  });
});
