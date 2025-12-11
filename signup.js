document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      document.getElementById('err-fullname').textContent = '';
      document.getElementById('err-email').textContent = '';
      document.getElementById('err-password').textContent = '';
      document.getElementById('err-confirm').textContent = '';

      // Get form values
      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;

      let isValid = true;

      if (fullname === '') {
        document.getElementById('err-fullname').textContent = 'Full name is required.';
        isValid = false;
      }

      if (email === '' || !email.includes('@')) {
        document.getElementById('err-email').textContent = 'Please enter a valid email.';
        isValid = false;
      }

      if (password.length < 6) {
        document.getElementById('err-password').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
      }

      if (password !== confirmPassword) {
        document.getElementById('err-confirm').textContent = 'Passwords do not match.';
        isValid = false;
      }

      if (!terms) {
        // The browser's default required handling is usually sufficient, but we can add a custom message if needed.
        isValid = false;
      }

      if (isValid) {
                window.location.href = 'index.html';
            }
        });
    }