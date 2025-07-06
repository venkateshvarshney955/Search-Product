const API_URL = "https://dummyjson.com/products";

let products = [];

async function fetchProducts() {
  const response = await fetch(API_URL);
  const data = await response.json();
  products = data.products;
  displayProducts(products);
}

function displayProducts(productList) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <div class="product-title">${product.title}</div>
      <div class="product-price">Price: $${product.price}</div>
      <div class="product-rating">Rating: ${product.rating}</div>
    `;
    container.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();

  if (query === "") {
    alert("Search field cannot be empty!");
    return;
  }

  const filtered = products.filter(p => p.title.toLowerCase().includes(query));
  displayProducts(filtered);
}

function sortProducts() {
  const type = document.getElementById("sortSelect").value;
  let sorted = [...products];

  if (type === "price") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (type === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}

fetchProducts();
