import { Grid, Typography } from "@mui/material";
import Loading from "./Loading";
import Product from "./Product";

export default function Products({ products, loading, handleAddToCart }: any) {
  if (!products) {
    return <Loading title={'Loading Products...'} toolbar={true} />
  }

  return (
    <div className='products-content'>
      <div className='toolbar' />
      <Typography variant='h3' align='center' gutterBottom>Available Products</Typography>
      <Grid container justifyContent={"center"} spacing={3}>
        {products.map((product: any) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Product product={product} loading={loading} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}