
const headphones = document.getElementById('headphones');
const productHeadphones = document.getElementById('productHeadphones');

let lastScroll = 0;
let ticking = false;

function updateScroll() {
  const scrollY = window.scrollY;
  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );

  const progress = Math.min(1, scrollY / maxScroll);

  // Hero product rotates as you scroll.
  if (headphones) {
    const rotation = -12 + progress * 55;
    const lift = Math.min(scrollY * 0.12, 100);

    headphones.style.transform =
      `translateY(${lift}px) rotate(${rotation}deg) rotateY(${progress * 35}deg)`;
  }

  // Product showcase rotates in the opposite direction.
  if (productHeadphones) {
    const rotation = 10 - progress * 30;

    productHeadphones.style.transform =
      `scale(1.25) rotate(${rotation}deg) rotateY(${progress * 20}deg)`;
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });

updateScroll();

// Reveal sections when they enter the screen.
const revealElements = document.querySelectorAll(
  '.statement, .feature-card, .product-heading, .spec-item, .final-cta'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(el => observer.observe(el));

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.textContent = isOpen ? '✕' : '☰';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Product colors.
const colorOptions = document.querySelectorAll('.color-option');
const selectedColor = document.querySelector('.selected-color');

const colors = {
  midnight: {
    name: 'MIDNIGHT BLACK',
    headphone: '#272a35',
    metal: '#555968',
    pad: '#111218'
  },
  silver: {
    name: 'SPACE SILVER',
    headphone: '#b9bdc8',
    metal: '#e4e6ec',
    pad: '#555b68'
  },
  pearl: {
    name: 'PEARL WHITE',
    headphone: '#e8e4dc',
    metal: '#fffaf0',
    pad: '#a39f98'
  }
};

colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const color = colors[option.dataset.color];

    if (!color) return;

    document.documentElement.style.setProperty(
      '--headphone', color.headphone
    );

    document.documentElement.style.setProperty(
      '--metal', color.metal
    );

    document.documentElement.style.setProperty(
      '--pad', color.pad
    );

    selectedColor.textContent = color.name;

    colorOptions.forEach(btn => btn.classList.remove('active'));
    option.classList.add('active');
  });
});

// Demo CTA.
const notifyButton = document.getElementById('notifyButton');
const notifyMessage = document.getElementById('notifyMessage');

notifyButton.addEventListener('click', () => {
  notifyMessage.textContent =
    'Thanks for exploring AURA. This is a concept website.';
  notifyButton.textContent = 'You’re on the list ✓';
  notifyButton.disabled = true;
});
