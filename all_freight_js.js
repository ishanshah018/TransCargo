// Base rates for price calculation
const baseRates = {
    standard: 800,
    express: 1600,
    hazardous: 900,
    valuable: 1200
};

// Sample locations data - these are our service available locations
const locations = [
    "New York, United States",
    "London, United Kingdom",
    "Tokyo, Japan",
    "Paris, France",
    "Dubai, United Arab Emirates",
    "Singapore",
    "Hong Kong",
    "Shanghai, China",
    "Sydney, Australia",
    "Mumbai, India"
];

// Initialize date inputs with minimum dates
function initializeDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const pickupDate = document.querySelector('input[name="pickupDate"]');
    pickupDate.min = tomorrow.toISOString().split('T')[0];
}

// Form elements
const airFreightForm = document.getElementById('airFreightForm');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const originSuggestions = document.getElementById('originSuggestions');
const destinationSuggestions = document.getElementById('destinationSuggestions');

// Modal elements
const summaryModal = document.getElementById('summaryModal');
const paymentModal = document.getElementById('paymentModal');
const contactModal = document.getElementById('contactModal');
const successModal = document.getElementById('successModal');
const paymentForm = document.getElementById('paymentForm');
const contactForm = document.getElementById('contactForm');

// Location suggestions functionality
function setupLocationInput(input, suggestionsContainer) {
    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();
        const filteredLocations = locations.filter(location => 
            location.toLowerCase().includes(value)
        );
        
        suggestionsContainer.style.display = value ? 'block' : 'none';
        
        if (value) {
            suggestionsContainer.innerHTML = filteredLocations.length > 0 
                ? filteredLocations.map(location => `
                    <div class="suggestion-item" onclick="selectLocation('${location}', '${input.id}')">
                        ${location}
                    </div>
                `).join('')
                : '<div class="suggestion-item no-service">Service not available in this location.<br>We will expand our services soon!</div>';
        }
    });

    // Validate location on blur
    input.addEventListener('blur', () => {
        setTimeout(() => {
            const value = input.value;
            if (value && !locations.includes(value)) {
                input.value = '';
                alert('Please select a location from the suggestions list. Service is not available for the entered location.');
            }
            suggestionsContainer.style.display = 'none';
        }, 200);
    });
}

function selectLocation(location, inputId) {
    document.getElementById(inputId).value = location;
    document.getElementById(inputId + 'Suggestions').style.display = 'none';
    calculatePrice();
}

// Calculate price based on inputs
function calculatePrice() {
    const weight = parseFloat(document.querySelector('input[name="weight"]').value) || 0;
    const length = parseFloat(document.querySelector('input[name="length"]').value) || 0;
    const width = parseFloat(document.querySelector('input[name="width"]').value) || 0;
    const height = parseFloat(document.querySelector('input[name="height"]').value) || 0;
    const shipmentType = document.querySelector('select[name="shipmentType"]').value;
    
    const volume = (length * width * height) / 5000; // Volume weight calculation
    const chargeableWeight = Math.max(weight, volume);
    
    let baseRate = baseRates[shipmentType] || baseRates.general;
    let price = chargeableWeight * baseRate;
    
    // Distance factor
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    if (origin && destination) {
        price *= 1.5;
    }
    
    // Update price display in INR
    document.querySelector('.price-amount').textContent = `₹${price.toFixed(2)}`;
}


// Calculate estimated delivery time based on origin, destination, and shipment type
function calculateEstimatedDelivery() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const pickupDate = document.querySelector('input[name="pickupDate"]').value;
    const shipmentType = document.querySelector('select[name="shipmentType"]').value;

    if (origin && destination && pickupDate) {
        const pickup = new Date(pickupDate);
        
        let estimatedDays;
        if (shipmentType === "express") {
            estimatedDays = Math.floor(Math.random() * 2) + 1; // 1-2 days for express
        } else {
            estimatedDays = Math.floor(Math.random() * 3) + 3; // 3-5 days for standard
        }

        const delivery = new Date(pickup);
        delivery.setDate(delivery.getDate() + estimatedDays);
        
        document.querySelector('.delivery-time').textContent = 
            `${delivery.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}`;
    }
}

