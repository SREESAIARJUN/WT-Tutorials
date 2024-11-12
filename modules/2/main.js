// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to cards
const cards = document.querySelectorAll('.card');
const animateCards = () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

// Animate cards on page load
window.addEventListener('load', () => {
    animateCards();
});

// Add parallax effect to the header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Add tooltip initialization (requires Bootstrap JS)
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});