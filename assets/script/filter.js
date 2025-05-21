 
/*********************************************************
Clinical Chemistry
 ********************************************************/
 function updateCategoryName() {
    const categorySelect = document.getElementById('chooseCategory');
    const selectedCategory = categorySelect.value;

    const categoryNameElement = document.getElementById('categoryName');
    
    if (selectedCategory === 'fully') {
        categoryNameElement.textContent = 'Bio Chemistry Fully';
    } else if (selectedCategory === 'semi') {
        categoryNameElement.textContent = 'Bio Chemistry Semi';
    }
    
    filterProducts();
}

function filterProducts() {
    const selectedCategory = document.getElementById('chooseCategory').value;
    const products = document.querySelectorAll('.production-column');

    products.forEach(product => {
        if (product.getAttribute('data-category') === selectedCategory) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

window.onload = function() {
    updateCategoryName();
    filterProducts();
};

document.getElementById('chooseCategory').addEventListener('change', function() {
    updateCategoryName(); 
});

