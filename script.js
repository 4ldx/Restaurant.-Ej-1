const menuData = {
    "Entradas": [
        { n: "Miso Salmón glaseado", p: "€22.00", desc: "Miso de sal dulce con mantequilla", img: "https://via.placeholder.com/150" },
        { n: "Pasta Arrabiata", p: "€14.00", desc: "Pasta con salsa picante", img: "https://via.placeholder.com/150" }
    ],
    "Bebidas": [
        { n: "Cóctel de Autor", p: "€10.00", desc: "Mezcla de cítricos y hierbabuena", img: "https://via.placeholder.com/150" }
    ]
};

function render(cat) {
    const container = document.getElementById('menu-display');
    
    // Inyecta los platos en el contenedor
    container.innerHTML = menuData[cat].map(item => `
        <div class="item">
            <img src="${item.img}" class="item-img" alt="${item.n}">
            <div class="item-info">
                <h2>${item.n}</h2>
                <p>${item.desc}</p>
                <span class="price">${item.p}</span>
            </div>
        </div>
    `).join('');
}

// Crea los botones dinámicamente
const tabsContainer = document.getElementById('tabs');
Object.keys(menuData).forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.onclick = () => render(cat);
    tabsContainer.appendChild(btn);
});

// Render inicial
render(Object.keys(menuData)[0]);
