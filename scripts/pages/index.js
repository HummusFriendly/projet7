
import { Recipe } from "../templates/recipes.js";

let recipesData = [];

async function getDataJson() {
    const response = await fetch('../../data/recipes.json', { mode: "cors" });
    const data = await response.json();
    return data.recipes;
}

function displayData(recipes) {
    const recipesContainer = document.querySelector('.plats'); 
    recipesContainer.innerHTML = ''; 

    recipes.forEach((recipeData) => {
        const recipe = new Recipe(recipeData);
        recipesContainer.appendChild(recipe.getHtml()); 
    });

    const recipeInstance = new Recipe({});
    recipeInstance.updateRecipeCount(recipes.length); 
}

async function init() {
    recipesData = await getDataJson(); 
    displayData(recipesData); 

    const recipeClassInstance = new Recipe({}); 
    recipeClassInstance.initSearch(recipesData); 
    recipeClassInstance.displayIngredientsList(recipesData);
}

init();

