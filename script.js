// Theme toggle
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = document.body.classList.contains('light')
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
  setTheme(newTheme);
});

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Intersection Observer for subtle section reveal
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Contact form handler (demo)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Basic validation feedback
    if (!data.name || !data.email || !data.subject || !data.message) {
      formStatus.textContent = 'Please complete all fields.';
      return;
    }

    // Demo: log to console; replace with real endpoint as needed
    console.log('Form submission:', data);
    formStatus.textContent = 'Thanks for reaching out! Your message has been recorded.';
    contactForm.reset();
    setTimeout(() => (formStatus.textContent = ''), 4000);
  });
}
