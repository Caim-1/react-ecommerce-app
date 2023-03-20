import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

export default function CartItem({ item, loading, handleRemoveFromCart, handleUpdateCartQuantity }: any) {
  return (
    <Card className='product-root'>
      <CardMedia
        component='img'
        sx={{ height: '240px', objectFit: 'contain' }}
        title={item.name}
        image={item.image.url} />
      <CardContent className='cartItem-card-content'>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className='cartItem-card-actions'>
        <div className='cartItem-buttons'>
          <Button size='small' type='button' disabled={loading} onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button size='small' type='button' disabled={loading} onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>
        <Button type='button' color='error' variant='contained' disabled={loading} onClick={() => handleRemoveFromCart(item.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

// add alt to CardMedia