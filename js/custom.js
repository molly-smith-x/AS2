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


// --------------------------------------------------
// Product page - Add to Cart
// --------------------------------------------------

const addToCartButton = document.getElementById("addToCartButton");
const colourSelect = document.getElementById("packColour");

if (addToCartButton && colourSelect) {

    addToCartButton.addEventListener("click", function () {

        const selectedColour = colourSelect.value;

        // Require the customer to select a colour first
        if (selectedColour === "") {
            alert("Please select a colour before adding this product to your cart.");
            return;
        }

        const product = {
            name: "Southern Traverse 45L Pack",
            price: 189.00,
            image: "images/southern-traverse-pack.jpg",
            colour: selectedColour,
            quantity: 1
        };

        localStorage.setItem("cartProduct", JSON.stringify(product));

        addToCartButton.innerHTML =
            '<i class="bi bi-check-lg"></i> Added to Cart';
    });

}


// --------------------------------------------------
// Shopping cart
// --------------------------------------------------

const cartItemsContainer = document.getElementById("cartItems");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTax = document.getElementById("cartTax");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

if (cartItemsContainer) {

    const savedProduct = localStorage.getItem("cartProduct");

    if (savedProduct) {

        const product = JSON.parse(savedProduct);

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
                        $${product.price.toFixed(2)}
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
                        min="1"
                        max="10"
                        value="${product.quantity}">

                </div>

            </article>
        `;

        const quantityInput =
            document.getElementById("cartQuantity");

        function updateCartTotals() {

            let quantity = Number(quantityInput.value);

            if (quantity < 1) {
                quantity = 1;
                quantityInput.value = 1;
            }

            if (quantity > 10) {
                quantity = 10;
                quantityInput.value = 10;
            }

            const subtotal =
                product.price * quantity;

            const tax =
                subtotal * 0.15;

            // Order value including tax
            const orderValue =
                subtotal + tax;

            // Free shipping for orders of $600 or more
            const shipping =
                orderValue >= 600 ? 0 : 15;

            const total =
                orderValue + shipping;

            cartSubtotal.textContent =
                `$${subtotal.toFixed(2)}`;

            cartShipping.textContent =
                shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`;

            cartTax.textContent =
                `$${tax.toFixed(2)}`;

            cartTotal.textContent =
                `$${total.toFixed(2)}`;

            product.quantity = quantity;

            localStorage.setItem(
                "cartProduct",
                JSON.stringify(product)
            );

            localStorage.setItem(
                "cartTotal",
                total.toFixed(2)
            );
        }

        quantityInput.addEventListener(
            "input",
            updateCartTotals
        );

        updateCartTotals();

    } else {

        emptyCartMessage.classList.remove("d-none");

        checkoutButton.classList.add("disabled");
        checkoutButton.setAttribute("aria-disabled", "true");
    }

}

// --------------------------------------------------
// Shipping details page
// --------------------------------------------------

const shippingForm = document.getElementById("shippingForm");

if (shippingForm) {

    const savedProduct = localStorage.getItem("cartProduct");

    const shippingSummaryProduct =
        document.getElementById("shippingSummaryProduct");

    const shippingSubtotal =
        document.getElementById("shippingSubtotal");

    const shippingCost =
        document.getElementById("shippingCost");

    const shippingTax =
        document.getElementById("shippingTax");

    const shippingTotal =
        document.getElementById("shippingTotal");


    // --------------------------------------------------
    // Display order summary
    // --------------------------------------------------

    if (savedProduct) {

        const product = JSON.parse(savedProduct);

        const subtotal =
            product.price * product.quantity;

        const tax =
            subtotal * 0.15;

        const orderValue =
            subtotal + tax;

        // Free shipping when order value is $600 or more
        const shipping =
            orderValue >= 600 ? 0 : 15;

        const total =
            orderValue + shipping;


        shippingSummaryProduct.innerHTML = `
            <div class="shipping-summary-product">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <div>
                    <strong>${product.name}</strong>

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
            `$${subtotal.toFixed(2)}`;

        shippingCost.textContent =
            shipping === 0
                ? "FREE"
                : `$${shipping.toFixed(2)}`;

        shippingTax.textContent =
            `$${tax.toFixed(2)}`;

        shippingTotal.textContent =
            `$${total.toFixed(2)}`;


        // Save total for payment page
        localStorage.setItem(
            "cartTotal",
            total.toFixed(2)
        );
    }


    // --------------------------------------------------
    // Validate shipping form
    // --------------------------------------------------

    shippingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const country =
            document.getElementById("country").value;

        const city =
            document.getElementById("city").value.trim();

        const postcode =
            document.getElementById("postcode").value.trim();

        const phone =
            document.getElementById("phone").value.trim();


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
            alert("Please complete all required shipping details.");
            return;
        }


        // Check NZ postcode
        if (country === "NZ" && !/^\d{4}$/.test(postcode)) {
            alert("Please enter a valid 4-digit New Zealand postcode.");
            return;
        }


        // Check phone number
        if (!/^[0-9+\s-]{7,15}$/.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }


        // Find selected shipping method
        const shippingMethod =
            document.querySelector(
                'input[name="shippingMethod"]:checked'
            ).value;


        // Save shipping information
        const shippingDetails = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            address2:
                document.getElementById("address2").value.trim(),
            country: country,
            city: city,
            postcode: postcode,
            phone: phone,
            shippingMethod: shippingMethod
        };


        localStorage.setItem(
            "shippingDetails",
            JSON.stringify(shippingDetails)
        );


        // Continue to payment
        window.location.href = "payment.html";

    });

}