// Game variables
let characterPosition = 1; // Starting position
let score = 0;

// Move function to handle character movement
function move(direction) {
    // Clear current character position
    document.getElementById(`cell-${characterPosition}`).classList.remove('character');

    // Calculate new position
    if (direction === 'up' && characterPosition >= 5) characterPosition -= 5;
    if (direction === 'down' && characterPosition < 20) characterPosition += 5;
    if (direction === 'left' && characterPosition % 5 !== 0) characterPosition -= 1;
    if (direction === 'right' && (characterPosition + 1) % 5 !== 0) characterPosition += 1;

    // Update character position
    const newCell = document.getElementById(`cell-${characterPosition}`);
    if (newCell.classList.contains('resource')) {
        // Collect resource
        newCell.classList.remove('resource');
        score++;
        document.getElementById('score').textContent = score;
    } else if (newCell.classList.contains('obstacle')) {
        // Hit an obstacle
        alert('Oops! You hit an obstacle.');
        return;
    }

    // Place character in the new position
    newCell.classList.add('character');
}

// Initialize the game board
function initGame() {
    // Place initial resources and obstacles on the grid
    const resourceCells = [2, 7, 15];
    const obstacleCells = [3, 8, 18];

    resourceCells.forEach(cell => {
        document.getElementById(`cell-${cell}`).classList.add('resource');
    });

    obstacleCells.forEach(cell => {
        document.getElementById(`cell-${cell}`).classList.add('obstacle');
    });

    // Place the character on the starting position
    document.getElementById(`cell-${characterPosition}`).classList.add('character');
}

// Start the game
initGame();
