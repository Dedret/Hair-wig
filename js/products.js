// Products Page JavaScript

let currentProducts = getAllProducts();

document.addEventListener('DOMContentLoaded', () => {
    // Load all products
    displayProducts(currentProducts);
    
    // Setup filters
    setupFilters();
    
    // Mobile menu
    setupMobileMenu();
});

// Display products on page
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}">` : 
                    '<i class="fas fa-crown"></i>'}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup filters
function setupFilters() {
    const sortSelect = document.getElementById('sort');
    const categorySelect = document.getElementById('category');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyFilters();
        });
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    const sortValue = document.getElementById('sort').value;
    const categoryValue = document.getElementById('category').value;
    
    // Filter by category
    let filteredProducts = getProductsByCategory(categoryValue);
    
    // Sort products
    currentProducts = sortProducts(filteredProducts, sortValue);
    
    // Display updated products
    displayProducts(currentProducts);
}

// Setup mobile menu (same as main.js)
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
