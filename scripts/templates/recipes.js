
export class Recipe {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.description = data.description;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;

        this.activeIngredientFilters = [];
        this.activeApplianceFilters = [];
        this.activeUstensilFilters = [];
    }

    updateKeywordsDisplay = (recipesData) => {
        const keywordContainer = document.querySelector('.keyword');
        keywordContainer.innerHTML = ''; 
    
        const addKeyword = (keyword, filterArray) => {
            const keywordDiv = document.createElement('div');
            keywordDiv.classList.add('keyword-item');
            keywordDiv.textContent = `${keyword} `;
    
            const removeButton = document.createElement('span');
            removeButton.classList.add('remove-keyword');
            removeButton.textContent = 'x';
    
            removeButton.addEventListener('click', () => {
                const index = filterArray.indexOf(keyword);
                if (index !== -1) {
                    filterArray.splice(index, 1);
                    console.log("Keyword removed:", keyword); 
                    this.applyAllFilters(recipesData); 
                    this.updateKeywordsDisplay(recipesData); 
                }
            });
    
            keywordDiv.appendChild(removeButton);
            keywordContainer.appendChild(keywordDiv);
        };
    
        this.activeIngredientFilters.forEach(keyword => addKeyword(keyword, this.activeIngredientFilters));
        this.activeApplianceFilters.forEach(keyword => addKeyword(keyword, this.activeApplianceFilters));
        this.activeUstensilFilters.forEach(keyword => addKeyword(keyword, this.activeUstensilFilters));
    };
    
    
    

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
        const ingredImage = ingredButton.querySelector('img');
        const allIngredients = Array.from(new Set(
            recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient.toLowerCase()))
        ));

        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('ingredients-container');
        ingredientsContainer.style.display = 'none';

        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        searchInput.placeholder = '';
        ingredientsContainer.appendChild(searchInput);

        const ingredientListDiv = document.createElement('div');
        allIngredients.forEach(ingredient => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredient-item');
            ingredientDiv.textContent = ingredient;

            ingredientDiv.addEventListener('click', () => {
                if (!this.activeIngredientFilters.includes(ingredient)) {
                    this.activeIngredientFilters.push(ingredient);
                }
                this.applyAllFilters(recipes);
                this.updateKeywordsDisplay(recipes);
                ingredientsContainer.style.display = 'none';
            });

            ingredientListDiv.appendChild(ingredientDiv);
        });

        ingredientsContainer.appendChild(ingredientListDiv);
        ingredButton.appendChild(ingredientsContainer);

        ingredButton.addEventListener('click', (e) => {

            e.stopPropagation();
            ingredientsContainer.style.display = ingredientsContainer.style.display === 'none' ? 'block' : 'none';
            const imagePathV = './assets/image/v.jpg';
            const imagePathCaret = './assets/image/^.jpg';
            ingredImage.src = ingredImage.src.endsWith('v.jpg') ? imagePathCaret : imagePathV;
        });

        document.addEventListener('click', (e) => {
            if (!ingredButton.contains(e.target)) {
                ingredientsContainer.style.display = 'none';
                ingredImage.src = './assets/image/v.jpg';
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
        const appardImage = appardButton.querySelector('img');

        const allAppar = Array.from(new Set(
            recipes
                .map(recipe => recipe.appliance && recipe.appliance.toLowerCase())
                .filter(app => app)
        ));

        const appardContainer = document.createElement('div');
        appardContainer.classList.add('ingredients-container');
        appardContainer.style.display = 'none';

        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        searchInput.placeholder = '';
        appardContainer.appendChild(searchInput);

        const appardListDiv = document.createElement('div');
        allAppar.forEach(appliance => {
            const appardDiv = document.createElement('div');
            appardDiv.classList.add('ingredient-item');
            appardDiv.textContent = appliance;

            appardDiv.addEventListener('click', () => {
                if (!this.activeApplianceFilters.includes(appliance)) {
                    this.activeApplianceFilters.push(appliance);
                }
                this.applyAllFilters(recipes);
                this.updateKeywordsDisplay(recipes);
                appardContainer.style.display = 'none';
            });

            appardListDiv.appendChild(appardDiv);
        });

        appardContainer.appendChild(appardListDiv);
        appardButton.appendChild(appardContainer);

        appardButton.addEventListener('click', (e) => {
            e.stopPropagation();
            appardContainer.style.display =
                appardContainer.style.display = appardContainer.style.display === 'none' ? 'block' : 'none';
            const imagePathV = './assets/image/v.jpg';
            const imagePathCaret = './assets/image/^.jpg';
            appardImage.src = appardImage.src.endsWith('v.jpg') ? imagePathCaret : imagePathV;
        });

        document.addEventListener('click', (e) => {
            if (!appardButton.contains(e.target)) {
                appardContainer.style.display = 'none';
                appardImage.src = './assets/image/v.jpg';
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

    displayUstenList = (recipes) => {
        const ustenButton = document.querySelector('.ustenButton');
        const ustenImage = ustenButton.querySelector('img');

        const allUstensils = Array.from(new Set(
            recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
        ));

        const ustenContainer = document.createElement('div');
        ustenContainer.classList.add('ingredients-container');
        ustenContainer.style.display = 'none';

        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        searchInput.placeholder = '';
        ustenContainer.appendChild(searchInput);

        const ustenListDiv = document.createElement('div');
        allUstensils.forEach(ustensil => {
            const ustenDiv = document.createElement('div');
            ustenDiv.classList.add('ingredient-item');
            ustenDiv.textContent = ustensil;

            ustenDiv.addEventListener('click', () => {
                if (!this.activeUstensilFilters.includes(ustensil)) {
                    this.activeUstensilFilters.push(ustensil);
                }
                this.applyAllFilters(recipes);
                this.updateKeywordsDisplay(recipes);
                ustenContainer.style.display = 'none';
            });

            ustenListDiv.appendChild(ustenDiv);
        });

        ustenContainer.appendChild(ustenListDiv);
        ustenButton.appendChild(ustenContainer);

        ustenButton.addEventListener('click', (e) => {
            e.stopPropagation();
            ustenContainer.style.display =
                ustenContainer.style.display = ustenContainer.style.display === 'none' ? 'block' : 'none';
            const imagePathV = './assets/image/v.jpg';
            const imagePathCaret = './assets/image/^.jpg';
            ustenImage.src = ustenImage.src.endsWith('v.jpg') ? imagePathCaret : imagePathV;
        });

        ustenContainer.addEventListener('mouseover', () => {
            ustenContainer.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!ustenButton.contains(e.target)) {
                ustenContainer.style.display = 'none';
            }
        });

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(ustenListDiv.children).forEach(ustenDiv => {
                ustenDiv.style.display =
                    ustenDiv.textContent.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    displayRecipes = (recipes) => {
        const recipesContainer = document.querySelector('.plats');

        recipesContainer.innerHTML = '';

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
            const applianceMatch = recipe.appliance && recipe.appliance.toLowerCase().includes(searchLowerCase);
            const ustensilsMatch = recipe.ustensils && recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchLowerCase));
    
            return nameMatch || ingredientsMatch || applianceMatch || ustensilsMatch;
        });
    
        this.displayRecipes(filteredRecipes);
    };

    applyAllFilters = (recipesData) => {
        if (!recipesData) {
            console.error("recipesData is undefined in applyAllFilters.");
            return;
        }
    
        let filteredRecipes = [];
    
        if (
            this.activeIngredientFilters.length === 0 &&
            this.activeApplianceFilters.length === 0 &&
            this.activeUstensilFilters.length === 0
        ) {
            filteredRecipes = recipesData;
        } else {
            filteredRecipes = recipesData.filter(recipe => {
                const matchesIngredients = this.activeIngredientFilters.length === 0 ||
                    this.activeIngredientFilters.every(ingredient =>
                        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient)
                    );
    
                const matchesAppliance = this.activeApplianceFilters.length === 0 ||
                    this.activeApplianceFilters.includes(recipe.appliance.toLowerCase());
    
                const matchesUstensils = this.activeUstensilFilters.length === 0 ||
                    this.activeUstensilFilters.every(ustensil =>
                        recipe.ustensils.some(u => u.toLowerCase() === ustensil)
                    );
    
                return matchesIngredients && matchesAppliance && matchesUstensils;
            });
        }
    
        this.displayRecipes(filteredRecipes);
        console.log("Filtered Recipes Count:", filteredRecipes.length);
    };
    
    
    


    initSearch = (recipesData) => {
        const inputField = document.querySelector('.lookingfor_input');
        const searchButton = document.querySelector('.lookingfor_button');
    
        searchButton.addEventListener('click', () => {
            const searchTerm = inputField.value.toLowerCase();
    
            this.activeIngredientFilters = [];
            this.activeApplianceFilters = [];
            this.activeUstensilFilters = [];
    
            if (searchTerm.length >= 3) {
                let isIngredient = false;
                let isAppliance = false;
                let isUstensil = false;
    
                recipesData.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredient.ingredient.toLowerCase().includes(searchTerm)) {
                            isIngredient = true;
                        }
                    });
    
                    if (recipe.appliance && recipe.appliance.toLowerCase().includes(searchTerm)) {
                        isAppliance = true;
                    }
    
                    recipe.ustensils.forEach(ustensil => {
                        if (ustensil.toLowerCase().includes(searchTerm)) {
                            isUstensil = true;
                        }
                    });
                });
    
                if (isIngredient) {
                    this.activeIngredientFilters.push(searchTerm);
                }
                if (isAppliance) {
                    this.activeApplianceFilters.push(searchTerm);
                }
                if (isUstensil) {
                    this.activeUstensilFilters.push(searchTerm);
                }
            }
    
            this.applyAllFilters(recipesData);
            this.updateKeywordsDisplay(recipesData);
        });
    };
    
}


