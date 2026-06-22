// Services page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    initScrollAnimations();

    // Add any services page specific functionality here
    console.log('Services page loaded');
});

// Function to initialize scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation delays for children
                    const children = entry.target.querySelectorAll('*');
                    children.forEach(function(child, index) {
                        child.style.transitionDelay = (index * 0.1) + 's';
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animateElements.forEach(function (element) {
            element.classList.add('animated');
        });
    }
}

// Add scroll animation classes
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 0.6s; }
        
        /* Enhanced styles for service cards */
        .service-card, .additional-service-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        
        .service-card .service-img-icon, 
        .additional-service-card .service-img-icon {
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        
        .service-features li {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.4s ease;
        }
        
        .animate-on-scroll.animated .service-features li {
            opacity: 1;
            transform: translateX(0);
        }
        
        .service-features li:nth-child(1) { transition-delay: 0.3s; }
        .service-features li:nth-child(2) { transition-delay: 0.4s; }
        .service-features li:nth-child(3) { transition-delay: 0.5s; }
        .service-features li:nth-child(4) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
});

// Enhanced service card hover effect
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card, .additional-service-card');

    serviceCards.forEach(function (card) {
        // Add perspective for 3D effect
        card.style.perspective = '1000px';
        
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
            
            // Add slight rotation effect
            this.style.transform += ' rotateY(0deg)';
            
            // Enhance image effect
            const imgIcon = this.querySelector('.service-img-icon');
            if (imgIcon) {
                imgIcon.style.transform = 'scale(1.05)';
                imgIcon.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            }
            
            // Enhance button effect if present
            const button = this.querySelector('.btn');
            if (button) {
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 6px 15px rgba(139, 92, 246, 0.4)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            
            // Reset image effect
            const imgIcon = this.querySelector('.service-img-icon');
            if (imgIcon) {
                imgIcon.style.transform = 'scale(1)';
                imgIcon.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
            
            // Reset button effect if present
            const button = this.querySelector('.btn');
            if (button) {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            }
        });
    });
});

// Enhanced process step animation
document.addEventListener('DOMContentLoaded', function () {
    const processSteps = document.querySelectorAll('.process-step');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    
                    // Add staggered animation for content
                    const title = entry.target.querySelector('h3');
                    const description = entry.target.querySelector('p');
                    
                    if (title) title.style.transitionDelay = '0.2s';
                    if (description) description.style.transitionDelay = '0.4s';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        processSteps.forEach(function (step) {
            step.style.transform = 'translateY(30px)';
            step.style.opacity = '0';
            step.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.1), opacity 0.6s ease';
            observer.observe(step);
        });
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});