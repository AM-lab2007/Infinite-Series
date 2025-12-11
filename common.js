function updateCartCount() {
  let items = [];
  try {
    const storedCart = localStorage.getItem("bookHavenCart");
    if (storedCart) {
      items = JSON.parse(storedCart);
    }
  } catch (e) {
    console.error("Error parsing cart from localStorage", e);
    items = [];
  }

  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const countElements = document.querySelectorAll("#cart-count");
  countElements.forEach(el => {
    el.textContent = totalQuantity;
  });
}

function showNotification(message, type = "success") {
  const area = document.getElementById("notification-area");
  if (!area) {
    console.warn("Notification area not found");
    return;
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  area.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.addEventListener('transitionend', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
  }, 2500);
}

function addToCart(bookId, bookName, bookPrice, bookImg) {
  let cartItems = JSON.parse(localStorage.getItem("bookHavenCart") || "[]");
  const existingItem = cartItems.find(item => item.id === bookId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id: bookId, name: bookName, price: bookPrice, quantity: 1, img: bookImg });
  }

  localStorage.setItem("bookHavenCart", JSON.stringify(cartItems));
  updateCartCount();
  showNotification(`${bookName} added to cart`, "success");
}

function addToWishlist(bookId) {
  let wishlist = JSON.parse(localStorage.getItem("bookHavenWishlist") || "[]");

  if (wishlist.includes(bookId)) {
    showNotification("Already in wishlist", "error");
  } else {
    wishlist.push(bookId);
    localStorage.setItem("bookHavenWishlist", JSON.stringify(wishlist));
    showNotification("Added to wishlist", "success");
  }
}

// Update cart count on initial page load
document.addEventListener('DOMContentLoaded', updateCartCount);