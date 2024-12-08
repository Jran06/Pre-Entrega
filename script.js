let cart = [];

// Función para mostrar secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
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
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    // Actualizar número de productos en el carrito
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Mostrar los productos en el carrito
    cartItems.innerHTML = cart
        .map(item => `
            <li class="list-group-item">
                ${item.title} (x${item.quantity}) - $${item.price * item.quantity}
            </li>
        `)
        .join('');

    // Calcular y mostrar el precio total
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Vaciar carrito
function clearCart() {
    cart = [];
    updateCartUI();
}

// Obtener productos y mostrarlos
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products'); // API de productos de ejemplo
        const products = await response.json();
        const productList = document.querySelector('.product-list');

        // Limpiar cualquier producto anterior
        productList.innerHTML = '';

        // Mostrar productos en la interfaz
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product', 'card', 'col-md-4', 'p-3', 'text-center');
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}" class="card-img-top" style="height: 150px; object-fit: contain;">
                <p>${product.description.substring(0, 100)}...</p>
                <p><strong>$${product.price}</strong></p>
                <button class="btn btn-primary">Añadir al carrito</button>
            `;
            // Añadir el evento para el botón "Añadir al carrito"
            productCard.querySelector('button').addEventListener('click', () => addToCart(product));

            // Agregar la tarjeta al contenedor de productos
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Ejecutar la función de obtener productos cuando la página se haya cargado
document.addEventListener('DOMContentLoaded', fetchProducts);
