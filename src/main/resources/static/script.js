const userForm = document.getElementById('userForm');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');

// Assume the server is running on the same domain as the HTML, or specify the full URL.
const API_BASE_URL =window.location.origin;

// Function to validate the form inputs
function validateForm() {
    let isValid = true;

    if (!nameInput.value.trim()) {
        nameError.textContent = "Name is required";
        nameError.style.display = "block";
        isValid = false;
    } else {
        nameError.style.display = "none";
    }

    if (!emailInput.value.trim()) {
        emailError.textContent = "Email is required";
        emailError.style.display = "block";
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = "Invalid email format";
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    if (!phoneInput.value.trim()) {
        phoneError.textContent = "Phone is required";
        phoneError.style.display = "block";
        isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
        phoneError.textContent = "Invalid phone format";
        phoneError.style.display = "block";
        isValid = false;
    } else {
        phoneError.style.display = "none";
    }

    return isValid;
}

function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation regex
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}


// Event listener for form submission
userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return; // Stop if the form is invalid
    }

    // Get the user input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create an object with the user data
    const userData = { name, email, phone };

    // Send the data to the server using a POST request
    fetch(`${API_BASE_URL}/api/users/saveUser`, {  // Corrected URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                successMessage.textContent = 'Data saved successfully!';
                successMessage.style.display = 'block';
                userForm.reset(); // Clear the form
                setTimeout(() => {
                    successMessage.style.display = 'none'; // Hide the message after a few seconds
                }, 3000);
            } else {
                return response.json().then(errorData => {
                    errorMessage.textContent = errorData.message || 'Error saving data. Please try again.';
                    errorMessage.style.display = 'block';
                    console.error('Failed to save data:', errorData); // Log the error for debugging
                });
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred. Please check your network connection.';
            errorMessage.style.display = 'block';
            console.error('Error:', error);
        });
});