import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [products, setProducts] = useState<any>();
  const [cart, setCart] = useState<any>();
  const [order, setOrder] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);

    const { data } = await commerce.products.list();

    setProducts(data);

    setLoading(false);
  }

  async function fetchCart() {
    if (!loading) setLoading(true);

    setCart(await commerce.cart.retrieve());

    setLoading(false);
  }

  async function handleAddToCart(productId: string, quantity: number) {
    setLoading(true);

    await commerce.cart.add(productId, quantity);

    toast('Item successfully added to cart!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    fetchCart();
  }

  async function handleUpdateCartQuantity(productId: string, quantity: number) {
    setLoading(true);

    await commerce.cart.update(productId, { quantity });

    fetchCart();
  }

  async function handleRemoveFromCart(productId: string) {
    setLoading(true);

    await commerce.cart.remove(productId);

    toast('Item successfully removed from cart', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    fetchCart();
  }

  async function handleEmptyCart() {
    setLoading(true);

    await commerce.cart.empty();
    await fetchCart();
    
    toast('Cart successfully emptied', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();
    
    setCart(newCart);
  }

  async function handleCaptureCheckout(checkoutTokenId: any, newOrder: any) {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error: any) {
      setErrorMessage(error.data.error.message);

      toast(error.data.error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar cartItems={cart.line_items.length} totalItems={cart?.total_items} loading={loading} />
        <Routes>
          <Route
            path='/'
            element={<Products cart={cart} products={products} loading={loading} handleAddToCart={handleAddToCart} />} />
          <Route
            path='/cart'
            element={<Cart cart={cart} loading={loading} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQuantity={handleUpdateCartQuantity} />} />
          <Route 
            path='/checkout'
            element={<Checkout cart={cart} order={order} error={errorMessage} handleCaptureCheckout={handleCaptureCheckout} />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;