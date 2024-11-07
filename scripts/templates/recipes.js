// Boucle For

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
                    this.applyAllFilters(recipesData);
                    this.updateKeywordsDisplay(recipesData);
                }
            });

            keywordDiv.appendChild(removeButton);
            keywordContainer.appendChild(keywordDiv);
        };

        const filters = [
            { keywords: this.activeIngredientFilters, filterArray: this.activeIngredientFilters },
            { keywords: this.activeApplianceFilters, filterArray: this.activeApplianceFilters },
            { keywords: this.activeUstensilFilters, filterArray: this.activeUstensilFilters }
        ];

        for (const { keywords, filterArray } of filters) {
            for (const keyword of keywords) {
                addKeyword(keyword, filterArray);
            }
        }
    };

    getHtml = () => {
        const div = document.createElement('div');
        div.classList.add('maincards');

        const article = document.createElement('article');
        const link = document.createElement('a');

        [this.imageDiv(), this.titlesDiv(), this.getIngredient()].forEach(element => link.appendChild(element));

        article.appendChild(link);
        div.appendChild(article);

        return div;
    }

    titlesDiv = () => {
        const divTitle = document.createElement('div');
        const headers = [
            { tag: 'h1', content: this.name },
            { tag: 'h2', content: 'RECETTE' },
            { tag: 'h3', content: this.description },
            { tag: 'h4', content: 'Ingrédients' }
        ];

        headers.forEach(({ tag, content }) => {
            const element = document.createElement(tag);
            element.innerHTML = content;
            divTitle.appendChild(element);
        });

        return divTitle;
    }

    getIngredient = () => {
        const div = document.createElement('div');
        div.classList.add("ingredientsFlex");

        this.ingredients.forEach(({ ingredient, quantity = '', unit = '' }) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add("ingredientItem");

            const p = document.createElement('p');
            p.classList.add("foodCss");
            p.innerHTML = ingredient || 'Ingrédient inconnu';

            const u = document.createElement('p');
            u.classList.add("unitCss");
            u.innerHTML = `${quantity} ${unit}`;

            ingredientDiv.appendChild(p);
            ingredientDiv.appendChild(u);
            div.appendChild(ingredientDiv);
        });

        return div;
    }

    displayList = (recipes, buttonSelector, listExtractor, filterArray, displayFunction) => {
        const button = document.querySelector(buttonSelector);
        const buttonImage = button.querySelector('img');

        const uniqueItems = Array.from(new Set(listExtractor(recipes)));

        const container = document.createElement('div');
        container.classList.add('ingredients-container');
        container.style.display = 'none';

        const searchInput = document.createElement('input');
        searchInput.classList.add('ingredient-search');
        container.appendChild(searchInput);

        const listDiv = document.createElement('div');
        for (const item of uniqueItems) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('ingredient-item');
            itemDiv.textContent = item;

            itemDiv.addEventListener('click', () => {
                if (!filterArray.includes(item)) {
                    filterArray.push(item);
                }
                this.applyAllFilters(recipes);
                this.updateKeywordsDisplay(recipes);
                container.style.display = 'none';
            });

            listDiv.appendChild(itemDiv);
        }

        container.appendChild(listDiv);
        button.appendChild(container);

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            container.style.display = container.style.display === 'none' ? 'block' : 'none';
            buttonImage.src = buttonImage.src.endsWith('v.jpg') ? './assets/image/^ .jpg' : './assets/image/v.jpg';
        });

        document.addEventListener('click', (e) => {
            if (!button.contains(e.target)) {
                container.style.display = 'none';
                buttonImage.src = './assets/image/v.jpg';
            }
        });

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(listDiv.children).forEach(div => {
                div.style.display = div.textContent.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    displayIngredientsList = (recipes) => {
        this.displayList(
            recipes,
            '.ingredButton',
            recipes => recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient.toLowerCase())),
            this.activeIngredientFilters
        );
    }

    displayApparList = (recipes) => {
        this.displayList(
            recipes,
            '.appardButton',
            recipes => recipes.map(recipe => recipe.appliance?.toLowerCase()).filter(Boolean),
            this.activeApplianceFilters
        );
    }

    displayUstenList = (recipes) => {
        this.displayList(
            recipes,
            '.ustenButton',
            recipes => recipes.flatMap(recipe => recipe.ustensils.map(u => u.toLowerCase())),
            this.activeUstensilFilters
        );
    }

    displayRecipes = (recipes) => {
        const recipesContainer = document.querySelector('.plats');
        recipesContainer.innerHTML = '';

        recipes.forEach(recipeData => {
            const recipe = new Recipe(recipeData);
            recipesContainer.appendChild(recipe.getHtml());
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
            const applianceMatch = recipe.appliance?.toLowerCase().includes(searchLowerCase);
            const ustensilsMatch = recipe.ustensils?.some(ustensil =>
                ustensil.toLowerCase().includes(searchLowerCase)
            );

            return nameMatch || ingredientsMatch || applianceMatch || ustensilsMatch;
        });

        this.displayRecipes(filteredRecipes);
    }

    applyAllFilters = (recipesData) => {
        if (!recipesData) {
            console.error("recipesData is undefined in applyAllFilters.");
            return;
        }

        const filteredRecipes = recipesData.filter(recipe => {
            const matchesIngredients = this.activeIngredientFilters.every(ingredient =>
                recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === ingredient)
            );

            const matchesAppliance = this.activeApplianceFilters.includes(recipe.appliance?.toLowerCase());

            const matchesUstensils = this.activeUstensilFilters.every(ustensil =>
                recipe.ustensils.some(u => u.toLowerCase() === ustensil)
            );

            return matchesIngredients && matchesAppliance && matchesUstensils;
        });

        this.displayRecipes(filteredRecipes);
    }
}
