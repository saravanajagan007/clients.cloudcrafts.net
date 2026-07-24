# clients.cloudcrafts.net — Multi-Tenant Agency SaaS CRM Platform Architecture

Enterprise-ready, multi-tenant SaaS CRM built specifically for:
* **Website Design Agencies**
* **Digital Marketing Agencies**
* **Branding & Creative Agencies**
* **Software Development Companies & Dev Shops**
* **Freelancers & Independent Consultants**
* **IT Service Companies & MSPs**

---

## 1. System Architecture & Multi-Tenancy

### Tenant Isolation Model
- **Tenant Context (`tenantId`):** All lead pipelines, client records, project milestones, proposals, and billing data are strictly isolated per tenant workspace.
- **Tenant Switcher:** Instant workspace context switching (e.g. *Apex Web Design Studios*, *Vanguard Digital Marketing*, *Aether Branding Co.*, *PixelCraft Freelance*).
- **Role-Based Access Control (RBAC):** `Owner`, `Agency Admin`, `Project Manager`, `Account Executive`, `Client Portal User`.

---

## 2. Core Modules & Feature Specifications

### 2.1 Lead & Sales Pipeline (Kanban & List View)
- Drag-and-drop visual pipeline stages: `New Inquiry` → `Discovery Call` → `Proposal Sent` → `Contract Signed` → `In Onboarding` → `Closed Won/Lost`.
- Lead scoring, deal value tracking, projected close date, and agency service tagging (Web Design, SEO, Branding, Custom Software, IT Retainer).

### 2.2 Client 360° Lifecycle Management
- Full client directory with Health Score (`High`, `Medium`, `At Risk`), active retainer status, total LTV, primary contacts, and activity timeline.

### 2.3 Project & Service Delivery Tracker
- Active client projects, milestone progress bars, deliverables checklist, resource allocation, and deadline monitoring.

### 2.4 Interactive Proposal & Contract Builder
- Live interactive proposal generator with itemized scope of work, pricing tables, milestone schedules, and simulated digital signature (E-Sign).

### 2.5 Billing, Retainers & Invoicing
- Recurring retainer tracker, automated invoice status (`Paid`, `Pending`, `Overdue`), invoice generator, and payment link generator.

### 2.6 Client Self-Service Portal View Mode
- One-click toggle to view the dashboard from the perspective of an end-client (view invoices, sign proposals, approve design proofs, submit change requests).

### 2.7 Agency Performance & Financial Analytics
- Real-time MRR (Monthly Recurring Revenue), ARR (Annual Recurring Revenue), Average Retainer Value, Win Rate, and Team Utilization.

---

## 3. Directory Layout

```
clients.cloudcrafts.net/
├── index.html                 # Main App Shell & Multi-View Containers
├── css/
│   └── styles.css             # Enterprise Glassmorphism Design System & Kanban Styles
├── js/
│   ├── state.js               # Multi-Tenant Reactive Store & Data Seeds
│   ├── components/
│   │   ├── kanban.js          # Pipeline Kanban Drag & Drop Engine
│   │   ├── proposals.js       # Proposal & Contract Builder Engine
│   │   ├── billing.js          # Invoicing & Retainer Management
│   │   ├── clientPortal.js    # End-Client Portal View Simulator
│   │   └── analytics.js       # Agency Financial & Operational Charts
│   └── app.js                 # App Controller, Command Palette, Toast Alerts
├── .gitignore
├── .env.example
├── package.json
├── README.md
└── rules.md
```

---

## 4. Design Guidelines & Aesthetics

- **Dark Glassmorphism Theme:** Background `#070a12`, backdrop filters `blur(16px)`, border glass `rgba(255,255,255,0.08)`.
- **Vibrant Accent Palette:** Electric Indigo (`#6366f1`), Cyan (`#06b6d4`), Emerald (`#10b981`), Purple (`#8b5cf6`), Amber (`#f59e0b`), Rose (`#f43f5e`).
- **Interactive Feedback:** Micro-animations for stage dragging, status changes, toast notifications, keyboard shortcuts (`Ctrl/Cmd + K` Command Palette).
