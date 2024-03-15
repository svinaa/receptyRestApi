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
  


