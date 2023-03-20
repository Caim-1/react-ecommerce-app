import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import Loading from "./Loading";
import CartItem from "./CartItem";
import EmptyCartDialog from "./EmptyCartDialog";

export default function Cart({ cart, loading, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQuantity }: any) {
  const EmptyCart = () => (
    <Typography variant='subtitle1' align='center'>There are currently no items in your cart.</Typography>
  )

  const FilledCart = () => (
    <Container>
      <Grid container spacing={3} justifyContent='center'>
        {cart.line_items.map((item: any) => (
          <Grid item xs={12} sm={4} key={item.id} sx={{ marginBottom: '1rem' }} >
            <CartItem item={item} loading={loading} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQuantity={handleUpdateCartQuantity} />
          </Grid>
        ))}
        <Container>
            <Typography variant='h5' align='center' gutterBottom>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <Container sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }} >
              <EmptyCartDialog handleEmptyCart={handleEmptyCart}/>
              <Button component={Link} to='/checkout' size='large' type='button' color='primary' variant='contained' className='checkoutButton'>
                Checkout
              </Button>
            </Container>
        </Container>
      </Grid>
    </Container>
  )

  if (!cart) {
    return <Loading title={'Loading Cart...'} toolbar={true} />
  }

  return (
    <Container sx={{ padding: '24px' }}>
      <div className='toolbar' />
      <Typography variant='h3' align='center' gutterBottom>Your shopping cart</Typography>
      { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  );
}