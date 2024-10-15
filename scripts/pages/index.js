let recipes = [];

async function getDataJson() {
    const response = await fetch('./data/recipes.json');
    recipes = (await response.json()).recipes;
    init();
}

function displayData(recipes) {
    const recipeSection = document.getElementById('cards');
    recipeSection.innerHTML = '';
}

function init() {
    displayData(recipes);
}

getDataJson();