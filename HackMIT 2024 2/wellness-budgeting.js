const apiKey = '7bb4c1d6b8d2444dfbe5a21b000fc59a'; // Your Nessie API key
const accountId = '66e654829683f20dd5189c98'; // Lily's existing Account ID
let currentBalance = null; // Initialize as null to avoid setting an incorrect initial value
let totalSpent = 0.00;
let merchantId; // This will hold the merchant ID for purchases

// Function to get Lily's account balance from the Nessie API

async function getAccountBalance() {
    try {
        const response = await fetch(`http://api.nessieisreal.com/accounts/${accountId}?key=${apiKey}`);
        const accountData = await response.json();

        if (response.ok) {
            currentBalance = accountData.balance; // Set the current balance from the API response
            document.getElementById('balance').textContent = currentBalance.toFixed(2);
        } else {
            console.error('Failed to fetch account balance:', accountData);
            alert(`Failed to fetch the account balance. Error: ${accountData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error fetching account balance:', error);
        alert('An error occurred while fetching the account balance. Please check the console for more details.');
    }
}

// Function to update balance in the UI
function updateBalance(amount) {
    if (currentBalance === null) {
        alert('Balance is not yet fetched. Please try again later.');
        return;
    }

    currentBalance -= amount;
    totalSpent += amount;
    document.getElementById('balance').textContent = currentBalance.toFixed(2);
    document.getElementById('total-spent').textContent = totalSpent.toFixed(2);
}

// Function to make a purchase using the Nessie API
async function makePurchase(itemName, amount) {
    if (currentBalance === null) {
        alert('Balance is not yet fetched. Please try again later.');
        return;
    }


    if (currentBalance < amount) {
        showFeedback('Insufficient Funds', 'You do not have enough money to make this purchase.');
        return;
    }

    try {
        const response = await fetch(`http://api.nessieisreal.com/accounts/${accountId}?key=${apiKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merchant_id: merchantId,
                medium: 'balance',
                purchase_date: new Date().toISOString().split('T')[0],
                amount: amount,
                description: `Purchased ${itemName}`
            })
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Purchase successful:', responseData);
            showFeedback('Purchase Successful', `You purchased ${itemName} for $${amount}.`);
            updateBalance(amount);
            checkCompletion();
        } else {
            console.error('Purchase failed:', responseData);
            showFeedback('Purchase Failed', `Unable to complete the purchase. Reason: ${responseData.message || 'Unknown error'}.`);
        }
    } catch (error) {
        console.error('Error making purchase:', error);
        showFeedback('Error', 'An error occurred while processing your purchase. Please check the console for more details.');
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

// Check if the goal is completed
function checkCompletion() {
    if (currentBalance >= 30) {
        document.querySelector('.back-button').classList.remove('hidden');
        showFeedback('Goal Achieved', 'You have saved enough money for next month’s expenses!');
    }
}

// Call functions when the page loads
window.onload = async function() {
    await getAccountBalance(); // Fetch and set Lily's current account balance
    await getMerchantId(); // Get a valid merchant ID before any purchases
};
