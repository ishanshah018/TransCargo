'use strict';



// Navbar functionality
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
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
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

document.getElementById("learnMoreBtn").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "none";
});

document.getElementById("closeCard").addEventListener("click", function () {
  document.getElementById("moreInfoCard").style.display = "none";
});

// Blog

// Ensure b1 is hidden initially
document.getElementById("b1").style.display = "none";

// Event listener for the first blog's "Read More" button
document.getElementById("blog1").addEventListener("click", function () {
  document.getElementById("b1").style.display = "block";
});

// Event listener for the second blog's "Read More" button (if you want to show the same content)
document.getElementById("blog2").addEventListener("click", function () {
  document.getElementById("b1").style.display = "block";
});

// Close button to hide the info card
document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("b1").style.display = "none";
});

// -------

document.getElementById("blog2").addEventListener("click", function () {
  document.getElementById("b2").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("b2").style.display = "none";
});

document.getElementById("closeCard").addEventListener("click", function () {
  document.getElementById("b2").style.display = "none";
});