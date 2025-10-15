// Enhanced Navigation
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.progress-bar');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / maxScroll) * 100;
    
    // Update progress bar
    progressBar.style.width = scrollPercent + '%';
    
    // Add scrolled class to navbar
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Simple Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Show cursors when they're functional
    cursor.style.opacity = '1';
    cursor.style.visibility = 'visible';
    cursorFollower.style.opacity = '1';
    cursorFollower.style.visibility = 'visible';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Simple Slider
let currentSlideIndex = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = n - 1;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Button Functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Contact form handling
function handleContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const projectType = this.querySelector('select').value;
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !projectType || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span class="btn-content"><span class="btn-text">Sending...</span></span>';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! I\'ll get back to you within 24 hours.');
                this.reset();
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        });
    }
}

// Navigation
function setupNavigation() {
    // Smooth scrolling
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

    // Mobile navigation
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
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        
        setInterval(() => {
            changeSlide(1);
        }, 4000);
    }
    
    // Initialize all functionality
    handleContactForm();
    setupNavigation();
});
// Floating Tech Canvas
document.addEventListener('DOMContentLoaded', function() {
    const techFloats = document.querySelectorAll('.tech-float');
    const centerIcon = document.getElementById('centerIcon');
    const centerTitle = document.getElementById('centerTitle');
    const centerDesc = document.getElementById('centerDesc');
    
    const techData = {
        html: { name: 'HTML5', desc: 'Semantic markup language for structuring web content with modern elements and accessibility features.' },
        css: { name: 'CSS3', desc: 'Advanced styling with Flexbox, Grid, animations, and responsive design principles.' },
        js: { name: 'JavaScript', desc: 'Modern ES6+ JavaScript for interactive web applications and DOM manipulation.' },
        php: { name: 'PHP', desc: 'Server-side scripting for dynamic web applications, APIs, and backend development.' },
        mysql: { name: 'MySQL', desc: 'Relational database design, optimization, and complex query development.' },
        wordpress: { name: 'WordPress', desc: 'Custom theme development, plugin creation, and site optimization.' },
        drupal: { name: 'Drupal', desc: 'Enterprise CMS development, custom modules, and site building expertise.' },
        symfony: { name: 'Symfony', desc: 'PHP framework for robust web applications and API development.' },
        bootstrap: { name: 'Bootstrap', desc: 'Responsive framework for rapid UI development and component design.' },
        tailwind: { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for custom design systems.' },
        git: { name: 'Git', desc: 'Version control, branching strategies, and collaborative development workflows.' },
        github: { name: 'GitHub', desc: 'Code hosting, CI/CD pipelines, and project management.' },
        gitlab: { name: 'GitLab', desc: 'DevOps platform for CI/CD, code review, and project collaboration.' },
        docker: { name: 'Docker', desc: 'Containerization for development environments and application deployment.' },
        kubernetes: { name: 'Kubernetes', desc: 'Container orchestration and microservices deployment.' },
        ubuntu: { name: 'Ubuntu', desc: 'Linux server administration, command line, and system configuration.' },
        nginx: { name: 'Nginx', desc: 'Web server configuration, load balancing, and performance optimization.' },
        apache: { name: 'Apache', desc: 'Web server setup, virtual hosts, and .htaccess configuration.' },
        redis: { name: 'Redis', desc: 'In-memory caching, session storage, and performance optimization.' },
        aws: { name: 'AWS', desc: 'Cloud services including S3, EC2, and serverless architectures.' },
        figma: { name: 'Figma', desc: 'UI/UX design, prototyping, and design system creation.' },
        xd: { name: 'Adobe XD', desc: 'User experience design and interactive prototyping.' },
        acquia: { name: 'Acquia', desc: 'Cloud platform for Drupal hosting, optimization, and enterprise solutions.' }
    };
    
    // Set Drupal as default
    function setDefaultTech() {
        const drupalTech = techData.drupal;
        centerIcon.src = 'https://skillicons.dev/icons?i=drupal';
        centerIcon.alt = 'Drupal';
        centerTitle.textContent = drupalTech.name;
        centerDesc.textContent = drupalTech.desc;
    }
    
    // Initialize with Drupal
    setDefaultTech();
    
    techFloats.forEach(techFloat => {
        techFloat.addEventListener('click', function() {
            const techKey = this.dataset.tech;
            const tech = techData[techKey];
            
            if (tech) {
                const img = this.querySelector('img');
                centerIcon.src = img.src;
                centerIcon.alt = img.alt;
                centerTitle.textContent = tech.name;
                centerDesc.textContent = tech.desc;
                
                // Enhanced click effect
                this.style.transform = 'scale(1.4) rotate(10deg)';
                this.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.filter = '';
                }, 300);
            }
        });
        
        // Add random pulse animation
        techFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        techFloat.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
});
