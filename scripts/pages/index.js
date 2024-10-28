
import { Recipe } from "../templates/recipes.js";

// Variable globale pour stocker les données des recettes
let recipesData = [];

// Fonction pour récupérer les données JSON
async function getDataJson() {
    const response = await fetch('../../data/recipes.json', { mode: "cors" });
    const data = await response.json();
    return data.recipes;
}

// Fonction pour afficher les données
function displayData(recipes) {
    const recipesContainer = document.querySelector('.plats'); // Utiliser .plats directement
    recipesContainer.innerHTML = ''; // Vider le conteneur des recettes

    recipes.forEach((recipeData) => {
        const recipe = new Recipe(recipeData);
        recipesContainer.appendChild(recipe.getHtml()); // Ajouter chaque recette dans la section
    });
}

// Initialisation des données
async function init() {
    recipesData = await getDataJson(); // Stocker les données des recettes dans la variable globale
    displayData(recipesData); // Afficher toutes les recettes au démarrage

    const recipeClassInstance = new Recipe({}); // Créer une instance vide
    recipeClassInstance.initSearch(recipesData); // Appeler la recherche avec les recettes chargées
}

// Appel initial pour charger les données
init();


