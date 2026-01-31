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


// 3. Typewriter Effect (Existing)
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


// 4. Skill Bar Animation (Trigger on scroll) (Existing)
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


// 5. Floating Action Button (Scroll to Top) (Existing)
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
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
}

// 6. Particle Background Effect (Existing)
const canvas = document.getElementById('hero-particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray;

  // Handle Resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // Size between 1 and 3
      this.speedX = Math.random() * 1 - 0.5; // Random speed
      this.speedY = Math.random() * 1 - 0.5;
      this.color = 'rgba(245, 199, 122, 0.3)'; // Primary gold color with opacity
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    // Adjust number of particles based on screen size
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      
      // Connect particles with lines if close enough
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 199, 122, ${0.1 - distance/1000})`; // Fade out line
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}

// 7. Scroll Progress Bar (Existing)
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

// 8. Active Nav Link Highlighter (Existing)
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of section is visible

navSections.forEach(section => {
  navObserver.observe(section);
});

// 9. Custom Cursor Logic (NEW)
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay (animation in CSS keyframes isn't needed, just direct update with lag via animate)
    // Simple direct update for responsiveness
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });
}