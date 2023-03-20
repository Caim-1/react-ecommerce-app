import { Button, Divider, Typography } from "@mui/material";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "./Loading";
import Review from "./Review";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentForm({ checkoutToken, shippingData, backStep, nextStep, handleCaptureCheckout, timeout }: any) {
  async function handleSubmit(event: any, elements: any, stripe: any) {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption
        },
        billing: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        payment: {
          gateway: 'gway_M5QZ1v91pe8alZ',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }

      handleCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br /> 
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' color='primary' variant='contained' disabled={!stripe}>
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>  
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}