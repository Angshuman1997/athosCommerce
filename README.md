# Athos Commerce - Product Listing Page (PLP)

A modern, production-ready Product Listing Page (PLP) built using **React**, **TypeScript**, **Redux Toolkit**, **Material UI**, and the **Searchspring Search API**.

The application provides a fast, responsive, and accessible shopping experience with dynamic search, filtering, sorting, pagination, URL synchronization, and performance optimizations.

---

## 🌐 Live Demo

**Netlify:**
https://athos-commerce-assignment.netlify.app

---

## 📂 GitHub Repository

https://github.com/Angshuman1997/athosCommerce

---

# 📸 Screenshots

## Desktop View

> Add desktop screenshot here

```md
<img width="1366" height="683" alt="image" src="https://github.com/user-attachments/assets/75e36208-5dc5-4c41-a609-b95a4a6757f1" />
```

---

## Mobile View

> Add mobile screenshot here

```md
<img width="320" height="503" alt="image" src="https://github.com/user-attachments/assets/06b5671c-a72d-422c-a9c7-5d1aa342916a" />
```

---

## Filter Drawer

> Add filter drawer screenshot here

```md
<img width="1344" height="610" alt="image" src="https://github.com/user-attachments/assets/a37d65c9-d9d1-4814-9d0a-a2d580aecf55" />
```

---

## Search Results

> Add search results screenshot here

```md
<img width="1352" height="680" alt="image" src="https://github.com/user-attachments/assets/847a8e49-9f97-4c41-bd99-968d4589fb3c" />
```

---

# ✨ Features

### Search Experience

* Search products
* Debounced search (500ms)
* URL synchronized search query
* Search persistence on page refresh

### Product Listing

* Responsive product grid
* Product image
* Product name
* Sale price
* MSRP display with strike-through when applicable

### Pagination

* Previous / Next navigation
* Direct page navigation
* URL synchronized pagination
* Maintains filters while navigating

### Sorting

* Relevance
* Price: Low to High
* Price: High to Low
* Newest

### Dynamic Filters

* Brand
* Color
* Selected filter chips
* Clear individual filter
* Clear all filters
* Mobile responsive filter drawer

### URL Synchronization

Supports shareable URLs.

Example:

```text
?q=jeans&page=2&sort=price-desc&brand=Nike
```

Refreshing the page preserves:

* Search
* Page
* Sorting
* Filters

### Loading States

* Linear loading indicator
* Abort previous API requests during rapid searches
* Prevents race conditions

### Error Handling

* Graceful API error handling
* AbortError handling
* Empty state handling

### Accessibility

* Semantic HTML
* ARIA labels
* Keyboard accessible controls
* Responsive layouts
* Accessible pagination

---

# 🛠 Tech Stack

| Technology              | Usage               |
| ----------------------- | ------------------- |
| React 19                | UI                  |
| TypeScript              | Type Safety         |
| Redux Toolkit           | State Management    |
| Material UI             | Component Library   |
| React Router            | URL Synchronization |
| Vite                    | Build Tool          |
| Fetch API               | API Calls           |
| Searchspring Search API | Product Search      |

---

# 📁 Project Structure

```
src
│
├── api
│   └── searchspring.ts
│
├── components
│   ├── FilterChips
│   ├── FilterDrawer
│   ├── FilterDropdown
│   ├── Logo
│   ├── PaginationControls
│   ├── ProductCard
│   ├── ProductGrid
│   ├── SearchBar
│   └── SortDropdown
│
├── hooks
│   ├── redux.ts
│   ├── useDebounce.ts
│   └── useUrlState.ts
│
├── pages
│   └── ProductListingPage.tsx
│
├── redux
│   ├── productSlice.ts
│   └── store.ts
│
├── types
│
└── App.tsx
```

---

# 🚀 Performance Optimizations

* Debounced search input
* Lazy loaded Filter Drawer using React.lazy()
* Memoized derived state using useMemo()
* Stable callbacks using useCallback()
* URL state synchronization
* Previous API request cancellation
* Optimized Redux state updates
* Efficient component rendering

---

# 📱 Responsive Design

Supports:

* Desktop
* Tablet
* Mobile

Responsive features include:

* Mobile filter drawer
* Adaptive spacing
* Flexible product grid
* Sticky header
* Responsive pagination

---

# 🧩 State Management

Redux Toolkit manages:

* Products
* Loading state
* Error state
* Pagination
* Facets
* Sorting
* Filters

URL query parameters remain the single source of truth for:

* Search query
* Page
* Sort
* Filters

---

# 🧪 Lighthouse Scores

| Metric         | Score |
| -------------- | ----: |
| Performance    |    96 |
| Accessibility  |    94 |
| Best Practices |   100 |
| SEO            |    91 |

> Add Lighthouse screenshot here

```md
<img width="436" height="481" alt="image" src="https://github.com/user-attachments/assets/ce3b4842-9d0b-48b2-b35b-cd9d8e98f01e" />
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Angshuman1997/athosCommerce.git
```

Navigate to the project

```bash
cd YOUR_REPOSITORY
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🔮 Future Improvements

* Skeleton loaders
* Infinite scrolling
* Search suggestions
* Wishlist functionality
* Product Quick View
* Grid/List toggle
* Unit testing using Vitest
* Integration testing
* End-to-end testing with Cypress
* Storybook documentation
* Product image lazy loading with blur placeholders

---

# 📝 Assumptions

* Searchspring API is publicly accessible.
* Filters are dynamically generated from the API response.
* URL query parameters are the source of truth for application state.
* Network failures are gracefully handled.

---

# 👨‍💻 Author

**Angshuman Bardhan**

Senior Software Engineer

React • TypeScript • Next.js • Redux Toolkit • Performance Optimization

---

## Thank You

Thank you for reviewing this assignment. Feedback is always appreciated.
