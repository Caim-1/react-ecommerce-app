import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

export default function Product({ product, loading, handleAddToCart }: any) {
  return (
    <Card className='product-root'>
      <CardMedia
        component='img'
        sx={{ height: '240px', objectFit: 'contain' }}
        title={product.name}
        image={product.image.url}
       />
      <CardContent>
        <div className='product-card-content'>
          <Typography variant='h5' title={product.name} noWrap gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5'>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: product.description }} />
      </CardContent>
      <CardActions disableSpacing className='product-card-actions'>
        <IconButton
          disabled={loading}
          title='Add to Cart'
          aria-label='Add to Cart'
          onClick={() => handleAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

// aria-label is used to provide an alternative in the form of text when the element can't be rendered item.quantity !== 0 && 