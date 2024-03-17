import apiKey from "./apiKey.js";
import { makeAPIRequest } from "./api.js";
export function searchRecipe(query) {
  const searchBar = document.getElementById('searchBar');
  if (query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
    makeAPIRequest(url);
    // smazani textu po odeslani requestu
    searchBar.value = "";
  } else {
    alert('Please enter a search query.');
  };
}

// fetch typy jidel deezert, salát atd.
export function fetchRecipes(type) {
  makeAPIRequest(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}`)
}

// vytvoreni filtru pro podrobne vyhledavani
export function constructSearchQuery(filters) {
  let query = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      query += `&${key}=${filters[key]}`;
    }
  }
  console.log(query);
  return query;
}