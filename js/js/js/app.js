let cartItemsList = [];
let selectedProduct = null;
let selectedQuantity = 1;

const $ = (selector) => document.querySelector(selector);

const restaurantName = $("#restaurantName");
const restaurantSlogan = $("#restaurantSlogan");
const logo = $("#logo");
const coverImage = $("#coverImage");

const btnWhatsapp = $("#btnWhatsapp");
const btnCall = $("#btnCall");
const btnMaps = $("#btnMaps");

const searchInput = $("#search");
const categoriesContainer = $("#categoriesContainer");
const productsContainer = $("#productsContainer");
const featuredProducts = $("#featuredProducts");

const productModal = $("#productModal");
const modalBody = $("#modalBody");
const closeModal = $("#closeModal");

const floatingCart = $("#floatingCart");
const cartPanel = $("#cart");
const closeCart = $("#closeCart");
const cartItems = $("#cartItems");
const cartTotal = $("#cartTotal");
const cartCounter = $("#cartCounter");
const sendOrder = $("#sendOrder");

const loader = $("#loader");

document.addEventListener("DOMContentLoaded", () => {
    loadRestaurant();
    renderCategories();
    renderProducts(products);
    renderFeaturedProducts();
    hideLoader();
});

function money(value) {
    return `$${value.toFixed(2)} MXN`;
}

function loadRestaurant() {
    restaurantName.textContent = restaurant.name;
    restaurantSlogan.textContent = restaurant.slogan;
    logo.src = restaurant.logo;
    coverImage.src = restaurant.cover;

    document.title = restaurant.name;

    btnWhatsapp.onclick = () => window.open(`https://wa.me/${restaurant.whatsapp}`, "_blank");
    btnCall.onclick = () => window.location.href = `tel:${restaurant.phone}`;
    btnMaps.onclick = () => window.open(restaurant.maps, "_blank");
}

function renderCategories() {
    const categories = ["Todos", ...new Set(products.map(product => product.category))];

    categoriesContainer.innerHTML = "";

    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.className = "category-btn";
        button.textContent = category;

        if (index === 0) button.classList.add("active");

        button.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filtered = category === "Todos"
                ? products
                : products.filter(product => product.category === category);

            searchInput.value = "";
            renderProducts(filtered);
        });

        categoriesContainer.appendChild(button);
    });
}

function renderProducts(list) {
    productsContainer.innerHTML = "";

    if (!list.length) {
        productsContainer.innerHTML = `<p class="empty-message">No se encontraron productos.</p>`;
        return;
    }

    list.forEach(product => {
        productsContainer.appendChild(createProductCard(product));
    });
}

function renderFeaturedProducts() {
    const featured = products.filter(product => product.featured);

    featuredProducts.innerHTML = "";

    featured.forEach(product => {
        const card = createProductCard(product);
        card.classList.add("featured-card");
        featuredProducts.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card fade";

    card.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">

        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>

            <div class="badges">
                ${(product.badges || []).map(badge => `
                    <span class="badge badge-hot">${badge}</span>
                `).join("")}
            </div>

            <div class="product-footer">
                <span class="product-price">${money(product.price)}</span>

                <button class="add-button" aria-label="Agregar ${product.name}">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    `;

    card.addEventListener("click", () => openProductModal(product));

    card.querySelector(".add-button").addEventListener("click", (event) => {
        event.stopPropagation();
        addToCart(product, 1);
    });

    return card;
}

function openProductModal(product) {
    selectedProduct = product;
    selectedQuantity = 1;

    modalBody.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">

        <div class="product-content">
            <h2>${product.name}</h2>
            <p class="product-description">${product.description}</p>
            <h3 class="product-price">${money(product.price)}</h3>

            <div class="quantity-control">
                <button onclick="changeQuantity(-1)" class="category-btn">-</button>
                <strong id="modalQuantity">1</strong>
                <button onclick="changeQuantity(1)" class="category-btn">+</button>
            </div>

            <button onclick="addSelectedToCart()" class="modal-add-btn">
                Agregar al pedido
            </button>
        </div>
    `;

    productModal.classList.add("active");
}

function changeQuantity(value) {
    selectedQuantity += value;

    if (selectedQuantity < 1) selectedQuantity = 1;

    $("#modalQuantity").textContent = selectedQuantity;
}

function addSelectedToCart() {
    if (!selectedProduct) return;

    addToCart(selectedProduct, selectedQuantity);
    productModal.classList.remove("active");
}

function addToCart(product, quantity) {
    const existingProduct = cartItemsList.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cartItemsList.push({
            ...product,
            quantity
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (!cartItemsList.length) {
        cartItems.innerHTML = `<p class="empty-message">Tu carrito está vacío.</p>`;
    }

    cartItemsList.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>${item.quantity} x ${money(item.price)}</p>
            </div>

            <button onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = money(total);
    cartCounter.textContent = count;
}

function removeFromCart(productId) {
    cartItemsList = cartItemsList.filter(item => item.id !== productId);
    updateCart();
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );

    renderProducts(filtered);
});

closeModal.addEventListener("click", () => {
    productModal.classList.remove("active");
});

productModal.addEventListener("click", (event) => {
    if (event.target === productModal) {
        productModal.classList.remove("active");
    }
});

floatingCart.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

sendOrder.addEventListener("click", () => {
    if (!cartItemsList.length) {
        alert("Tu carrito está vacío.");
        return;
    }

    let total = 0;
    let message = `Hola, quiero hacer un pedido en ${restaurant.name}:%0A%0A`;

    cartItemsList.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.quantity} x ${item.name} - ${money(subtotal)}%0A`;
    });

    message += `%0ATotal: ${money(total)}`;

    window.open(`https://wa.me/${restaurant.whatsapp}?text=${message}`, "_blank");
});

function hideLoader() {
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
}
