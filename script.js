'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navToggler.length; i++) {
  navToggler[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });
}



/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
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