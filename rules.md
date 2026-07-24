# clients.cloudcrafts.net — Workspace Rules & Guidelines

Client Portal & Infrastructure Management Platform for **CloudCrafts**.

---

## 1. Project Overview & Scope

`clients.cloudcrafts.net` is the central client dashboard and management portal for CloudCrafts client projects, managed servers, billing, API credentials, and support tickets.

* **Domain:** `clients.cloudcrafts.net`
* **Purpose:** Provide clients with real-time insight into hosted infrastructure, active deployments, service status, invoices, and direct support.
* **Target Audience:** CloudCrafts enterprise clients, developers, and project stakeholders.

---

## 2. Technology Stack & Design Tokens

### Core Technologies
* **Structure:** Semantic HTML5 (`index.html`, modular layouts)
* **Styling:** Custom Vanilla CSS design system (`css/styles.css`) with CSS custom properties (variables) for dark glassmorphism styling
* **Logic:** Modern Vanilla JavaScript (ES6+ modules, `js/app.js`)
* **Typography:** `Inter` & `Outfit` Google Fonts

### UI Design System Tokens
```css
:root {
  --bg-dark: #090d16;
  --bg-card: rgba(18, 26, 43, 0.7);
  --border-glass: rgba(255, 255, 255, 0.08);
  --accent-primary: #6366f1; /* Indigo */
  --accent-cyan: #06b6d4;
  --accent-emerald: #10b981;
  --accent-purple: #8b5cf6;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
}
```

---

## 3. Project Directory Layout

```
clients.cloudcrafts.net/
├── index.html            # Main Portal Dashboard HTML
├── css/
│   └── styles.css        # Core Design System & Glassmorphism Utilities
├── js/
│   └── app.js            # Interactive Dashboard Logic & State Management
├── .gitignore            # Git exclusion rules
├── .env.example          # Environment variable template
├── package.json          # Project metadata & npm scripts
├── README.md             # Project documentation
└── rules.md              # Architectural & development rules
```

---

## 4. Development & Coding Conventions

1. **Clean Modular Components:**
   - Keep navigation, metrics, server lists, and support tickets clean and modular.
   - Use dynamic event delegation for interactive elements (tabs, modals, filter chips).

2. **Aesthetic Standards:**
   - Dark glassmorphism theme by default.
   - Vibrant indicators for server status (`running`, `warning`, `stopped`).
   - Smooth micro-animations (`cubic-bezier(0.4, 0, 0.2, 1)` transitions).
   - High accessibility contrast standards for readable text against dark backgrounds.

3. **No External Heavy UI Frameworks:**
   - Maintain fast load speed with native CSS grid/flexbox and custom design tokens.

---

## 5. Deployment Instructions

* **Static Hosting:** Compatible with Vercel, Netlify, Cloudflare Pages, or Nginx on VPS.
* **Production Build / Serve:**
  ```bash
  npm start
  ```
* **Git Repository:** `https://github.com/saravanajagan007/clients.cloudcrafts.net`

---

## 6. Rules for Maintenance

* Always verify responsive layout across desktop (1440px+), tablet (768px - 1024px), and mobile (< 768px).
* Do not hardcode secret API keys in `js/app.js` — always expose via environmental variables or secure client session APIs.
* Maintain updated status badges and metric simulations for client demonstration.
