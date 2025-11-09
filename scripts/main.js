const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

function renderProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function applyFilters() {
  const categoryValue = categoryFilter.value;
  const priceValue = priceFilter.value;

  let filtered = [...products];

  if (categoryValue !== "all") {
    filtered = filtered.filter((p) => p.category === categoryValue);
  }

  if (priceValue !== "all") {
    filtered = filtered.filter((p) => {
      if (priceValue === "low") return p.price < 1000;
      if (priceValue === "mid") return p.price >= 1000 && p.price <= 3000;
      if (priceValue === "high") return p.price > 3000;
    });
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

window.onload = () => renderProducts(products);
