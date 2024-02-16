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

// Fetch and display random recipes every time the user visits
/* document.addEventListener('DOMContentLoaded', function () {
  makeAPIRequest(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`);
}); */

// Function to display the API response
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
    return; // Exit the function if the data structure is not as expected
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
      //details.id = recipe.id;

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

// Function to fetch recipe suggestions //funguje
async function fetchSuggestions(query) {
  const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${query}`);
  const data = await response.json();
  return data; //odstraneno .suggestions
}

// Function to display suggestions in the dropdown menu
// Function to display suggestions in the dropdown menu
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
        // Initiate the search for the selected recipe
        searchRecipe(suggestion.title);
      });
      suggestionsList.appendChild(listItem); //zkontrolovat!!
    });
  } else {
    // If suggestions array is empty, display a message to the user
    suggestionsList.innerHTML = '<li>No suggestions found.</li>';
  }
}

// Function to handle user input in the search field
searchBar.addEventListener('input', async () => {
  const query = searchBar.value.trim();
  if (query.length > 0) {
    const suggestions = await fetchSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    suggestionsList.innerHTML = '';
  }
});

// Function to search for a recipe
function searchRecipe(query) {
  // Perform the recipe search based on the selected suggestion

  if (query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    // Fetch and display recipes based on the user's search query
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
    // Fetch and display recipes based on the user's search query
    makeAPIRequest(url);
    // smazani textu po odeslani requestu
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

  // Check if a recipe card is clicked
  if (recipeCard) {
    const recipeId = recipeCard.getAttribute('id');
    const title = recipeCard.querySelector('.recipe-title').textContent; //nove
    const image = recipeCard.querySelector('.recipe-image').src;

    // Fetch additional details for the clicked recipe
    const detailsUrl = `recipeDetails.html?recipeId=${recipeId}`;

    console.log(detailsUrl);
    window.open(detailsUrl, '_blank');

    fetch(detailsUrl)
      .then(response => response.json())
      .then(recipeDetails => {
        // Display the details in the recipe details container
        displayRecipeDetails(recipeDetails);
        console.log(recipeDetails);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }
});


function displayRecipeDetails(recipeDetails) {
  const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
  recipeDetailsContainer.innerHTML = '';

  // Create elements to display details (title, image, ingredients, instructions, etc.)
  const title = document.createElement('h2');
  title.textContent = recipeDetails.title;

  const image = document.createElement('img');
  image.src = recipeDetails.image;
  image.alt = recipeDetails.title;

  // Add more elements for other details (ingredients, instructions, etc.)

  // Append elements to the recipe details container
  recipeDetailsContainer.appendChild(title);
  recipeDetailsContainer.appendChild(image);
  // Append other details here...
}

const btnMainCourse = document.getElementById('btnMainCourse');
btnMainCourse.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('main course');
});

const btnSideDish = document.getElementById('btnSideDish');
btnSideDish.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('side dish');
});
const btnSoup = document.getElementById('btnSoup');
btnSoup.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('soup');
});
const btnSauce = document.getElementById('btnSauce');
btnSauce.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('sauce');
});
const btnSalad = document.getElementById('btnSalad');
btnSalad.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('salad');
});
const btnBread = document.getElementById('btnBread');
btnBread.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('bread');
});
const btnDessert = document.getElementById('btnDessert');
btnDessert.addEventListener('click', () => {
  // Fetch recipes for the Side Dishes category
  fetchRecipes('dessert');
});

function fetchRecipes(type) {
  makeAPIRequest(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}`)
  
}

//vetsi navbar pro filtry vyhledavani
document.addEventListener('DOMContentLoaded', function() {
  const complexSearch = document.getElementById('complexSearch');
  const filterCheckboxes = document.getElementById('filterCheckboxes');

  complexSearch.addEventListener('click', function() {
    // Toggle the visibility of the filter checkboxes
    if (filterCheckboxes.style.display === 'none') {
      filterCheckboxes.style.display = 'block';
      // Adjust the height of the navbar when the checkboxes are visible
      document.getElementById('navbarId').style.height = '15vw';
    } else {
      filterCheckboxes.style.display = 'none';
      // Reset the height of the navbar to its original value
      document.getElementById('navbarId').style.height = '7vw'; // Adjust the height value as needed
    }
  });
});
