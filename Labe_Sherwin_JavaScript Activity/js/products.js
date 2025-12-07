// PRODUCT DATA
const products = [
    { id: 1, name: "Intel Core i7 Ultra Processor", price: 39974, img: "image/Intel Core i7 Ultra Processor.png", desc: "High-performance CPU suitable for gaming and productivity." },
    { id: 2, name: "AMD Radeon RX 7000", price: 28500, img: "image/AMD Radeon RX 7000.png", desc: "Next-gen graphics card offering excellent 4K performance." },
    { id: 3, name: "ROG MAXIMUS Z890 APEX", price: 44750, img: "image/ROG MAXIMUS Z890 APEX.jpg", desc: "Premium motherboard for high-end gaming setups." },
    { id: 4, name: "1TB Samsung SSD", price: 6800, img: "image/1TB Samsung SSD.png", desc: "Fast and reliable SSD ideal for storage and OS installation." },
    { id: 5, name: "RGB Mechanical Keyboard", price: 2300, img: "image/RGB Mechanical Keyboard.png", desc: "Mechanical keyboard with customizable RGB lighting." },
    { id: 6, name: "Wireless Gaming Mouse", price: 1500, img: "image/Wireless Gaming Mouse.png", desc: "Lightweight mouse with precise tracking and long battery life." }
  ];
  
  // CART
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // ELEMENTS
  const grid = document.getElementById("product-grid");
  const cartCount = document.getElementById("cart-count");
  
  // MODAL ELEMENTS
  const modal = document.getElementById("product-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalDesc = document.getElementById("modal-desc");
  const modalAddBtn = document.getElementById("modal-add");
  const closeModalBtn = document.getElementById("close-modal");
  
  // UPDATE CART COUNTER
  function updateCartCounter() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
  
  // SAVE CART
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
  }
  
  // ADD TO CART
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exists = cart.find(item => item.id === id);
  
    if (exists) { exists.qty++; }
    else { cart.push({ ...product, qty: 1 }); }
  
    saveCart();
    showAlert("Added to Cart");
  }
  
  // MODAL ALERT
  function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.className = "alert-modal";
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
  
    // Trigger animation
    setTimeout(() => alertBox.classList.add("show"), 50);
  
    // Remove after 1.2 seconds
    setTimeout(() => {
      alertBox.classList.remove("show");
      setTimeout(() => alertBox.remove(), 400); // wait for transition
    }, 1200);
  }
  
  
  // OPEN MODAL
  function openModal(id) {
    const product = products.find(p => p.id === id);
    modalImg.src = product.img;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `₱${product.price.toLocaleString()}`;
    modalDesc.textContent = product.desc;
    modalAddBtn.dataset.id = product.id;
    modal.classList.remove("hidden");
  }
  
  // CLOSE MODAL
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => { if(e.target === modal) modal.classList.add("hidden"); });
  
  // RENDER PRODUCTS
  function renderProducts() {
    grid.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₱${p.price.toLocaleString()}</p>
        <div class="btn-group">
          <button class="btn details" data-id="${p.id}">View Details</button>
          <button class="btn add" data-id="${p.id}">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    });
  
    // EVENT LISTENERS
    document.querySelectorAll(".add").forEach(btn => btn.addEventListener("click", () => addToCart(+btn.dataset.id)));
    document.querySelectorAll(".details").forEach(btn => btn.addEventListener("click", () => openModal(+btn.dataset.id)));
  }
  
  // ADD TO CART FROM MODAL
  modalAddBtn.addEventListener("click", () => addToCart(+modalAddBtn.dataset.id));
  
  renderProducts();
  updateCartCounter();
  