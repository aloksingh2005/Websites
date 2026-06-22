/**
 * Brother's eSports - News Page Scripts
 * Author: Brother's eSports Team
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Featured News Slider
    initFeaturedNewsSlider();
    
    // News Filter
    initNewsFilter();
    
    // Newsletter Subscription
    initNewsletterForm();
    
    // Back to Top Button
    initBackToTop();
    
    // Mobile Menu
    initMobileMenu();
    
    // Pagination
    initPagination();
    
    // Tag Filtering
    initTagFiltering();
});

/**
 * Initialize the featured news slider
 */
function initFeaturedNewsSlider() {
    const slider = document.querySelector('.featured-news-slider');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.featured-news-item');
    const dotsContainer = document.querySelector('.dots-container');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    let slideInterval;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
        
        // Create dots
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        if (dotsContainer) {
            dotsContainer.appendChild(dot);
        }
    });
    
    // Function to show a specific slide
    function goToSlide(index) {
        // Hide current slide
        slides[currentIndex].style.display = 'none';
        
        // Update current index
        currentIndex = index;
        
        // Make sure index is within bounds
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        } else if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        // Show new current slide
        slides[currentIndex].style.display = 'flex';
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Reset interval
        resetInterval();
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Auto slide
    function startInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Start auto sliding
    startInterval();
    
    // Pause auto sliding on mouse hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startInterval();
    });
}

/**
 * Initialize the news filter functionality
 */
function initNewsFilter() {
    const searchInput = document.querySelector('.search-filter input');
    const categorySelect = document.querySelector('.category-filter select');
    const sortSelect = document.querySelector('.sort-filter select');
    const newsItems = document.querySelectorAll('.news-item');
    const noResults = document.querySelector('.no-results');
    
    if (!searchInput || !newsItems.length) return;
    
    function filterNews() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect ? categorySelect.value : 'all';
        
        let visibleCount = 0;
        
        newsItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
            const itemCategory = item.getAttribute('data-category') || 'all';
            
            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesCategory = category === 'all' || itemCategory === category;
            
            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
    
    function sortNews() {
        if (!sortSelect) return;
        
        const sortBy = sortSelect.value;
        const newsGrid = document.querySelector('.news-grid');
        
        if (!newsGrid) return;
        
        const itemsArray = Array.from(newsItems);
        
        switch(sortBy) {
            case 'newest':
                itemsArray.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date') || 0);
                    const dateB = new Date(b.getAttribute('data-date') || 0);
                    return dateB - dateA;
                });
                break;
                
            case 'oldest':
                itemsArray.sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date') || 0);
                    const dateB = new Date(b.getAttribute('data-date') || 0);
                    return dateA - dateB;
                });
                break;
                
            case 'popular':
                itemsArray.sort((a, b) => {
                    const viewsA = parseInt(a.getAttribute('data-views') || 0);
                    const viewsB = parseInt(b.getAttribute('data-views') || 0);
                    return viewsB - viewsA;
                });
                break;
        }
        
        // Remove existing items
        newsItems.forEach(item => {
            item.remove();
        });
        
        // Add sorted items
        itemsArray.forEach(item => {
            newsGrid.appendChild(item);
        });
        
        // Apply filters again
        filterNews();
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterNews);
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterNews);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortNews);
    }
    
    // Initialize with any default filters
    filterNews();
}

/**
 * Initialize the newsletter subscription form
 */
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = form.closest('.widget-content, .newsletter-content')
            .querySelector('.success-message');
        
        if (!emailInput || !submitBtn) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (!isValidEmail(email)) {
                emailInput.classList.add('is-invalid');
                return;
            }
            
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                emailInput.value = '';
                emailInput.classList.remove('is-invalid');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
                
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }, 1500);
        });
        
        // Validate email as user types
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                if (isValidEmail(this.value.trim())) {
                    this.classList.remove('is-invalid');
                }
            }
        });
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

/**
 * Initialize the back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Format date to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

/**
 * Scroll to section function for links in the page
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

/**
 * Initialize the mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
    const pagination = document.querySelector('.pagination');
    
    if (!pagination) return;
    
    const paginationLinks = pagination.querySelectorAll('a:not(.disabled)');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            pagination.querySelectorAll('a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Add active class to clicked link if it's a page number
            if (!this.classList.contains('prev') && !this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // In a real application, this would load the next page of content
            // For now, we'll just scroll to top of the news section
            scrollToSection('news-section');
        });
    });
}

/**
 * Initialize tag filtering when clicking on tags
 */
function initTagFiltering() {
    const tags = document.querySelectorAll('.tags-cloud a');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tagName = this.textContent.toLowerCase();
            const categorySelect = document.querySelector('.category-filter select');
            
            if (categorySelect) {
                // Find option that matches the tag or default to 'all'
                const options = Array.from(categorySelect.options);
                const matchingOption = options.find(option => 
                    option.textContent.toLowerCase() === tagName
                );
                
                if (matchingOption) {
                    categorySelect.value = matchingOption.value;
                } else {
                    categorySelect.value = 'all';
                }
                
                // Trigger change event to filter news
                const event = new Event('change');
                categorySelect.dispatchEvent(event);
                
                // Scroll to news section
                scrollToSection('news-section');
            }
        });
    });
} 