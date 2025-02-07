// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your submission! Our team will contact you shortly with a quote.');
            form.reset();
        });
    });
});