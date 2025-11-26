// Cart Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    setupCheckoutButton();
    setupMobileMenu();
});

// Display cart items
function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartWrapper = document.querySelector('.cart-wrapper');
    
    if (cart.length === 0) {
        if (cartWrapper) cartWrapper.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }
    
    if (cartWrapper) cartWrapper.style.display = 'grid';
    if (emptyCart) emptyCart.style.display = 'none';
    
    // Display cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.name}">` : 
                    '<i class="fas fa-crown"></i>'}
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <p><strong>Subtotal: $${(item.price * item.quantity).toFixed(2)}</strong></p>
            </div>
        </div>
    `).join('');
    
    // Update cart summary
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const totals = getCartTotals();
    
    document.getElementById('subtotal').textContent = `$${totals.subtotal}`;
    document.getElementById('shipping').textContent = `$${totals.shipping}`;
    document.getElementById('tax').textContent = `$${totals.tax}`;
    document.getElementById('total').textContent = `$${totals.total}`;
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
    updateQuantity(productId, newQuantity);
    displayCart();
}

// Remove item
function removeItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        removeFromCart(productId);
        displayCart();
        showNotification('Item removed from cart');
    }
}

// Setup checkout button
function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
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
