const menuData = {
    "Entradas": { title: "Entradas", desc: "Servido con pasta o papas fritas", items: [
        { n: "Miso Salmón glaseado", p: "€ 22.00", d: "Miso de sal dulce con mantequilla", img: "https://i.pravatar.cc/100" }
    ]},
    "Bebidas": { title: "Bebidas", desc: "Nuestra selección", items: [
        { n: "Cóctel de Autor", p: "€ 10.00", d: "Refrescante y natural", img: "https://i.pravatar.cc/100" }
    ]}
};

function render(cat) {
    const data = menuData[cat];
    document.getElementById('banner-title').innerText = data.title;
    document.getElementById('banner-desc').innerText = data.desc;
    document.getElementById('menu-display').innerHTML = data.items.map(i => `
        <div class="item">
            <img src="${i.img}" class="item-img">
            <div class="item-info">
                <h2>${i.n}</h2>
                <p>${i.d}</p>
            </div>
            <span class="price">${i.p}</span>
        </div>
    `).join('');
}

// Generar tabs
const nav = document.getElementById('tabs');
Object.keys(menuData).forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.innerText = cat;
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(cat);
    };
    nav.appendChild(btn);
});

render(Object.keys(menuData)[0]);
    // 1. Actualizar el banner principal de la categoría
