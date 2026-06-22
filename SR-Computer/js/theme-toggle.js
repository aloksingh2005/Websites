// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-toggle i');
    
    if (themeToggles.length === 0 || themeIcons.length === 0) {
        console.warn('Theme toggle buttons not found');
        return;
    }

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    }
    
    // Update theme icons based on current theme
    function updateThemeIcons(theme) {
        themeIcons.forEach(icon => {
            if (theme === 'light') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    // Add event listener to all toggle buttons
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
        
        // Also add keyboard support
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    });
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Export function so it can be called after dynamic header loading
window.initThemeToggle = initThemeToggle;