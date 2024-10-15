import { recipeTemplate } from "../templates/recipes.js";

async function getDataJson() {
    const response = await fetch('../../data/recipes.json',  { mode: "cors" });
    const data = await response.json()
    return data.recipes
}

async function displayData(recipes) {
    const recipeSection = document.getElementById('cards');
    recipeSection.innerHTML = '';

    recipes.forEach((recipe) => {
        const recipesIndi = recipeTemplate(recipe);
        const userCardDOM = recipesIndi.getRecipe()
        recipeSection.appendChild(userCardDOM);
    });
}

async function init() {
    const recipes = await getDataJson();
    displayData(recipes);
    console.log(recipes)
}

init();