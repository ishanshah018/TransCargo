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
const blogPosts = {
  1: {
      title: "Government Announces New Freight Corridors",
      content: `
          <h2>Government Announces New Freight Corridors</h2>
          <img src="images/blog-1.webp" alt="Freight Corridors" style="width: 100%; height: 400px; object-fit: cover; margin: 20px 0;">
          <p>In a significant move to enhance India's logistics infrastructure, the Indian Railways has announced the launch of new dedicated freight corridors. This initiative aims to revolutionize cargo movement across the country.</p>
          
          <h3>Key Highlights</h3>
          <ul>
              <li>East-West Dedicated Freight Corridor spanning over 1,500 km</li>
              <li>Advanced tracking systems for real-time cargo monitoring</li>
              <li>Reduced transit time by up to 50%</li>
              <li>Enhanced capacity for heavy-haul trains</li>
          </ul>

          <p>The new freight corridors are expected to significantly reduce logistics costs and improve the efficiency of cargo movement across India. This development comes as part of the government's broader initiative to strengthen the country's transportation infrastructure.</p>

          <p>Industry experts predict that these dedicated corridors will play a crucial role in supporting India's growing economy and facilitating smoother trade operations both domestically and internationally.</p>
      `
  },
  2: {
      title: "India's Ports Witness Record Growth",
      content: `
          <h2>India's Ports Witness Record Growth</h2>
          <img src="images/blog-2.jpg" alt="Indian Ports" style="width: 100%; height: 400px; object-fit: cover; margin: 20px 0;">
          <p>Major ports across India have reported unprecedented growth in cargo handling volumes during 2024, marking a significant milestone in the country's maritime sector development.</p>

          <h3>Growth Highlights</h3>
          <ul>
              <li>20% increase in container traffic</li>
              <li>Record-breaking exports in key sectors</li>
              <li>Improved port efficiency metrics</li>
              <li>Enhanced digital infrastructure implementation</li>
          </ul>

          <p>The remarkable growth in port operations can be attributed to several factors, including modernization initiatives, improved connectivity, and the implementation of cutting-edge technologies for cargo handling.</p>

          <p>This achievement underscores India's growing prominence in global maritime trade and reflects the success of various port modernization programs implemented in recent years. The increased efficiency and capacity of Indian ports are expected to further boost international trade and strengthen India's position in the global supply chain network.</p>
      `
  }
};

// Make functions globally available
window.openBlog = function(id) {
  const modal = document.getElementById('blogModal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = blogPosts[id].content;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
  const modal = document.getElementById('blogModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('blogModal');
  if (event.target === modal) {
      closeModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      closeModal();
  }
});