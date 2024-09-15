// Variables to store user achievements, progress, and interaction count
let progress = 0;
let interactionCount = 0;
const maxInteractions = 10; // Number of interactions to complete the module

// Array of possible responses based on keywords
const responses = {
    cramps: "I'm sorry to hear that! A warm bath or a heating pad can help. Have you tried either?",
    cycle: "That's great! Tracking your cycle helps you understand your body better. Did you log your cycle today?",
    tired: "Rest is very important! Make sure to drink plenty of water and get enough sleep.",
    hungry: "It's normal to feel hungrier during your period. Eating iron-rich foods can help replenish your energy!",
    mood: "Mood swings can be challenging. It's okay to take some time for yourself and do something you enjoy.",
    exercise: "Exercise can actually help relieve cramps and lift your mood. How about some light stretching or yoga?",
    pads: "Pads are great for beginners! They are easy to use and can help you feel secure during your period. Did you try a new brand?",
    tampons: "Tampons can be convenient, especially if you're swimming. Just make sure to change them every 4-6 hours.",
    lesson: "You've learned so much! What was the most surprising thing you discovered?",
    nutrition: "Eating well can really make a difference. Did you enjoy any new foods this week?",
    module: "Great job on completing a module! Which part did you find most helpful?",
    puberty: "In the puberty module, you learned about body changes and self-care. What do you think is the most important self-care tip?",
    general: [
        "That's interesting! Keep reflecting, and I'll be here to guide you.",
        "Can you tell me more about your experience this week?",
        "What did you learn about self-care that you want to practice?",
        "Reflecting is great! What’s something you’re proud of this week?",
        "What goals do you have for the next week of your journey?",
        "Remember, puberty is a time of change. How do you feel about what you've learned so far?"
    ]
};

// Function to handle user input and AI response
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return; // Ignore empty input

    displayMessage('user', userInput);
    processMessage(userInput);
    document.getElementById('user-input').value = ''; // Clear input field
}

// Display message in chat
function displayMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    document.getElementById('chat-box').appendChild(messageElement);
}

// Process user input and generate AI response
function processMessage(input) {
    let aiResponse = getAIResponse(input);
    interactionCount++; // Increase interaction count

    // Display AI response
    setTimeout(() => {
        displayMessage('ai', aiResponse);
        handleJournalInteraction(aiResponse); // Add sticker based on the response

        // Check if interactions reach the maximum count
        if (interactionCount >= maxInteractions) {
            completeModule();
        }
    }, 1000);
}

// Determine the AI response based on keywords in user input
function getAIResponse(input) {
    input = input.toLowerCase();
    for (const keyword in responses) {
        if (input.includes(keyword)) {
            return Array.isArray(responses[keyword]) ? 
                   responses[keyword][Math.floor(Math.random() * responses[keyword].length)] : 
                   responses[keyword];
        }
    }
    // Randomly pick from general responses if no specific keyword matches
    const generalResponses = responses.general;
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// Handle journal interaction and add stickers
function handleJournalInteraction(response) {
    // Example condition to add a sticker based on the interaction
    if (response.includes('learned')) {
        addSticker('Learning Pro');
    } else if (response.includes('hydration')) {
        addSticker('Hydration Hero');
    } else if (response.includes('cycle')) {
        addSticker('Cycle Tracker Expert');
    }

    // Update stickers display
    displayStickers();
}

// Add stickers to localStorage and achievements section
function addSticker(stickerName) {
    // Retrieve current stickers from localStorage
    let stickers = JSON.parse(localStorage.getItem('achievements')) || [];

    // Check if the sticker has already been earned
    if (!stickers.includes(stickerName)) {
        stickers.push(stickerName);
        localStorage.setItem('achievements', JSON.stringify(stickers));

        // Update the stickers display on the achievements section
        displayStickers();
        updateProgress();
    }
}

// Update progress and check if the module is complete
function updateProgress() {
    progress += 10; // Increment progress (10% per interaction)
    document.getElementById('progress-bar').value = progress;

    if (progress >= 100) {
        document.getElementById('download-summary').disabled = false;
    }
}

// Display stickers on the achievements section
function displayStickers() {
    const achievementsContainer = document.getElementById('achievements-container');
    achievementsContainer.innerHTML = ''; // Clear previous content

    // Retrieve stickers from localStorage
    const stickers = JSON.parse(localStorage.getItem('achievements')) || [];
    stickers.forEach(sticker => {
        const stickerElement = document.createElement('div');
        stickerElement.className = 'sticker';
        stickerElement.textContent = sticker;
        achievementsContainer.appendChild(stickerElement);
    });
}

// Complete the module and allow summary download
function completeModule() {
    displayMessage('ai', "Congratulations! You've completed the module. You can download your summary now.");
    document.getElementById('download-summary').disabled = false;
}

// Download summary
function downloadSummary() {
    const stickers = JSON.parse(localStorage.getItem('achievements')) || [];
    const summary = `Lily's Monthly Summary\n\nStickers Earned:\n- ${stickers.join('\n- ')}\n\nReflections: You’ve made great progress in understanding period care! Keep up the fantastic work.`;
    
    // Create a Blob and download it
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Lily_Summary.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Initial display of stickers
displayStickers();
