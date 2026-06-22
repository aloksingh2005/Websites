/**
 * Spectator Program Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero section animations
    initHeroAnimations();
    
    // Initialize earnings calculator
    initEarningsCalculator();
    
    // Initialize FAQ toggles
    initFaqToggles();
});

/**
 * Initialize animations for the hero section
 */
function initHeroAnimations() {
    // Get hero elements
    const heroContent = document.querySelector('.hero-content');
    const heroOverlay = document.querySelector('.hero-overlay img');
    
    // Reset any inline styles that might be interfering
    if (heroContent) {
        heroContent.style.opacity = '';
        heroContent.style.transform = '';
    }
    
    if (heroOverlay) {
        heroOverlay.style.opacity = '';
    }
    
    // Add animation classes if needed
    setTimeout(() => {
        if (heroContent) heroContent.classList.add('animated');
        if (heroOverlay) heroOverlay.classList.add('animated');
    }, 100);
}

/**
 * Initialize the earnings calculator functionality
 */
function initEarningsCalculator() {
    const matchesPerWeekSlider = document.getElementById('matches-per-week');
    const matchesValue = document.getElementById('matches-value');
    const calculateButton = document.getElementById('calculate-earnings');
    const regularMatches = document.getElementById('regular-matches');
    const tournamentFinals = document.getElementById('tournament-finals');
    const majorEvents = document.getElementById('major-events');
    const experienceLevel = document.getElementById('experience-level');
    
    // Update matches value when slider changes
    if (matchesPerWeekSlider && matchesValue) {
        matchesPerWeekSlider.addEventListener('input', function() {
            matchesValue.textContent = this.value;
        });
    }
    
    // Calculate earnings when button is clicked
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            calculateEarnings();
        });
    }
    
    // Function to calculate earnings based on inputs
    function calculateEarnings() {
        if (!matchesPerWeekSlider || !experienceLevel) return;
        
        const matches = parseInt(matchesPerWeekSlider.value);
        const experience = experienceLevel.value;
        
        // Base rates per match based on experience level
        const rates = {
            'trainee': 50,
            'junior': 75,
            'regular': 100,
            'senior': 150,
            'expert': 250
        };
        
        // Calculate base weekly earnings
        let weeklyEarnings = matches * rates[experience];
        
        // Apply bonuses for special tournament types
        if (tournamentFinals && tournamentFinals.checked) {
            weeklyEarnings += 200;
        }
        
        if (majorEvents && majorEvents.checked) {
            weeklyEarnings += 500;
        }
        
        // Calculate monthly earnings (4 weeks)
        const monthlyEarnings = weeklyEarnings * 4;
        
        // Calculate potential bonuses based on experience level
        const potentialBonuses = {
            'trainee': 200,
            'junior': 500,
            'regular': 800,
            'senior': 1200,
            'expert': 2000
        };
        
        // Update UI with calculated values
        document.querySelector('#weekly-earnings span').textContent = weeklyEarnings.toLocaleString();
        document.querySelector('#monthly-earnings span').textContent = monthlyEarnings.toLocaleString();
        document.querySelector('#potential-bonuses span').textContent = potentialBonuses[experience].toLocaleString();
    }
}

/**
 * Initialize FAQ toggle functionality
 */
function initFaqToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class on the question
                this.classList.toggle('active');
                
                // Toggle the answer visibility
                const answer = this.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }
} 