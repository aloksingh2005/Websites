// Function to initialize header functionality
function initHeader() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link, .mobile-contact-btn');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    if (!menuToggle || !mobileMenu) return;

    // Improved hamburger animation
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');

        // Change hamburger icon to close icon with CSS classes instead of inline styles
        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu with dedicated close button
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function () {
            closeMobileMenu();
        });
    }

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Small delay to allow link to navigate before closing menu
            setTimeout(() => {
                closeMobileMenu();
            }, 150);
        });
    });

    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.mobile-nav-link');
        const dropdownMenu = dropdown.querySelector('.mobile-dropdown-menu');

        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', function (e) {
                // Prevent default only for parent dropdown links
                if (this.getAttribute('href') === 'services.html') {
                    e.preventDefault();
                }
                
                // Toggle dropdown
                dropdownMenu.classList.toggle('active');
                
                // Rotate dropdown arrow if present
                const arrow = this.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('rotated');
                }
            });
        }
    });

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Header scroll effect (debounced)
    const header = document.querySelector('.modern-header');
    if (header) {
        let ticking = false;
        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Active link highlighting (for multi-page site, based on URL pathname)
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Handle root as index.html

    function setActiveLink() {
        const linksToUpdate = [...navLinks, ...mobileLinks];
        linksToUpdate.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Call on load
    setActiveLink();
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeader);

// Export function so it can be called after dynamic header loading
window.initHeader = initHeader;