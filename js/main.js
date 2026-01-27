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


// 2. Advanced 3D Tilt Effect for Cards (Existing)
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
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.transition = 'transform 0.1s ease-out';
}

function resetTilt(e) {
  const card = this;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease-out';
}


// 3. Typewriter Effect
const textElement = document.getElementById('typewriter-text');
const phrases = ['Scalable APIs', 'AI Models', 'Automation Systems', 'Robust Backends'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
  if (!textElement) return;

  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; // Faster deleting
  } else {
    textElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100; // Normal typing
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Finished typing phrase
    isDeleting = true;
    typeSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before typing next
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start Typewriter
document.addEventListener('DOMContentLoaded', typeWriter);


// 4. Skill Bar Animation (Trigger on scroll)
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
      skillObserver.unobserve(bar); // Animate once
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));


// 5. Floating Action Button (Scroll to Top)
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});