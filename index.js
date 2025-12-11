document.addEventListener('DOMContentLoaded', function() {
  const booksGrid = document.getElementById('home-books-grid');
  if (booksGrid) {
    const featuredBooks = BOOKS.slice(0, 4);
    renderFeaturedBooks(featuredBooks, booksGrid);
  }

  // Handle newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput.value.trim() && emailInput.value.includes('@')) {
        showNotification('Thank you for subscribing!', 'success');
        emailInput.value = '';
      } else {
        showNotification('Please enter a valid email address.', 'error');
      }
    });
  }

  document.addEventListener("click", function(e) {
    const t = e.target;
    if (!t) return;

    if (t.classList.contains("add")) {
      const id    = t.getAttribute("data-id");
      const name  = t.getAttribute("data-name");
      const price = parseFloat(t.getAttribute("data-price") || 0);
      const img   = t.getAttribute("data-img");
      addToCart(id, name, price, img);

    } else if (t.classList.contains("wish")) {
      const id = t.getAttribute("data-id");
      addToWishlist(id);
    }
  });
});

function renderFeaturedBooks(books, container) {
  let content = '';
  books.forEach(book => {
    content += `
      <div class="book-card" data-id="${book.id}">
        <a href="book-details.html?id=${book.id}">
          <img src="${book.img}" alt="${book.title}" />
        </a>
        <div class="body">
          <h3><a href="book-details.html?id=${book.id}">${book.title}</a></h3>
          <div class="author">${book.author}</div>
          <div class="price">$${book.price.toFixed(2)}</div>
          <div class="actions">
            <button class="add" data-id="${book.id}" data-name="${book.title}" data-price="${book.price}" data-img="${book.img}">Add to Cart</button>
            <button class="wish" data-id="${book.id}"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = content;
}