document.addEventListener('DOMContentLoaded', function () {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();

            // Basic email validation
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // In a real implementation, you would send this to your server
                // For now, we'll just show a success message
                showNewsletterMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNewsletterMessage('Please enter a valid email address', 'error');
            }
        });
    }

    // Function to show newsletter messages
    function showNewsletterMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message ${type}`;
        messageEl.textContent = message;

        // Add styles
        messageEl.style.padding = '0.75rem';
        messageEl.style.borderRadius = '4px';
        messageEl.style.marginTop = '0.5rem';
        messageEl.style.fontSize = '0.9rem';
        messageEl.style.textAlign = 'center';

        if (type === 'success') {
            messageEl.style.background = 'rgba(16, 185, 129, 0.2)';
            messageEl.style.color = '#10B981';
            messageEl.style.border = '1px solid #10B981';
        } else {
            messageEl.style.background = 'rgba(245, 158, 11, 0.2)';
            messageEl.style.color = '#F59E0B';
            messageEl.style.border = '1px solid #F59E0B';
        }

        // Insert after the form
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm.parentNode.insertBefore(messageEl, newsletterForm.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    // Smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-bottom-links a');

    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link (starts with # or contains current domain)
            if (href.startsWith('#') || href.includes(window.location.hostname)) {
                // If it's a hash link, let the default behavior handle it
                if (href.startsWith('#')) return;

                // For other internal links, we could add smooth scrolling if needed
                // This is left as a placeholder for potential enhancements
            }
        });
    });

    // Footer animation on scroll into view
    const footer = document.querySelector('.modern-footer');

    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(footer);
    }
});