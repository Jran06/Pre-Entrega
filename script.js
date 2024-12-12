let cart = [];

// Función para mostrar secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
}

// Validar formulario
function validateForm(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        event.preventDefault();
        alert("Por favor, completa todos los campos del formulario.");
    }
}

// Cargar productos desde API
async function loadProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');

        productContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="img-fluid">
                <h5>${product.title}</h5>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart({ id: ${product.id}, title: '${product.title}', price: ${product.price}, image: '${product.image}' })">Añadir al carrito</button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Añadir producto al carrito
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// Actualizar carrito en la UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const totalPrice = document.getElementById('totalPrice');

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    cartItemsList.innerHTML = cart.map(item => `
        <li class="list-group-item">
            ${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">X</button>
        </li>
    `).join('');

    totalPrice.textContent = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Vaciar el carrito
function clearCart() {
    cart = [];
    updateCartUI();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
