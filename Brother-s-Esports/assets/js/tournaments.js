// Tournaments Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter functionality
    initFilters();
    
    // Initialize view toggle
    initViewToggle();
    
    // Initialize load more button
    initLoadMore();
    
    // Initialize calendar
    initCalendar();
    
    // Initialize leaderboard tabs
    initLeaderboard();
    
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize rules tabs
    initRulesTabs();
});

/**
 * Initialize filter functionality
 */
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    const searchInput = document.getElementById('tournament-search');
    const filterTagsContainer = document.getElementById('filter-tags');
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    // Track active filters
    const activeFilters = {
        game: 'all',
        format: 'all',
        entry: 'all',
        status: 'all',
        search: ''
    };
    
    // Add event listeners to filter selects
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.id.split('-')[0]; // Extract filter type from id
            activeFilters[filterType] = this.value;
            updateFilterTags();
            filterTournaments();
        });
    });
    
    // Add event listener to search input
    searchInput.addEventListener('input', function() {
        activeFilters.search = this.value.trim().toLowerCase();
        filterTournaments();
    });
    
    // Add search button click event
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Trigger the input event on search input
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
        });
    }
    
    /**
     * Update filter tags based on active filters
     */
    function updateFilterTags() {
        // Clear existing tags
        filterTagsContainer.innerHTML = '';
        
        // Check if any filters are active
        const hasActiveFilters = Object.values(activeFilters).some(value => 
            value !== 'all' && value !== '');
        
        if (!hasActiveFilters) {
            return;
        }
        
        // Create tags for active filters
        for (const [type, value] of Object.entries(activeFilters)) {
            if (value !== 'all' && value !== '') {
                // Skip search in tag display
                if (type === 'search') continue;
                
                const tag = document.createElement('div');
                tag.className = 'filter-tag';
                
                // Get display text for the filter
                const filterSelect = document.getElementById(`${type}-filter`);
                const selectedOption = filterSelect.options[filterSelect.selectedIndex];
                const displayText = selectedOption.textContent;
                
                tag.innerHTML = `
                    <span>${getFilterLabel(type)}: ${displayText}</span>
                    <i class="fas fa-times" data-filter-type="${type}"></i>
                `;
                
                // Add click event to remove filter
                tag.querySelector('i').addEventListener('click', function() {
                    const filterType = this.getAttribute('data-filter-type');
                    const filterSelect = document.getElementById(`${filterType}-filter`);
                    filterSelect.value = 'all';
                    activeFilters[filterType] = 'all';
                    updateFilterTags();
                    filterTournaments();
                });
                
                filterTagsContainer.appendChild(tag);
            }
        }
        
        // Add clear all button if there are active filters
        if (filterTagsContainer.children.length > 0) {
            const clearAllBtn = document.createElement('div');
            clearAllBtn.className = 'clear-all-filters';
            clearAllBtn.textContent = 'Clear All';
            
            clearAllBtn.addEventListener('click', function() {
                filterSelects.forEach(select => {
                    select.value = 'all';
                    const filterType = select.id.split('-')[0];
                    activeFilters[filterType] = 'all';
                });
                
                searchInput.value = '';
                activeFilters.search = '';
                
                updateFilterTags();
                filterTournaments();
            });
            
            filterTagsContainer.appendChild(clearAllBtn);
        }
    }
    
    /**
     * Get display label for filter type
     */
    function getFilterLabel(filterType) {
        switch (filterType) {
            case 'game': return 'Game';
            case 'format': return 'Format';
            case 'entry': return 'Entry Fee';
            case 'status': return 'Status';
            default: return filterType.charAt(0).toUpperCase() + filterType.slice(1);
        }
    }
    
    /**
     * Filter tournaments based on active filters
     */
    function filterTournaments() {
        let visibleCount = 0;
        
        tournamentCards.forEach(card => {
            const gameValue = card.getAttribute('data-game') || '';
            const formatValue = card.getAttribute('data-format') || '';
            const entryValue = card.getAttribute('data-entry') || '';
            const statusValue = card.getAttribute('data-status') || '';
            const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const cardDescription = card.querySelector('.tournament-description p')?.textContent.toLowerCase() || '';
            
            // Check if the card matches all active filters
            const matchesGame = activeFilters.game === 'all' || activeFilters.game === gameValue;
            const matchesFormat = activeFilters.format === 'all' || activeFilters.format === formatValue;
            const matchesEntry = activeFilters.entry === 'all' || activeFilters.entry === entryValue;
            const matchesStatus = activeFilters.status === 'all' || activeFilters.status === statusValue;
            
            // Check if the card matches the search query
            const matchesSearch = activeFilters.search === '' || 
                cardTitle.includes(activeFilters.search) || 
                cardDescription.includes(activeFilters.search);
            
            // Show or hide based on filter results
            const shouldShow = matchesGame && matchesFormat && matchesEntry && matchesStatus && matchesSearch;
            
            if (shouldShow) {
                card.style.display = '';
                visibleCount++;
                
                // Add a small delay for animation effect
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleCount * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Hide after animation
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Show message if no tournaments match the filters
        const noResultsElement = document.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResultsElement) {
                const container = document.getElementById('tournaments-container');
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <div class="no-results-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No tournaments found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                `;
                container.after(noResults);
            }
        } else if (noResultsElement) {
            noResultsElement.remove();
        }
    }
}

