const products = [
  { name: "Smartphone X", category: "Electronics", price: 699, desc: "5G smartphone with AMOLED display." },
  { name: "Wireless Headphones", category: "Audio", price: 199, desc: "Noise-cancelling wireless headphones." },
  { name: "Smart Watch", category: "Wearables", price: 149, desc: "Fitness tracker with heart-rate monitor." },
  { name: "Gaming Laptop", category: "Computers", price: 1299, desc: "Powerful gaming laptop with RTX GPU." },
  { name: "Digital Camera", category: "Cameras", price: 499, desc: "High-resolution DSLR for professionals." },
  { name: "Bluetooth Speaker", category: "Audio", price: 99, desc: "Portable speaker with deep bass." },
  { name: "Gaming Mouse", category: "Accessories", price: 59, desc: "Ergonomic RGB gaming mouse." },
  { name: "4K Monitor", category: "Displays", price: 399, desc: "Crystal-clear 4K Ultra HD monitor." },
  { name: "Wireless Keyboard", category: "Accessories", price: 89, desc: "Slim wireless keyboard with backlight." },
  { name: "Power Bank", category: "Electronics", price: 49, desc: "10,000 mAh fast-charging power bank." },
  { name: "Tablet Pro", category: "Electronics", price: 499, desc: "Lightweight tablet for work and play." },
  { name: "Smart TV", category: "Home Appliances", price: 899, desc: "55-inch 4K UHD Smart TV with HDR." }
];

const productContainer = document.getElementById("product-section");
const searchBar = document.getElementById("searchBar");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cart-count");
const detailModal = document.getElementById("product-detail");
const cartModal = document.getElementById("cart-modal");
const orderModal = document.getElementById("order-modal");
const confirmation = document.getElementById("confirmation-message");

let selectedProduct = null;
let cart = [];

// Display products
function displayProducts(list) {
  productContainer.innerHTML = "";
  list.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${prod.name}</h3>
      <p>${prod.category}</p>
      <p>${prod.desc}</p>
      <h4>$${prod.price}</h4>
    `;
    card.onclick = () => openProductDetail(prod);
    productContainer.appendChild(card);
  });
}
displayProducts(products);

// Search
searchBar.addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(val) || p.category.toLowerCase().includes(val)
  );
  displayProducts(filtered);
});

// Product details
function openProductDetail(prod) {
  selectedProduct = prod;
  document.getElementById("detail-name").textContent = prod.name;
  document.getElementById("detail-desc").textContent = prod.desc;
  document.getElementById("detail-price").textContent = "$" + prod.price;
  detailModal.style.display = "flex";
}

// Add to cart
document.getElementById("add-to-cart").addEventListener("click", () => {
  cart.push(selectedProduct);
  updateCart();
  detailModal.style.display = "none";
  alert(`🛒 ${selectedProduct.name} added to cart`);
});

function updateCart() {
  cartCount.textContent = cart.length;
}

// Show cart
cartBtn.addEventListener("click", () => {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - $${item.price} 
      <button onclick="removeFromCart(${index})">❌</button></p>
    `;
    cartItems.appendChild(div);
  });
  document.getElementById("cart-total").textContent = `Total: $${total}`;
  cartModal.style.display = "flex";
});

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  document.getElementById("cart-items").children[index].remove();
}

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  cartModal.style.display = "none";
  orderModal.style.display = "flex";
});

// Close modals
document.querySelectorAll(".close").forEach(btn =>
  btn.addEventListener("click", () => {
    detailModal.style.display = "none";
    cartModal.style.display = "none";
    orderModal.style.display = "none";
  })
);

// Order form
document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  confirmation.classList.remove("hidden");
  e.target.reset();
  cart = [];
  updateCart();
  setTimeout(() => {
    orderModal.style.display = "none";
    confirmation.classList.add("hidden");
    alert("✅ Your order has been placed successfully!");
  }, 2000);
});

// Close on outside click
window.onclick = e => {
  if (e.target === detailModal) detailModal.style.display = "none";
  if (e.target === cartModal) cartModal.style.display = "none";
  if (e.target === orderModal) orderModal.style.display = "none";
};
