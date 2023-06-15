import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import Loading from "./Loading";

import { commerce } from "../lib/commerce";

const steps = ['Shipping address', 'Payment details'];

export default function Checkout({ cart, error, order, handleCaptureCheckout }: any) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [shippingData, setShippingData] = useState<any>({});
  const [checkoutToken, setCheckoutToken] = useState<any>(null);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  function timeout() {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  }

  function next(data: any) { // Receives customer shipping data and advances the active step.
    setShippingData(data);
    nextStep();
  }

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    }

    // Only generate a token if there are items in the cart.
    if (cart?.line_items.length > 0) generateToken();
  }, [cart]);

  if (error) {
    <>
      <Typography variant='h5'>Error: {error}</Typography>
      <br />
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </>
  }

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} />
  : <PaymentForm
      backStep={backStep}
      nextStep={nextStep}
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      handleCaptureCheckout={handleCaptureCheckout}
      timeout={timeout}
    />

  return (
    <>
      <div className='toolbar' />
      <div className='checkout-layout'>
        <Paper className='checkout-paper'>
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper activeStep={activeStep} className='checkout-stepper'>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {!checkoutToken && <Loading title={'Loading Checkout...'} toolbar={false} />}
          {activeStep === steps.length // On the last step.
            ? <Confirmation order={order} isFinished={isFinished} />
            : checkoutToken && <Form /> // Only render Form when checkouToken is truthy.
          } 
        </Paper>
      </div>
    </>
  );
}