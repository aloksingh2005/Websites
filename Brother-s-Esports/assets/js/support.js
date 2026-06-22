// Support Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for Common Issues
    initTabs('.issues-tabs .tab-btn', '.issues-tabs .tab-content');
    
    // Tab functionality for FAQs
    initTabs('.faq-tabs .tab-btn', '.faq-tabs .tab-content');
    
    // Accordion functionality for FAQs
    initAccordion('.accordion-item');
    
    // File upload UI enhancement
    initFileUpload();
    
    // Search functionality
    initSearch('.faq-search input', '.accordion-item');
    
    // Feedback buttons
    initFeedback();
    
    // Back to top button
    initBackToTop();
});

// Initialize tab switching
function initTabs(tabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const contents = document.querySelectorAll(contentSelector);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            const content = document.getElementById(`${tabId}-tab`) || 
                            document.getElementById(`${tabId}-faq`);
            
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// Initialize accordion functionality
function initAccordion(itemSelector) {
    const items = document.querySelectorAll(itemSelector);
    
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = header.querySelector('.accordion-icon i');
            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });
}

// Initialize file upload UI
function initFileUpload() {
    const fileInput = document.getElementById('contact-attachment');
    const fileLabel = document.querySelector('.file-label');
    const fileInfo = document.querySelector('.file-info');
    
    if (fileInput && fileLabel && fileInfo) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                fileLabel.textContent = fileName;
                
                // Check file size
                const fileSize = fileInput.files[0].size / 1024 / 1024; // in MB
                if (fileSize > 5) {
                    fileInfo.textContent = 'File too large! Max size: 5MB';
                    fileInfo.style.color = '#f44336';
                } else {
                    fileInfo.textContent = `File selected: ${fileSize.toFixed(2)}MB`;
                    fileInfo.style.color = '#4caf50';
                }
            } else {
                fileLabel.innerHTML = '<i class="fas fa-paperclip"></i> Upload Screenshot or File';
                fileInfo.textContent = '(Max size: 5MB)';
                fileInfo.style.color = '#777';
            }
        });
    }
}

// Initialize search functionality
function initSearch(searchSelector, itemSelector) {
    const searchInput = document.querySelector(searchSelector);
    const items = document.querySelectorAll(itemSelector);
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length > 2) {
                items.forEach(item => {
                    const header = item.querySelector('.accordion-header h3');
                    const content = item.querySelector('.accordion-content p');
                    
                    if (header && content) {
                        const headerText = header.textContent.toLowerCase();
                        const contentText = content.textContent.toLowerCase();
                        
                        if (headerText.includes(query) || contentText.includes(query)) {
                            item.style.display = 'block';
                            
                            // Expand the item if it contains the search term
                            item.classList.add('active');
                            
                            // Highlight the matching text (optional)
                            const regex = new RegExp(query, 'gi');
                            header.innerHTML = header.textContent.replace(
                                regex, 
                                match => `<mark>${match}</mark>`
                            );
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            } else {
                // Reset display when query is too short
                items.forEach(item => {
                    item.style.display = 'block';
                    
                    // Remove highlighting
                    const header = item.querySelector('.accordion-header h3');
                    if (header) {
                        header.innerHTML = header.textContent;
                    }
                    
                    // Collapse items
                    item.classList.remove('active');
                });
            }
        });
    }
}

// Initialize feedback functionality
function initFeedback() {
    const feedbackButtons = document.querySelectorAll('.feedback button');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const feedback = button.closest('.feedback');
            
            // Change text to thank user
            feedback.innerHTML = '<p>Thank you for your feedback!</p>';
            
            // You would normally send this feedback to a server
            // Here we just log it
            console.log('User clicked:', button.textContent.trim());
        });
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
} 