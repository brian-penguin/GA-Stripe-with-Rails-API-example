class ChargesController < ApplicationController
  respond_to :json

  def create
    # Charge amount in pennies
    @amount = 500

    # Create a customer using and email and card token
    # The stripeToken is created for us by Stripe's Checkout
    customer = Stripe::Customer.create(
      :email => 'BigBossBrian@stripe.com',
      :card => params[:stripeToken]
    )

    # Create a charge using the customer and amount
    #   Description is optional
    charge = Stripe::Charge.create(
      :customer => customer.id,
      :amount => @amount,
      :description => 'Rails Stripe Customer',
      :currency => 'usd'
    )

    render json: @amount, status: 'ok'
  # In case of invalid card or failed charge
  # rescue Stripe::CardError => e

  end

  # def charges_params
  #   params.require(:charge).permit(:stripeToken)
  # end

end
