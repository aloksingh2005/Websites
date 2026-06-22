// Main JavaScript file for global functionality

// Load theme toggle script dynamically
function loadThemeToggle() {
    const script = document.createElement('script');
    script.src = 'js/theme-toggle.js';
    script.onload = function() {
        if (typeof initThemeToggle === 'function') {
            initThemeToggle();
        }
    };
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();

    // Form validation helper
    window.validateForm = function (form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }

            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });

        return isValid;
    };

    // Add error styling for forms
    const style = document.createElement('style');
    style.textContent = `
    .error {
      border: 2px solid #EF4444 !important;
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    document.head.appendChild(style);
    
    // Load theme toggle functionality
    loadThemeToggle();
});

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.global-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `global-message ${type}`;
    messageEl.textContent = message;

    // Add styles
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.padding = '1rem 1.5rem';
    messageEl.style.borderRadius = '4px';
    messageEl.style.zIndex = '9999';
    messageEl.style.fontFamily = "'Poppins', sans-serif";
    messageEl.style.fontWeight = '500';
    messageEl.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';

    if (type === 'success') {
        messageEl.style.background = 'rgba(16, 185, 129, 0.9)';
        messageEl.style.color = 'white';
    } else if (type === 'error') {
        messageEl.style.background = 'rgba(239, 68, 68, 0.9)';
        messageEl.style.color = 'white';
    } else {
        messageEl.style.background = 'rgba(139, 92, 246, 0.9)';
        messageEl.style.color = 'white';
    }

    // Add to document
    document.body.appendChild(messageEl);

    // Remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}