let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-items");
const totalPriceBox = document.getElementById("total-price");

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// SWEET ALERT (SUCCESS / INFO)
function showAlert(message, icon = "success") {
  Swal.fire({
    icon: icon,
    title: message,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });
}

// REMOVE ITEM WITH CONFIRMATION
function removeItem(id) {
  Swal.fire({
    title: "Remove item?",
    text: "This item will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33"
  }).then((result) => {
    if (result.isConfirmed) {
      cart = cart.filter(item => item.id !== id);
      saveCart();
      renderCart();
      showAlert("Item removed", "success");
    }
  });
}

// RENDER CART
function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
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

  document.querySelectorAll(".remove-btn").forEach(btn =>
    btn.addEventListener("click", () => removeItem(+btn.dataset.id))
  );
}

// INIT
renderCart();
