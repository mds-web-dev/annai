
/*********************************************************
Haematology
 ********************************************************/

function updateCategoryName() {
    const categorySelect = document.getElementById('chooseCategory');
    const selectedCategory = categorySelect.value;

    const categoryNameElement = document.getElementById('categoryName');

    switch (selectedCategory) {
        case '3Part':
            categoryNameElement.textContent = '3 Part';
            break;
        case '5Part':
            categoryNameElement.textContent = '5 Part';
            break;
        case 'vertinary':
            categoryNameElement.textContent = 'Vertinary';
            break;
        default:
            categoryNameElement.textContent = ''; 
    }

    filterProducts(selectedCategory);
}

function filterProducts(category) {
    const products = document.querySelectorAll('.production-column');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (productCategory === category) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    });
}

window.onload = function () {
    updateCategoryName();
    filterProducts('3Part');
};

document.getElementById('chooseCategory').addEventListener('change', function () {
    updateCategoryName();
});
