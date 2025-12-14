// Render cart items
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>₱${item.price.toLocaleString()}</p>
        <div class="qty-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
        <button class="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalPriceEl.textContent = `Total: ₱${total.toLocaleString()}`;

  // Event listeners
  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = +btn.dataset.id;
      const product = cart.find(i => i.id === id);
      product.qty++;
      saveCart();
      renderCart();
    })
  );

  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = +btn.dataset.id;
      const product = cart.find(i => i.id === id);
      if (product.qty > 1) {
        product.qty--;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart();
      renderCart();
    })
  );

  document.querySelectorAll(".remove").forEach(btn =>
    btn.addEventListener("click", () => {
      const id = +btn.dataset.id;
      cart = cart.filter(i => i.id !== id);
      saveCart();
      renderCart();
      showAlert("Item removed");
    })
  );
}

// Call renderCart on page load
renderCart();
updateCartCounter();
