/*
What I want to do:
- Create a form for stripe order
- Submit that form via ajax w/ publishable key
- From the response get the token
- Ajax the token to Rails api
...
RAILS API
- Sets the Stripe client
- Creates the charge
- responds with success!
*/

$(document).ready(function() {
    console.log( "ready!" );

    // Set the Stripe Key on Doc load
    Stripe.setPublishableKey('pk_test_BTBy2xVMMlqrvoRZr1DRY8W5');

  // form submit handler
  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    // Create a token for the card -> send to response handler
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    // - could also just use prevent default
    return false;
  });

  // Token creator call back function
  function stripeResponseHandler(status, response) {
    var $form = $('#payment-form');

    // Check for errors and render/reset
    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      // Reactivate the form submit
      $form.find('button').prop('disabled', false);
    }
    else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // alert('Success token is ' + token);

      sendChargeTokenToRails(token);

// -------------------------------------------------------------
      // this appends the token as a hidden field on the form
      //$form.append($('<input type="hidden" name="stripeToken" />').val(token));

      // this line refreshes the page again
      // $form.get(0).submit();
    }
  }

  var sendChargeTokenToRails = function(token){
    $.ajax({
      url: 'http://localhost:3000/charges',
      type: 'POST',
      dataType: 'json',
      data: {stripeToken: token},
    })
    .done(function() {
      alert("success");
    })
    .fail( function(xhr, textStatus, errorThrown) {
        alert(xhr.responseText);
        alert(textStatus);
    })
    .always(function() {
      console.log("complete");
    });

  };

});


