const sections = document.querySelectorAll(".section");

// 1. Scroll Animation Observer (Existing)
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));


// 2. Advanced 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.card, .metric-card, .service-card, .tech-card, .project-cover-card, .experience-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', handleTilt);
  card.addEventListener('mouseleave', resetTilt);
});

function handleTilt(e) {
  const card = this;
  const rect = card.getBoundingClientRect();
  
  // Calculate mouse position relative to the center of the card
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -5; // Max rotation 5deg
  const rotateY = ((x - centerX) / centerX) * 5;  // Max rotation 5deg
  
  // Apply transformation
  // perspective(1000px) creates the 3D depth
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.transition = 'transform 0.1s ease-out';
  
  // Optional: Add a subtle lighting effect (if supported by CSS)
  // card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 20px rgba(0,0,0,0.2)`;
}

function resetTilt(e) {
  const card = this;
  
  // Reset transformation
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease-out'; // Smooth reset
}