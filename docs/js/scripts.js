// Main application script

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the featured products section
  if (document.getElementById("featured-products")) {
    initializeFeaturedProducts();
  }
});

// Load and display featured products
async function initializeFeaturedProducts() {
  try {
    const featuredProducts = await apiService.getFeaturedProducts();
    const productList = document.getElementById("featured-products");

    featuredProducts.forEach((product) => {
      const productElement = createProductElement(product);
      productList.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error loading featured products:", error);
    // Only show error if we're on the home page
    if (window.location.pathname.endsWith("index.html")) {
      showNotification("Failed to load featured products", "error");
    }
  }
}

// Create HTML element for a product
function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product";

  // Add animation class
  productDiv.classList.add("fade-in");

  productDiv.innerHTML = `
        <span class="category-tag">${product.category}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">$${product.price.toFixed(2)}</span>
        <button class="button add-to-cart-btn" data-id="${product.id}">
            Add to Cart
        </button>
    `;

  // Add event listener for the Add to Cart button
  const addToCartBtn = productDiv.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", async () => {
    try {
      // Get fresh product data from API
      const freshProduct = await apiService.getProductById(product.id);
      cart.addItem(freshProduct);

      // Add button animation
      addToCartBtn.classList.add("added");
      setTimeout(() => {
        addToCartBtn.classList.remove("added");
      }, 1000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      showNotification("Failed to add product to cart", "error");
    }
  });

  return productDiv;
}

// Show notification message
function showNotification(message, type = "success") {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => {
    notification.remove();
  });

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-out {
        opacity: 1;
        animation: fadeOut 0.3s ease forwards;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    .add-to-cart-btn.added {
        animation: addedToCart 1s ease;
    }

    @keyframes addedToCart {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(styleSheet);

// Handle scroll events for smooth animations
const handleScroll = () => {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const rect = product.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !product.classList.contains("fade-in")) {
      product.classList.add("fade-in");
    }
  });
};

window.addEventListener("scroll", handleScroll);
