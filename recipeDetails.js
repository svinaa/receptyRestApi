import apiKey from "./apiKey.js"
import { fetchSimilarRecipes } from "./search.js";
import { openModal, closeModal } from "./displays.js";

//sem vlozit recipe details listener 
document.addEventListener('DOMContentLoaded', function () {
    // Fetch a zobrazeni detailu
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');
    console.log(recipeId);

    if (recipeId) {
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`)
            .then(response => response.json())
            .then(recipeDetails => {
                document.getElementById('recipeTitle').textContent = recipeDetails.title;
                document.getElementById('recipeImage').src = recipeDetails.image;
                console.log(recipeDetails);
                const instructionsDiv = document.getElementById('recipeInstructions');
                instructionsDiv.innerHTML = `<h3>Instructions</h3><p>${recipeDetails.instructions}</p>`;

                // info tabulka
                const infoTable = document.getElementById('recipeInfoTable');
                const propertiesInfoTable = ['Vegetarian', 'Vegan', 'Gluten Free', 'Dairy Free', 'LowFodmap']; // Add more properties as needed
                propertiesInfoTable.forEach(property => {

                    const propertiesWithoutSpace = property.replace(/ +/g, '');
                    const formattedProperty = propertiesWithoutSpace.charAt(0).toLowerCase() + propertiesWithoutSpace.slice(1);
                    const value = recipeDetails[formattedProperty];
                    const row = `<tr><td>${property}</td><td>${value ? '<i class="fa-solid fa-check" style="color: #63E6BE;"></i>' : '<i class="fa-solid fa-xmark" style="color: #ff0000;"></i>'}</td></tr>`;
                    infoTable.innerHTML += row;
                });
                // nutrients
                const nutrientsTable = document.getElementById('nutrientsTable');
                // definovaní pořadí v tabulce 
                const propertyOrder = ['Calories', 'Carbohydrates', 'Fat', 'Protein'];

                propertyOrder.forEach(propertyName => {
                    const property = recipeDetails.nutrition.nutrients.find(prop => prop.name === propertyName);
                    if (property) {
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

    // klikajici obrazek modal
    const recipeImage = document.getElementById('recipeImage');
    if (recipeImage) {
        recipeImage.addEventListener('click', function () {
            openModal(recipeImage.src);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

// volání fetchSimilarRecipes
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('recipeId');

    if (recipeId) {
        fetchSimilarRecipes(recipeId);
    } else {
        console.error('Recipe ID not found in the URL.');
    }
});

