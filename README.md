# CELESTIAL CUISINE &mdash; Luxury Fine Dining

An elevated, modern-classic culinary showcase for **Celestial Cuisine**, an ultra-luxury fine dining restaurant operating in the United States (Midtown Manhattan, New York).

Built strictly with semantic **HTML5, modern CSS3, and Vanilla JavaScript**, this multi-page website is 100% portable, requires zero build tools or server dependencies, and is ready for immediate deployment to **GitHub Pages**, Cloudflare Pages, Netlify, or static hosting.

---

## 🌟 Brand & Design Identity

- **Brand Name**: Celestial Cuisine
- **Design Philosophy**: Modern classic haute gastronomy, editorial typography, candlelit warmth, and quiet luxury.
- **Color Palette**:
  - `Background`: `#171A19` (Deep Charcoal Black)
  - `Secondary Background`: `#222624` (Dark Slate Patina)
  - `Card / Surface`: `#1D2120` / `#262B28`
  - `Primary Text`: `#F5F0E5` (Warm Cream White)
  - `Gold Accent`: `#C5A15A` (Rich Burnished Gold)
  - `Muted Gold`: `#927747` (Vintage Amber Bronze)
  - `Secondary Text`: `#B8B5AC` (Soft Platinum Gray)
  - `Hairline Borders`: `#383A35`
- **Typography**:
  - Headings: *Playfair Display* & *Cormorant Garamond*
  - Body Copy: *Inter*
  - Navigation & Eyebrows: *Montserrat*

---

## 📂 Project Architecture

```
celestial-cuisine/
├── index.html              # Home: Wagyu hero, welcome, featured dishes, testimonials
├── menu.html               # The Menu: Category filter, live search, dietary tags, modal
├── experience.html         # Dining Experience: 7 editorial storytelling sections
├── private-dining.html     # Private Dining: Salons, events, interactive inquiry form
├── gallery.html            # Visual Gallery: 5 categories, responsive grid, fullscreen lightbox
├── reservations.html       # Book a Table: Slot picker, date guard, booking voucher generator
├── story.html              # Our Story: Heritage, philosophy, executive chef, commitments
├── contact.html            # Contact Us: Concierge, service hours, cartographic map frame
│
├── css/
│   └── style.css           # Master stylesheet with luxury design tokens & mobile layout
│
├── js/
│   ├── main.js             # Sticky header, mobile drawer, toast notices, newsletter
│   ├── menu.js             # Menu database, live text search, category tabs, details modal
│   ├── gallery.js          # Gallery categories, interactive lightbox, keyboard navigation
│   └── reservations.js     # Form validation, lunch/dinner slot picker, booking receipt
│
├── assets/
│   ├── images/             # Ultra-high-resolution culinary and interior photography
│   │   ├── hero-wagyu-steak.jpg
│   │   ├── dish-scallops.jpg
│   │   ├── dish-chocolate-fondant.jpg
│   │   ├── dish-truffle-pasta.jpg
│   │   ├── dish-lobster-tail.jpg
│   │   ├── interior-ambience.jpg
│   │   ├── chef-plating.jpg
│   │   ├── private-dining-salon.jpg
│   │   └── sommelier-wine.jpg
│   ├── logo/
│   │   ├── logo.svg        # Scalable vector brand wordmark with celestial crescent crest
│   │   └── logo-mark.svg   # Favicon and circular emblem
│   └── icons/
│
└── README.md               # Complete documentation & GitHub Pages deployment guide
```

---

## 🚀 GitHub Upload & Deployment Instructions

### Method 1: Deploying via GitHub Web Interface (Fastest)

