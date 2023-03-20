import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { ShoppingCart, Home } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/commerce.png';
import ReactLoading from 'react-loading';

export default function Navbar({ totalItems, loading }: any) {
  const location = useLocation();

  return (
    <>
      <AppBar position='fixed' className='nav-app-bar' color='inherit'>
        <Toolbar>
          <Typography component={Link} to='/' variant='h6' className='nav-title' color='inherit'>
            <img src={logo} alt='Commerce.js' height='25px' className='nav-image' />
            Commerce.js
          </Typography>
          <div className='nav-grow' />
          {location.pathname === '/' && ( !loading &&
            <div className='nav-button'>
              <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit' title={totalItems === 1 ? `There is 1 item in your cart` : `There are currently ${totalItems} items in your cart`}>
                <Badge badgeContent={totalItems} color='info'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
          {location.pathname !== '/' &&
            <div className='nav-button'>
              <IconButton component={Link} to='/' aria-label='Back to home' color='inherit' title='Back to home'>
                <Home />
              </IconButton>
            </div>
          }
          {loading && <ReactLoading type={'spin'} color={'black'} height={'20px'} width={'20px'} />}
        </Toolbar>
      </AppBar>
    </>
  );
}