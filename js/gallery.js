/**
 * CELESTIAL CUISINE - Interactive Luxury Gallery & Lightbox
 * Category filtering, responsive grid, fullscreen modal, keyboard navigation
 */

(function () {
  'use strict';

  const GALLERY_ITEMS = [
    {
      id: 'g-1',
      title: 'Miyazaki A5 Wagyu Ribeye',
      category: 'signature-dishes',
      categoryName: 'Signature Dishes',
      image: './assets/images/hero-wagyu-steak.jpg',
      caption: 'Charred over Japanese binchotan charcoal with edible micro herbs and smoked sea salt.'
    },
    {
      id: 'g-2',
      title: 'Hokkaido Diver Scallops',
      category: 'signature-dishes',
      categoryName: 'Signature Dishes',
      image: './assets/images/dish-scallops.jpg',
      caption: 'Pan-seared scallops over cauliflower silk with golden ossetra caviar pearls.'
    },
    {
      id: 'g-3',
      title: 'Grand Main Dining Salon',
      category: 'restaurant-interior',
      categoryName: 'Restaurant Interior',
      image: './assets/images/interior-ambience.jpg',
      caption: 'Warm bronze accents, hand-blown amber crystal, and dark oak architectural finishes.'
    },
    {
      id: 'g-4',
      title: 'Executive Chef Plating Sequence',
      category: 'chefs-creations',
      categoryName: 'Chef’s Creations',
      image: './assets/images/chef-plating.jpg',
      caption: 'Precision garnishing of our autumn tasting course at the open kitchen counter.'
    },
    {
      id: 'g-5',
      title: 'Valrhona Chocolate Fondant',
      category: 'signature-dishes',
      categoryName: 'Signature Dishes',
      image: './assets/images/dish-chocolate-fondant.jpg',
      caption: 'Warm molten 70% dark chocolate center crowned with spun gold sugar nest and 24k gold leaf.'
    },
    {
      id: 'g-6',
      title: 'Private Wine Cellar Salon',
      category: 'private-events',
      categoryName: 'Private Events',
      image: './assets/images/private-dining-salon.jpg',
      caption: 'Bespoke twelve-guest private celebration table flanked by floor-to-ceiling vintage grand crus.'
    },
    {
      id: 'g-7',
      title: 'Black Perigord Truffle Tagliolini',
      category: 'chefs-creations',
      categoryName: 'Chef’s Creations',
      image: './assets/images/dish-truffle-pasta.jpg',
      caption: 'Handmade 40-yolk pasta tossed in mountain butter and freshly shaved black winter truffles.'
    },
    {
      id: 'g-8',
      title: 'Poached Maine Lobster Tail',
      category: 'signature-dishes',
      categoryName: 'Signature Dishes',
      image: './assets/images/dish-lobster-tail.jpg',
      caption: 'Slow-poached in seaweed cultured butter with saffron beurre blanc and sea beans.'
    },
    {
      id: 'g-9',
      title: 'Grand Cru Sommelier Allocation',
      category: 'dining-atmosphere',
      categoryName: 'Dining Atmosphere',
      image: './assets/images/sommelier-wine.jpg',
      caption: 'Master Sommelier decanting rare aged vintage wines for dinner service.'
    }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentCategory = 'all';
  let currentIndex = 0;
  let activeList = [...GALLERY_ITEMS];

  function renderGallery() {
    if (!galleryGrid) return;

    activeList = GALLERY_ITEMS.filter((item) => {
      if (currentCategory === 'all') return true;
      return item.category === currentCategory;
    });

    galleryGrid.innerHTML = activeList
      .map(
        (item, index) => `
        <figure class="gallery-item" data-index="${index}" tabindex="0" role="button" aria-label="View ${item.title}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <figcaption class="gallery-overlay">
            <span class="gallery-caption-cat">${item.categoryName}</span>
            <h4 class="gallery-caption-title">${item.title}</h4>
          </figcaption>
        </figure>
      `
      )
      .join('');

    // Attach click events
    galleryGrid.querySelectorAll('.gallery-item').forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index') || '0', 10);
        openLightbox(idx);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(el.getAttribute('data-index') || '0', 10);
          openLightbox(idx);
        }
      });
    });
  }

  function openLightbox(index) {
    if (!lightboxModal || !activeList[index]) return;
    currentIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const item = activeList[currentIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.src = item.image;
      lightboxImg.alt = item.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCategory) lightboxCategory.textContent = item.categoryName;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % activeList.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + activeList.length) % activeList.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Filter tabs
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'all';
      renderGallery();
    });
  });

  renderGallery();
})();
