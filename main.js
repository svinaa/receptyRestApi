import apiKey from "./apiKey.js"

// funkce pro api request pro recipe card
function makeAPIRequest(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// random recipes every time the user visits
/* document.addEventListener('DOMContentLoaded', function () {
  makeAPIRequest(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`);
}); */

//function for recipe cards
function displayResults(data) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  let recipesArray;

  if (data.recipes) {
    recipesArray = data.recipes;
  } else if (data.results) {
    recipesArray = data.results;
  } else {
    console.error('Error: Invalid or missing data in the API response');
    return;
  }

  if (recipesArray && recipesArray.length > 0) {
    recipesArray.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');
      card.id = recipe.id;

      const image = document.createElement('img');
      image.classList.add('recipe-image');
      image.src = recipe.image;
      image.alt = recipe.title;

      const title = document.createElement('h3');
      title.classList.add('recipe-title');
      title.textContent = recipe.title;

      const details = document.createElement('p');
      details.classList.add('recipe-details');

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(details);

      resultsContainer.appendChild(card);
    });
  } else {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No recipes found. Please try a different search term.';
    resultsContainer.appendChild(noResultsMessage);
  }
}
//zmena
const searchBar = document.getElementById('searchBar');
const suggestionsList = document.getElementById('suggestionsList');

// fetch recipe suggestions //funguje
async function fetchSuggestions(query) {
  const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${query}`);
  const data = await response.json();
  return data; //odstraneno .suggestions
}

// dropdown menu
function displaySuggestions(suggestions) {
  // Check if the suggestions array is empty
  if (suggestions && suggestions.length > 0) {
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
      const listItem = document.createElement('li');
      listItem.classList.add('suggestionItem');
      listItem.textContent = suggestion.title; //pridano .title
      listItem.addEventListener('click', () => {
        searchBar.value = suggestion.title;
        suggestionsList.innerHTML = '';

        searchRecipe(suggestion.title);
      });
      suggestionsList.appendChild(listItem); //zkontrolovat!!
    });
  } else {
    suggestionsList.innerHTML = '<li>No suggestions found.</li>';
  }
}

// vyhledavani u dropdown menu
searchBar.addEventListener('input', async () => {
  const query = searchBar.value.trim();
  if (query.length > 0) {
    const suggestions = await fetchSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    suggestionsList.innerHTML = '';
  }
});


function searchRecipe(query) {

  if (query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    makeAPIRequest(url);
    // smazani textu po odeslani requestu
    searchBar.value = "";
  } else {
    alert('Please enter a search query.');
  };
}

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
// Event listener for recipe cards
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

    fetch(detailsUrl)
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

// zobrazeni receptu
function displayRecipeDetails(recipeDetails) {
  const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
  recipeDetailsContainer.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = recipeDetails.title;

  const image = document.createElement('img');
  image.src = recipeDetails.image;
  image.alt = recipeDetails.title;

  recipeDetailsContainer.appendChild(title);
  recipeDetailsContainer.appendChild(image);

}

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

// fetch typy jidel deezert, salát atd.
function fetchRecipes(type) {
  makeAPIRequest(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}`)

}

//vetsi navbar pro filtry vyhledavani
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

const buttonComplexSearch = document.getElementById('buttonComplexSearch');
buttonComplexSearch.addEventListener('click', function() {
  // Construct filters object based on user input
  const filters = {
    diet: [],
    intolerances: [],
    minCarbs: document.getElementById('carboNutrients').value,
    minFat: document.getElementById('fatNutrients').value,
    minProtein: document.getElementById('proteinNutrients').value,
    minCalories: document.getElementById('caltNutrients').value
  };

// Iterate over each diet checkbox and add the checked ones to the filters object
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

  // Construct the API query string
  const query = constructSearchQuery(filters);
  makeAPIRequest(query);
});

function constructSearchQuery(filters) {
  let query = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      query += `&${key}=${filters[key]}`;
    }
  }
  console.log(query);
  return query;
}
