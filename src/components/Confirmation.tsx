import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Confirmation({ order, isFinished }: any) {

  if (!order.customer) {
    return (
      <div className='spinner' style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  if (isFinished) { // Without credit card
    <div>
      <Typography variant='h5'>Thank you for your purchase</Typography>
      <Divider className='divider' />
      <Typography variant='subtitle2'>Order ref</Typography>
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
      <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
      <Divider className='divider' />
      <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
      <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
    </div>
  );
}