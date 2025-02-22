'use strict';



// BACK to Top Button

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    if (header) header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});




// Navbar functionality
const navbar = document.querySelector('.navbar');
const menutoggler = document.querySelector('.menu-toggler');
const mobileMenu = document.querySelector('.mobile-menu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menutoggler.addEventListener('click', () => {
    menutoggler.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});


// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menutoggler.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});


// For Learn more

document.getElementById("learnMoreBtn").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "none";
});

document.getElementById("closeCard").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "none";
});
