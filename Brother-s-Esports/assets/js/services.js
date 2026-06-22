// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Initialize pricing toggle if it exists
    if (document.querySelector('.pricing-toggle')) {
        initPricingToggle();
    }
});

/**
 * Initialize FAQ accordions with toggle functionality
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Initialize testimonial slider with basic functionality
 * Note: This is a simple slider. For production, consider using a library like Swiper or Slick
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const items = slider.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    
    if (totalItems <= 1) return; // No need for slider controls if only one item
    
    // Create slider navigation
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-nav';
    
    // Create previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slider-prev';
    prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    
    // Create next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slider-next';
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    
    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    // Add dots based on number of items
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        
        // Add click event to dots
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
    }
    
    // Add navigation elements to slider
    sliderNav.appendChild(prevBtn);
    sliderNav.appendChild(dotsContainer);
    sliderNav.appendChild(nextBtn);
    slider.appendChild(sliderNav);
    
    // Initialize first slide
    items.forEach((item, index) => {
        item.style.display = index === 0 ? 'block' : 'none';
    });
    
    // Current slide index
    let currentIndex = 0;
    
    // Handle next button click
    nextBtn.addEventListener('click', () => {
        goToSlide((currentIndex + 1) % totalItems);
    });
    
    // Handle previous button click
    prevBtn.addEventListener('click', () => {
        goToSlide((currentIndex - 1 + totalItems) % totalItems);
    });
    
    // Function to change slide
    function goToSlide(index) {
        // Hide all items
        items.forEach(item => {
            item.style.display = 'none';
        });
        
        // Show the selected item
        items[index].style.display = 'block';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update current index
        currentIndex = index;
    }
    
    // Auto-rotate slides every 5 seconds
    let slideInterval = setInterval(() => {
        goToSlide((currentIndex + 1) % totalItems);
    }, 5000);
    
    // Pause rotation on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume rotation when mouse leaves
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide((currentIndex + 1) % totalItems);
        }, 5000);
    });
}

/**
 * Pricing toggle functionality 
 * For switching between monthly/yearly pricing
 */
function initPricingToggle() {
    const toggle = document.querySelector('.pricing-toggle');
    if (!toggle) return;
    
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    const toggleCheckbox = toggle.querySelector('input[type="checkbox"]');
    
    if (!toggleCheckbox || !monthlyPrices.length || !yearlyPrices.length) return;
    
    const monthlyLabel = toggle.querySelector('.toggle-label:first-child');
    const yearlyLabel = toggle.querySelector('.toggle-label:last-child');
    
    if (!monthlyLabel || !yearlyLabel) return;
    
    // Initialize with animation classes
    monthlyPrices.forEach(price => {
        price.style.display = 'block';
    });
    
    yearlyPrices.forEach(price => {
        price.style.display = 'none';
    });
    
    // Add event listener with smooth transition
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show yearly prices
            monthlyPrices.forEach(price => {
                price.style.display = 'none';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = 'block';
            });
            
            // Update labels
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            // Show monthly prices
            monthlyPrices.forEach(price => {
                price.style.display = 'block';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = 'none';
            });
            
            // Update labels
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }
    });
    
    // Add keyboard accessibility
    toggleCheckbox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.checked = !this.checked;
            
            // Trigger the change event
            const changeEvent = new Event('change');
            this.dispatchEvent(changeEvent);
        }
    });
} 