export function ingredientsTemplate(data) {
    const { ingredient, quantity, unit } = data;

    function getIngredientDOM() {
        const h1 = document.createElement('h1');
        h1.textContent = ingredient;
        const h2 = document.createElement('h2');
        h2.innerHTML = `${quantity}` + `${unit}`;
        const h3 = document.createElement('h3');
        h3.innerHTML = `${description}`;
        link.appendChild(img);
        link.appendChild(h1);
        link.appendChild(h2);
        link.appendChild(h3);
    }

    return { getIngredientDOM };
}