// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initTypewriter();
    initPortfolio();
    initTestimonials();
    initBackToTop();
    initServiceCards();
    initLightbox();
    initFormValidation();
    initAOS();
    initCounters();
    initMobileMenu();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
}

// Sticky Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Update navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.createElement('div');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        // Append to container instead of inserting before theme toggle (which was removed)
        navContainer.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
}

// Typewriter Effect
function initTypewriter() {
    const typeWriterElement = document.querySelector('.type-writer');
    if (!typeWriterElement) return;
    
    const words = ['Experiences', 'Solutions', 'Projects'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Portfolio Filter
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonials Carousel
function initTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (!testimonialSlides.length) return;
    
    let currentSlide = 0;
    const slideInterval = 5000;
    
    // Show the first slide
    testimonialSlides[0].classList.add('active');
    
    // Function to switch to the next slide
    function nextSlide() {
        testimonialSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
    }
    
    // Auto-rotate slides
    setInterval(nextSlide, slideInterval);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Service Card Flip Effect
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (!serviceCards.length) return;
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('flipped');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
        });
        
        // For touch devices
        card.addEventListener('touchstart', () => {
            card.classList.toggle('flipped');
        });
    });
}

// Portfolio Lightbox
function initLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!portfolioItems.length) return;
    
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    // Create image element
    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;';
    lightbox.appendChild(closeBtn);
    
    // Add click event to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox when clicked
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Get form fields
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        // Simple validation
        if (nameInput && nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
        }
        
        if (messageInput && messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message (in a real app, you would submit the form)
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-success');
            successMessage.textContent = 'Thank you! Your message has been sent.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
    
    // Function to show error
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('is-invalid');
            
            // Remove error on input
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        }
    }
}

// Initialize AOS (Animate on Scroll) library
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
}

// Number Counter Animation
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target')) || 0;
                const duration = 2000; // Animation duration in milliseconds
                const step = target / (duration / 30); // Update every 30ms
                
                let current = 0;
                const counter = setInterval(() => {
                    current += step;
                    statNumber.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(counter);
                    }
                }, 30);
                
                // Unobserve after animation starts
                observer.unobserve(statNumber);
            }
        });
    }, options);
    
    statNumbers.forEach(statNumber => {
        observer.observe(statNumber);
    });
}
