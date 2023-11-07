// Initialize player data
let player = {
    id: 1,
    energy: 100,
    money: 1000
};
const shopData = [
    {
        id: 1,
        energy: 10,
        price: 50
    },
    {
        id: 2,
        energy: 25,
        price: 150
    },
    {
        id: 3,
        energy: 50,
        price: 300
    },
    {
        id: 4,
        energy: 100,
        price: 600
    }
];

// Store the shop data in local storage
localStorage.setItem('shopData', JSON.stringify(shopData));


// Initialize inventory
let inventory = [];

// Load player and inventory data from localStorage
function loadPlayerData() {
    const storedPlayer = JSON.parse(localStorage.getItem('player'));
    if (storedPlayer) {
        player = storedPlayer;
    }
}

function loadInventoryData() {
    const storedInventory = JSON.parse(localStorage.getItem('inventory'));
    if (storedInventory) {
        inventory = storedInventory;
    }
}


// Save player and inventory data to localStorage
function savePlayerData() {
    localStorage.setItem('player', JSON.stringify(player));
}

function saveInventoryData() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}




// Update player and inventory displays
function updatePlayerDisplay() {
    document.getElementById("player-id").textContent = player.id;
    document.getElementById("energy").textContent = player.energy;
    document.getElementById("total-money").textContent = "$" + player.money.toFixed(2);
    document.getElementById("shop-total-money").textContent = "$" + player.money.toFixed(2);
}



// Load data and update displays when the page loads
loadPlayerData();
loadInventoryData();
updatePlayerDisplay();
// displayInventoryItems();

function consumeEnergy(min, max) {
    const energyConsumed = Math.floor(Math.random() * (max - min + 1)) + min;
console.log({energyConsumed});
    player.energy -= energyConsumed;
    updatePlayerDisplay();
    savePlayerData();
    return energyConsumed;
}


function updateMiningProgress() {
    const miningProgressBar = document.querySelector('.mining-progress-bar');
    const totalEnergy = document.querySelector('.total-energy');
    const mineButton = document.getElementById('mine-button'); 
}


function increaseEnergy() {
    if(player.energy < 100) {
        player.energy += 1; // Increase energy by 1
        updatePlayerDisplay(); // Update the displayed energy value
        savePlayerData(); // Save the updated player data to local storage
    }
}
function mineGold() {
    if (player.energy > 0) {
        const energyConsumed = consumeEnergy(1, 10);
        const minedGold = (Math.random() * 0.9) + 0.1; // Random gold weight between 0.1g and 1g

        console.log({ minedGold })
        
        // Store the collected gold item in the inventory
        const newGoldItem = { id: Date.now(), weight: minedGold.toFixed(1) };
        inventory.push(newGoldItem);
        saveInventoryData();
        
        updateMiningProgress(); // Reset the mining progress bar
        const progressBar = document.getElementById("mining-progress-bar");
        progressBar.style.width = "100%";
        // After a moment, reset the mining progress
        setTimeout(() => {
            updateMiningProgress();
        }, 1000);
        
        // displayInventoryItems();
    }
}

// function buyEnergy(energy, energyPrice) {
//     if (player.money >= energyPrice) {
//         player.money -= energyPrice;
//         savePlayerData();
//         const shopTotalMoney = document.getElementById("shop-total-money");
//         const formattedMoney = player.money.toFixed(2); 
//         shopTotalMoney.textContent = "$" + formattedMoney;   
//         player.energy += energy;
//         updatePlayerDisplay();
//     } else {
//         alert("Not enough money to buy energy!");
//     }
// }


// Function to buy energy
function buyEnergy(itemIndex) {
    const shopData = JSON.parse(localStorage.getItem('shopData'));
    const selectedItem = shopData[itemIndex];

    if (player.money >= selectedItem.price) {
        // Deduct the price from the player's money
        player.money -= selectedItem.price;

        // Increase the player's energy
        player.energy += selectedItem.energy;

        // Update the player's display and save the data
        updatePlayerDisplay();
        savePlayerData();


        // Save the updated shop data back to local storage (to update item availability)
        shopData[itemIndex].available = false; // Mark the item as unavailable
        localStorage.setItem('shopData', JSON.stringify(shopData));

        // Save the updated player data back to local storage
        localStorage.setItem('player', JSON.stringify(player));

        // display a message to indicate a successful purchase
        alert(`You've purchased ${selectedItem.energy} energy for $${selectedItem.price}.`);
    } else {
        alert("Not enough money to buy energy!");
    }
}