1. **Create a New Repository**:
   - Log into [GitHub](https://github.com) and click **New Repository**.
   - Name it `celestial-cuisine` (or your preferred repository name).
   - Choose **Public** and do not add a default README.

2. **Upload Files**:
   - Click **Uploading an existing file** on the quick setup page.
   - Drag and drop all files from this project (`index.html`, `menu.html`, `css/`, `js/`, `assets/`, etc.).
   - Commit changes to the `main` branch.

3. **Activate GitHub Pages**:
   - In your repository, go to **Settings** &rarr; **Pages** (left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`.
     - **Branch**: Select `main`, folder `/ (root)`.
     - Click **Save**.
   - Within 60 seconds, your site will be live at:  
     `https://<your-username>.github.io/celestial-cuisine/`

> **Note**: Because all file links use strict relative paths (`./css/style.css`, `./assets/...`, `./menu.html`), the website runs seamlessly within any subfolder or custom domain without breaking links or styles.

---

### Method 2: Deploying via Git CLI

```bash
# 1. Initialize local Git repository
git init

# 2. Add and commit all files
git add .
git commit -m "Initial commit: Celestial Cuisine luxury restaurant website"

# 3. Rename branch to main
git branch -M main

# 4. Connect to your GitHub repository
git remote add origin https://github.com/<your-username>/celestial-cuisine.git

# 5. Push code
git push -u origin main
```

After pushing, enable **GitHub Pages** from your repository settings under the `main` branch root folder.

---

## 🍽️ Key Pages & Features

### 1. `index.html` (Home)
- **Cinematic Wagyu Hero**: Dramatic 16:9 photography of Miyazaki A5 Wagyu with gold ambient lighting and Michelin guide credentials.
- **Accolade Strip**: Tabular metrics covering cellar allocations, private seating, and terroir sourcing.
- **Featured Dishes**: Signature items ($55 Wagyu, $42 Hokkaido Scallops, $28 Valrhona Fondant) with direct detail openers.
- **Wine Salon Preview**: Glimpse into private dining and cellar experiences.
- **Guest Testimonials**: Identified demo reviews from culinary connoisseurs.

### 2. `menu.html` (Interactive Menu)
- **7 Core Categories**: Starters, Soups & Salads, Main Courses, Seafood, Steaks & Grills, Desserts, Beverages.
- **Live Search**: Instant client-side search across dish titles, ingredients, and preparations.
- **Dietary Toggles**: Filter instantly by *Chef's Signatures*, *Vegetarian Only*, and *Gluten-Free Only*.
- **Dish Details Modal**: Shows wine pairings, culinary techniques, and allergen declarations.

### 3. `experience.html` (Dining Experience)
- Seven editorial chapters: The Art of Fine Dining, Culinary Excellence, Executive Chef Antoine Laurent, Terroir Sourcing, Wine & Mixology, Interior Ambience, and Guest Hospitality.

### 4. `private-dining.html` (Private Dining)
- Showcases the Celestial Wine Salon (up to 16 guests) and the Chef's Tasting Library (up to 8 guests).
- Corporate summits, wedding anniversaries, and bespoke celebrations.
- Interactive reservation inquiry form with instant confirmation reference generation.

### 5. `gallery.html` (Visual Gallery)
- Filterable gallery across 5 categories with high-contrast hover effects.
- Full-screen lightbox modal with next/previous controls and keyboard support (`ArrowLeft`, `ArrowRight`, `Escape`).

### 6. `reservations.html` (Table Booking)
- Interactive reservation engine with lunch (11 AM – 3 PM) and dinner (5 PM – 10 PM) time slot pickers.
- Calendar guard preventing past-date selection.
- Validates guest counts (1–12), party preferences, and special dietary requests.
- Generates a verified booking request voucher with custom reference code and printable receipt.

### 7. `story.html` (Brand Heritage)
- Deep editorial storytelling detailing the culinary philosophy, zero-waste kitchen ethics, and Chef Antoine Laurent's journey.

### 8. `contact.html` (Contact & Concierge)
- Demo Manhattan address (680 Fifth Avenue, Floor 14), valet parking notes, phone, email, and service hours.
- Stylized dark cartographic location map and interactive contact inquiry form.

---

## 🔒 Technical Standards

- Zero frameworks, zero external NPM runtime dependencies, zero build-step lock-in.
- Uses WCAG AA compliant text contrast and semantic HTML elements (`<nav>`, `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<dialog>`).
- Completely responsive: tested across desktop (1440px), tablet (768px), and mobile (390px).

&copy; 2026 Celestial Cuisine Restaurant Group LLC. All Rights Reserved.
