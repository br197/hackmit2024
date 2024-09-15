// Function to display achievements
function displayAchievements() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = ''; // Clear previous content

    // Retrieve stickers (achievements) from localStorage
    let stickers = JSON.parse(localStorage.getItem('achievements')) || [];

    // Add default module achievements if not already present
    const defaultModules = [
        'Completed Module: Navigating Periods', 
        'Completed Module: Understanding Growth',
        'Completed Module: Self Esteem'
    ];

    defaultModules.forEach(module => {
        if (!stickers.includes(module)) {
            stickers.push(module);
        }
    });
    
    // Save the updated stickers to localStorage
    localStorage.setItem('achievements', JSON.stringify(stickers));

    // Display all achievements
    stickers.forEach(sticker => {
        const stickerElement = document.createElement('div');
        stickerElement.className = 'sticker';
        stickerElement.textContent = sticker;
        achievementsContainer.appendChild(stickerElement);
    });
}

// Function to go back to the dashboard
function goBack() {
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
}

// Call the displayAchievements function when the page loads
window.onload = displayAchievements;
