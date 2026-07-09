const menuData = {
    "Entradas": {
        bannerImg: "https://images.unsplash.com/photo-1551a47875-4b122c6f67b3?q=80&w=1200&auto=format&fit=crop", // Foto de la pasta del banner original
        bannerTitle: "Entradas",
        bannerDesc: "Servido con pasta o papas fritas",
        items: [
            { n: "Miso Salmón glaseado", p: "€ 22,00", desc: "Miso de sal dulce con mantequilla. Contiene gluten, lechería", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=150&auto=format&fit=crop" },
            { n: "Curry de batata", p: "€ 12,00", desc: "Curry vegetariano con calabaza. Adecuado para mujeres embarazadas", img: "https://images.unsplash.com/photo-1596803889465-46e1489139ae?q=80&w=150&auto=format&fit=crop" },
            { n: "Pasta Arrabiata", p: "€ 14,00", desc: "Pasta con salsa picante. Contiene gluten", img: "https://images.unsplash.com/photo-1584940562479-7a760d62d295?q=80&w=150&auto=format&fit=crop" },
            { n: "Burger Royal", p: "€ 16,00", desc: "Hamburguesa de tocino con queso suizo. Contiene gluten, lechería, sésamo", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop" },
            { n: "Venado tostado", p: "€ 18,00", desc: "Carne de venado con vinagre de... Contiene gluten, sulfito", img: "https://images.unsplash.com/photo-1606854428912-b111795d4135?q=80&w=150&auto=format&fit=crop", price2: "€ 22,00 (400g)" } // Manejo especial para dos precios
        ]
    },
    "Bebidas": {
        bannerImg: "https://images.unsplash.com/photo-1549098117-62a6f09645b9?q=80&w=1200&auto=format&fit=crop", 
        bannerTitle: "Nuestra Bodega",
        bannerDesc: "Selección de vinos y espumosos",
        items: [
            { n: "Vino Tinto Reserva", p: "€ 35,00", desc: "Rioja, D.O.Ca. Botella 750ml", img: "https://images.unsplash.com/photo-1586375361292-1331d5c90508?q=80&w=150&auto=format&fit=crop" },
            { n: "Cerveza Artesanal IPA", p: "€ 7,00", desc: "Lupulada, refrescante. 33cl", img: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=150&auto=format&fit=crop" }
        ]
    },
    "Desserts": {
        bannerImg: "https://images.unsplash.com/photo-1586985289606-b96e8b76407a?q=80&w=1200&auto=format&fit=crop", 
        bannerTitle: "Postres Caseros",
        bannerDesc: "El final dulce perfecto",
        items: [
            { n: "Tiramisú Clásico", p: "€ 9,50", desc: "Receta tradicional italiana", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=150&auto=format&fit=crop" },
            { n: "Tarta de Queso", p: "€ 10,00", desc: "Con coulis de frutos rojos", img: "https://images.unsplash.com/photo-1658832793167-13b93a2022bc?q=80&w=150&auto=format&fit=crop" }
        ]
    },
    "Cocktails": {
        bannerImg: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop", 
        bannerTitle: "Coctelería de Autor",
        bannerDesc: "Mixología premium",
        items: [
            { n: "Mojito Clásico", p: "€ 11,00", desc: "Ron, hierbabuena, lima", img: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=150&auto=format&fit=crop" },
            { n: "Gin Tonic Premium", p: "€ 13,00", desc: "Ginebra botánica, tónica premium", img: "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=150&auto=format&fit=crop" }
        ]
    }
};

function render(catName) {
    const category = menuData[catName];
    const dishList = document.getElementById('menu-display');
    const bannerImg = document.getElementById('banner-img');
    const bannerTitle = document.getElementById('banner-title');
    const bannerDesc = document.getElementById('banner-desc');

    // 1. Actualizar el banner principal de la categoría
