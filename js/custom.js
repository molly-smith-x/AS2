// ==================================================
// Aotearoa Adventure Gear - Custom JavaScript
// ==================================================

// Shared values used throughout the website
const MOBILE_BREAKPOINT = 768;
const FREE_SHIPPING_THRESHOLD = 600;
const STANDARD_SHIPPING_COST = 15;
const TAX_RATE = 0.15;
const MIN_CART_QUANTITY = 1;
const MAX_CART_QUANTITY = 10;


// ==================================================
// SHARED FUNCTIONS
// ==================================================

// Calculate subtotal, tax, shipping and final total
function calculateOrderTotals(product) {

    const subtotal = product.price * product.quantity;
    const tax = subtotal * TAX_RATE;
    const orderValue = subtotal + tax;

    // Shipping is free when the order including tax is $600 or more
    const shipping =
        orderValue >= FREE_SHIPPING_THRESHOLD
            ? 0
            : STANDARD_SHIPPING_COST;

    const total = orderValue + shipping;

    return {
        subtotal,
        tax,
        shipping,
        total
    };
}


// Get the product currently saved in the cart
function getSavedProduct() {

    const savedProduct =
        localStorage.getItem("cartProduct");

    if (!savedProduct) {
        return null;
    }

    return JSON.parse(savedProduct);
}


// Format prices consistently
function formatCurrency(value) {

    return `$${value.toFixed(2)}`;
}


// ==================================================
// HOME PAGE
// ==================================================


// --------------------------------------------------
// Featured product carousel
// --------------------------------------------------

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


