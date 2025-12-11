function genOrderNumber() {
  var n = 'ORD-' + Math.floor( Math.random() * 900000 + 100000 )
  return n
}

var num = genOrderNumber()
var el = document.getElementById( "order-number" )

if ( el ) {
  el.textContent = num
}

try {
  localStorage.removeItem( "bookHavenCart" )
} catch ( e ) {}

function updateCartCount() {
  var els = document.querySelectorAll( "#cart-count" )
  for ( var j = 0; j < els.length; j++ ) {
    // Since the cart is cleared, set the count to 0
    els[j].textContent = 0
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  // Update the cart count in the header to 0
  updateCartCount();
});