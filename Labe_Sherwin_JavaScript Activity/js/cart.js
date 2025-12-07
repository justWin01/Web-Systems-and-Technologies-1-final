let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalPriceBox = document.getElementById("total-price");

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showAlert(message, color = "#28a745") { // green by default
    const alertBox = document.createElement("div");
    alertBox.className = "alert-modal";
    alertBox.textContent = message;
    alertBox.style.backgroundColor = color; // set color dynamically
    document.body.appendChild(alertBox);
  
    // Trigger animation
    setTimeout(() => alertBox.classList.add("show"), 50);
  
    // Remove after 1.2 seconds
    setTimeout(() => {
      alertBox.classList.remove("show");
      setTimeout(() => alertBox.remove(), 400);
    }, 1200);
  }

  

function renderCart() {
  cartContainer.innerHTML = "";
  if(cart.length === 0){
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceBox.textContent = "";
    return;
  }
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: ₱${item.price.toLocaleString()}</p>
      <p>Quantity: ${item.qty}</p>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalPriceBox.textContent = "Total: ₱" + total.toLocaleString();

  document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", () => removeItem(+btn.dataset.id)));
}

renderCart();
