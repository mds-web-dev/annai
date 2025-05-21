    function updateCategoryName() {
        const categorySelect = document.getElementById('chooseCategory');
        const selectedCategory = categorySelect.value;

        const categoryNameElement = document.getElementById('categoryName');
        
        switch (selectedCategory) {
            case 'bloodGasAnalyzerAbg':
                categoryNameElement.textContent = 'Blood Gas Analyzer ABG';
                break;
            case 'electrolyte':
                categoryNameElement.textContent = 'Electrolyte';
                break;
            case 'esr':
                categoryNameElement.textContent = 'ESR';
                break;
            case 'gelSystem':
                categoryNameElement.textContent = 'Gel System';
                break;
            case 'hplc':
                categoryNameElement.textContent = 'HPLC';
                break;
            case 'urineAnalyser':
                categoryNameElement.textContent = 'Urine Analyser';
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

    window.onload = function() {
        updateCategoryName();
        filterProducts('bloodGasAnalyzerAbg');
    };

    document.getElementById('chooseCategory').addEventListener('change', function() {
        updateCategoryName();
    });