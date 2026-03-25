// =========================
// INIT LUCIDE ICONS
// =========================
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// =========================
// NAVBAR SCROLL
// =========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// =========================
// ACTIVE NAV LINK ON SCROLL
// =========================
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// =========================
// MOBILE MENU BURGER
// =========================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

function closeMenu() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
}

// =========================
// ANIMATION ON SCROLL
// =========================
const animElements = document.querySelectorAll('.card, .temo-card, .feat-item, .contact-item');

const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.transition = `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms`;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

animElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    animObserver.observe(el);
});

// =========================
// OPTIONNEL : SMOOTH SCROLL FOR NAV LINKS
// =========================
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // ajuster la hauteur si navbar fixe
                behavior: 'smooth'
            });
        }
        // fermer le menu mobile si ouvert
        closeMenu();
    });
});