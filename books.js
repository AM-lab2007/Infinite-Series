var searchInput   = document.getElementById( "search" )
var genreSelect   = document.getElementById( "genre" )
var sortSelect    = document.getElementById( "sort" )
var grid          = document.getElementById( "books-grid" )
var loadMore      = document.getElementById( "load-more" )

document.addEventListener( "click", function ( e ) {

  var t = e.target

  if ( !t ) {
    return
  }

  if ( t.classList && t.classList.contains( "add" ) ) {

    var id    = t.getAttribute( "data-id" )
    var name  = t.getAttribute( "data-name" )
    var price = parseFloat( t.getAttribute( "data-price" ) || 0 )
    var img   = t.getAttribute( "data-img" )

    var d = localStorage.getItem( "bookHavenCart" )
    var items = []

    if ( d ) {
      try {
        items = JSON.parse( d )
      } catch ( er ) {
        items = []
      }
    }

    var f = false

    for ( var i = 0; i < items.length; i++ ) {
      if ( items[i].id === id ) {
        items[i].quantity = ( items[i].quantity || 0 ) + 1
        f = true
        break
      }
    }

    if ( !f ) {
      items.push( { id: id, name: name, price: price, quantity: 1, img: img } )
    }

    localStorage.setItem( "bookHavenCart", JSON.stringify( items ) )

    updateCartCount()
        showNotification(name + " added to cart", "success");

  } else if ( t.classList && t.classList.contains( "wish" ) ) {

    var id2 = t.getAttribute( "data-id" )

    var d2 = localStorage.getItem( "bookHavenWishlist" )
    var list = []

    if ( d2 ) {
      try {
        list = JSON.parse( d2 )
      } catch ( e ) {
        list = []
      }
    }

    for ( var k = 0; k < list.length; k++ ) {
      if ( list[k] === id2 ) {
                showNotification("Already in wishlist", "error");
        return
      }
    }

    list.push( id2 )
    localStorage.setItem( "bookHavenWishlist", JSON.stringify( list ) )
    showNotification( "Added to wishlist", "success" )
  }

})


function renderBooks() {
  if (!grid) {
    return;
  }

  grid.innerHTML = ''; // Clear existing books

  for (var i = 0; i < BOOKS.length; i++) {
    var b = BOOKS[i];

    var div = document.createElement("div");
    div.className = "book-card";
    div.setAttribute("data-id", b.id);
    div.setAttribute("data-title", b.title);
    div.setAttribute("data-author", b.author);
    div.setAttribute("data-price", b.price);
    div.setAttribute("data-genre", b.genre);

    div.innerHTML =
      '<a href="book-details.html?id=' + encodeURIComponent(b.id) + '">' +
        '<img src="' + b.img + '" alt="' + b.title + '" />' +
      '</a>' +
      '<div class="body">' +
        '<h3><a href="book-details.html?id=' + encodeURIComponent(b.id) + '">' + b.title + '</a></h3>' +
        '<div class="author">' + b.author + '</div>' +
        '<div class="price">$' + b.price.toFixed(2) + '</div>' +
        '<div class="actions">' +
          '<button class="add" data-id="' + b.id + '" data-name="' + b.title + '" data-price="' + b.price + '" data-img="' + b.img + '">Add to Cart</button>' +
          '<button class="wish" data-id="' + b.id + '"><i class="fas fa-heart"></i></button>' +
        '</div>' +
      '</div>';

    grid.appendChild(div);
  }
}

function filterCards() {

  var q = ( searchInput ? searchInput.value.trim().toLowerCase() : "" )
  var g = ( genreSelect ? genreSelect.value : "all" )

  var cards = document.querySelectorAll( ".book-card" )

  for ( var i = 0; i < cards.length; i++ ) {

    var c = cards[i]

    var title  = ( c.getAttribute( "data-title" ) || "" ).toLowerCase()
    var author = ( c.getAttribute( "data-author" ) || "" ).toLowerCase()
    var genre  = c.getAttribute( "data-genre" ) || ""

    var match = true

    if ( q ) {
      match = ( title.indexOf( q ) !== -1 || author.indexOf( q ) !== -1 )
    }

    if ( g !== "all" && genre !== g ) {
      match = false
    }

    c.style.display = match ? "" : "none"
  }
}

if ( searchInput ) {
  searchInput.addEventListener( "input", filterCards )
}

if ( genreSelect ) {
  genreSelect.addEventListener( "change", filterCards )
}

if ( sortSelect ) {
  sortSelect.addEventListener( "change", function () {

    var v = sortSelect.value
    var cards = Array.prototype.slice.call( document.querySelectorAll( ".book-card" ) )

    cards.sort( function ( a, b ) {
      var pa = parseFloat( a.getAttribute( "data-price" ) || 0 )
      var pb = parseFloat( b.getAttribute( "data-price" ) || 0 )

      if ( v === "price-low" ) {
        return pa - pb
      }

      if ( v === "price-high" ) {
        return pb - pa
      }

      return 0
    })

    for ( var i = 0; i < cards.length; i++ ) {
      grid.appendChild( cards[i] )
    }
  })
}

if ( loadMore ) {
  loadMore.addEventListener( "click", function () {

    for ( var i = 0; i < 3; i++ ) {
      var b = BOOKS[i]
      var id = b.id + "-m" + Math.random().toString(36).slice(2,5)

      var div = document.createElement( "div" )
      div.className = "book-card"
      div.setAttribute( "data-id", id )
      div.setAttribute( "data-title", b.title )
      div.setAttribute( "data-author", b.author )
      div.setAttribute( "data-price", b.price )
      div.setAttribute( "data-genre", b.genre )

      div.innerHTML =
        '<a href="book-details.html?id=' + encodeURIComponent( b.id ) + '">' +
          '<img src="' + b.img + '" alt="" />' +
        '</a>' +
        '<div class="body">' +
          '<h3><a href="book-details.html?id=' + encodeURIComponent( b.id ) + '">' + b.title + '</a></h3>' +
          '<div class="author">' + b.author + '</div>' +
          '<div class="price">$' + b.price.toFixed(2) + '</div>' +
          '<div class="actions">' +
            '<button class="add" data-id="' + id + '" data-name="' + b.title + '" data-price="' + b.price + '">Add to Cart</button>' +
            '<button class="wish" data-id="' + id + '"><i class="fas fa-heart"></i></button>' +
          '</div>' +
        '</div>'

      grid.appendChild( div )
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  renderBooks();
});