import apiKey from "./apiKey.js"

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display recipe details based on the recipeId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');
    console.log(recipeId);

    if (recipeId) {
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`)
            .then(response => response.json())
            .then(recipeDetails => {
                // Display the details in the HTML page
                document.getElementById('recipeTitle').textContent = recipeDetails.title;
                document.getElementById('recipeImage').src = recipeDetails.image;
                console.log(recipeDetails);
                // Update other elements with additional details
                // Display instructions
                const instructionsDiv = document.getElementById('recipeInstructions');
                instructionsDiv.innerHTML = `<h3>Instructions</h3><p>${recipeDetails.instructions}</p>`;

                // Display information table
                const infoTable = document.getElementById('recipeInfoTable');
                const propertiesInfoTable = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'LowFodmap']; // Add more properties as needed
                propertiesInfoTable.forEach(property => {
                    // Convert property name to lowercase and remove spaces, while preserving the capitalization of each word
                    const propertiesWithoutSpace = property.replace(/ +/g, '');
                    const formattedProperty = propertiesWithoutSpace.charAt(0).toLowerCase() + propertiesWithoutSpace.slice(1);
                    // Access property value using the formatted property name
                    const value = recipeDetails[formattedProperty];
                    const row = `<tr><td>${property}</td><td>${value ? '<i class="fa-solid fa-check" style="color: #63E6BE;"></i>' : '<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>'}</td></tr>`;
                    infoTable.innerHTML += row;
                });
                // nutrients
                const nutrientsTable = document.getElementById('nutrientsTable');
                // Define an array specifying the order of properties
                const propertyOrder = ['Calories', 'Carbohydrates', 'Fat', 'Protein'];

                // Loop through each property in the nutrients array based on the property order
                propertyOrder.forEach(propertyName => {
                    // Find the corresponding property in the nutrients array
                    const property = recipeDetails.nutrition.nutrients.find(prop => prop.name === propertyName);
                    // Check if the property exists
                    if (property) {
                        // If the property exists, display it in the table
                        const row = `<tr><td>${propertyName}</td><td>${property.amount} ${property.unit}</td></tr>`;
                        nutrientsTable.innerHTML += row;
                    }
                });


            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });

        // ingredience
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`)
            .then(response => response.json())
            .then(recipeDetails => {
                const ingredientsList = document.getElementById('ingredientsList');
                ingredientsList.innerHTML = '';
                recipeDetails.ingredients.forEach(ingredient => {
                    const listItem = document.createElement('li');
                    listItem.textContent = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1) + ': ' + ingredient.amount.metric.value + ' ' + ingredient.amount.metric.unit;
                    ingredientsList.appendChild(listItem);

                });

            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
    } else {
        console.error('Recipe ID not found in the URL.');
    }

    // Make the image clickable and open a modal
    const recipeImage = document.getElementById('recipeImage');
    if (recipeImage) {
        recipeImage.addEventListener('click', function () {
            openModal(recipeImage.src); // Pass the image source to the openModal function
        });
    }
});

// Function to open the modal with the clicked image
function openModal(imageSrc) {
    const modalContainer = document.getElementById('modalContainer');
    const modalImage = document.getElementById('modalImage');

    modalImage.src = imageSrc;
    modalContainer.style.display = 'block';
}

// JavaScript code
document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

// Function to close the modal
function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
}

// Function to fetch and display similar recipes
function fetchSimilarRecipes(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${apiKey}&number=4`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displaySimilarRecipes(data);
        })
        .catch(error => {
            console.error('Error fetching similar recipes:', error);
        });
}

// Function to display similar recipes
function displaySimilarRecipes(similarRecipes) {
    const similarRecipesContainer = document.getElementById('similarRecipesContainer');
    similarRecipesContainer.innerHTML = '';

    similarRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.id = recipe.id;

        const title = document.createElement('h3');
        title.classList.add('recipe-title');
        title.textContent = recipe.title;

        card.appendChild(title);

        // Add click event listener to open recipe details in a new tab
        card.addEventListener('click', function () {
            const detailsUrl = `recipeDetails.html?recipeId=${recipe.id}`;
            window.open(detailsUrl, '_blank');
        });

        similarRecipesContainer.appendChild(card);
    });
}

// Call fetchSimilarRecipes function when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');

    if (recipeId) {
        fetchSimilarRecipes(recipeId);
    } else {
        console.error('Recipe ID not found in the URL.');
    }
});
