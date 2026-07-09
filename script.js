const menuData = {
    "Entradas": [
        { n: "Carpaccio de Res", p: "€180.00", desc: "Finas láminas con arúgula y parmesano.", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=300&q=80" },
        { n: "Burrata Fresca", p: "€210.00", desc: "Tomates cherry, albahaca y aceite de trufa.", img: "https://images.unsplash.com/photo-1608039756073-6535311e9a3f?auto=format&fit=crop&w=300&q=80" },
        { n: "Tostada de Atún", p: "€150.00", desc: "Atún fresco, aguacate y aderezo oriental.", img: "https://images.unsplash.com/photo-1599824673896-857e53f05353?auto=format&fit=crop&w=300&q=80" }
    ],
    "Platos Fuertes": [
        { n: "Rib Eye Premium", p: "€450.00", desc: "Corte de 300g madurado 21 días.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" },
        { n: "Salmón a la Parrilla", p: "€380.00", desc: "Con costra de hierbas y puré de camote.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80" },
        { n: "Risotto Funghi", p: "€290.00", desc: "Arroz arborio, setas mixtas y parmesano.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=300&q=80" },
        { n: "Pasta Arrabiata", p: "€220.00", desc: "Salsa pomodoro con un toque picante.", img: "https://images.unsplash.com/photo-1584940562479-7a760d62d295?auto=format&fit=crop&w=300&q=80" }
    ],
    "Postres": [
        { n: "Fondant Chocolate", p: "€120.00", desc: "Núcleo líquido con helado de vainilla.", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=300&q=80" },
        { n: "Pavlova", p: "€140.00", desc: "Merengue crujiente con frutos rojos.", img: "https://images.unsplash.com/photo-1579372787885-4842526a27e7?auto=format&fit=crop&w=300&q=80" },
        { n: "Cheesecake", p: "€130.00", desc: "Coulis de fresa artesanal.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300&q=80" }
    ]
};

function render(cat) {
    const container = document.getElementById('menu-display');
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

const tabsContainer = document.getElementById('tabs');
Object.keys(menuData).forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.onclick = () => render(cat);
    tabsContainer.appendChild(btn);
});

render(Object.keys(menuData)[0]);
