const character = document.getElementById('lily-character');
let characterPosition = { top: 400, left: 50 };
let collectedResources = 0;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveCharacter(0, -10);
            break;
        case 'ArrowDown':
            moveCharacter(0, 10);
            break;
        case 'ArrowLeft':
            moveCharacter(-10, 0);
            break;
        case 'ArrowRight':
            moveCharacter(10, 0);
            break;
    }
});

function moveCharacter(dx, dy) {
    characterPosition.top += dy;
    characterPosition.left += dx;
    character.style.top = characterPosition.top + 'px';
    character.style.left = characterPosition.left + 'px';

    // Check for collisions with resources
    checkCollision('pad');
    checkCollision('tampon');
    checkCollision('heating-pad');
}

function checkCollision(resource) {
    const resourceElement = document.getElementById(`resource-${resource}`);
    const resourceRect = resourceElement.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    // Check if character overlaps with the resource
    if (!resourceElement.classList.contains('collected') &&
        characterRect.left < resourceRect.right &&
        characterRect.right > resourceRect.left &&
        characterRect.top < resourceRect.bottom &&
        characterRect.bottom > resourceRect.top) {
        
        collectResource(resource);
    }
}

function collectResource(resource) {
    const resourceElement = document.getElementById(`resource-${resource}`);
    if (!resourceElement.classList.contains('collected')) {
        resourceElement.classList.add('collected');
        document.getElementById(`item-${resource}`).style.textDecoration = 'line-through';
        collectedResources++;
        showPopup(resource);
        checkGameCompletion();
    }
}

function showPopup(resource) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    const text = document.getElementById('popup-text');

    if (resource === 'pad') {
        title.textContent = "You Found Pads!";
        text.textContent = "Pads are worn inside your underwear to catch menstrual blood. They come in many sizes and absorbency levels.";
    } else if (resource === 'tampon') {
        title.textContent = "You Found Tampons!";
        text.textContent = "Tampons are inserted into the vagina to absorb menstrual blood. They come with different levels of absorbency.";
    } else if (resource === 'heating-pad') {
        title.textContent = "You Found a Heating Pad!";
        text.textContent = "Heating pads help relieve menstrual cramps by providing warmth and soothing muscle tension.";
    }

    popup.classList.remove('hidden');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
    popup.style.display = 'none';
}

function checkGameCompletion() {
    // Check if all resources are collected
    if (collectedResources === 3) {
        const backButton = document.querySelector('.back-button');
        backButton.classList.remove('hidden');
    }
}