/**
 * Initialize view toggle functionality (grid/list)
 */
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const tournamentContainer = document.querySelector('.tournaments-container');
    let currentView = 'grid'; // Default view
    
    if (!tournamentContainer) return;
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            if (viewType !== currentView) {
                // Update active button
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update current view
                currentView = viewType;
                
                // Apply view change to tournament container
                tournamentContainer.classList.remove('grid-view', 'list-view');
                tournamentContainer.classList.add(`${viewType}-view`);
            }
        });
    });
}

/**
 * Initialize load more functionality
 */
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This is a placeholder for actual load more functionality
            // In a real implementation, this would make an AJAX call to fetch more tournaments
            
            // Simulate loading state
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate delay
            setTimeout(() => {
                // In a real implementation, this would append new tournaments to the container
                // For demo purposes, we'll just hide the button
                this.textContent = 'NO MORE TOURNAMENTS';
                this.classList.add('btn-disabled');
            }, 1500);
        });
    }
}

/**
 * Initialize tournament calendar functionality
 */
function initCalendar() {
    // Get calendar elements
    const viewButtons = document.querySelectorAll('.view-selector .view-btn');
    const monthView = document.querySelector('.calendar-month-view');
    const listView = document.querySelector('.calendar-list-view');
    const prevMonthBtn = document.querySelector('.month-nav.prev');
    const nextMonthBtn = document.querySelector('.month-nav.next');
    const currentMonthDisplay = document.querySelector('.current-month');
    
    // Set current date
    const currentDate = new Date();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Update month display
    function updateMonthDisplay() {
        currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    // Initialize with current month
    updateMonthDisplay();
    
    // Add event listeners to view toggle buttons
    if (viewButtons.length) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const viewType = this.getAttribute('data-view');
                
                // Update active button
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show appropriate view
                if (viewType === 'month') {
                    monthView.style.display = 'block';
                    listView.style.display = 'none';
                } else {
                    monthView.style.display = 'none';
                    listView.style.display = 'block';
                }
            });
        });
    }
    
    // Add event listeners to month navigation buttons
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateMonthDisplay();
            // In a real implementation, this would update the calendar grid
            // For demo purposes, we'll just update the month display
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateMonthDisplay();
            // In a real implementation, this would update the calendar grid
            // For demo purposes, we'll just update the month display
        });
    }
    
    // Add event listeners to calendar day events
    const dayEvents = document.querySelectorAll('.day-event');
    if (dayEvents.length) {
        dayEvents.forEach(event => {
            event.addEventListener('click', function() {
                const tournamentId = this.getAttribute('data-tournament');
                if (tournamentId) {
                    window.location.href = `tournament-details.html?id=${tournamentId}`;
                }
            });
        });
    }
}

/**
 * Initialize leaderboard tab functionality
 */
function initLeaderboard() {
    const tabButtons = document.querySelectorAll('.leaderboard-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Toggle current FAQ item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }
}

/**
 * Initialize rules tab functionality
 */
function initRulesTabs() {
    const rulesTabs = document.querySelectorAll('.rules-tab');
    const rulesContents = document.querySelectorAll('.rules-tab-content');
    
    if (rulesTabs.length) {
        rulesTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const rulesType = this.getAttribute('data-rules');
                
                // Update active tab
                rulesTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                rulesContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${rulesType}-rules`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
} 