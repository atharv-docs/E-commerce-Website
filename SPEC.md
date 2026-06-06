# E-Commerce Platform Specification

## Project Overview

- **Project Name**: ShopNest - E-Commerce Platform
- **Project Type**: Full-stack Web Application (Hackathon Project)
- **Core Functionality**: A modern e-commerce platform featuring product browsing, shopping cart, user authentication, search, and checkout functionality
- **Target Users**: General consumers looking to browse and purchase products online

---

## UI/UX Specification

### Layout Structure

#### Pages
1. **Home Page** - Hero section, featured products, categories, deals
2. **Product Listing Page** - Grid of products with filters
3. **Product Detail Page** - Full product info, reviews, add to cart
4. **Cart Page** - Cart items, quantity adjustment, checkout
5. **Checkout Page** - Shipping info, payment simulation, order summary
6. **Login/Register Page** - Authentication forms

#### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
```css
--primary: #FF6B35;        /* Vibrant Orange - CTAs, highlights */
--primary-dark: #E55A2B;   /* Darker orange for hover */
--secondary: #1A1A2E;      /* Deep Navy - Headers, nav */
--accent: #16C79A;        /* Teal Green - Success, badges */
--background: #F8F9FA;    /* Light Gray - Page bg */
--surface: #FFFFFF;       /* White - Cards, modals */
--text-primary: #1A1A2E;   /* Navy - Main text */
--text-secondary: #6B7280; /* Gray - Secondary text */
--danger: #EF4444;         /* Red - Errors, delete actions */
--border: #E5E7EB;        /* Light gray - Borders */
```

#### Typography
- **Headings**: "Poppins", sans-serif (weights: 600, 700)
- **Body**: "Inter", sans-serif (weights: 400, 500, 600)
- **Font Sizes**:
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

#### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px

#### Visual Effects
- Card shadows: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- Hover shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- Border radius: 8px (cards), 12px (buttons), 50% (avatars)
- Transitions: 200ms ease-in-out

### Components

#### Navigation Bar
- Logo (left)
- Search bar (center)
- Icons: User, Cart with badge (right)
- Sticky on scroll
- Mobile: Hamburger menu

#### Product Card
- Product image (aspect ratio 1:1)
- Product title (2 lines max, ellipsis)
- Rating (stars + count)
- Price (current + original if discounted)
- "Add to Cart" button
- Hover: Scale up slightly, show "Add to Cart"

#### Cart Item
- Product thumbnail
- Product name
- Quantity selector (+/-)
- Price
- Remove button

#### Buttons
- Primary: Orange background, white text
- Secondary: Outlined, navy border
- Ghost: Transparent, text only
- States: Hover (darken 10%), Active (scale 0.98), Disabled (opacity 0.5)

---

## Functionality Specification

### Core Features

#### 1. Product Catalog
- Display products in responsive grid (4 cols desktop, 2 cols mobile)
- Product categories: Electronics, Fashion, Home, Books, Sports
- Product data: name, description, price, originalPrice, images, rating, reviews count, category, inStock

#### 2. Product Search
- Real-time search with debounce (300ms)
- Search by product name, description, category
- Show search results in dropdown / dedicated page
- Highlight matching text

#### 3. Product Filtering & Sorting
- Filter by category
- Filter by price range
- Sort by: Price (Low-High, High-Low), Rating, Newest

#### 4. Shopping Cart
- Add products to cart
- Update quantity (1-10)
- Remove items
- Persistent cart (localStorage)
- Show cart count in header
- Calculate subtotal, taxes, total

#### 5. User Authentication
- Login form (email, password)
- Register form (name, email, password, confirm password)
- Form validation with error messages
- Demo mode: Accept any credentials for hackathon

#### 6. Checkout Flow
- Shipping information form
- Payment simulation (card input - demo only)
- Order confirmation page
- Generate order ID

#### 7. Product Details
- Image gallery (main + thumbnails)
- Full description
- Specifications table
- Customer reviews
- Related products section
- Add to cart with quantity selector

### User Interactions
- Smooth page transitions
- Loading states for async operations
- Toast notifications for actions (added to cart, logged in, etc.)
- Modal for quick view / login prompts
- Skeleton loaders while data loads

### Data Handling
- Mock product data (20+ products)
- LocalStorage for cart persistence
- Session storage for user login state
- No backend required (all client-side)

### Edge Cases
- Empty cart state
- No search results
- Product out of stock
- Invalid form inputs
- Network error states

---

## Technical Specification

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **No external UI libraries** - Custom components only

### Project Structure
```
/app
  /layout.tsx          # Root layout with providers
  /page.tsx            # Home page
  /products/page.tsx   # Product listing
  /products/[id]/page.tsx  # Product detail
  /cart/page.tsx       # Cart page
  /checkout/page.tsx   # Checkout page
  /login/page.tsx      # Login/Register
  /api/products/route.ts  # Products API
/components
  /Navbar.tsx
  /ProductCard.tsx
  /CartItem.tsx
  /Button.tsx
  /Input.tsx
  /Toast.tsx
  ...
/context
  /CartContext.tsx
  /AuthContext.tsx
/data
  /products.ts         # Mock product data
/styles
  /globals.css         # Global styles + CSS variables
```

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Home page loads with hero, featured products, categories
- [ ] Navigation is sticky with cart badge showing count
- [ ] Product cards display correctly in grid
- [ ] Hover effects work on interactive elements
- [ ] Mobile responsive layout works
- [ ] Toast notifications appear on actions

### Functional Checkpoints
- [ ] Products load and display correctly
- [ ] Search filters products in real-time
- [ ] Category filter works
- [ ] Add to cart updates cart count
- [ ] Cart persists on page reload
- [ ] Quantity can be updated in cart
- [ ] Items can be removed from cart
- [ ] Cart total calculates correctly
- [ ] Login/Register forms validate input
- [ ] Checkout flow completes with order ID

### Performance
- [ ] Initial page load < 3 seconds
- [ ] No console errors
- [ ] Smooth animations (60fps)

---

## Hackathon Tips

1. **Focus on Polish**: Good UI/UX beats complex features
2. **Demo Data**: Use realistic product images and data
3. **Error Handling**: Show meaningful error messages
4. **Accessibility**: Use semantic HTML, alt tags
5. **Mobile First**: Most users will view on mobile
6. **Loading States**: Show skeletons/spinners for async operations