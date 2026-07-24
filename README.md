# AgencyOS — Enterprise Multi-Tenant Agency Operating System & SaaS CRM

**AgencyOS** (`clients.cloudcrafts.net`) is an enterprise-ready, multi-tenant SaaS CRM and Agency Operating System designed specifically for:
- 🌐 **Website Design Agencies**
- 📈 **Digital Marketing Agencies**
- 🎨 **Branding & Creative Studios**
- 💻 **Software Development Companies & Dev Shops**
- 👤 **Freelancers & Independent Consultants**
- 🛠️ **IT Service Companies & MSPs**

---

## Key Features & Modules

### 1. Multi-Tenant Workspace Switcher
- Instant workspace context switching between agency tenants (e.g. *Apex Web Design Studios*, *Vanguard Digital Marketing*, *Aether Branding Co.*, *PixelCraft Studio*).
- Brand customization, currency symbols, and RBAC matrix.

### 2. Interactive Sales Pipeline Kanban Board
- Visual drag-and-drop pipeline stages (`New Inquiry` → `Discovery Call` → `Proposal Sent` → `Contract Signed` → `In Onboarding`).
- Win probability forecasting and total pipeline value calculation.

### 3. Interactive Proposal & Contract Builder
- Drag-and-drop scope of work generator, itemized pricing, PDF export, and simulated E-Sign digital signature workflow.

### 4. Visual Workflow Automation Builder
- No-code trigger, condition, and action builder for lead nurturing, automated Slack/WhatsApp notifications, and overdue invoice escalations.

### 5. AgencyOS AI Assistant & Copilot
- AI-powered lead inquiry summarizer, deal closing probability predictor, proposal outline generator, and automated follow-up drafter.

### 6. Client 360° Directory & Retainer Tracker
- Health scores (`High`, `Medium`, `At Risk`), monthly retainers, LTV metrics, and contact history.

### 7. End-Client Self-Service Portal View
- One-click toggle to view the portal from an end-client's perspective (review deliverables, pay invoices, submit support tickets).

### 8. Domain & Hosting Asset Vault
- Track client SSL certificates, domain renewal dates, Cloudflare DNS, and hosting server health.

### 9. Global Command Palette (`Cmd/Ctrl + K`)
- Instant keyboard search across leads, clients, invoices, projects, and system commands.

---

## Tech Stack & Architecture

- **Frontend App:** Semantic HTML5, Vanilla CSS3 (Custom Glassmorphism Design System), ES6+ JavaScript (Modular State Architecture)
- **Database Schema:** PostgreSQL + Prisma ORM ([prisma/schema.prisma](./prisma/schema.prisma))
- **Backend Spec:** NestJS, OpenAPI 3.0, Swagger ([backend/swagger-spec.json](./backend/swagger-spec.json))
- **Repository:** https://github.com/saravanajagan007/clients.cloudcrafts.net

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/saravanajagan007/clients.cloudcrafts.net.git
cd clients.cloudcrafts.net

# Run locally
npm start
```

Open `http://localhost:3000` in your browser.

---

## License

ISC License. Copyright (c) 2026 CloudCrafts.
