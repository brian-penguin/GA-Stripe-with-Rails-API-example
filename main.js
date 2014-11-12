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

Stripe.setPublishableKey('YOUR_PUBLISHABLE_KEY');
