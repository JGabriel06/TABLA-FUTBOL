// List of products
const products = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 150 },
  { id: 3, name: "Producto 3", price: 200 },
  { id: 4, name: "Producto 4", price: 250 },
  { id: 5, name: "Producto 5", price: 300 },
  { id: 6, name: "Producto 6", price: 350 },
  { id: 7, name: "Producto 7", price: 400 },
  { id: 8, name: "Producto 8", price: 450 },
  { id: 9, name: "Producto 9", price: 500 },
  { id: 10, name: "Producto 10", price: 550 },
];

// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
const productContainer = document.getElementById("products");
products.forEach(product => {
  const productEl = document.createElement("div");
  productEl.className = "product";
  productEl.innerHTML = `
    <h3>${product.name}</h3>
    <p>Precio: $${product.price}</p>
    <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
  `;
  productContainer.appendChild(productEl);
});

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
}

// Render cart
function renderCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <h4>${item.name}</h4>
      <p>Precio: $${item.price}</p>
      <p>Cantidad: <button onclick="updateQuantity(${item.id}, -1)">-</button> ${item.quantity} <button onclick="updateQuantity(${item.id}, 1)">+</button></p>
      <p>Subtotal: $${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartContainer.appendChild(itemEl);
  });

  document.getElementById("total-price").innerText = calculateTotal();
}

// Update quantity of a product in cart
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  item.quantity += change;
  
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }

  saveCart();
  renderCart();
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

// Calculate total price
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

// Initial render
renderCart();