// Ensure estimated delivery calculation is triggered by relevant fields
document.getElementById('origin').addEventListener('change', calculateEstimatedDelivery);
document.getElementById('destination').addEventListener('change', calculateEstimatedDelivery);
document.querySelector('input[name="pickupDate"]').addEventListener('change', calculateEstimatedDelivery);
document.querySelector('select[name="shipmentType"]').addEventListener('change', calculateEstimatedDelivery);

// Initialize dates on load
initializeDates();

// Setup location inputs
setupLocationInput(originInput, originSuggestions);
setupLocationInput(destinationInput, destinationSuggestions);

// Input event listeners for price calculation (not affecting estimated delivery)
document.querySelectorAll('input[name="weight"], input[name="length"], input[name="width"], input[name="height"]')
    .forEach(input => {
        input.addEventListener('input', calculatePrice);
    });

document.querySelector('select[name="shipmentType"]')
    .addEventListener('change', calculatePrice);

    // Function to validate origin and destination
function validateLocations() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if (origin && destination && origin === destination) {
        alert("Origin and destination cannot be the same. Please select a different destination.");
        document.getElementById('destination').value = '';
    }
}

// Add event listeners for validation
document.getElementById('origin').addEventListener('change', validateLocations);
document.getElementById('destination').addEventListener('change', validateLocations);



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
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Expiry date formatting
document.querySelector('input[name="expiryDate"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0,2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Form submission handlers
airFreightForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(airFreightForm);
    const bookingData = Object.fromEntries(formData.entries());
    
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <p><strong>Shipment Type:</strong> ${bookingData.shipmentType}</p>
        <p><strong>Pickup Date:</strong> ${new Date(bookingData.pickupDate).toLocaleDateString()}</p>
        <p><strong>Estimated Delivery:</strong> ${document.querySelector('.delivery-time').textContent}</p>
        <p><strong>Origin:</strong> ${bookingData.origin}</p>
        <p><strong>Destination:</strong> ${bookingData.destination}</p>
        <p><strong>Weight:</strong> ${bookingData.weight} kg</p>
        <p><strong>Dimensions:</strong> ${bookingData.length}cm × ${bookingData.width}cm × ${bookingData.height}cm</p>
        <p><strong>Special Requirements:</strong> ${bookingData.requirements || 'None'}</p>
        <p><strong>Total Price:</strong> ${document.querySelector('.price-amount').textContent}</p>
    `;
    
    showModal(summaryModal);
});

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    hideModal(paymentModal);
    showModal(contactModal);
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    hideModal(contactModal);
    
    // Generate booking ID and set estimated delivery
    const bookingId = 'AF' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('estimatedDelivery').textContent = 
        document.querySelector('.delivery-time').textContent;
    
    showModal(successModal);
});

// Modal controls
function showModal(modal) {
    modal.style.display = 'flex';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

// Setup modal buttons
document.querySelectorAll('.modal .btn-cancel').forEach(button => {
    button.addEventListener('click', () => {
        hideModal(button.closest('.modal'));
    });
});

// Summary modal confirm button
summaryModal.querySelector('.btn-confirm').addEventListener('click', () => {
    hideModal(summaryModal);
    showModal(paymentModal);
});

// Success modal OK button
successModal.querySelector('.btn-confirm').addEventListener('click', () => {
    hideModal(successModal);
    airFreightForm.reset();
    document.querySelector('.price-amount').textContent = '₹0.00'; 
    document.querySelector('.delivery-time').textContent = 'Calculate based on your inputs';
});

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
});

// Input event listeners for price calculation
document.querySelectorAll('input[name="weight"], input[name="length"], input[name="width"], input[name="height"]')
    .forEach(input => {
        input.addEventListener('input', calculatePrice);
    });

document.querySelector('select[name="shipmentType"]')
    .addEventListener('change', calculatePrice);

// Initialize dates on load
initializeDates();

// Setup location inputs
setupLocationInput(originInput, originSuggestions);
setupLocationInput(destinationInput, destinationSuggestions);