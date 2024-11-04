
export class Recipe {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.description = data.description;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.appliance = data.appliance;
        // this.count = data.count;
    }

    updateRecipeCount = (count) => {
        const numberButton = document.querySelector('.numberbutton');
        if (numberButton) {
            numberButton.innerHTML = `${count} RECETTES`;
        } else {
            console.error("error");
        }
    }

    getHtml = () => {
        const div = document.createElement('div');
        div.classList.add('maincards');

        const article = document.createElement('article');
        const link = document.createElement('a');

        link.appendChild(this.imageDiv());
        link.appendChild(this.titlesDiv());
        link.appendChild(this.getIngredient());

        article.appendChild(link);
        div.appendChild(article);

        return div;
    }

    titlesDiv = () => {
        const divTitle = document.createElement('div');
        const h1 = document.createElement('h1');
        h1.textContent = this.name;
        const h2 = document.createElement('h2');
        h2.innerHTML = "RECETTE";
        const h3 = document.createElement('h3');
        h3.innerHTML = `${this.description}`;
        const h4 = document.createElement('h4');
        h4.innerHTML = "Ingrédients";
        divTitle.appendChild(h1);
        divTitle.appendChild(h2);
        divTitle.appendChild(h3);
        divTitle.appendChild(h4);

        return divTitle;
    }

    imageDiv = () => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const imagePath = `assets/image/${this.image}`;
        const img = document.createElement('img');
        img.setAttribute("src", imagePath);
        img.classList.add('imgId');
        img.setAttribute("alt", this.name);

        const h5 = document.createElement('h5');
        h5.classList.add('time-label');
        h5.innerHTML = `${this.time} min`;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(h5);
        return imageWrapper;
    }

    getIngredient = () => {
        const div = document.createElement('div');
        div.classList.add("ingredientsFlex");

        this.ingredients.forEach(ingredient => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add("ingredientItem");

            const p = document.createElement('p');
            p.classList.add("foodCss");

            const u = document.createElement('p');
            u.classList.add("unitCss");

            const unit = ingredient.unit ? ingredient.unit : '';
            const quantity = ingredient.quantity ? ingredient.quantity : '';
            const ingredientName = ingredient.ingredient ? ingredient.ingredient : 'Ingrédient inconnu';

            p.innerHTML = ingredientName;
            u.innerHTML = `${quantity} ${unit}`;

            ingredientDiv.appendChild(p);
            ingredientDiv.appendChild(u);
            div.appendChild(ingredientDiv);
        });

        return div;
    }

    displayIngredientsList = (recipes) => {
        const ingredButton = document.querySelector('.ingredButton');
        const allIngredients = Array.from(new Set(
            recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient.toLowerCase()))
        ));
    
        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');
        ingredientsContainer.style.display = 'none';
    
        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        searchInput.placeholder = 'Chercher un ingrédient...';
        ingredientsContainer.appendChild(searchInput);
    
        const ingredientListDiv = document.createElement('div');
        allIngredients.forEach(ingredient => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredient-item');
            ingredientDiv.textContent = ingredient;
    
            ingredientDiv.addEventListener('click', () => {
                this.filterRecipes(ingredient, recipes);
                ingredientsContainer.style.display = 'none';
            });
    
            ingredientListDiv.appendChild(ingredientDiv);
        });
    
        ingredientsContainer.appendChild(ingredientListDiv);
        ingredButton.appendChild(ingredientsContainer);
    
        ingredButton.addEventListener('click', (e) => {
            e.stopPropagation();
            ingredientsContainer.style.display = 
                ingredientsContainer.style.display === 'none' ? 'block' : 'none';
        });
    
        ingredientsContainer.addEventListener('mouseover', () => {
            ingredientsContainer.style.display = 'block';
        });
    
        document.addEventListener('click', (e) => {
            if (!ingredButton.contains(e.target)) {
                ingredientsContainer.style.display = 'none';
            }
        });
    
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(ingredientListDiv.children).forEach(ingredientDiv => {
                ingredientDiv.style.display = 
                    ingredientDiv.textContent.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    displayApparList = (recipes) => {
        const appardButton = document.querySelector('.appardButton');
        
        // Créer une liste unique d'appareils en minuscules
        const allAppar = Array.from(new Set(
            recipes
                .map(recipe => recipe.appliance && recipe.appliance.toLowerCase())
                .filter(app => app) // filtre pour éviter les valeurs nulles ou indéfinies
        ));
    
        const appardContainer = document.createElement('div');
        appardContainer.classList.add('ingredients-container');
        appardContainer.style.display = 'none';
    
        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        searchInput.placeholder = 'Chercher un appareil...';
        appardContainer.appendChild(searchInput);
    
        const appardListDiv = document.createElement('div');
        allAppar.forEach(appliance => {
            const appardDiv = document.createElement('div');
            appardDiv.classList.add('ingredient-item');
            appardDiv.textContent = appliance;
    
            appardDiv.addEventListener('click', () => {
                this.filterRecipes(appliance, recipes);
                appardContainer.style.display = 'none';
            });
    
            appardListDiv.appendChild(appardDiv);
        });
    
        appardContainer.appendChild(appardListDiv);
        appardButton.appendChild(appardContainer);
    
        appardButton.addEventListener('click', (e) => {
            e.stopPropagation();
            appardContainer.style.display = 
                appardContainer.style.display === 'none' ? 'block' : 'none';
        });
    
        appardContainer.addEventListener('mouseover', () => {
            appardContainer.style.display = 'block';
        });
    
        document.addEventListener('click', (e) => {
            if (!appardButton.contains(e.target)) {
                appardContainer.style.display = 'none';
            }
        });
    
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(appardListDiv.children).forEach(appardDiv => {
                appardDiv.style.display = 
                    appardDiv.textContent.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
    
    
    displayRecipes = (recipes) => {

        const recipesContainer = document.querySelector('.plats');
        
        if (!recipesContainer) {
            console.error("'.plats' n'a pas été trouvé.");
            return;
        }
    
        recipesContainer.innerHTML = ''; 
    
        if (recipes.length === 0) {
            recipesContainer.innerHTML = '';
        }
    
        recipes.forEach(recipeData => {
            const recipe = new Recipe(recipeData);
            const recipeElement = recipe.getHtml();
            recipesContainer.appendChild(recipeElement);
        });
    
        this.updateRecipeCount(recipes.length);
    }

    filterRecipes = (searchTerm, recipes) => {
        const searchLowerCase = searchTerm.toLowerCase(); 

        const filteredRecipes = recipes.filter(recipe => {
            const nameMatch = recipe.name.toLowerCase().includes(searchLowerCase);
            const ingredientsMatch = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(searchLowerCase)
            );
            return nameMatch || ingredientsMatch;
        });

        this.displayRecipes(filteredRecipes); 
    }
    

    initSearch = (recipesData) => {
        const inputField = document.querySelector('.lookingfor_input');

        inputField.addEventListener('input', () => {
            const searchTerm = inputField.value;

            if (searchTerm.length >= 3) {
                this.filterRecipes(searchTerm, recipesData);
            } else {
                this.displayRecipes(recipesData);
            }
        });
    }
}


