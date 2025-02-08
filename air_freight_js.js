// Sample countries and cities data
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
    "Mumbai, India",
    // Add more locations as needed
];

// Form elements
const airFreightForm = document.getElementById('airFreightForm');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const originSuggestions = document.getElementById('originSuggestions');
const destinationSuggestions = document.getElementById('destinationSuggestions');

// Modal elements
const summaryModal = document.getElementById('summaryModal');
const contactModal = document.getElementById('contactModal');
const successModal = document.getElementById('successModal');
const contactForm = document.getElementById('contactForm');

// Location suggestions functionality
function setupLocationInput(input, suggestionsContainer) {
    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();
        const filteredLocations = locations.filter(location => 
            location.toLowerCase().includes(value)
        );
        
        if (value && filteredLocations.length > 0) {
            suggestionsContainer.style.display = 'block';
            suggestionsContainer.innerHTML = filteredLocations
                .map(location => `
                    <div class="suggestion-item" onclick="selectLocation('${location}', '${input.id}')">
                        ${location}
                    </div>
                `).join('');
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function selectLocation(location, inputId) {
    document.getElementById(inputId).value = location;
    document.getElementById(inputId + 'Suggestions').style.display = 'none';
}

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.form-group')) {
        originSuggestions.style.display = 'none';
        destinationSuggestions.style.display = 'none';
    }
});

// Setup location inputs
setupLocationInput(originInput, originSuggestions);
setupLocationInput(destinationInput, destinationSuggestions);

// Form submission handler
airFreightForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(airFreightForm);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Display summary
    const summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `
        <p><strong>Shipment Type:</strong> ${bookingData.shipmentType}</p>
        <p><strong>Origin:</strong> ${bookingData.origin}</p>
        <p><strong>Destination:</strong> ${bookingData.destination}</p>
        <p><strong>Weight:</strong> ${bookingData.weight} kg</p>
        <p><strong>Dimensions:</strong> ${bookingData.length}cm × ${bookingData.width}cm × ${bookingData.height}cm</p>
        <p><strong>Special Requirements:</strong> ${bookingData.requirements || 'None'}</p>
    `;
    
    showModal(summaryModal);
});

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    hideModal(contactModal);
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
    showModal(contactModal);
});

// Success modal OK button
successModal.querySelector('.btn-confirm').addEventListener('click', () => {
    hideModal(successModal);
    airFreightForm.reset();
});

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
});