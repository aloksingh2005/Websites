// Products page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    initScrollAnimations();

    // Add any products page specific functionality here
    console.log('Products page loaded');
});

// Function to initialize scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
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
        .animate-on-scroll:nth-child(2) { transition-delay: 0.3s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.5s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.7s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.9s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 1.1s; }
    `;
    document.head.appendChild(style);
});

// Service card hover effect enhancement
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card, .product-card');

    serviceCards.forEach(function (card) {
        // Add shine effect on hover
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            // Create shine effect
            const shine = document.createElement('div');
            shine.className = 'shine-effect';
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '-100%';
            shine.style.width = '100%';
            shine.style.height = '100%';
            shine.style.background = 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)';
            shine.style.transform = 'skewX(-25deg)';
            shine.style.zIndex = '10';
            shine.style.transition = 'left 0.6s';
            
            this.appendChild(shine);
            
            // Animate the shine
            setTimeout(() => {
                if (shine) {
                    shine.style.left = '100%';
                }
            }, 10);
            
            // Add pulsing effect to the image
            const image = this.querySelector('.service-img, .product-img');
            if (image) {
                image.style.animation = 'pulse 2s infinite';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            // Remove shine effect
            const shine = this.querySelector('.shine-effect');
            if (shine) {
                shine.remove();
            }
            
            // Remove pulsing effect from the image
            const image = this.querySelector('.service-img, .product-img');
            if (image) {
                image.style.animation = 'none';
            }
        });
    });
    
    // Add pulse animation to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.03);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
});