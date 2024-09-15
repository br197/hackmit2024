document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let score = 0;
    const totalQuestions = 10;

    // Check answers
    const answers = [
        { question: 'q1', correct: 'correct' },
        { question: 'q2', correct: 'correct' },
        { question: 'q3', correct: 'correct' },
        { question: 'q4', correct: 'correct' },
        { question: 'q5', correct: 'correct' },
        { question: 'q6', correct: 'correct' },
        { question: 'q7', correct: 'correct' },
        { question: 'q8', correct: 'correct' },
        { question: 'q9', correct: 'correct' },
        { question: 'q10', correct: 'correct' }
    ];

    answers.forEach(answer => {
        const userAnswer = document.querySelector(`input[name="${answer.question}"]:checked`);
        if (userAnswer && userAnswer.value === answer.correct) {
            score++;
            userAnswer.parentNode.style.color = 'green'; // Highlight correct answer in green
        } else if (userAnswer) {
            userAnswer.parentNode.style.color = 'red'; // Highlight incorrect answer in red
        }
    });

    // Show result
    const result = document.getElementById('quiz-result');
    result.innerHTML = `<h3>You scored ${score} out of ${totalQuestions}!</h3>`;

    // Provide feedback based on score
    if (score < 5) {
        result.innerHTML += '<p>Don\'t worry! Keep learning to become a period care pro!</p>';
    } else if (score < 10) {
        result.innerHTML += '<p>Good job! You\'re on your way to becoming a period care expert!</p>';
    } else {
        result.innerHTML += '<p>Excellent! You are a period care master!</p>';
    }

    // Add a fun visual effect (confetti) for high scores
    if (score === totalQuestions) {
        triggerConfetti();
        // Show Next button only if the score is perfect
        document.getElementById('next-btn').classList.remove('hidden');
    }
});

// Fun function for a confetti effect
function triggerConfetti() {
    const result = document.getElementById('quiz-result');
    result.innerHTML += '<div class="confetti">🎉🎉🎉</div>';
    setTimeout(() => {
        document.querySelector('.confetti').remove();
    }, 3000);
}

// Navigate to the next page
document.getElementById('next-btn').addEventListener('click', function() {
    window.location.href = 'navigating_period.html';
});
