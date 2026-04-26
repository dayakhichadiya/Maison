# Maison — Premium E-Commerce UI

A modern, production-grade e-commerce frontend built with **Next.js 14** and **Tailwind CSS**. Inspired by premium fashion brands — clean, editorial, and fully responsive.

---

## 🗂️ Folder Structure

```
ecommerce-ui/
│
├── components/
│   ├── layout/
│   │   ├── Layout.js          # Main wrapper (Navbar + children + Footer)
│   │   ├── Navbar.js          # Sticky navbar: logo, nav links, search, cart icon
│   │   └── Footer.js          # Newsletter, links, social, copyright
│   │
│   ├── product/
│   │   ├── ProductCard.js     # Individual product card with hover, wishlist, badge
│   │   ├── ProductGrid.js     # Responsive grid of ProductCards
│   │   └── FilterBar.js       # Category pills + sort dropdown
│   │
│   ├── cart/
│   │   ├── CartItem.js        # Single cart row with qty controls & remove
│   │   └── CartSummary.js     # Order total, shipping calc, checkout button
│   │
│   └── ui/
│       ├── Badge.js           # Reusable tag badge (New / Sale / Bestseller)
│       ├── Breadcrumb.js      # Breadcrumb navigation
│       └── Toast.js           # Add-to-cart confirmation notification
│
├── context/
│   └── CartContext.js         # Global cart state via React Context + useReducer
│
├── data/
│   └── products.js            # 8 static dummy products + categories + helpers
│
├── pages/
│   ├── _app.js                # App wrapper: CartProvider + Layout
│   ├── _document.js           # Custom HTML document
│   ├── index.js               # Home page (Hero, Categories, Products, Banner)
│   ├── cart.js                # Cart page
│   ├── 404.js                 # Custom 404 page
│   └── products/
│       ├── index.js           # Product listing with filters + sort
│       └── [id].js            # Product detail: images, size/color, add to cart
│
├── styles/
│   └── globals.css            # Tailwind imports + custom utilities + animations
│
├── public/                    # Static assets (favicon, images)
│
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Navigate into the project
cd ecommerce-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit **http://localhost:3000**

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, category tiles, best sellers, editorial banner, new arrivals |
| `/products` | Product listing — filter by category, sort, search |
| `/products?category=Knitwear` | Pre-filtered product listing |
| `/products?tag=Sale` | Sale / New Arrivals filter |
| `/products?search=blazer` | Search results |
| `/products/[id]` | Product detail — gallery, size picker, add to cart, related |
| `/cart` | Cart — items, qty controls, promo code, order summary, checkout |

---

## 🧩 Key Components

### `CartContext.js`
Global cart state managed with `useReducer`. Supports:
- Add item (merges duplicates by id + size)
- Remove item
- Update quantity
- Clear cart
- Computed `totalItems` and `totalPrice`

### `ProductCard.js`
- Aspect-ratio image with hover zoom
- Wishlist heart toggle
- "Quick View" overlay on hover
- Tag badges (New / Sale / Bestseller)
- Star ratings
- Staggered fade-up animation

### `Navbar.js`
- Sticky with scroll-aware background
- Mobile hamburger drawer
- Expandable search bar
- Live cart badge count

### `FilterBar.js`
- Category filter pills (synced to URL query params)
- Sort dropdown (price, rating, newest)

---

## 🎨 Design System

| Token | Value |
|---|---|
| Font (Display) | Cormorant Garamond |
| Font (Body) | DM Sans |
| Brand accent | `#C8A96A` (warm gold) |
| Background | `#FAF7F2` (soft cream) |
| Dark | `#0c0a09` (stone-950) |

### Utility Classes (globals.css)
- `.btn-primary` — filled dark button
- `.btn-outline` — bordered button
- `.section-title` — serif display heading
- `.section-subtitle` — small caps label
- `.card-hover` — lift + shadow on hover
- `.stagger-1` through `.stagger-8` — animation delays

---

## ⚙️ Tech Stack

- **Next.js 14** (Pages Router)
- **React 18** with Hooks
- **Tailwind CSS 3**
- **Lucide React** (icons)
- **next/image** (optimised images)
- **Google Fonts** (Cormorant Garamond + DM Sans)

---

## 🛒 Adding Real Data

Replace `data/products.js` with an API call:

```js
// pages/products/index.js
export async function getServerSideProps() {
  const res = await fetch("https://your-api.com/products");
  const products = await res.json();
  return { props: { products } };
}
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```
