// Brother's eSports Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initHeroSlider();
    initTournamentSlider();
    initScrollEffects();
    initBackToTop();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle')) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    }
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const navButtons = document.querySelectorAll('.slider-navigation .slider-nav-btn');
    let currentSlide = 0;
    let slideInterval;
    
    if (slides.length > 0) {
        // Function to change slide
        function goToSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current slide
            slides[index].classList.add('active');
            if (navButtons[index]) {
                navButtons[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        // Auto slide change
        function startSlideShow() {
            slideInterval = setInterval(function() {
                let nextSlide = (currentSlide + 1) % slides.length;
                goToSlide(nextSlide);
            }, 5000); // Change slide every 5 seconds
        }
        
        // Initialize slider
        startSlideShow();
        
        // Add click events to navigation buttons
        navButtons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                clearInterval(slideInterval); // Stop auto sliding
                goToSlide(index);
                startSlideShow(); // Restart auto sliding
            });
        });
        
        // Pause slideshow on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            heroSlider.addEventListener('mouseleave', function() {
                startSlideShow();
            });
        }
    }
}

// Tournament Slider
function initTournamentSlider() {
    const tournamentCards = document.querySelectorAll('.tournament-card');
    const prevArrow = document.querySelector('.arrow-prev');
    const nextArrow = document.querySelector('.arrow-next');
    
    if (tournamentCards.length > 0 && prevArrow && nextArrow) {
        // Initialize variables
        let currentIndex = 0;
        let cardWidth = tournamentCards[0].offsetWidth + 30; // card width + gap
        const cardsContainer = tournamentCards[0].parentElement;
        const visibleCards = Math.floor(cardsContainer.offsetWidth / cardWidth);
        const maxIndex = tournamentCards.length - visibleCards;
        
        // Hide arrows if not needed
        if (tournamentCards.length <= visibleCards) {
            prevArrow.style.display = 'none';
            nextArrow.style.display = 'none';
        }
        
        // Update carousel position
        function updateCarousel() {
            const offset = -currentIndex * cardWidth;
            cardsContainer.style.transform = `translateX(${offset}px)`;
            
            // Update arrow states
            prevArrow.classList.toggle('disabled', currentIndex === 0);
            nextArrow.classList.toggle('disabled', currentIndex >= maxIndex);
        }
        
        // Initialize carousel
        cardsContainer.style.display = 'flex';
        cardsContainer.style.transition = 'transform 0.3s ease';
        updateCarousel();
        
        // Event listeners for arrows
        prevArrow.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextArrow.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            cardWidth = tournamentCards[0].offsetWidth + 30;
            const newVisibleCards = Math.floor(cardsContainer.offsetWidth / cardWidth);
            const newMaxIndex = tournamentCards.length - newVisibleCards;
            
            // Reset position if needed
            if (currentIndex > newMaxIndex) {
                currentIndex = Math.max(0, newMaxIndex);
            }
            
            updateCarousel();
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Scroll reveal animation
    if (scrollElements.length > 0) {
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('scrolled');
        };
        
        const hideScrollElement = (element) => {
            element.classList.remove('scrolled');
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };
        
        // Initialize elements
        scrollElements.forEach(el => el.classList.add('scroll-hidden'));
        
        // Add event listener
        window.addEventListener('scroll', handleScrollAnimation);
        
        // Trigger once on load
        handleScrollAnimation();
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.main-nav ul');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        }
    });
});

// Form Validation
const forms = document.querySelectorAll('form');
if (forms.length > 0) {
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create or update error message
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                    errorMessage.textContent = 'This field is required';
                } else {
                    field.classList.remove('error');
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.textContent = '';
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Clear error on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.textContent = '';
                }
            });
        });
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('button[type="submit"]');
        const responseMessage = document.createElement('div');
        responseMessage.classList.add('response-message');
        
        if (emailInput && emailInput.value.trim()) {
            // Simulating form submission
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            // Here you would normally send an AJAX request to your server
            setTimeout(() => {
                responseMessage.textContent = 'Thank you for subscribing!';
                responseMessage.classList.add('success');
                newsletterForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
                
                // Add response message to the form
                if (!newsletterForm.querySelector('.response-message')) {
                    newsletterForm.appendChild(responseMessage);
                } else {
                    newsletterForm.querySelector('.response-message').replaceWith(responseMessage);
                }
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    responseMessage.remove();
                }, 3000);
            }, 1000);
        }
    });
}

// Countdown Timer for Tournaments
function initCountdownTimers() {
    const countdownTimers = document.querySelectorAll('.countdown-timer');
    
    if (countdownTimers.length > 0) {
        countdownTimers.forEach(timer => {
            const targetDate = new Date(timer.dataset.targetDate).getTime();
            
            // Update countdown every second
            const interval = setInterval(function() {
                const now = new Date().getTime();
                const distance = targetDate - now;
                
                // Calculate time units
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Display countdown
                timer.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-value">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-value">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
                
                // Clear interval when countdown ends
                if (distance < 0) {
                    clearInterval(interval);
                    timer.innerHTML = '<p class="expired-text">Tournament has started!</p>';
                }
            }, 1000);
        });
    }
}

// Call countdown initialization
initCountdownTimers();

// Stats Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter-value');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = Math.floor(2000 / target); // Adjust animation speed
                    
                    const updateCounter = () => {
                        if (count < target) {
                            count += 1;
                            counter.textContent = count.toLocaleString();
                            setTimeout(updateCounter, speed);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Call stats counter initialization
initStatsCounter(); 