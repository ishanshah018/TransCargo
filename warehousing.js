// Pricing data
const prices = {
    general: {
        small: 5000,
        medium: 9000,
        large: 15000
    },
    cold: {
        small: 7000,
        medium: 12000,
        large: 20000
    },
    bonded: {
        small: 6000,
        medium: 11000,
        large: 18000
    },
    distribution: {
        small: 8000,
        medium: 14000,
        large: 22000
    }
};

// Additional services prices
const additionalServices = {
    security: 2000,
    climate: 3500,
    handling: 5000,
    insurance: 1500
};


// Initialize date inputs with minimum dates

function initializeDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const bookingdate = document.querySelector('input[name="bookingdate"]');
    bookingdate.min = tomorrow.toISOString().split('T')[0];
    // Converts tomorrow into an ISO 8601 formatted string (YYYY-MM-DDTHH:MM:SSZ).
    //split('T')[0] removes the time part, leaving only YYYY-MM-DD (e.g., "2025-02-22").

    // Any earlier date will be grayed out (unclickable).
	// This ensures the user must select at least tomorrow or later.
}


// Calculate and update price
function updatePrice() {
    const storageType = document.getElementById('storageType').value;
    const storageSize = document.getElementById('storageSize').value;
    const duration = parseInt(document.getElementById('duration').value);
    
    if (!storageType || !storageSize) return;

    let basePrice = prices[storageType][storageSize];
    let additionalCosts = 0;
    let breakdown = `<div>Base Price: ₹${basePrice}/month</div>`;

    // Calculate additional services
    if (document.getElementById('security').checked) {
        additionalCosts += additionalServices.security;
        breakdown += `<div>Security: ₹${additionalServices.security}/month</div>`;
    }
    if (document.getElementById('climate').checked) {
        additionalCosts += additionalServices.climate;
        breakdown += `<div>Climate Control: ₹${additionalServices.climate}/month</div>`;
    }
    if (document.getElementById('insurance').checked) {
        additionalCosts += additionalServices.insurance;
        breakdown += `<div>Insurance: ₹${additionalServices.insurance}/month</div>`;
    }

    let monthlyTotal = basePrice + additionalCosts;
    let handlingCost = document.getElementById('handling').checked ? additionalServices.handling : 0;
    
    if (handlingCost) {
        breakdown += `<div>Handling (One-time): ₹${handlingCost}</div>`;
    }

    let total = (monthlyTotal * duration) + handlingCost;
    
    breakdown += `<div>Duration: ${duration} month${duration > 1 ? 's' : ''}</div>`;
    
    document.getElementById('priceBreakdown').innerHTML = breakdown;
    document.getElementById('totalPrice').textContent = `₹${total}`;
}
// Show payment modal
function showPaymentOptions() {
    const form = document.getElementById('storageForm');
    if (!form) return;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    // Show the payment modal
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.style.display = 'block';
    }
}

// Payment method handling
document.addEventListener("DOMContentLoaded", function () {
    const paymentMethod = document.querySelector('select[name="paymentMethod"]');
    const cardDetails = document.getElementById('cardDetails');

    if (paymentMethod && cardDetails) {
        paymentMethod.addEventListener('change', function (e) {
            cardDetails.style.display = (e.target.value === 'credit' || e.target.value === 'debit') ? 'block' : 'none';
        });
    }

    // Card number formatting
    const cardNumberInput = document.querySelector('input[name="cardNumber"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim(); // Add space after every 4 digits
            e.target.value = value;
        });
    }

    // Expiry date formatting (MM/YY)
    const expiryDateInput = document.querySelector('input[name="expiryDate"]');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2); // Format as MM/YY
            }
            e.target.value = value;
        });
    }

    // Close modals when clicking the close button
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = function () {
            this.closest('.modal').style.display = 'none';
        };
    });

    // Close modal when clicking outside the modal
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Handle payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission
            
            // Hide the payment modal
            const paymentModal = document.getElementById('paymentModal');
            if (paymentModal) {
                paymentModal.style.display = 'none';
            }

            // Show success modal
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.style.display = 'block';
            }
        });
    }

    // Close success modal and redirect to the main page
    function closeSuccessModal() {
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'none';
        }
        window.location.href = "index.html"; // Redirect to main page
    }

    // Attach the close function to success modal button
    const closeSuccessBtn = document.querySelector('#successModal .btn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', closeSuccessModal);
    }
});


// MOBILE,MAIL Validations

// Get elements
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");
let paymentBtn = document.getElementById("paymentBtn");

// Realistic Email Validation RegEx
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

// Indian Phone Number Validation (Starts with 7, 8, or 9, 10 digits)
let phoneRegex = /^[789][0-9]{9}$/;

// Email Validation on Input
emailInput.addEventListener("input", function () {
    if (emailRegex.test(emailInput.value)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }
});

// Phone Number Validation on Input
phoneInput.addEventListener("input", function () {
    if (phoneRegex.test(phoneInput.value)) {
        phoneError.style.display = "none";
    } else {
        phoneError.style.display = "block";
    }
});



// Initialize dates on load
initializeDates();
