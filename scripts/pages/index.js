import { recipeTemplate } from ".recipes.js";

let recipes = [];

async function getDataJson() {
    const response = await fetch('./data/recipes.json');
    recipes = (await response.json()).recipes;
    init();
}

async function displayData(recipes) {
    const recipeSection = document.getElementById('cards');
    recipeSection.innerHTML = '';

    recipes.forEach((recipe) => {
        const recipesIndi = photographerTemplate(recipe);
        const userCardDOM = recipesIndi.getUserCardDOM();
        recipeSection.appendChild(userCardDOM);
    });
}

async function init() {
    const recipes = await getDataJson();
    displayData(recipes);
}

init();