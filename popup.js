document.addEventListener('DOMContentLoaded', function() {
  const passwordLengthSlider = document.getElementById('password-length');
  const sliderValueDisplay = document.getElementById('slider-value');
  const passwordTextArea = document.getElementById('password');
  const copyButton = document.getElementById('copy');
  const refreshButton = document.getElementById('refresh');
  const uppercaseCheckbox = document.getElementById('uppercase');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const numbersCheckbox = document.getElementById('numbers');
  const specialCheckbox = document.getElementById('special');
  const customSpecialInput = document.getElementById('custom-special');
  
  // Function to show or hide custom special characters input
  specialCheckbox.addEventListener('change', function() {
    if (specialCheckbox.checked) {
      customSpecialInput.style.display = 'inline'; // Show custom input
    } else {
      customSpecialInput.style.display = 'none'; // Hide custom input
    }
    generatePassword(); // Refresh password whenever special checkbox changes
  });

  // Function to generate a password
  function generatePassword() {
    const length = passwordLengthSlider.value;
    const useUppercase = uppercaseCheckbox.checked;
    const useLowercase = lowercaseCheckbox.checked;
    const useNumbers = numbersCheckbox.checked;
    const useSpecial = specialCheckbox.checked;
    
    // Capture custom special characters from the input box
    const customSpecial = customSpecialInput.value.trim(); // Get value and trim spaces

    // Default set of special characters
    const defaultSpecialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

    let characters = '';
    if (useLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) characters += '0123456789';
    if (useSpecial) {
      // Only use custom special characters if the user has entered any
      if (customSpecial.length > 0) {
        characters += customSpecial; // Use the custom characters entered by the user
      } else {
        characters += defaultSpecialChars; // Use default special characters if none entered
      }
    }

    // If no character set is selected, alert the user and return
    if (characters.length === 0) {
      alert('Please select at least one character type.');
      return;
    }

    // Generate the password
    let password = '';

    // Ensure at least one special character is included if useSpecial is checked
    if (useSpecial && customSpecial.length > 0) {
      password += customSpecial[Math.floor(Math.random() * customSpecial.length)];
    }

    // Fill the rest of the password length with random characters
    for (let i = password.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    passwordTextArea.value = password; // Display the generated password in the textarea
  }

  // Slider value change handler
  passwordLengthSlider.addEventListener('input', function() {
    sliderValueDisplay.textContent = passwordLengthSlider.value;
    generatePassword(); // Auto-generate password when length changes
  });

  // Checkbox change handlers to refresh the password
  uppercaseCheckbox.addEventListener('change', generatePassword);
  lowercaseCheckbox.addEventListener('change', generatePassword);
  numbersCheckbox.addEventListener('change', generatePassword);
  specialCheckbox.addEventListener('change', generatePassword);

  // Button to copy password
  copyButton.addEventListener('click', function() {
    passwordTextArea.select();
    document.execCommand('copy');

    // Show notification for 2 seconds with fade-in and fade-out effect
    const notification = document.createElement('div');
    notification.textContent = 'Password copied!';
    notification.style.position = 'absolute';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Dark background with no green
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '16px';
    notification.style.opacity = '0'; // Start with opacity 0 for fade-in effect
    notification.style.transition = 'opacity 1s ease-in-out'; // Fade-in and fade-out transition
    document.body.appendChild(notification);

    // Trigger fade-in effect
    setTimeout(function() {
      notification.style.opacity = '1';
    }, 10);

    // Remove the notification after 2 seconds (fade out effect)
    setTimeout(function() {
      notification.style.opacity = '0';
      setTimeout(function() {
        notification.remove(); // Remove after fade-out completes
      }, 1000); // Wait for the fade-out transition to complete
    }, 2000);
  });

  // Button to refresh password
  refreshButton.addEventListener('click', function() {
    generatePassword(); // Ensure the password is refreshed correctly with current settings
  });

  // Initial password generation
  generatePassword();
});