function initialiseFeaturedCarousel() {

    const productContainer =
        document.getElementById("featuredProducts");

    const nextButton =
        document.getElementById("nextProduct");

    const previousButton =
        document.getElementById("previousProduct");

    // Stop if this is not the homepage
    if (!productContainer || !nextButton || !previousButton) {
        return;
    }


    let currentProductIndex = 0;
    let productsPerView = getProductsPerView();


    // Show one product on mobile and two on larger screens
    function getProductsPerView() {

        return window.innerWidth < MOBILE_BREAKPOINT
            ? 1
            : 2;
    }


    function displayFeaturedProducts() {

        productContainer.innerHTML = "";

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
                        ${formatCurrency(product.price)}
                    </p>

                    <a
                        href="product.html"
                        class="btn btn-adventure">
                        View Product
                    </a>

                </article>
            `;

            productContainer.appendChild(
                productColumn
            );
        }
    }


    // Next product
    nextButton.addEventListener(
        "click",
        function () {

            currentProductIndex++;

            if (
                currentProductIndex >=
                featuredProducts.length
            ) {
                currentProductIndex = 0;
            }

            displayFeaturedProducts();
        }
    );


    // Previous product
    previousButton.addEventListener(
        "click",
        function () {

            currentProductIndex--;

            if (currentProductIndex < 0) {

                currentProductIndex =
                    featuredProducts.length - 1;
            }

            displayFeaturedProducts();
        }
    );


    // Only redraw when crossing the mobile breakpoint
    window.addEventListener(
        "resize",
        function () {

            const updatedProductsPerView =
                getProductsPerView();

            if (
                updatedProductsPerView !==
                productsPerView
            ) {

                productsPerView =
                    updatedProductsPerView;

                displayFeaturedProducts();
            }
        }
    );


    displayFeaturedProducts();
}


// --------------------------------------------------
// Floating back-to-top button
// --------------------------------------------------

function initialiseBackToTop() {

    const backToTopButton =
        document.getElementById("backToTop");

    if (!backToTopButton) {
        return;
    }


    function updateBackToTopVisibility() {

        if (window.scrollY > 400) {

            backToTopButton.classList.add("show");

        } else {

            backToTopButton.classList.remove("show");
        }
    }


    window.addEventListener(
        "scroll",
        updateBackToTopVisibility
    );

    updateBackToTopVisibility();
}


// ==================================================
// SHOP PAGE
// ==================================================


// --------------------------------------------------
// Product search and category filtering
// --------------------------------------------------

function initialiseShopFilters() {

    const searchForm =
        document.getElementById("shopSearchForm");

    const searchInput =
        document.getElementById("shopSearchInput");

    const products =
        document.querySelectorAll(".shop-product");

    const categoryCards =
        document.querySelectorAll(
            ".category-card, .shop-all-card"
        );

    const browseAllButton =
        document.getElementById(
            "browseAllProducts"
        );

    const productsSection =
        document.getElementById("products");


    // Stop if this is not the shop page
    if (!products.length) {
        return;
    }


    // Display every product
    function showAllProducts() {

        products.forEach(function (product) {

            product.style.display = "";
        });
    }


    // Search product names and categories
    function filterProducts(searchTerm) {

        products.forEach(function (product) {

            const productName =
                product.dataset.name.toLowerCase();

            const productCategory =
                product.dataset.category.toLowerCase();

            const isMatch =
                productName.includes(searchTerm) ||
                productCategory.includes(searchTerm);

            product.style.display =
                isMatch ? "" : "none";
        });
    }


    // Search form
    if (searchForm && searchInput) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                filterProducts(searchTerm);


                // Move the user to the search results
                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    // Category buttons
    categoryCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const selectedCategory =
                    card.dataset.category;


                if (selectedCategory === "all") {

                    showAllProducts();
                    return;
                }


                products.forEach(
                    function (product) {

                        product.style.display =
                            product.dataset.category ===
                            selectedCategory
                                ? ""
                                : "none";
                    }
                );
            }
        );
    });


    // Browse all products
    if (browseAllButton) {

        browseAllButton.addEventListener(
            "click",
            function () {

                showAllProducts();

                if (searchInput) {
                    searchInput.value = "";
                }
            }
        );
    }
}


// ==================================================
// PRODUCT PAGE
// ==================================================


// --------------------------------------------------
// Add product to cart
// --------------------------------------------------

function initialiseAddToCart() {

    const addToCartButton =
        document.getElementById(
            "addToCartButton"
        );

    const colourSelect =
        document.getElementById("packColour");


    // Stop if this is not the product page
    if (!addToCartButton || !colourSelect) {
        return;
    }


    addToCartButton.addEventListener(
        "click",
        function () {

            const selectedColour =
                colourSelect.value;


            // A colour must be selected
            if (selectedColour === "") {

                alert(
                    "Please select a colour before adding this product to your cart."
                );

                return;
            }


            const product = {
                name: "Southern Traverse 45L Pack",
                price: 189.00,
                image:
                    "images/southern-traverse-pack.jpg",
                colour: selectedColour,
                quantity: 1
            };


            localStorage.setItem(
                "cartProduct",
                JSON.stringify(product)
            );


            // Give the user confirmation
            addToCartButton.innerHTML =
                '<i class="bi bi-check-lg"></i> Added to Cart';
        }
    );
}


// ==================================================
// CART PAGE
// ==================================================


// --------------------------------------------------
// Display cart and calculate totals
// --------------------------------------------------

function initialiseShoppingCart() {

    const cartItemsContainer =
        document.getElementById("cartItems");


    // Stop if this is not the cart page
    if (!cartItemsContainer) {
        return;
    }


    const emptyCartMessage =
        document.getElementById(
            "emptyCartMessage"
        );

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartTax =
        document.getElementById("cartTax");

    const cartShipping =
        document.getElementById("cartShipping");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );

    const product =
        getSavedProduct();


    // Display an empty cart if no product is stored
    if (!product) {

        if (emptyCartMessage) {

            emptyCartMessage.classList.remove(
                "d-none"
            );
        }


        if (checkoutButton) {

            checkoutButton.classList.add(
                "disabled"
            );

            checkoutButton.setAttribute(
                "aria-disabled",
                "true"
            );
        }

        return;
    }


    // Create the cart product
    cartItemsContainer.innerHTML = `
        <article class="cart-item">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image">

            <div class="cart-item-details">

                <h2>${product.name}</h2>

                <p class="cart-item-colour">
                    Colour: ${product.colour}
                </p>

                <p class="cart-item-price">
                    ${formatCurrency(product.price)}
                </p>

            </div>

            <div class="cart-quantity">

                <label for="cartQuantity">
                    Quantity
                </label>

                <input
                    type="number"
                    class="form-control"
                    id="cartQuantity"
                    min="${MIN_CART_QUANTITY}"
                    max="${MAX_CART_QUANTITY}"
                    value="${product.quantity}">

            </div>

        </article>
    `;


    const quantityInput =
        document.getElementById("cartQuantity");


    // Recalculate whenever quantity changes
    function updateCartTotals() {

        let quantity =
            Number(quantityInput.value);


        // Keep quantity between 1 and 10
        if (quantity < MIN_CART_QUANTITY) {

            quantity =
                MIN_CART_QUANTITY;
        }


        if (quantity > MAX_CART_QUANTITY) {

            quantity =
                MAX_CART_QUANTITY;
        }


        quantityInput.value = quantity;
        product.quantity = quantity;


        const totals =
            calculateOrderTotals(product);


        cartSubtotal.textContent =
            formatCurrency(totals.subtotal);

        cartTax.textContent =
            formatCurrency(totals.tax);

        cartShipping.textContent =
            totals.shipping === 0
                ? "FREE"
                : formatCurrency(
                    totals.shipping
                );

        cartTotal.textContent =
            formatCurrency(totals.total);


        // Save updated quantity
        localStorage.setItem(
            "cartProduct",
            JSON.stringify(product)
        );


        // Save total for later checkout pages
        localStorage.setItem(
            "cartTotal",
            totals.total.toFixed(2)
        );
    }


    quantityInput.addEventListener(
        "input",
        updateCartTotals
    );


    updateCartTotals();
}


// ==================================================
// SHIPPING PAGE
// ==================================================


// --------------------------------------------------
// Display order summary and validate shipping form
// --------------------------------------------------

function initialiseShippingPage() {

    const shippingForm =
        document.getElementById("shippingForm");


    // Stop if this is not the shipping page
    if (!shippingForm) {
        return;
    }


    const product =
        getSavedProduct();

    const shippingSummaryProduct =
        document.getElementById(
            "shippingSummaryProduct"
        );

    const shippingSubtotal =
        document.getElementById(
            "shippingSubtotal"
        );

    const shippingCost =
        document.getElementById(
            "shippingCost"
        );

    const shippingTax =
        document.getElementById(
            "shippingTax"
        );

    const shippingTotal =
        document.getElementById(
            "shippingTotal"
        );


    // --------------------------------------------------
    // Order summary
    // --------------------------------------------------

    if (product) {

        const totals =
            calculateOrderTotals(product);


        shippingSummaryProduct.innerHTML = `
            <div class="shipping-summary-product">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <small>
                        ${product.colour}
                    </small>

                    <small>
                        Quantity: ${product.quantity}
                    </small>

                </div>

            </div>
        `;


        shippingSubtotal.textContent =
            formatCurrency(totals.subtotal);

        shippingCost.textContent =
            totals.shipping === 0
                ? "FREE"
                : formatCurrency(
                    totals.shipping
                );

        shippingTax.textContent =
            formatCurrency(totals.tax);

        shippingTotal.textContent =
            formatCurrency(totals.total);


        localStorage.setItem(
            "cartTotal",
            totals.total.toFixed(2)
        );
    }


    // --------------------------------------------------
    // Shipping form validation
    // --------------------------------------------------

    shippingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const firstName =
                document
                    .getElementById("firstName")
                    .value.trim();

            const lastName =
                document
                    .getElementById("lastName")
                    .value.trim();

            const address =
                document
                    .getElementById("address")
                    .value.trim();

            const address2 =
                document
                    .getElementById("address2")
                    .value.trim();

            const country =
                document
                    .getElementById("country")
                    .value;

            const city =
                document
                    .getElementById("city")
                    .value.trim();

            const postcode =
                document
                    .getElementById("postcode")
                    .value.trim();

            const phone =
                document
                    .getElementById("phone")
                    .value.trim();


            // Check required fields
            if (
                firstName === "" ||
                lastName === "" ||
                address === "" ||
                country === "" ||
                city === "" ||
                postcode === "" ||
                phone === ""
            ) {

                alert(
                    "Please complete all required shipping details."
                );

                return;
            }


            // NZ postcodes must contain four digits
            if (
                country === "NZ" &&
                !/^\d{4}$/.test(postcode)
            ) {

                alert(
                    "Please enter a valid 4-digit New Zealand postcode."
                );

                return;
            }


            // Basic phone number validation
            if (
                !/^[0-9+\s-]{7,15}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                return;
            }


            const selectedShippingMethod =
                document.querySelector(
                    'input[name="shippingMethod"]:checked'
                );


            if (!selectedShippingMethod) {

                alert(
                    "Please select a shipping method."
                );

                return;
            }


            // Store details for the payment page
            const shippingDetails = {
                firstName,
                lastName,
                address,
                address2,
                country,
                city,
                postcode,
                phone,
                shippingMethod:
                    selectedShippingMethod.value
            };


            localStorage.setItem(
                "shippingDetails",
                JSON.stringify(
                    shippingDetails
                )
            );


            // Continue to payment
            window.location.href =
                "payment.html";
        }
    );
}


// ==================================================
// INITIALISE PAGE FEATURES
// ==================================================
//
// The same custom.js file is loaded by every page.
// Each function checks whether its required HTML
// exists before doing anything.
// ==================================================

initialiseFeaturedCarousel();
initialiseBackToTop();
initialiseShopFilters();
initialiseAddToCart();
initialiseShoppingCart();
initialiseShippingPage();