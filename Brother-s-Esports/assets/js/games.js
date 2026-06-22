// Games Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize game filter functionality
    initGameFilter();
    
    // Add animations to game cards on page load
    animateGameCards();
    
    // Initialize game request form
    initGameRequestForm();
    
    // Initialize tournament slider if it exists
    if (document.querySelector('.tournaments-slider')) {
        initTournamentSlider();
    }
});

/**
 * Initialize filter functionality for game cards
 * Fixed to ensure proper filtering behavior
 */
function initGameFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (!filterButtons.length || !gameCards.length) return;
    
    // Show all cards initially with animation
    gameCards.forEach((card, index) => {
        card.classList.add('visible');
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Reset animations and prepare for new filter
            gameCards.forEach(card => {
                card.style.animation = 'none';
                card.classList.remove('visible');
                setTimeout(() => { card.style.display = 'none'; }, 10);
            });
            
            setTimeout(() => {
                // Filter game cards
                let visibleCards = [];
                
                gameCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.classList.add('visible');
                        visibleCards.push(card);
                    }
                });
                
                // Add animation to visible cards
                visibleCards.forEach((card, index) => {
                    card.style.animation = `fadeIn 0.4s ease forwards ${index * 0.1}s`;
                });
                
                // If no cards match the filter, show a message
                if (visibleCards.length === 0) {
                    const gamesGrid = document.querySelector('.games-grid');
                    
                    // Check if message already exists
                    let noGamesMessage = document.querySelector('.no-games-message');
                    if (!noGamesMessage) {
                        noGamesMessage = document.createElement('div');
                        noGamesMessage.className = 'no-games-message';
                        noGamesMessage.innerHTML = `
                            <div class="no-games-icon"><i class="fas fa-gamepad"></i></div>
                            <h3>No games found</h3>
                            <p>We don't have games in this category yet. Check out other categories or <a href="#game-request">request a new game</a>.</p>
                        `;
                        gamesGrid.appendChild(noGamesMessage);
                    } else {
                        noGamesMessage.style.display = 'block';
                    }
                    
                    // Animate the message
                    setTimeout(() => {
                        noGamesMessage.style.animation = 'fadeIn 0.5s ease forwards';
                    }, 100);
                } else {
                    // Hide the message if it exists
                    const noGamesMessage = document.querySelector('.no-games-message');
                    if (noGamesMessage) {
                        noGamesMessage.style.display = 'none';
                    }
                }
            }, 300); // Short delay for smoother transitions
        });
    });
}

/**
 * Add entry animations to game cards
 */
function animateGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        // Initially set opacity to 0
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Check if the card is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation when card comes into view
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    // Stop observing once animated
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
    
    // Add hover interactions
    gameCards.forEach(card => {
        const poster = card.querySelector('.game-poster');
        const overlay = card.querySelector('.game-overlay');
        
        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            
            // Add pulsing effect to the view details button
            const viewDetailsBtn = overlay.querySelector('.btn');
            if (viewDetailsBtn) {
                viewDetailsBtn.classList.add('pulse');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            
            // Remove pulsing effect
            const viewDetailsBtn = overlay.querySelector('.btn');
            if (viewDetailsBtn) {
                viewDetailsBtn.classList.remove('pulse');
            }
        });
    });
}

/**
 * Initialize game request form validation and submission
 */
function initGameRequestForm() {
    const requestForm = document.querySelector('.request-form');
    if (!requestForm) return;
    
    // Add ID to the section for easy navigation
    const requestSection = document.querySelector('.game-request-section');
    if (requestSection) {
        requestSection.id = 'game-request';
    }
    
    const gameNameInput = document.getElementById('game-name');
    const gameCategorySelect = document.getElementById('game-category');
    const gameRequestMessage = document.getElementById('game-request-message');
    const submitButton = requestForm.querySelector('button[type="submit"]');
    
    // Add focus effects to form fields
    [gameNameInput, gameCategorySelect, gameRequestMessage].forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            field.parentElement.classList.remove('focused');
            
            // Simple validation on blur
            if (field.value.trim() === '') {
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
    });
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        [gameNameInput, gameCategorySelect, gameRequestMessage].forEach(field => {
            field.classList.remove('invalid');
        });
        
        // Simple validation
        let isValid = true;
        
        if (!gameNameInput.value.trim()) {
            gameNameInput.classList.add('invalid');
            isValid = false;
        }
        
        if (!gameCategorySelect.value) {
            gameCategorySelect.classList.add('invalid');
            isValid = false;
        }
        
        if (!gameRequestMessage.value.trim()) {
            gameRequestMessage.classList.add('invalid');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                gameNameInput.value = '';
                gameCategorySelect.value = '';
                gameRequestMessage.value = '';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h4>Thank you for your suggestion!</h4>
                    <p>We will review your game request and get back to you soon.</p>
                `;
                
                // Add success message to form
                requestForm.innerHTML = '';
                requestForm.appendChild(successMessage);
                
                // Animate success message
                successMessage.style.animation = 'fadeIn 0.5s ease forwards';
            }, 1500);
        } else {
            // Shake invalid fields
            document.querySelectorAll('.invalid').forEach(field => {
                field.style.animation = 'shake 0.5s ease forwards';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
            });
        }
    });
}

/**
 * Initialize tournament slider
 */
function initTournamentSlider() {
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    // Add scroll reveal animation
    tournamentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                    
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
    
    // Add hover effects to tournament cards
    tournamentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.tournament-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
                image.style.transition = 'transform 0.5s ease';
            }
            
            const date = card.querySelector('.tournament-date');
            if (date) {
                date.style.transform = 'scale(1.1)';
                date.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.tournament-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            const date = card.querySelector('.tournament-date');
            if (date) {
                date.style.transform = 'scale(1)';
            }
        });
    });
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .game-card.visible {
        display: flex;
    }
    
    .pulse {
        animation: pulse 1.5s infinite ease-in-out;
    }
    
    .form-group.focused {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    .invalid {
        border-color: #ff3b30 !important;
    }
    
    .no-games-message {
        text-align: center;
        padding: 60px 20px;
        background: #f8f9fa;
        border-radius: 10px;
        margin: 30px auto;
        max-width: 500px;
    }
    
    .no-games-icon {
        font-size: 50px;
        color: var(--primary);
        margin-bottom: 20px;
    }
    
    .no-games-message h3 {
        font-size: 24px;
        margin-bottom: 10px;
        color: var(--dark);
    }
    
    .no-games-message p {
        color: var(--text-secondary);
    }
    
    .no-games-message a {
        color: var(--primary);
        text-decoration: underline;
    }
    
    .success-message {
        text-align: center;
        padding: 40px 20px;
    }
    
    .success-message i {
        font-size: 50px;
        color: #28a745;
        margin-bottom: 20px;
    }
    
    .success-message h4 {
        font-size: 24px;
        margin-bottom: 10px;
        color: var(--dark);
    }
    
    .success-message p {
        color: var(--text-secondary);
    }
`;
document.head.appendChild(style); 