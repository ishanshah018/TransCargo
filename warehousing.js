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
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value) {
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

    document.getElementById('paymentModal').style.display = 'block';
}

// Payment method handling
document.querySelector('select[name="paymentMethod"]').addEventListener('change', function(e) {
    const cardDetails = document.getElementById('cardDetails');
    
    cardDetails.style.display = 'none';
    
    if (e.target.value === 'credit' || e.target.value === 'debit') {
        cardDetails.style.display = 'block';
    }
});

// Card number formatting
document.querySelector('input[name="cardNumber"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
    e.target.value = value;
});

// Expiry date formatting
document.querySelector('input[name="expiryDate"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2); // Format as MM/YY
    }
    e.target.value = value;
});

// Process payment
function processPayment(method) {
    const cardNumber = document.querySelector('input[name="cardNumber"]').value;
    const expiryDate = document.querySelector('input[name="expiryDate"]').value;

    // Basic check if card number and expiry date are filled
    if (cardNumber && expiryDate) {
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('successModal').style.display = 'block';
    } else {
        alert("Please fill in all payment details.");
    }
}

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
};

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('paymentModal').reset();
}


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
