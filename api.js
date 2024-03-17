import apiKey from "./apiKey.js"
import { displayResults } from "./displays.js";
// funkce pro api request pro recipe card
export function makeAPIRequest(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayResults(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
// fetch recipe suggestions //funguje
export async function fetchSuggestions(query) {
  const response = await fetch(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${query}`);
  const data = await response.json();
  return data; //odstraneno .suggestions
}

