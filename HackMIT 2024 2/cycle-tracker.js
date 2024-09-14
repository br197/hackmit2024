document.getElementById('cycle-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const date = document.getElementById('cycle-date').value;
    const symptoms = document.getElementById('symptoms').value;
    const moods = document.getElementById('moods').value;
    const notes = document.getElementById('notes').value;

    // Store entry in localStorage
    let entries = JSON.parse(localStorage.getItem('cycleEntries')) || [];
    entries.push({ date, symptoms, moods, notes });
    localStorage.setItem('cycleEntries', JSON.stringify(entries));

    // Display entries
    displayEntries();
});

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('cycleEntries')) || [];
    const entriesContainer = document.getElementById('entries-container');
    entriesContainer.innerHTML = '';

    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Symptoms:</strong> ${entry.symptoms}</p>
            <p><strong>Mood:</strong> ${entry.moods}</p>
            <p><strong>Notes:</strong> ${entry.notes}</p>
            <hr>
        `;
        entriesContainer.appendChild(entryDiv);
    });
}

// Initialize entries on page load
displayEntries();
