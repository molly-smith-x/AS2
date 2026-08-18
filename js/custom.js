// Featured product carousel

const featuredProducts = [
    {
        name: "Southern Traverse 45L Pack",
        price: 189.00,
        image: "images/southern-traverse-pack.jpg",
        alt: "Red hiking backpack with outdoor equipment"
    },
    {
        name: "Kea 2-Person Tent",
        price: 249.00,
        image: "images/kea-tent.jpg",
        alt: "Two-person hiking tent under a night sky"
    },
    {
        name: "Storm Ridge Rain Jacket",
        price: 159.00,
        image: "images/storm-ridge-jacket.jpg",
        alt: "Orange waterproof outdoor jacket"
    },
    {
        name: "Alpine Ridge Boots",
        price: 179.00,
        image: "images/alpine-ridge-boots.jpg",
        alt: "Outdoor boots being worn in snow"
    },
    {
        name: "Southern Trail Flask",
        price: 39.00,
        image: "images/southern-trail-flask.jpg",
        alt: "Stainless steel outdoor flask being used while hiking"
    }
];

let currentProductIndex = 0;


function getProductsPerView() {

    if (window.innerWidth < 768) {
        return 1;
    }

    return 2;
}


function displayFeaturedProducts() {

    const productContainer =
        document.getElementById("featuredProducts");

    if (!productContainer) {
        return;
    }

    productContainer.innerHTML = "";

    const productsPerView = getProductsPerView();

    for (let i = 0; i < productsPerView; i++) {

        const productIndex =
            (currentProductIndex + i) %
            featuredProducts.length;

        const product =
            featuredProducts[productIndex];

        const productColumn =
            document.createElement("div");

        productColumn.className =
            productsPerView === 1
                ? "col-12"
                : "col-12 col-md-6";

        productColumn.innerHTML = `
            <article class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.alt}"
                    class="img-fluid product-image">

                <h3>${product.name}</h3>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <a
                    href="product.html"
                    class="btn btn-adventure">
                    View Product
                </a>

            </article>
        `;

        productContainer.appendChild(productColumn);
    }
}


const nextButton =
    document.getElementById("nextProduct");

if (nextButton) {

    nextButton.addEventListener("click", function () {

        currentProductIndex++;

        if (currentProductIndex >= featuredProducts.length) {
            currentProductIndex = 0;
        }

        displayFeaturedProducts();
    });

}


const previousButton =
    document.getElementById("previousProduct");

if (previousButton) {

    previousButton.addEventListener("click", function () {

        currentProductIndex--;

        if (currentProductIndex < 0) {
            currentProductIndex =
                featuredProducts.length - 1;
        }

        displayFeaturedProducts();
    });

}


window.addEventListener("resize", function () {
    displayFeaturedProducts();
});


displayFeaturedProducts();

// Floating back-to-top navigation

const backToTopButton =
    document.getElementById("backToTop");

if (backToTopButton) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

    });

}

// --------------------------------------------------
// Shop product filtering
// --------------------------------------------------

const searchForm = document.getElementById("shopSearchForm");
const searchInput = document.getElementById("shopSearchInput");
const products = document.querySelectorAll(".shop-product");
const categoryCards = document.querySelectorAll(".category-card, .shop-all-card");
const browseAllButton = document.getElementById("browseAllProducts");


// Search for products
if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchTerm = searchInput.value.toLowerCase().trim();

        products.forEach(function (product) {

            const productName = product.dataset.name.toLowerCase();
            const productCategory = product.dataset.category.toLowerCase();

            if (
                productName.includes(searchTerm) ||
                productCategory.includes(searchTerm)
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    });
}


// Filter products by category
categoryCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedCategory = card.dataset.category;

        products.forEach(function (product) {

            if (
                selectedCategory === "all" ||
                product.dataset.category === selectedCategory
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});


// Browse All button
if (browseAllButton) {

    browseAllButton.addEventListener("click", function () {

        products.forEach(function (product) {
            product.style.display = "";
        });

        if (searchInput) {
            searchInput.value = "";
        }

    });

}