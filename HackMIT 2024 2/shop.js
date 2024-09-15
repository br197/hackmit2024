// Load the balance and purchased items from localStorage
let balance = JSON.parse(localStorage.getItem('balance')) || 100;
let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

// Update the displayed balance on page load
window.onload = () => {
    document.getElementById('balance').textContent = `${balance} Alerions`;
};

// Function to handle item purchase
function purchaseItem(button) {
    const itemElement = button.parentElement;
    const itemPrice = parseInt(itemElement.getAttribute('data-price'));
    const itemName = itemElement.getAttribute('data-item');

    // Check if the user has enough balance
    if (balance >= itemPrice) {
        // Deduct the price from balance
        balance -= itemPrice;
        document.getElementById('balance').textContent = `${balance} Alerions`;

        // Add item to purchased items list
        purchasedItems.push(itemName);
        localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

        // Update balance in localStorage
        localStorage.setItem('balance', JSON.stringify(balance));

        alert(`You have purchased: ${itemName}`);
    } else {
        alert("You don't have enough Alerions to buy this item.");
    }
}

// Function to go back to the dashboard
function goBack() {
    window.location.href = 'dashboard.html'; // Replace with your dashboard file name
}
