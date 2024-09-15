const apiKey = '7bb4c1d6b8d2444dfbe5a21b000fc59a'; // Replace with your Nessie API key
const accountId = '66e654829683f20dd5189c98'; // Replace with the generated account ID
let currentBalance = 50.00; // Starting balance

// Function to update balance in the UI
function updateBalance(amount) {
    currentBalance -= amount;
    document.getElementById('balance').textContent = currentBalance.toFixed(2);
}

// Function to make a purchase using the Nessie API
async function makePurchase(itemName, amount) {
    if (currentBalance < amount) {
        showFeedback('Insufficient Funds', 'You do not have enough money to make this purchase.');
        return;
    }

    try {
        const response = await fetch(`http://api.nessieisreal.com/accounts/${accountId}/purchases?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merchant_id: 'merchant-id', // Replace with an actual merchant ID
                medium: 'balance',
                purchase_date: new Date().toISOString().split('T')[0],
                amount: amount,
                description: `Purchased ${itemName}`
            })
        });

        if (response.ok) {
            showFeedback('Purchase Successful', `You purchased ${itemName} for $${amount}.`);
            updateBalance(amount);
            checkCompletion();
        } else {
            showFeedback('Purchase Failed', 'Unable to complete the purchase. Please try again.');
        }
    } catch (error) {
        console.error('Error making purchase:', error);
        showFeedback('Error', 'An error occurred while processing your purchase.');
    }
}

// Function to show feedback
function showFeedback(title, text) {
    document.getElementById('feedback-title').textContent = title;
    document.getElementById('feedback-text').textContent = text;
    document.getElementById('feedback').style.display = 'block';
}

// Function to close feedback popup
function closeFeedback() {
    document.getElementById('feedback').style.display = 'none';
}

// Check if all financial goals are completed
function checkCompletion() {
    if (currentBalance >= 10) {
        document.querySelector('.back-button').classList.remove('hidden');
        showFeedback('Goal Achieved', 'You have saved enough money for next month’s expenses!');
    }
}
