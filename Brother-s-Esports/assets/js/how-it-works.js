// How It Works Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ toggle functionality
    initFaq();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Add animation to timeline items when they enter viewport
    animateTimelineItems();
    
    // Video play button functionality
    initVideoPlayback();
});

/**
 * Initialize FAQ accordion functionality
 */
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Animate timeline items when they enter the viewport
 */
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
}

/**
 * Initialize video playback functionality
 */
function initVideoPlayback() {
    const videoPlayBtn = document.querySelector('.video-play-btn');
    
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // This is a placeholder for actual video functionality
            // In a real implementation, this would create a modal with an embedded video
            
            // Create video modal
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            // Add video container
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            
            // Add close button
            const closeButton = document.createElement('button');
            closeButton.className = 'close-video';
            closeButton.innerHTML = '&times;';
            
            // Add video iframe (placeholder URL - replace with actual video URL)
            const videoIframe = document.createElement('iframe');
            videoIframe.src = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';
            videoIframe.allowFullscreen = true;
            videoIframe.allow = 'autoplay';
            
            // Append elements
            videoContainer.appendChild(closeButton);
            videoContainer.appendChild(videoIframe);
            modal.appendChild(videoContainer);
            document.body.appendChild(modal);
            
            // Add active class to show modal with animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Add close functionality
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                
                // Remove modal after animation completes
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            // Close modal when clicking outside the video
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeButton.click();
                }
            });
        });
    }
}

// Add CSS for video modal
const style = document.createElement('style');
style.textContent = `
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .video-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .video-container {
        width: 80%;
        max-width: 900px;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .video-modal.active .video-container {
        transform: scale(1);
    }
    
    .close-video {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
    }
    
    .video-container iframe {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        border: none;
        border-radius: 8px;
        display: block;
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .video-container {
            width: 90%;
        }
        
        .close-video {
            right: 0;
            top: -50px;
        }
    }
`;
document.head.appendChild(style); 