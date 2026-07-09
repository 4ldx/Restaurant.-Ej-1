const menuData = {
    "Entradas": [
        { n: "Carpaccio de Res", p: "$180", desc: "Finas láminas, arúgula, parmesano.", img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800" },
        { n: "Burrata Fresca", p: "$210", desc: "Tomates cherry, albahaca, aceite trufa.", img: "https://images.unsplash.com/photo-1608039756073-6535311e9a3f?w=800" }
    ],
    "Platos Fuertes": [
        { n: "Rib Eye 300g", p: "$450", desc: "Madurado 21 días, sal de mar.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
        { n: "Salmón Costra", p: "$380", desc: "Hierbas finas, puré de camote.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800" },
        { n: "Risotto Funghi", p: "$290", desc: "Arroz arborio, setas mixtas, parmesano.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800" }
    ],
    "Postres": [
        { n: "Tarta de Frutos", p: "$150", desc: "Base de mantequilla, crema pastelera.", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800" },
        { n: "Fondant Chocolate", p: "$160", desc: "Núcleo líquido, helado vainilla.", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800" },
        { n: "Pavlova", p: "$140", desc: "Merengue crujiente, frutos rojos.", img: "https://images.unsplash.com/photo-1579372787885-4842526a27e7?w=800" },
        { n: "Cheesecake", p: "$130", desc: "Coulis de fresa artesanal.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800" },
        { n: "Macarons", p: "$120", desc: "Selección de sabores franceses.", img: "https://images.unsplash.com/photo-1569864358642-9d1684340c31?w=800" }
    ]
};

function render(cat) {
    const container = document.getElementById('menu-display');
    const imgDiv = document.getElementById('image-display');
    
    // Cambiar imagen según el primer plato de la categoría
    imgDiv.style.backgroundImage = `url('${menuData[cat][0].img}')`;
    
    container.innerHTML = menuData[cat].map(item => `
        <div class="item">
            <h2>${item.n}</h2>
            <span class="price">${item.p}</span>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

const tabs = document.getElementById('tabs');
Object.keys(menuData).forEach(cat => {
    tabs.innerHTML += `<button onclick="render('${cat}')">${cat}</button>`;
});

render("Entradas");