//  tab change function
// $(document).ready(function () {
//     setInterval(increaseEnergy, 60000);
//     getRecourd();
//     $(".displayCard").on('click', function () {
//         getRecourd();
//     })
//     $(".removeCard").on('click', function () {
//         removeRecourd() ;
//     })
// });
document.addEventListener('DOMContentLoaded', function() {
    setInterval(increaseEnergy, 60000);
    getRecourd();

    // Event listener for elements with class 'displayCard'
    const displayCardElements = document.querySelectorAll('.displayCard');
    displayCardElements.forEach(function(element) {
        element.addEventListener('click', function() {
            getRecourd();
        });
    });

    // Event listener for elements with class 'removeCard'
    const removeCardElements = document.querySelectorAll('.removeCard');
    removeCardElements.forEach(function(element) {
        element.addEventListener('click', function() {
            removeRecourd();
        });
    });
});

// get and show ui parth
function getRecourd() {
    const inventoryData = JSON.parse(localStorage.getItem("inventory"));

    if (inventoryData) {
        const inventoryContainer = document.getElementById("inventory-container");
        inventoryContainer.innerHTML = ''; // Clear the container

        inventoryData.forEach((item) => {
            const inventoryItemElement = document.createElement("div");
            inventoryItemElement.className = "inventory-box";
            console.log({ item })
            const formattedWeight = item.weight;
            inventoryItemElement.innerHTML = `<p>Gold: ${formattedWeight}g</p>`;
            inventoryContainer.appendChild(inventoryItemElement);
        });
    }

    const inventoryDatas = JSON.parse(localStorage.getItem("inventory"));
    if (inventoryDatas) {
        const inventoryContainer = document.getElementById("inventorys-container");
        inventoryContainer.innerHTML = ''; // Clear the container
        inventoryDatas.forEach((item) => {
            const inventoryItemElement = document.createElement("div");
            inventoryItemElement.className = "inventory-box";
            const formattedWeight = item.weight;
            inventoryItemElement.innerHTML = `<p>Gold: ${formattedWeight}g</p>`;
            inventoryContainer.appendChild(inventoryItemElement);
        });
        displayTotalGoldValue();
    }
}

function removeRecourd() {
    localStorage.removeItem("inventory");
    const inventoryContainer = document.getElementById("inventorys-container");
    inventoryContainer.innerHTML = '';

    localStorage.removeItem("inventory");
    const inventoryContainers = document.getElementById("inventory-container");
    inventoryContainers.innerHTML = '';
}


function displayTotalGoldValue() {
    const totalGoldValueElement = document.getElementById('total-gold-value');
    const totalGoldValue = calculateTotalGoldValue(); // issaugoti funkcija
    totalGoldValueElement.textContent = `${+totalGoldValue.toFixed(1)}g`;
}

function calculateTotalGoldValue() {
    let totalValue = 0;
    for (const goldItem of inventory) {
        console.log({ goldItem })
        // Assuming the weight of gold is in grams and the price is $30 per 0.1g
        // totalValue += (goldItem.weight * 10) * 30;
        totalValue += +goldItem.weight;
    }
    return totalValue;
}

function sellGold() {
    const totalGoldValue = (+(calculateTotalGoldValue()).toFixed(1))*30;
    console.log({ totalGoldValue:totalGoldValue*30 })
    
    // Add the total gold value to the player's money
    player.money += totalGoldValue;

    // Subtract the energy based on the amount of gold sold
    // const energyToSubtract = totalGoldValue; // 1 energy per $30
    // player.energy -= energyToSubtract;

    // Update the player's display and save the data
    updatePlayerDisplay();
    savePlayerData();

    // Clear the inventory after selling
    inventory = [];
    saveInventoryData();

    // Update the UI to show the new values
    displayTotalGoldValue();
}




