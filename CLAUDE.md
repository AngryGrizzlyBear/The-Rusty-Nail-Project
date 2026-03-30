# The Rusty Nail — Music Venue Website Project

## About This Project
I am practicing HTML, CSS, and JavaScript by building a multi-page website for a fictional underground music venue called The Rusty Nail. This is my second practice project. I completed a one-page nursery website before this and am now leveling up to multiple pages, DOM manipulation, and async/await data fetching.

**When I ask for feedback, explain what is wrong and why — do not just fix it for me. I want to understand the problem so I can fix it myself.**

---

## Project File Structure
Four HTML pages sharing one CSS file and one JS file:

```
rustynail/
├── index.html       ← Home page
├── events.html      ← Events / shows page (main interactive page)
├── about.html       ← About the venue and staff
├── contact.html     ← Contact info and booking form
├── style.css        ← All CSS — linked in <head> of every HTML file
├── script.js        ← All JS — linked before </body> of every HTML file
├── data/
│   └── events.json  ← Show data fetched by script.js on events.html
└── CLAUDE.md
```

No frameworks, no build tools, no external JS libraries. Plain HTML, CSS, and JavaScript only.

---

## Design Reference
**Vibe:** Grungy & underground — dark, raw, textured. Think a real dive bar that's been open 30 years.

**Colour palette:**
```css
--black:       #0a0a0a;
--charcoal:    #141414;
--iron:        #1e1e1e;
--rust:        #b94a1a;
--rust-light:  #e05c22;
--yellow:      #d4a017;
--cream:       #e8e0d0;
--grey-mid:    #888880;
--grey-light:  #c8c0b0;
```

