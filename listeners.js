import apiKey from "./apiKey.js"
import { displaySuggestions, displayRecipeDetails, displayResults } from "./displays.js";
import { makeAPIRequest, fetchSuggestions } from "./api.js";
import { fetchRecipes, constructSearchQuery } from "./search.js";

  // random recipes every time the user visits
  /* document.addEventListener('DOMContentLoaded', function () {
    makeAPIRequest(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`);
  }); */

// vyhledavani u dropdown menu
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', async () => {
    const suggestionsList = document.getElementById('suggestionsList');
    const query = searchBar.value.trim();
    if (query.length > 0) {
        const suggestions = await fetchSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        suggestionsList.innerHTML = '';
    }
});

// Event listener tlačítko pro hledani receptu
const button = document.getElementById('button');
button.addEventListener('click', () => {
    const searchBar = document.getElementById('searchBar');
    const query = searchBar.value.trim();

    if (query) {
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
        makeAPIRequest(url);
        searchBar.value = "";
    } else {
        alert('Please enter a search query.');
    }
});

// Event listener pro jednotlive recepty zobrazene jako karticky
const resultsContainer = document.getElementById('results');
resultsContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const recipeCard = clickedElement.closest('.recipe-card');

    if (recipeCard) {
        const recipeId = recipeCard.getAttribute('id');
        const title = recipeCard.querySelector('.recipe-title').textContent; //nove
        const image = recipeCard.querySelector('.recipe-image').src;

        // odkaz na detaily receptu
        const detailsUrl = `recipeDetails.html?recipeId=${recipeId}`;

        console.log(detailsUrl);
        window.open(detailsUrl, '_blank');

        fetch(detailsUrl)   //fetch
            .then(response => response.json())
            .then(recipeDetails => {
                displayRecipeDetails(recipeDetails);
                console.log(recipeDetails);
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
            });
    }
});

const btnMainCourse = document.getElementById('btnMainCourse');
btnMainCourse.addEventListener('click', () => {
    fetchRecipes('main course');
});

const btnSideDish = document.getElementById('btnSideDish');
btnSideDish.addEventListener('click', () => {
    fetchRecipes('side dish');
});
const btnSoup = document.getElementById('btnSoup');
btnSoup.addEventListener('click', () => {
    fetchRecipes('soup');
});
const btnSauce = document.getElementById('btnSauce');
btnSauce.addEventListener('click', () => {
    fetchRecipes('sauce');
});
const btnSalad = document.getElementById('btnSalad');
btnSalad.addEventListener('click', () => {
    fetchRecipes('salad');
});
const btnBread = document.getElementById('btnBread');
btnBread.addEventListener('click', () => {
    fetchRecipes('bread');
});
const btnDessert = document.getElementById('btnDessert');
btnDessert.addEventListener('click', () => {
    fetchRecipes('dessert');
});

//vetsi navbar pro filtry podrobne vyhledavani
document.addEventListener('DOMContentLoaded', function () {
    const complexSearch = document.getElementById('complexSearch');
    const moreOptionsSearch = document.getElementById('moreOptionsSearch');

    complexSearch.addEventListener('click', function () {
        if (moreOptionsSearch.style.display === 'none') {
            moreOptionsSearch.style.display = 'block';
        } else {
            moreOptionsSearch.style.display = 'none';
        }
    });
});

//podrobne vyhledavani
const buttonComplexSearch = document.getElementById('buttonComplexSearch');
buttonComplexSearch.addEventListener('click', function () {
    const filters = {
        diet: [],
        intolerances: [],
        minCarbs: document.getElementById('carboNutrients').value,
        minFat: document.getElementById('fatNutrients').value,
        minProtein: document.getElementById('proteinNutrients').value,
        minCalories: document.getElementById('caltNutrients').value
    };

    //kdyz je checked checkbox pushne do diet
    ['paleo', 'vegetarian', 'vegan', 'lowFODMAP', 'ketogenic'].forEach(diet => {
        if (document.getElementById(`${diet}Checkbox`).checked) {
            filters.diet.push(diet);
        }
    });

    ['wheat', 'soy', 'seafood', 'peanut', 'dairy', 'gluten'].forEach(intolerances => {
        if (document.getElementById(`${intolerances}Checkbox`).checked) {
            filters.intolerances.push(intolerances);
        }
    });

    //funkce na vytvoreni query
    const query = constructSearchQuery(filters);
    makeAPIRequest(query);
});

