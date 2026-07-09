let cart = [];
let selectedProduct = null;
let quantity = 1;

const restaurantName = document.getElementById("restaurantName");
const restaurantSlogan = document.getElementById("restaurantSlogan");
const logo = document.getElementById("logo");
const coverImage = document.getElementById("coverImage");

const btnWhatsapp = document.getElementById("btnWhatsapp");
const btnCall = document.getElementById("btnCall");
const btnMaps = document.getElementById("btnMaps");

const searchInput = document.getElementById("search");
const categoriesContainer = document.getElementById("categoriesContainer");
const productsContainer = document.getElementById("productsContainer");
const featuredProducts = document.getElementById("featuredProducts");

const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const floatingCart = document.getElementById("floatingCart");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCounter = document.getElementById("cartCounter");
const sendOrder = document.getElementById("sendOrder");

const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", () => {
    loadRestaurant();
    renderCategories();
    renderProducts(products);
    renderFeatured();
    hideLoader();
});

function loadRestaurant() {
    restaurantName.textContent = restaurant.name;
    restaurantSlogan.textContent = restaurant.slogan;
    logo.src = restaurant.logo;
    coverImage.src = restaurant.cover;

    btnWhatsapp.onclick = () => {
        window.open(`https://wa.me/${restaurant.whatsapp}`, "_blank");
    };

    btnCall.onclick = () => {
        window.location.href = `tel:${restaurant.phone}`;
    };

    btnMaps.onclick = () => {
        window.open(restaurant.maps, "_blank");
    };
}

function renderCategories() {
    const categories = ["Todos", ...new Set(products.map(product => product.category))];

    categoriesContainer.innerHTML = "";

    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.className = "category-btn";
        button.textContent = category;

        if (index === 0) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            if (category === "Todos") {
                renderProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                renderProducts(filtered);
            }
        });

        categoriesContainer.appendChild(button);
    });
}

function renderProducts(list) {
    productsContainer.innerHTML = "";

    if (list.length === 0) {
        productsContainer.innerHTML = `<p>No se encontraron productos.</p>`;
        return;
    }

    list.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
    });
}

function renderFeatured() {
    featuredProducts.innerHTML = "";

    const featured = products.filter(product => product.featured);

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
                ${product.badges.map(badge => `<span class="badge badge-hot">${badge}</span>`).join("")}
            </div>

            <div class="product-footer">
                <span class="product-price">$${product.price}</span>

                <button class="add-button">
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
    quantity = 1;

    modalBody.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">

        <div class="product-content">
            <h2>${product.name}</h2>

            <p class="product-description">${product.description}</p>

            <h3 class="product-price">$${product.price}</h3>

            <div style="display:flex;align-items:center;gap:15px;margin-top:20px;">
                <button onclick="changeQuantity(-1)" class="category-btn">-</button>
                <strong id="modalQuantity">1</strong>
                <button onclick="changeQuantity(1)" class="category-btn">+</button>
            </div>

            <button onclick="addSelectedToCart()" id="sendOrder" style="margin-top:25px;">
                Agregar al pedido
            </button>
        </div>
    `;

    productModal.classList.add("active");
}

function changeQuantity(value) {
    quantity += value;

    if (quantity < 1) {
        quantity = 1;
    }

    document.getElementById("modalQuantity").textContent = quantity;
}

function addSelectedToCart() {
    addToCart(selectedProduct, quantity);
    productModal.classList.remove("active");
}

function addToCart(product, qty) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.style.marginBottom = "18px";

        div.innerHTML = `
            <strong>${item.name}</strong>
            <p>${item.quantity} x $${item.price}</p>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = `$${total}`;
    cartCounter.textContent = count;
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

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

floatingCart.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

sendOrder.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let message = `Hola, quiero hacer un pedido:%0A%0A`;

    cart.forEach(item => {
        message += `${item.quantity} x ${item.name} - $${item.price * item.quantity}%0A`;
    });

    message += `%0ATotal: ${cartTotal.textContent}`;

    window.open(`https://wa.me/${restaurant.whatsapp}?text=${message}`, "_blank");
});

function hideLoader() {
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
}
