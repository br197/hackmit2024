document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let score = 0;

    // Check answers
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if (q1 && q1.value === 'correct') score++;
    if (q2 && q2.value === 'correct') score++;

    // Show result
    const result = document.getElementById('quiz-result');
    result.textContent = `You scored ${score} out of 2!`;

    // Optionally provide feedback
    if (score < 2) {
        result.textContent += ' Keep learning to become a period care pro!';
    } else {
        result.textContent += ' Great job! You are a period care expert!';
    }
});
