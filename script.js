
// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        menuBtn.classList.remove('fa-bars');
        menuBtn.classList.add('fa-times');
    } else {
        menuBtn.classList.remove('fa-times');
        menuBtn.classList.add('fa-bars');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    mobileMenu.classList.remove('active');
    menuBtn.classList.remove('fa-times');
    menuBtn.classList.add('fa-bars');
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// WhatsApp Integration
function openWhatsApp(message) {
    const phoneNumber = "5511999999999"; // Substitua pelo número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Services Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.service-card');
const totalSlides = slides.length;

function moveCarousel(direction) {
    const track = document.getElementById('servicesTrack');
    const cardWidth = 300 + 24; // card width + gap
    
    currentSlide += direction;
    
    // Reset if at boundaries
    if (currentSlide < 0) {
        currentSlide = Math.max(0, totalSlides - 3);
    } else if (currentSlide > totalSlides - 3) {
        currentSlide = 0;
    }
    
    const translateX = -currentSlide * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
}

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// FAQ Accordion
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-question').classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
            item.querySelector('.faq-question i').classList.remove('fa-minus');
            item.querySelector('.faq-question i').classList.add('fa-plus');
        }
    });
    
    // Toggle current FAQ item
    element.classList.toggle('active');
    answer.classList.toggle('active');
    
    if (element.classList.contains('active')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}

// Form Submission
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    event.target.reset();
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .step, .testimonial-card, .guarantee-item');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Responsive Carousel for Mobile
function updateCarouselForMobile() {
    const track = document.getElementById('servicesTrack');
    const cards = track.querySelectorAll('.service-card');
    
    if (window.innerWidth < 768) {
        // Mobile: show one card at a time
        cards.forEach(card => {
            card.style.minWidth = '280px';
        });
    } else if (window.innerWidth < 1024) {
        // Tablet: show two cards
        cards.forEach(card => {
            card.style.minWidth = '300px';
        });
    } else {
        // Desktop: show three cards
        cards.forEach(card => {
            card.style.minWidth = '300px';
        });
    }
}

// Update carousel on resize
window.addEventListener('resize', updateCarouselForMobile);
updateCarouselForMobile();

// Touch/Swipe support for carousel on mobile
let startX = 0;
let isDragging = false;

document.getElementById('servicesTrack').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
});

document.getElementById('servicesTrack').addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
});

document.getElementById('servicesTrack').addEventListener('touchend', function(e) {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            moveCarousel(1); // Swipe left - next slide
        } else {
            moveCarousel(-1); // Swipe right - previous slide
        }
    }
    
    isDragging = false;
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // FAQ navigation
    if (e.target.classList.contains('faq-question')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFaq(e.target);
        }
    }
    
    // Carousel navigation
    if (e.target.closest('.services-carousel')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            moveCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            moveCarousel(1);
        }
    }
});

// Add focus styles for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('button, a, input, textarea, .faq-question');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #002850';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
