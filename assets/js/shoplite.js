/* ===== ARTES DA SI - SHOP LITE SYSTEM ===== */

(function() {
  'use strict';
  
  // ========== DADOS DOS PRODUTOS ==========
  const items = [
    // Ecobags
    { id: 1, title: 'Ecobag Corporativa Linho', category: 'ecobag', img: 'assets/img/img1.jpg', note: 'Personalização com logo bordado. Pedido mínimo a definir.' },
    { id: 2, title: 'Ecobag Sustentável Personalizada', category: 'ecobag', img: 'assets/img/img2.jpg', note: 'Material ecológico. Ideal para eventos e brindes.' },
    
    // Necessaires
    { id: 3, title: 'Necessaire com Bordado Personalizado', category: 'necessaire', img: 'assets/img/img3.jpg', note: 'Nome ou logo bordado. Vários tamanhos disponíveis.' },
    { id: 4, title: 'Necessaire Corporativa Premium', category: 'necessaire', img: 'assets/img/img4.jpg', note: 'Acabamento profissional. Perfeita para kits corporativos.' },
    
    // Bolsas
    { id: 5, title: 'Bolsa de Mão Artesanal', category: 'bolsa', img: 'assets/img/img5.jpg', note: 'Feita à mão com tecidos selecionados. Peça única.' },
    { id: 6, title: 'Bolsa Tote Personalizada', category: 'bolsa', img: 'assets/img/img6.jpg', note: 'Espaçosa e resistente. Personalização completa.' },
    
    // Kits
    { id: 7, title: 'Kit Maternidade Completo', category: 'kit', img: 'assets/img/img7.jpg', note: 'Bolsa + necessaire + trocador. Nome do bebê bordado.' },
    { id: 8, title: 'Kit Corporativo Boas-Vindas', category: 'kit', img: 'assets/img/img8.jpg', note: 'Conjunto para novos colaboradores. Logo da empresa.' },
    
    // Couro
    { id: 9, title: 'Bolsa em Couro Ecológico', category: 'couro', img: 'assets/img/img9.jpg', note: 'Material sintético de alta qualidade. Durável e elegante.' },
    
    // Acessórios
    { id: 10, title: 'Estojo Personalizado', category: 'acessorio', img: 'assets/img/img10.jpg', note: 'Para maquiagem, lápis ou acessórios. Bordado opcional.' },
    { id: 11, title: 'Chaveiro Bordado', category: 'acessorio', img: 'assets/img/img11.jpg', note: 'Mini brinde personalizado. Ideal para eventos.' },
    { id: 12, title: 'Peça com Nome Bordado', category: 'personalizado', img: 'assets/img/img12.jpg', note: 'Qualquer produto com personalização completa.' }
  ];
  
  // ========== RENDERIZAR SHOP-LITE ==========
  function renderShopLite(containerSelector, filterCategory = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const filteredItems = filterCategory 
      ? items.filter(item => item.category === filterCategory)
      : items;
    
    container.innerHTML = filteredItems.map(item => `
      <div class="shop-card" data-category="${item.category}">
        <div class="shop-card__image-wrapper">
          <img src="${item.img}" alt="${item.title}" class="shop-card__image" loading="lazy">
          <span class="shop-card__tag">${getCategoryName(item.category)}</span>
        </div>
        <div class="shop-card__content">
          <h3 class="shop-card__title">${item.title}</h3>
          <p class="shop-card__note">${item.note}</p>
          <button class="shop-card__cta" onclick="openWhatsApp(${item.id})">
            <span>💬</span> Pedir orçamento
          </button>
        </div>
      </div>
    `).join('');
  }
  
  // ========== NOMES DAS CATEGORIAS ==========
  function getCategoryName(category) {
    const names = {
      'ecobag': 'Ecobag',
      'necessaire': 'Necessaire',
      'bolsa': 'Bolsa',
      'kit': 'Kit',
      'couro': 'Couro',
      'acessorio': 'Acessório',
      'personalizado': 'Personalizado'
    };
    return names[category] || category;
  }
  
  // ========== ABRIR WHATSAPP ==========
  window.openWhatsApp = function(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const baseMessage = 'quero fazer um orçamento..';
    const itemInfo = `\n\nProduto: ${item.title}\nCategoria: ${getCategoryName(item.category)}`;
    const fullMessage = encodeURIComponent(baseMessage + itemInfo);
    
    const whatsappURL = `https://wa.me/5511985755642?text=${fullMessage}`;
    window.open(whatsappURL, '_blank');
  };
  
  // ========== FILTROS ==========
  function setupFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const shopCards = document.querySelectorAll('.shop-card');
    
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const category = chip.dataset.category;
        
        // Ativar chip
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        // Filtrar cards
        shopCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }
  
  // ========== INICIALIZAÇÃO ==========
  function init() {
    // Renderizar shop-lite na home
    renderShopLite('.shop-lite');
    
    // Setup filtros se existirem
    if (document.querySelector('.filter-chip')) {
      setupFilters();
    }
  }
  
  // Executar quando DOM carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Exportar para uso global
  window.renderShopLite = renderShopLite;
  window.shopItems = items;
})();

