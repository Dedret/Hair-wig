// Products Database
const products = [
    {
        id: 1,
        name: "Natural Long Black Wig",
        description: "Premium human hair, long flowing black wig with natural texture",
        price: 299.99,
        category: "long",
        image: null,
        featured: true
    },
    {
        id: 2,
        name: "Curly Auburn Wig",
        description: "Beautiful curly wig in rich auburn color, perfect for any occasion",
        price: 349.99,
        category: "curly",
        image: null,
        featured: true
    },
    {
        id: 3,
        name: "Short Blonde Bob",
        description: "Chic and modern short blonde bob wig, easy to style",
        price: 249.99,
        category: "short",
        image: null,
        featured: true
    },
    {
        id: 4,
        name: "Straight Brown Wig",
        description: "Sleek straight brown wig with natural shine",
        price: 279.99,
        category: "straight",
        image: null,
        featured: false
    },
    {
        id: 5,
        name: "Wavy Honey Blonde",
        description: "Gorgeous wavy honey blonde wig with volume",
        price: 329.99,
        category: "long",
        image: null,
        featured: true
    },
    {
        id: 6,
        name: "Pixie Cut Black",
        description: "Edgy pixie cut in jet black, perfect for a bold look",
        price: 199.99,
        category: "short",
        image: null,
        featured: false
    },
    {
        id: 7,
        name: "Beach Wave Blonde",
        description: "Effortless beach wave blonde wig for a relaxed style",
        price: 289.99,
        category: "curly",
        image: null,
        featured: false
    },
    {
        id: 8,
        name: "Silky Straight Black",
        description: "Ultra silky straight black wig with premium quality",
        price: 319.99,
        category: "straight",
        image: null,
        featured: true
    },
    {
        id: 9,
        name: "Red Curly Long Wig",
        description: "Vibrant red curly wig with cascading curls",
        price: 359.99,
        category: "curly",
        image: null,
        featured: false
    },
    {
        id: 10,
        name: "Brown Layered Bob",
        description: "Sophisticated layered bob in chocolate brown",
        price: 259.99,
        category: "short",
        image: null,
        featured: false
    },
    {
        id: 11,
        name: "Platinum Blonde Long",
        description: "Stunning platinum blonde long wig with shine",
        price: 379.99,
        category: "long",
        image: null,
        featured: true
    },
    {
        id: 12,
        name: "Dark Brown Straight",
        description: "Classic dark brown straight wig, versatile and elegant",
        price: 269.99,
        category: "straight",
        image: null,
        featured: false
    }
];

// Function to get all products
function getAllProducts() {
    return products;
}

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to filter products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Function to sort products
function sortProducts(productsArray, sortType) {
    const sorted = [...productsArray];
    
    switch(sortType) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}
