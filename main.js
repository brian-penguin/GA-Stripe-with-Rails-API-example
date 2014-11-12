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

    Stripe.setPublishableKey('YOUR_PUBLISHABLE_KEY');

  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});


