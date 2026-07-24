# AgencyOS — Backend Architecture & Microservices Specification

Production-grade NestJS microservice architecture powering the **AgencyOS** multi-tenant SaaS CRM platform.

---

## Architecture Overview

```
Client App (Next.js / Vanilla SPA)
        │  HTTPS (REST + WebSockets)
        ▼
   Nginx / Cloudflare Ingress Gateway
        │
   NestJS Core API Gateway (Node 20 ESM)
        ├── Auth Module (JWT + 2FA + RBAC Guard)
        ├── Multi-Tenant Guard (X-Tenant-ID Header + RLS Context)
        ├── Pipeline & Leads Module
        ├── Proposals & E-Sign Engine Module
        ├── Invoicing & Retainer Billing Module
        ├── Automation Engine (BullMQ + Redis Workflows)
        └── AI Copilot Engine (LangChain / Gemini Integration)
        │
        ├── PostgreSQL (Prisma ORM with Tenant RLS)
        ├── Redis (BullMQ Queues + Session Cache)
        └── S3 / Cloudflare R2 (PDF Proposals, Client Contracts)
```

---

## Core Security & Multi-Tenancy Design

1. **Tenant Context Middleware:** Every incoming request passes through `TenantContextGuard`, which extracts the `X-Tenant-ID` header and validates access against the authenticated user's workspace memberships.
2. **Prisma Row-Level Isolation:** Data operations automatically scope queries with `{ where: { tenantId } }`.
3. **Queue Isolation:** BullMQ Redis job queues format queue names as `tenant:{tenantId}:workflows`.
4. **Audit Logging:** Every stage mutation, proposal signature, and invoice payment automatically records an immutable row in `audit_logs`.
