function makeChoice(choice) {
    const storyText = document.getElementById('story-text');
    if (choice === 'stretch') {
        storyText.textContent = 'You feel a bit better after stretching. Now, what will you have for breakfast?';
    } else if (choice === 'medication') {
        storyText.textContent = 'The pain eases up after taking medication. It’s time to get ready for school!';
    } else {
        storyText.textContent = 'You snooze a bit more, but the cramps are still there. Time to get up and tackle the day.';
    }

    // Update choices for the next part of the story
    const choices = document.getElementById('choices');
    choices.innerHTML = `
        <button onclick="makeChoice('healthy')">Eat a Healthy Breakfast</button>
        <button onclick="makeChoice('snack')">Grab a Quick Snack</button>
        <button onclick="makeChoice('skip')">Skip Breakfast</button>
    `;
}