**Fonts (Google Fonts, loaded in each HTML file's `<head>`):**
- Display: `'Bebas Neue'` — all-caps, industrial, used for headings, nav, labels
- Body: `'Barlow Condensed'` — tight, utilitarian, used for body text

---

## Pages & What Each Contains

### index.html — Home
- Full-height hero with venue name, tagline, two CTA buttons
- Featured shows strip (3 hardcoded cards — NOT fetched from JSON)
- About strip with photo placeholder and short copy
- Shared nav and footer

### events.html — Events (the most complex page)
- Page header
- Filter buttons: All Shows / Punk / Metal / Indie
- Event list injected dynamically from `data/events.json` via `fetch()`
- Each event row shows: date, artist, support act, genre tag, price or SOLD OUT
- Filtering works by updating the rendered list without reloading the page
- "No results" message appears when a filter returns nothing

### about.html — About
- Page header
- History copy paragraphs
- Stats row (years open, capacity, shows hosted, bars)
- Staff grid (3 cards with placeholder images, name, role, bio)

### contact.html — Contact
- Page header
- Two-column layout on desktop: info left, form right
- Info: address, phone, email, hours table
- Form: name, email, reason dropdown, message, submit button

---

## CSS Approach: Mobile-First
All base styles target small screens. `min-width` media queries layer in larger layouts. Never use `max-width` queries.

**Breakpoints:**
| min-width | What changes |
|---|---|
| `480px` | Submit button: `width: 100%` → `width: auto` |
| `560px` | Staff grid: 1 col → 2 col; featured grid: 1 col → 2 col |
| `600px` | Event rows: stacked → 3-column grid |
| `768px` | Nav horizontal, contact section 2-col grid, footer flex-row |
| `900px` | About strip and staff grid: desktop layouts; featured grid: 3 col |
| `1024px` | Section padding increases |

---

## JavaScript — Four Responsibilities

### 1. Hamburger Nav Toggle
- Toggles `.open` class on `<ul>` and `<button>` on click
- Closes menu when any nav link is tapped
- Updates `aria-expanded` attribute (string `"true"` / `"false"`)

### 2. Active Nav Link (current page highlight)
- Compares each link's `href` filename to `window.location.pathname`
- Adds `.active` class to the matching link
- This runs on every page so the correct nav item is always highlighted

### 3. Scroll Fade-In
- `IntersectionObserver` watches all `.fade-up` elements
- Adds `.visible` class when element enters viewport
- CSS handles the opacity/transform transition

### 4. Events Fetch, Render & Filter (events.html only)
- Checks for `#events-list` element before running — so it only fires on events.html
- `async function loadEvents()` fetches `data/events.json`
- `renderEvents(array)` builds HTML strings with `.map()` and injects with `innerHTML`
- Filter buttons call `renderEvents()` with a filtered subset of the array
- `try/catch` handles fetch errors gracefully

---

## The events.json Structure
Each event object has these fields:
```json
{
  "day": "04",
  "month": "APR",
  "artist": "Plague Dogs",
  "support": "Concrete Eden",
  "genre": "Punk",
  "time": "9:00 PM",
  "doors": "8:00 PM",
  "price": "12",
  "soldOut": false
}
```
`support` can be `null` — the render function handles this with a ternary.
`soldOut` is boolean — controls whether ticket button or SOLD OUT label shows.

---

## Key Concepts I Am Practicing in This Project
- Multi-page structure with shared CSS and JS files
- Active nav state based on current page (no single-page scroll highlighting this time)
- `async/await` with `fetch()` to load local JSON data
- DOM manipulation: building HTML from data using `.map()` and `innerHTML`
- Array filtering: `.filter()` to show a subset based on genre
- `try/catch` for error handling in async functions
- CSS Grid at multiple breakpoints (1 → 2 → 3 columns)
- Flexbox vs Grid: knowing which to use for which layout
- Consistent design across multiple pages using shared files

---

## Lesson Plan Schedule
Monday–Friday only. Starting March 30, 2026.

---

### Week 1 — File Structure, Shared CSS & Nav, Home Page

| Day | Focus | What I Am Learning |
|---|---|---|
| Mon | Project setup & file structure | Creating a multi-file project; linking CSS and JS across pages; using Live Server |
| Tue | CSS variables, reset & shared styles | `:root` variables; CSS reset; shared section styles; the grain texture with `body::before` |
| Wed | Navigation — mobile + desktop + active state JS | Hamburger toggle; `max-height` slide trick; `window.location.pathname` for active page detection |
| Thu | Home page — hero & featured shows grid | CSS gradient backgrounds for texture; `min-height: 100vh`; hardcoded 3-column Grid |
| Fri | Home page — about strip & review | Two-column Grid at `900px`; `IntersectionObserver` scroll animations; full cross-width review |

**Week 1 concepts:** CSS custom properties, multi-file project structure, hamburger nav, active nav state, CSS Grid basics, scroll fade-in

---

### Week 2 — Events Page (The Hard Week)

| Day | Focus | What I Am Learning |
|---|---|---|
| Mon | `events.json` & page header | Writing JSON by hand; filter button HTML with `data-genre` attributes; `.active` button styling |
| Tue | `fetch()` & `renderEvents()` | `async/await`; `fetch()` with two `await` calls; `.map()` + template literals to build HTML; `innerHTML` injection |
| Wed | Filter functionality | `.filter()` on arrays; updating rendered list without page reload; showing/hiding no-results message |
| Thu | Event row styling | CSS Grid for data rows (`110px 1fr auto`); `soldOut` conditional rendering; mobile stacked vs desktop 3-col |
| Fri | Events page review & bug fixes | End-to-end testing of fetch, render, and all filters at every screen size |

**Week 2 concepts:** `async/await`, `fetch()`, `try/catch`, `Promise`, `.map()`, `.filter()`, `innerHTML`, template literals, `data-*` attributes

---

### Week 3 — About & Contact Pages

| Day | Focus | What I Am Learning |
|---|---|---|
| Mon | About page — history & stats row | `max-width` on prose for readability; `flex-wrap: wrap` on stats row for graceful collapse |
| Tue | About page — staff grid | 1→2→3 col Grid with three breakpoints; CSS hatched gradient placeholder images; `aspect-ratio: 1` |
| Wed | Contact page | Styling `<select>` with `-webkit-appearance: none`; two-column Grid at `768px`; `width: 100%` → `auto` button |
| Thu | Footer & cross-page consistency | Footer flex layout mobile→desktop; systematic consistency check across all four pages |
| Fri | Week 3 review & catch-up | Full resize test 320px→1440px on every page; fix any cross-page inconsistencies |

**Week 3 concepts:** `flex-wrap`, `aspect-ratio`, styling `<select>`, cross-page consistency, systematic review process

---

### Week 4 — Polish, Accessibility & DOM Refinements

| Day | Focus | What I Am Learning |
|---|---|---|
| Mon | Scroll animations full pass | Adding `.fade-up` strategically (not to everything); tuning `threshold` and `rootMargin` |
| Tue | Accessibility pass | `aria-label`, `aria-expanded`, `<label for="">`, colour contrast, keyboard navigation with Tab key |
| Wed | Events page DOM refinements | Loading state before fetch resolves; testing the `catch` block by breaking the JSON path |
| Thu | Cross-browser & real device testing | Chrome vs Firefox vs Safari differences; testing on a real phone via Live Server local network URL |
| Fri | Final review & Netlify deployment | Git commit, push to GitHub, connect to Netlify, verify live site on mobile |

**Week 4 concepts:** ARIA attributes, accessibility testing, loading/error states, cross-browser testing, Netlify deployment

---

### Week 5 (Buffer) — Catch-Up or Stretch Goals

Use this week to finish anything unresolved from Weeks 1–4. If you are fully done, optional stretch goals:

| Stretch Goal | Concept Practiced |
|---|---|
| "Back to top" button that appears after scrolling 400px | `scroll` event listener, `classList`, CSS transition |
| Show count: "Showing 4 of 10 shows" updates on filter | DOM text update, counting filtered array length |
| Form validation before submit (empty fields, valid email) | `RegExp`, conditional logic, DOM error messages |
| Dark/light mode toggle | CSS class on `<body>`, `localStorage` to persist preference |
| Keyboard navigation on filter buttons (arrow keys) | `keydown` event listener, `focus()` management |

---

## How to Ask Me for Feedback
When I share code and ask for a review, please:
1. Tell me **what is wrong** and **why** it is a problem
2. Point me to the **specific line, property, or concept** to look at
3. **Do not rewrite my code** — give me enough to fix it myself
4. Call out mobile-first violations first — that is still my most important habit to protect
5. If my async/await or DOM manipulation logic is broken, walk me through the concept before pointing at the line
