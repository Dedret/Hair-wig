// Checkout Page JavaScript with Payment Gateway Integration

// Stripe Configuration (Replace with your actual publishable key)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE';
let stripe;
let cardElement;

document.addEventListener('DOMContentLoaded', () => {
    // Check if cart has items
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'products.html';
        return;
    }
    
    // Display order summary
    displayOrderSummary();
    
    // Initialize Stripe
    initializeStripe();
    
    // Setup payment method toggle
    setupPaymentMethodToggle();
    
    // Setup form submission
    setupFormSubmission();
    
    // Initialize PayPal
    initializePayPal();
    
    // Mobile menu
    setupMobileMenu();
});

// Display order summary
function displayOrderSummary() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkout-items');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} x $${item.price.toFixed(2)}</p>
            </div>
            <div class="item-price">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Update totals
    const totals = getCartTotals();
    document.getElementById('summary-subtotal').textContent = `$${totals.subtotal}`;
    document.getElementById('summary-shipping').textContent = `$${totals.shipping}`;
    document.getElementById('summary-tax').textContent = `$${totals.tax}`;
    document.getElementById('summary-total').textContent = `$${totals.total}`;
}

// Initialize Stripe
function initializeStripe() {
    try {
        // Note: Replace STRIPE_PUBLISHABLE_KEY with your actual key
        stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        const elements = stripe.elements();
        
        // Create card element
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#333',
                    '::placeholder': {
                        color: '#aaa',
                    },
                },
            },
        });
        
        cardElement.mount('#card-element');
        
        // Handle card element errors
        cardElement.on('change', (event) => {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
    } catch (error) {
        console.info('Stripe initialization note: Please add your Stripe publishable key');
        // Show demo mode message
        const cardElement = document.getElementById('card-element');
        cardElement.innerHTML = `
            <div style="padding: 1rem; background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px;">
                <strong>Demo Mode:</strong> This is a demo. In production, add your Stripe publishable key to enable real payments.
                <br>For testing, you can proceed with the form.
            </div>
        `;
    }
}

// Initialize PayPal
function initializePayPal() {
    try {
        const totals = getCartTotals();
        
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totals.total
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Clear cart and redirect to success page
                    clearCart();
                    window.location.href = 'success.html';
                });
            },
            onError: function(err) {
                alert('Payment failed. Please try again.');
                console.error('PayPal error:', err);
            }
        }).render('#paypal-button-container');
    } catch (error) {
        console.info('PayPal initialization note: Please add your PayPal client ID');
        const paypalContainer = document.getElementById('paypal-button-container');
        if (paypalContainer) {
            paypalContainer.innerHTML = `
                <div style="padding: 1rem; background: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; text-align: left;">
                    <strong>Demo Mode:</strong> PayPal integration requires your client ID. 
                    <br>Replace YOUR_PAYPAL_CLIENT_ID in checkout.html with your actual PayPal client ID.
                </div>
            `;
        }
    }
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const stripePayment = document.getElementById('stripe-payment');
    const paypalPayment = document.getElementById('paypal-payment');
    const submitButton = document.getElementById('submit-payment');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'stripe') {
                stripePayment.style.display = 'block';
                paypalPayment.style.display = 'none';
                submitButton.style.display = 'block';
            } else if (e.target.value === 'paypal') {
                stripePayment.style.display = 'none';
                paypalPayment.style.display = 'block';
                submitButton.style.display = 'none';
            }
        });
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('checkout-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === 'stripe') {
            await handleStripePayment();
        }
        // PayPal is handled by its own button
    });
}

// Handle Stripe payment
async function handleStripePayment() {
    const submitButton = document.getElementById('submit-payment');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    try {
        // In a real application, you would:
        // 1. Send billing info to your server
        // 2. Create a payment intent on your server
        // 3. Confirm the payment with Stripe
        // 4. Handle the result
        
        // For demo purposes, we'll simulate a successful payment
        if (!stripe || !cardElement) {
            // Demo mode - simulate success
            setTimeout(() => {
                clearCart();
                window.location.href = 'success.html';
            }, 1500);
            return;
        }
        
        // Real Stripe payment would look like this:
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                address: {
                    line1: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    postal_code: document.getElementById('zip').value,
                    country: document.getElementById('country').value,
                }
            }
        });
        
        if (error) {
            document.getElementById('card-errors').textContent = error.message;
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Complete Secure Payment';
        } else {
            // Payment method created successfully
            // In production, send paymentMethod.id to your server
            clearCart();
            window.location.href = 'success.html';
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment processing error. Please try again.');
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-lock"></i> Complete Secure Payment';
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = '#fff';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            }
        });
    }
}
