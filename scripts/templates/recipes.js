export function recipeTemplate(data) {
    const { image, name, description } = data;

    const picture = `assets/image/${image}`;
    console.log(picture)

    function getRecipe() {
        const link = document.createElement('a');
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.innerHTML = "RECETTE";
        const h3 = document.createElement('h3');
        h3.innerHTML = `${description}`;
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.classList.add('imgId');
        img.setAttribute("alt", name);
        link.appendChild(img);
        link.appendChild(h1);
        link.appendChild(h2);
        link.appendChild(h3);
        article.appendChild(link);

        return article;
    }

    return { picture, getRecipe };
}