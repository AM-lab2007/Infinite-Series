document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');
  const detailsContainer = document.getElementById('book-details-container');

  if (!detailsContainer) return;

  // The BOOKS array is now available from data.js
  const book = BOOKS.find(b => b.id === bookId);

  if (!book) {
    renderBookNotFound(detailsContainer);
  } else {
    renderBookDetails(detailsContainer, book);
    attachActionListeners(book);
  }
});

function renderBookNotFound(container) {
  container.innerHTML = `
    <div class="book-not-found">
      <h2>Book Not Found</h2>
      <p>Sorry, we couldn't find the book you're looking for.</p>
      <a href="books.html" class="btn">Back to Books</a>
    </div>`;
  container.style.gridTemplateColumns = '1fr'; // Adjust grid for the message
}

function renderBookDetails(container, book) {
  container.innerHTML = `
    <div class="book-cover">
      <img src="${book.img}" alt="${book.title}" />
    </div>
    <div class="book-info">
      <h1>${book.title}</h1>
      <p class="author">by ${book.author}</p>
      <p class="price">$${book.price.toFixed(2)}</p>
      <p class="description">${book.description}</p>
      <div class="book-actions">
        <button id="add-to-cart-btn" class="btn add-to-cart">Add to Cart</button>
        <button id="add-to-wishlist-btn" class="btn add-to-wishlist">Add to Wishlist</button>
      </div>
    </div>`;
}

function attachActionListeners(book) {
  const addBtn = document.getElementById('add-to-cart-btn');
  const wishBtn = document.getElementById('add-to-wishlist-btn');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      let cartItems = JSON.parse(localStorage.getItem("bookHavenCart") || "[]");
      const existingItem = cartItems.find(item => item.id === book.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ id: book.id, name: book.title, price: book.price, quantity: 1, img: book.img });
      }

      localStorage.setItem("bookHavenCart", JSON.stringify(cartItems));
      updateCartCount(); // from common.js
      showNotification(`${book.title} added to cart`, "success"); // from common.js
    });
  }

  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      let wishlist = JSON.parse(localStorage.getItem("bookHavenWishlist") || "[]");

      if (wishlist.includes(book.id)) {
        showNotification("Already in wishlist", "error");
      } else {
        wishlist.push(book.id);
        localStorage.setItem("bookHavenWishlist", JSON.stringify(wishlist));
        showNotification("Added to wishlist", "success");
      }
    });
  }
}