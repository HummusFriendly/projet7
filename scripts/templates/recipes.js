
export class Recipe {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.description = data.description;
        this.ingredients = data.ingredients;
        this.time = data.time;
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

    displayRecipes = (recipes) => {
        const recipesContainer = document.querySelector('.plats');
    
        if (!recipesContainer) {
            console.error("L'élément avec la classe '.plats' n'a pas été trouvé.");
            return; 
        }
    
        recipesContainer.innerHTML = ''; 
    
        if (recipes.length === 0) {
            recipesContainer.innerHTML = '';
            return;
        }
    
        recipes.forEach(recipeData => {
            const recipe = new Recipe(recipeData); 
            const recipeElement = recipe.getHtml(); 
            recipesContainer.appendChild(recipeElement); 
        });
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


