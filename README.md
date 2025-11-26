# Hair Wig Store - E-commerce Website

A modern, fully-functional static e-commerce website for selling hair wigs with integrated payment gateway support.

## Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse through a variety of hair wigs with detailed descriptions
- **Shopping Cart**: Add/remove products, adjust quantities, persistent cart using localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Filtering**: Sort by price, category, and name
- **Featured Products**: Showcase highlighted products on the homepage

### 💳 Payment Gateway Integration
- **Stripe Integration**: Accept credit/debit card payments securely
- **PayPal Integration**: Alternative payment method for customer convenience
- **Secure Checkout**: SSL-encrypted payment processing
- **Order Summary**: Clear breakdown of costs including tax and shipping

### 📄 Pages Included
- **Home**: Landing page with hero section and featured products
- **Products**: Complete product catalog with filters
- **Cart**: Shopping cart management
- **Checkout**: Secure payment processing
- **Success**: Order confirmation page
- **About**: Company information
- **Contact**: Contact form and information
- **Privacy**: Privacy policy page

## Setup Instructions

### 1. Basic Setup
Simply open `index.html` in a web browser to view the website locally. No build process required!

### 2. Payment Gateway Configuration

#### Stripe Setup
1. Sign up for a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Open `js/checkout.js`
4. Replace `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE` with your actual Stripe publishable key:
   ```javascript
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_actual_key_here';
   ```

#### PayPal Setup
1. Sign up for a PayPal Developer account at [https://developer.paypal.com](https://developer.paypal.com)
2. Create a new app to get your client ID
3. Open `checkout.html`
4. Replace `YOUR_PAYPAL_CLIENT_ID` in the PayPal script tag:
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_ACTUAL_CLIENT_ID&currency=USD"></script>
   ```

### 3. Customization

#### Adding Products
Edit `js/products-data.js` to add, remove, or modify products:
```javascript
{
    id: 13,
    name: "Your Product Name",
    description: "Product description",
    price: 299.99,
    category: "long", // long, short, curly, straight
    image: null, // or path to image
    featured: true // show on homepage
}
```

#### Adding Product Images
1. Place images in the `images/products/` directory
2. Update the `image` property in `js/products-data.js`:
   ```javascript
   image: "images/products/your-image.jpg"
   ```

#### Styling
- Modify `css/style.css` to customize colors, fonts, and layout
- CSS variables are defined at the top of the file for easy theming:
  ```css
  :root {
      --primary-color: #8b4789;
      --secondary-color: #d4a5d4;
      /* ... */
  }
  ```

## Deployment

### Option 1: GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch and save
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify
1. Sign up at [https://netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be live instantly with a custom URL

### Option 3: Vercel
1. Sign up at [https://vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

### Option 4: Any Web Host
Upload all files to your web hosting server via FTP or hosting panel.

## File Structure

```
Hair-wig/
├── index.html              # Homepage
├── products.html           # Products catalog page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout with payment
├── success.html           # Order success page
├── about.html             # About page
├── contact.html           # Contact page
├── privacy.html           # Privacy policy
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── products-data.js   # Product database
│   ├── cart.js            # Cart management
│   ├── main.js            # Homepage logic
│   ├── products.js        # Products page logic
│   ├── cart-page.js       # Cart page logic
│   └── checkout.js        # Checkout & payment logic
└── images/                # Images directory
    └── products/          # Product images
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Client-side cart persistence
- **Stripe.js**: Payment processing
- **PayPal SDK**: Alternative payment method
- **Font Awesome**: Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Detail

### Shopping Cart
- Persistent across page reloads using localStorage
- Real-time quantity updates
- Automatic subtotal calculation
- Free shipping over $100
- 10% tax calculation

### Payment Processing
- Demo mode available without API keys
- Secure SSL encryption
- Multiple payment methods
- Clear error handling
- Order confirmation

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Fast loading times

## Security Notes

1. **Never commit API keys** to version control
2. Use environment variables for sensitive data in production
3. Implement server-side validation for real applications
4. Use HTTPS for all production deployments
5. Keep payment processing libraries up to date

## Support

For issues or questions:
- Email: info@hairwigstore.com
- Phone: +1 (555) 123-4567

## License

This project is available for personal and commercial use.

## Future Enhancements

Potential improvements for future versions:
- User accounts and authentication
- Order history tracking
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Backend integration for order management
- Inventory management
- Search functionality
- Product recommendations
- Multiple product images/gallery
- Size/color variations

---

**Ready to launch your hair wig store!** 🎉

For production use, remember to:
1. Add your payment gateway API keys
2. Replace demo content with real products
3. Add actual product images
4. Update contact information
5. Review and update privacy policy
6. Test all functionality thoroughly 
