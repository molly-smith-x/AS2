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

nextButton.addEventListener("click", function () {

    currentProductIndex++;

    if (currentProductIndex >= featuredProducts.length) {
        currentProductIndex = 0;
    }

    displayFeaturedProducts();
});


const previousButton =
    document.getElementById("previousProduct");

previousButton.addEventListener("click", function () {

    currentProductIndex--;

    if (currentProductIndex < 0) {
        currentProductIndex =
            featuredProducts.length - 1;
    }

    displayFeaturedProducts();
});


window.addEventListener("resize", function () {
    displayFeaturedProducts();
});


displayFeaturedProducts();

// Floating back-to-top navigation

const backToTopButton =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});