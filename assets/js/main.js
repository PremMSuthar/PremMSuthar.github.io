// Advanced Animation System
class AdvancedAnimations {
    constructor() {
        this.initializeAnimations();
        this.setupMagneticButtons();
        this.setupAdvancedCursor();
        this.setupScrollAnimations();
    }

    initializeAnimations() {
        // Staggered word animations
        document.querySelectorAll('.word').forEach((word, index) => {
            const delay = word.dataset.delay || index * 100;
            word.style.animationDelay = `${delay}ms`;
        });

        // Staggered description lines
        document.querySelectorAll('.desc-line').forEach((line, index) => {
            const delay = line.dataset.delay || (900 + index * 100);
            line.style.animationDelay = `${delay}ms`;
        });

        // Staggered stats
        document.querySelectorAll('.stat').forEach((stat, index) => {
            const delay = stat.dataset.delay || (1200 + index * 100);
            stat.style.animationDelay = `${delay}ms`;
        });

        // Hero actions delay
        const heroActions = document.querySelector('.hero-actions');
        if (heroActions) {
            const delay = heroActions.dataset.delay || 1500;
            heroActions.style.animationDelay = `${delay}ms`;
        }
    }

    setupMagneticButtons() {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    setupAdvancedCursor() {
        if (window.innerWidth <= 768) return;

        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (!cursor || !cursorFollower) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Advanced cursor with different states
        document.querySelectorAll('a, button, .project-card, .tech-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            });
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            followerX += (mouseX - followerX) * 0.05;
            followerY += (mouseY - followerY) * 0.05;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.project-card, .timeline-item, .value-card, .stat-box').forEach(el => {
            observer.observe(el);
        });
    }
}

// Enhanced parallax with performance optimization
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating elements
    document.querySelectorAll('.float-element').forEach(element => {
        const speed = element.getAttribute('data-speed') || 1;
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax for hero particles
    const particles = document.querySelector('.hero-particles');
    if (particles) {
        const yPos = scrolled * 0.3;
        particles.style.transform = `translateY(${yPos}px)`;
    }

    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - scrolled / 200);
        scrollIndicator.style.opacity = opacity;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Simple Working Slider
let slideIndex = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    
    slideIndex += direction;
    
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    
    slideIndex = n - 1;
    
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function initSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        slideIndex = 0;
        
        const autoSlide = setInterval(() => {
            changeSlide(1);
        }, 4000);
        
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        }
    }
}

// Enhanced form validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const projectType = this.querySelector('select').value;
        const message = this.querySelector('textarea').value.trim();
        
        if (!name || !email || !projectType || !message) {
            showFormError('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        setTimeout(() => {
            showFormSuccess('Thank you! I\'ll get back to you within 24 hours.');
            this.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = 'form-alert error';
    alert.innerHTML = `<span>⚠️</span><span>${message}</span>`;
    
    const form = document.querySelector('.contact-form form');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => alert.remove(), 5000);
}

function showFormSuccess(message) {
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = 'form-alert success';
    alert.innerHTML = `<span>✅</span><span>${message}</span>`;
    
    const form = document.querySelector('.contact-form form');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => alert.remove(), 7000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
    initSlider();
});

// Add advanced styles
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
    .cursor-hover {
        transform: scale(1.5) !important;
        border-color: var(--accent) !important;
    }
    
    .cursor-follower.cursor-hover {
        transform: scale(2) !important;
        background: var(--accent) !important;
        opacity: 0.3 !important;
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards !important;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-alert {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-weight: 500;
        animation: slideInDown 0.3s ease;
    }
    
    .form-alert.error {
        background: rgba(255, 107, 53, 0.1);
        border: 1px solid var(--accent);
        color: var(--accent);
    }
    
    .form-alert.success {
        background: rgba(40, 202, 66, 0.1);
        border: 1px solid #28ca42;
        color: #28ca42;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(advancedStyles);
