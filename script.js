
const form = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');

    function showError(input, errorEl, condition) {
      if (condition) {
        errorEl.style.display = 'block';
        input.style.borderColor = 'red';
        return true;
      } else {
        errorEl.style.display = 'none';
        input.style.borderColor = '#ccc';
        return false;
      }
    }

    function validateName() {
      return showError(nameInput, nameError, nameInput.value.trim() === '');
    }

    function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return showError(emailInput, emailError, !emailRegex.test(emailInput.value.trim()));
    }

    function validatePhone() {
      const phoneRegex = /^\d{10}$/;
      return showError(phoneInput, phoneError, !phoneRegex.test(phoneInput.value.trim()));
    }

    function validatePassword() {
      return showError(passwordInput, passwordError, passwordInput.value.length < 6);
    }

    // Attach blur events for validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    passwordInput.addEventListener('blur', validatePassword);

    // Real-time input feedback
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    passwordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const isNameInvalid = validateName();
      const isEmailInvalid = validateEmail();
      const isPhoneInvalid = validatePhone();
      const isPasswordInvalid = validatePassword();

      if (!(isNameInvalid || isEmailInvalid || isPhoneInvalid || isPasswordInvalid)) {
        successMessage.style.display = 'block';
        form.reset();

        // Reset borders and errors
        [nameInput, emailInput, phoneInput, passwordInput].forEach(input => {
          input.style.borderColor = '#ccc';
        });

        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 4000);
      } else {
        successMessage.style.display = 'none';
      }
    });