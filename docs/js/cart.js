class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.modal = document.getElementById("cart-modal");
    this.cartLink = document.getElementById("cart-link");
    this.closeBtn = document.querySelector(".close");
    this.cartCount = document.getElementById("cart-count");
    this.cartItems = document.getElementById("cart-items");
    this.totalAmount = document.getElementById("total-amount");
    this.checkoutBtn = document.getElementById("checkout-btn");

    this.initializeEventListeners();
    this.updateCartCount();
  }

  initializeEventListeners() {
    // Cart modal open/close
    this.cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.openCart();
    });

    this.closeBtn.addEventListener("click", () => {
      this.closeCart();
    });

    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeCart();
      }
    });

    // Checkout button
    this.checkoutBtn.addEventListener("click", () => {
      this.checkout();
    });
  }

  openCart() {
    this.updateCartDisplay();
    this.modal.style.display = "block";
  }

  closeCart() {
    this.modal.style.display = "none";
  }

  addItem(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.updateCartDisplay();
  }

  updateQuantity(productId, newQuantity) {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      if (newQuantity > 0) {
        item.quantity = newQuantity;
      } else {
        this.removeItem(productId);
      }
      this.saveCart();
      this.updateCartDisplay();
    }
  }

  updateCartCount() {
    const totalItems = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartCount.textContent = totalItems;
  }

  updateCartDisplay() {
    this.cartItems.innerHTML = "";
    let total = 0;

    if (this.items.length === 0) {
      this.cartItems.innerHTML = "<p>Your cart is empty</p>";
    } else {
      this.items.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x 
                            <input type="number" 
                                value="${item.quantity}" 
                                min="1" 
                                class="quantity-input"
                                data-id="${item.id}">
                        </p>
                    </div>
                    <div class="item-total">
                        <p>$${itemTotal.toFixed(2)}</p>
                        <button class="remove-btn" data-id="${
                          item.id
                        }">&times;</button>
                    </div>
                `;

        this.cartItems.appendChild(cartItem);

        // Add event listeners for quantity input and remove button
        const quantityInput = cartItem.querySelector(".quantity-input");
        const removeBtn = cartItem.querySelector(".remove-btn");

        quantityInput.addEventListener("change", (e) => {
          this.updateQuantity(item.id, parseInt(e.target.value));
        });

        removeBtn.addEventListener("click", () => {
          this.removeItem(item.id);
        });
      });
    }

    this.totalAmount.textContent = total.toFixed(2);
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  checkout() {
    if (this.items.length === 0) {
      this.showNotification("Your cart is empty!", "error");
      return;
    }

    // Here you would typically integrate with a payment gateway
    alert("Thank you for your purchase! This is a demo site.");
    this.items = [];
    this.saveCart();
    this.updateCartCount();
    this.closeCart();
    this.showNotification("Order placed successfully!", "success");
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Create and initialize the shopping cart
const cart = new ShoppingCart();
