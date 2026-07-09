const menuData = [
    { id: 1, cat: "Entradas", name: "Carpaccio de Res", price: 18.00, desc: "Finas láminas con arúgula", tags: ["Más vendido"] },
    // ... más productos
];

function renderMenu(filter = "") {
    const container = document.getElementById('menu-container');
    const filtered = menuData.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    
    container.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openModal(${p.id})">
            <img src="dish.jpg" alt="${p.name}">
            <div class="info">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <span class="price">€${p.price.toFixed(2)}</span>
            </div>
        </div>
    `).join('');
}

// Búsqueda en tiempo real
document.getElementById('search').addEventListener('input', (e) => renderMenu(e.target.value));

renderMenu();
