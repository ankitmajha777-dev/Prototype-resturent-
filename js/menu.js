/**
 * CELESTIAL CUISINE - Interactive Menu System
 * Category filter, search, dietary indicators, allergen modal, tasting notes
 */

(function () {
  'use strict';

  // Comprehensive Menu Database
  const MENU_DATABASE = [
    // STARTERS
    {
      id: 'st-1',
      name: 'Black Truffle Arancini',
      category: 'Starters',
      price: 26,
      image: './assets/images/dish-truffle-pasta.jpg',
      description: 'Crispy carnaroli risotto spheres infused with Perigord black truffle, aged Parmigiano-Reggiano, and roasted garlic aioli.',
      isVegetarian: true,
      tags: ['Vegetarian', 'Signature'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      winePairing: '2020 Louis Roederer Brut Premier Champagne',
      details: 'Slow-simmered Carnaroli rice paired with winter black truffles harvested from Umbria, served over a warm Parmigiano emulsion.'
    },
    {
      id: 'st-2',
      name: 'Yellowfin Tuna Tartare',
      category: 'Starters',
      price: 32,
      image: './assets/images/dish-scallops.jpg',
      description: 'Hand-cut line-caught tuna, avocado mousse, pickled shallot, white ponzu emulsion, and lotus root crisps.',
      isVegetarian: false,
      tags: ['Gluten-Free', 'Signature'],
      allergens: ['Fish', 'Soy'],
      winePairing: '2022 Domaine Sigalas Assyrtiko, Santorini',
      details: 'Sustainably sourced sushi-grade tuna tossed with cold-pressed sesame oil, citrus zest, and served with house-made lotus chips.'
    },
    {
      id: 'st-3',
      name: 'Foie Gras Torchon',
      category: 'Starters',
      price: 36,
      image: './assets/images/chef-plating.jpg',
      description: 'Hudson Valley duck liver torchon, spiced Mission fig compote, warm brioche toast, and aged balsamic reduction.',
      isVegetarian: false,
      tags: ['Chef Selection'],
      allergens: ['Gluten', 'Dairy'],
      winePairing: '2017 Château d’Yquem Sauternes',
      details: 'Cured for 48 hours in Cognac and sea salt, served with warm buttery artisanal brioche baked twice daily.'
    },

    // SOUPS & SALADS
    {
      id: 'ss-1',
      name: 'Lobster Bisque Royale',
      category: 'Soups & Salads',
      price: 29,
      image: './assets/images/dish-lobster-tail.jpg',
      description: 'Silky Maine lobster reduction infused with French cognac, tarragon cream, and butter-poached claw meat.',
      isVegetarian: false,
      tags: ['Signature', 'Gluten-Free'],
      allergens: ['Crustaceans', 'Dairy', 'Alcohol'],
      winePairing: '2021 Meursault, Domaine des Comtes Lafon',
      details: 'Traditional roasted shell broth simmered for 12 hours with aromatic mirepoix, flambéed with Courvoisier VSOP.'
    },
    {
      id: 'ss-2',
      name: 'Heirloom Beet & Goat Cheese',
      category: 'Soups & Salads',
      price: 24,
      image: './assets/images/dish-scallops.jpg',
      description: 'Roasted golden and candy cane beets, whipped Humboldt Fog chevre, candied pistachios, and blood orange vinaigrette.',
      isVegetarian: true,
      tags: ['Vegetarian', 'Gluten-Free'],
      allergens: ['Dairy', 'Tree Nuts'],
      winePairing: '2023 Sancerre, Henri Bourgeois',
      details: 'Locally farmed organic root beets roasted in rock salt, paired with California artisanal goat cheese and citrus essence.'
    },

    // MAIN COURSES
    {
      id: 'mc-1',
      name: 'Black Truffle Tagliolini',
      category: 'Main Courses',
      price: 48,
      image: './assets/images/dish-truffle-pasta.jpg',
      description: 'House-extruded 40-yolk pasta tossed in mountain butter, 36-month Vacche Rosse Parmigiano, and freshly shaved black truffles.',
      isVegetarian: true,
      tags: ['Vegetarian', 'Signature'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
      winePairing: '2019 Barolo DOCG, Paolo Scavino',
      details: 'Truffles shaved table-side over rich egg pasta prepared fresh each morning by our dedicated pasta chef.'
    },
    {
      id: 'mc-2',
      name: 'Roasted Magret Duck Breast',
      category: 'Main Courses',
      price: 52,
      image: './assets/images/chef-plating.jpg',
      description: 'Crispy skin duck breast, parsnip mousseline, tart blackberry gastrique, and charred baby leeks.',
      isVegetarian: false,
      tags: ['Gluten-Free'],
      allergens: ['Dairy'],
      winePairing: '2020 Domaine Dujac Morey-Saint-Denis Pinot Noir',
      details: 'Dry-aged for 10 days in our temperature-controlled aging room, scored and pan-roasted to medium rare perfection.'
    },

    // SEAFOOD
    {
      id: 'sf-1',
      name: 'Pan-Seared Hokkaido Scallops',
      category: 'Seafood',
      price: 42,
      image: './assets/images/dish-scallops.jpg',
      description: 'Jumbo wild diver scallops, cauliflower silk velvet, Golden Kaluga Imperial Caviar, and saffron orange butter reduction.',
      isVegetarian: false,
      tags: ['Signature', 'Gluten-Free'],
      allergens: ['Molluscs', 'Dairy'],
      winePairing: '2021 Chablis Grand Cru, William Fèvre',
      details: 'Harvested from Hokkaido northern waters, caramelized to golden crust with delicate translucent sweet center.'
    },
    {
      id: 'sf-2',
      name: 'Poached Maine Lobster Tail',
      category: 'Seafood',
      price: 64,
      image: './assets/images/dish-lobster-tail.jpg',
      description: 'Slow-poached in cultured seaweed butter, served with crisp sea beans, finger lime pearls, and champagne saffron beurre blanc.',
      isVegetarian: false,
      tags: ['Signature', 'Gluten-Free'],
      allergens: ['Crustaceans', 'Dairy'],
      winePairing: '2020 Puligny-Montrachet, Olivier Leflaive',
      details: 'Sourced directly from Casco Bay, Maine, gentle immersion cooking preserves succulent tenderness and natural ocean salinity.'
    },
    {
      id: 'sf-3',
      name: 'Chilean Sea Bass Glacier 51',
      category: 'Seafood',
      price: 58,
      image: './assets/images/dish-scallops.jpg',
      description: 'Miso-marinated toothfish, baby bok choy, dashi ginger broth, and crisp scallion oil.',
      isVegetarian: false,
      tags: ['Gluten-Free'],
      allergens: ['Fish', 'Soy'],
      winePairing: '2022 Kistler Les Noisetiers Chardonnay, Sonoma Coast',
      details: 'Sustainably harvested from Antarctic depths, glazed in sweet saikyo miso and finished over charcoal.'
    },

    // STEAKS & GRILLS
    {
      id: 'sg-1',
      name: 'Miyazaki A5 Wagyu Ribeye (6 oz)',
      category: 'Steaks & Grills',
      price: 55,
      image: './assets/images/hero-wagyu-steak.jpg',
      description: 'Legendary Japanese Wagyu seared over Japanese binchotan charcoal, bone marrow glaze, black garlic puree, and smoked Maldon salt.',
      isVegetarian: false,
      tags: ['Signature', 'Gluten-Free'],
      allergens: ['Soy', 'Dairy'],
      winePairing: '2018 Opus One, Napa Valley Red Blend',
      details: 'Certified Miyazaki Prefecture BMS 11 grade beef with exquisite intra-muscular marbling, melting at body temperature.'
    },
    {
      id: 'sg-2',
      name: 'USDA Prime Dry-Aged Filet Mignon (8 oz)',
      category: 'Steaks & Grills',
      price: 68,
      image: './assets/images/hero-wagyu-steak.jpg',
      description: '45-day dry-aged center-cut tenderloin, charred shallot confit, pomme purée, and black truffle Madeira demi-glace.',
      isVegetarian: false,
      tags: ['Gluten-Free'],
      allergens: ['Dairy'],
      winePairing: '2019 Caymus Vineyards Cabernet Sauvignon, Napa',
      details: 'Custom aged in Himalayan rock salt chambers for concentrated nutty depth and exceptional fork-tender texture.'
    },
    {
      id: 'sg-3',
      name: 'Colorado Lamb Chops',
      category: 'Steaks & Grills',
      price: 54,
      image: './assets/images/chef-plating.jpg',
      description: 'Herb-crusted double cutlets, minted English pea coulis, glazed heirloom carrots, and rosemary roasting jus.',
      isVegetarian: false,
      tags: ['Chef Selection'],
      allergens: ['Gluten', 'Dairy'],
      winePairing: '2018 Château Pontet-Canet, Pauillac Bordeaux',
      details: 'Free-range pasture-raised Rocky Mountain lamb, roasted with thyme, rosemary, and Dijon mustard crust.'
    },

    // DESSERTS
    {
      id: 'ds-1',
      name: 'Valrhona Chocolate Fondant',
      category: 'Desserts',
      price: 28,
      image: './assets/images/dish-chocolate-fondant.jpg',
      description: 'Warm molten 70% Guanaja dark chocolate cake, spun gold caramel nest, Tahitian vanilla bean gelato, and raspberry coulis.',
      isVegetarian: true,
      tags: ['Vegetarian', 'Signature'],
      allergens: ['Dairy', 'Gluten', 'Eggs'],
      winePairing: 'Taylor Fladgate 20 Year Old Tawny Port',
      details: 'Freshly baked to order with liquid molten core, garnished with 24-karat edible gold leaf flakes.'
    },
    {
      id: 'ds-2',
      name: 'Gold Leaf Meyer Lemon Tart',
      category: 'Desserts',
      price: 24,
      image: './assets/images/dish-chocolate-fondant.jpg',
      description: 'Almond sable crust, sharp Meyer lemon curd, torched Swiss meringue peaks, and candied citrus peel.',
      isVegetarian: true,
      tags: ['Vegetarian'],
      allergens: ['Tree Nuts', 'Dairy', 'Eggs', 'Gluten'],
      winePairing: '2018 Royal Tokaji 5 Puttonyos Aszú',
      details: 'Sun-ripened organic Meyer lemons balanced against caramelized meringue and crisp shortbread.'
    },

    // BEVERAGES
    {
      id: 'bv-1',
      name: 'Celestial Smoked Old Fashioned',
      category: 'Beverages',
      price: 26,
      image: './assets/images/sommelier-wine.jpg',
      description: 'WhistlePig 10-Year Rye, Demerara sugar, Angostura & orange bitters, smoked table-side with French oak wood.',
      isVegetarian: true,
      tags: ['Signature Cocktail'],
      allergens: ['Alcohol'],
      winePairing: 'Signature House Craft Cocktail',
      details: 'Arrives enclosed in a glass cloche filled with aromatic oak smoke that infuses the spirit before your eyes.'
    },
    {
      id: 'bv-2',
      name: 'Grand Cru Sommelier Wine Pairing',
      category: 'Beverages',
      price: 145,
      image: './assets/images/sommelier-wine.jpg',
      description: 'A bespoke five-course sequence of rare vintages curated by Head Sommelier to accompany your dining journey.',
      isVegetarian: true,
      tags: ['Wine Sequence'],
      allergens: ['Sulfites', 'Alcohol'],
      winePairing: 'Curated by Master Sommelier',
      details: 'Features rare temperature-controlled allocations from Burgundy, Bordeaux, Piedmont, and Napa Valley cellars.'
    }
  ];

  // DOM Elements
  const menuContainer = document.getElementById('menuItemsGrid');
  const searchInput = document.getElementById('menuSearchInput');
  const categoryButtons = document.querySelectorAll('.filter-tab-btn');
  const dietaryPills = document.querySelectorAll('.dietary-filter-pill');
  const dishModal = document.getElementById('dishModal');
  const dishModalClose = document.getElementById('dishModalClose');

  let activeCategory = 'all';
  let activeDietary = 'all';
  let searchQuery = '';

  // Render menu items
  function renderMenu() {
    if (!menuContainer) return;

    const filtered = MENU_DATABASE.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }

      // Dietary filter
      if (activeDietary === 'vegetarian' && !item.isVegetarian) {
        return false;
      }
      if (activeDietary === 'gluten-free' && !item.tags.includes('Gluten-Free')) {
        return false;
      }
      if (activeDietary === 'signature' && !item.tags.includes('Signature')) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
          <p style="font-size: 1.25rem; font-family: var(--font-serif); margin-bottom: 0.5rem; color: var(--text-primary);">
            No culinary creations found matching "${searchQuery}"
          </p>
          <p style="font-size: 0.88rem;">Try clearing your search or switching categories.</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = filtered
      .map(
        (item) => `
        <article class="menu-item-row" data-id="${item.id}">
          <div class="menu-item-thumbnail">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="menu-item-content">
            <div class="menu-item-header">
              <h3 class="menu-item-title">${item.name}</h3>
              <span class="menu-item-price">$${item.price}</span>
            </div>
            <p class="menu-item-desc">${item.description}</p>
            <div class="menu-item-footer">
              <div class="dish-meta-inline">
                ${item.tags.map((t) => `<span class="dietary-tag">${t}</span>`).join(' <span aria-hidden="true">&bull;</span> ')}
              </div>
              <button type="button" class="btn btn-outline btn-sm view-dish-btn" data-id="${item.id}">
                Details
              </button>
            </div>
          </div>
        </article>
      `
      )
      .join('');

    // Attach modal openers
    menuContainer.querySelectorAll('.view-dish-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const dish = MENU_DATABASE.find((d) => d.id === id);
        if (dish) openDishModal(dish);
      });
    });
  }

  // Open Dish Details Modal
  function openDishModal(dish) {
    if (!dishModal) return;

    const img = dishModal.querySelector('#modalDishImg');
    const title = dishModal.querySelector('#modalDishTitle');
    const price = dishModal.querySelector('#modalDishPrice');
    const cat = dishModal.querySelector('#modalDishCategory');
    const desc = dishModal.querySelector('#modalDishDesc');
    const pairing = dishModal.querySelector('#modalDishWine');
    const allergens = dishModal.querySelector('#modalDishAllergens');
    const notes = dishModal.querySelector('#modalDishNotes');
    const reserveBtn = dishModal.querySelector('#modalDishReserveBtn');

    if (img) img.src = dish.image;
    if (img) img.alt = dish.name;
    if (title) title.textContent = dish.name;
    if (price) price.textContent = `$${dish.price}`;
    if (cat) cat.textContent = dish.category.toUpperCase();
    if (desc) desc.textContent = dish.description;
    if (pairing) pairing.textContent = dish.winePairing || 'Sommelier bespoke pairing on request';
    if (allergens) allergens.textContent = dish.allergens.join(', ') || 'None reported';
    if (notes) notes.textContent = dish.details;

    if (reserveBtn) {
      reserveBtn.onclick = () => {
        dishModal.classList.remove('active');
        window.location.href = './reservations.html';
      };
    }

    dishModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDishModal() {
    if (!dishModal) return;
    dishModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (dishModalClose) {
    dishModalClose.addEventListener('click', closeDishModal);
  }
  if (dishModal) {
    dishModal.addEventListener('click', (e) => {
      if (e.target === dishModal) closeDishModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dishModal && dishModal.classList.contains('active')) {
      closeDishModal();
    }
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMenu();
    });
  }

  // Category buttons
  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category') || 'all';
      renderMenu();
    });
  });

  // Dietary pills
  dietaryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const selected = pill.getAttribute('data-dietary') || 'all';
      if (activeDietary === selected) {
        activeDietary = 'all';
        pill.classList.remove('active');
      } else {
        dietaryPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        activeDietary = selected;
      }
      renderMenu();
    });
  });

  // Initial render
  renderMenu();
})();
