# MovieHub — Next.js Movie Database App

A responsive movie discovery platform built with **Next.js 14 App Router**, the **TMDB REST API**, and **TailwindCSS**. Designed to demonstrate modern full-stack React development with a focus on performance, SEO, and cross-device compatibility.

---

## ✨ Feature Highlights

| Feature                                   | Details                                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Server-Side Rendering (SSR)**           | Movie detail pages are server-rendered with dynamic per-page SEO metadata (title, description, OpenGraph image, Twitter card, JSON-LD structured data) |
| **Incremental Static Regeneration (ISR)** | Home listing page is statically generated and revalidated every 5 minutes — fast loads with fresh data                                                 |
| **Static Generation (SSG)**               | Top 20 trending movie pages are pre-built at deploy time via `generateStaticParams`                                                                    |
| **TMDB REST API**                         | Real-time data for trending movies, top-rated lists, genre discovery, and full-text search                                                             |
| **Dynamic Routing**                       | `/movie/[id]` and `/search/[searchTerm]` via Next.js App Router file-based routing                                                                     |
| **Next.js Image component**               | All images use `<Image>` with `fill`, `priority`, `sizes`, and correct aspect ratios for optimal LCP/CLS                                               |
| **Responsive UI**                         | TailwindCSS grid (2 → 6 columns) with a mobile-first layout, sticky header, and smooth animations                                                      |
| **Dark Mode**                             | System-aware with manual toggle, using `next-themes` and Tailwind `dark:` utilities                                                                    |
| **Genre & Year Filters**                  | Client-side filter chips drive URL search params — bookmarkable, shareable, SEO-friendly URLs                                                          |
| **Pagination**                            | Compact page window with ellipsis — TMDB 500-page cap respected                                                                                        |
| **React Query**                           | TanStack Query powers search results with `initialData` from SSR for instant display                                                                   |

---

## 🛠 Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — JavaScript (ES2022+)
- **Styling** — TailwindCSS 3.4
- **State / Data** — TanStack React Query v5
- **Theme** — next-themes
- **Icons** — react-icons
- **API** — TMDB v3 REST API
- **Font** — Inter (Google Fonts via `next/font`)

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <repo-url>
cd imdb-next
npm install
```

### 2. Set up environment variables

Create `.env.local` in the project root:

```bash
API_KEY=your_tmdb_api_key_here
```

Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js                  # Root layout — metadata template, providers, shared UI
│   ├── page.js                    # Home page (ISR, revalidate=300) — trending & genre listings
│   ├── Providers.jsx              # ThemeProvider + React Query client
│   ├── about/page.jsx             # About page with static metadata
│   ├── movie/[id]/page.jsx        # SSR movie detail — generateMetadata, JSON-LD, back nav
│   ├── search/[searchTerm]/page.jsx  # SSR search page — initialData fed to React Query
│   └── api/search/route.js        # Internal API route — keeps TMDB key server-side
├── components/
│   ├── Card.jsx                   # Movie card with Next.js Image, hover overlay, rating badge
│   ├── CardSkeleton.jsx           # Loading skeleton (animate-pulse)
│   ├── GenreFilter.jsx            # Horizontally scrollable genre chip strip
│   ├── YearSort.jsx               # Decade filter buttons
│   ├── Pagination.jsx             # Page-window pagination with ellipsis
│   ├── SearchBox.jsx              # Controlled search form → /search/[term]
│   ├── SearchResultsClient.jsx    # React Query client component with SSR initialData
│   ├── Header.jsx                 # Sticky header with logo, nav links, dark mode toggle
│   ├── DarkMode.jsx               # Theme toggle button
│   ├── Navbar.jsx                 # Trending / Top Rated quick-nav pills
│   ├── NavbarItem.jsx             # Active-state nav pill
│   └── Menuitem.jsx               # Header nav link
└── lib/
    └── tmdb.js                    # Reusable TMDB fetch client — getTrendingMovies,
                                   # getTopRatedMovies, getMoviesByGenre, getMovieById,
                                   # getTrendingMovieIds, searchMovies
```

---

## 🔍 SEO Implementation

- **`generateMetadata`** per route — title, description, `openGraph`, `twitter` card
- **JSON-LD structured data** (`Movie` schema) injected on every movie detail page — enables Google Rich Results
- **Metadata template** in root layout (`%s | IMDB Movie Hub`) for consistent page titles
- **`metadataBase`** set for absolute Open Graph image URLs
- **Dynamic `sizes`** prop on all images prevents layout shift (CLS) and unnecessary bandwidth

---

## 📸 Screenshots

> _Run `npm run dev`, browse to localhost:3000, and take screenshots to add here._

---

## 📝 Notes

- API keys never leave the server — the `/api/search` route proxies TMDB requests from the browser.
- For a Lighthouse audit, run `npm run build && npm start` then inspect the production build.
- ISR means stale-while-revalidate — changing a popular movie's data on TMDB will appear within 5 minutes.
