// Function to clear the content of recipe details
export function clearRecipeDetails() {
    const recipeDetailsMainContainer = document.querySelector('.recipeDetailsMainContainer');
    
    // Remove all children of recipeDetailsMainContainer
if (recipeDetailsMainContainer != null) {
        while (recipeDetailsMainContainer.firstChild) {
            recipeDetailsMainContainer.removeChild(recipeDetailsMainContainer.firstChild);
        }
    
        recipeDetailsMainContainer.innerHTML = '';
}
};



