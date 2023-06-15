An e-commerce web application where you can add products to cart, change quantities of items and proceed to checkout. Built with commerce.js and stripe.

Notes:
The application is slow on processing the api requests because it utilizes free testing tiers of chec and stripe.

The input fields in the AddressForm component get automatically cleared which is caused by React's StrictMode;
It causes the useEffect hook that is contained in the Checkout component to run twice (or sometimes even three times),
which in turn causes the inputs to re-render(?) resulting in potential loss of user input.
That only happens when React's StrictMode is utilized and only on dev, not on production.
