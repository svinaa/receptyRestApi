//function for recipe cards
export function displayResults(data) {
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