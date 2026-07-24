/* clients.cloudcrafts.net — Multi-Tenant Reactive State & Data Store */

export const INITIAL_STATE = {
  activeTenantId: 'tenant-apex-web',

  tenants: [
    {
      id: 'tenant-apex-web',
      name: 'Apex Web Design Studios',
      type: 'Website Design Agency',
      logo: '🌐',
      currency: '$',
      mrr: 42500,
      clientsCount: 28,
      activeProjects: 14,
      teamSize: 12
    },
    {
      id: 'tenant-vanguard-marketing',
      name: 'Vanguard Digital Marketing',
      type: 'Digital Marketing Agency',
      logo: '📈',
      currency: '$',
      mrr: 68000,
      clientsCount: 45,
      activeProjects: 22,
      teamSize: 18
    },
    {
      id: 'tenant-aether-branding',
      name: 'Aether Branding Co.',
      type: 'Branding & Design Agency',
      logo: '🎨',
      currency: '$',
      mrr: 31000,
      clientsCount: 16,
      activeProjects: 8,
      teamSize: 7
    },
    {
      id: 'tenant-pixelcraft-freelance',
      name: 'PixelCraft Studio',
      type: 'Freelance Software & UI Specialist',
      logo: '💻',
      currency: '$',
      mrr: 14500,
      clientsCount: 6,
      activeProjects: 4,
      teamSize: 2
    }
  ],

  leads: [
    {
      id: 'lead-101',
      tenantId: 'tenant-apex-web',
      company: 'Novus FinTech Systems',
      contactName: 'Elena Rostova',
      email: 'elena@novusfintech.com',
      serviceType: 'Website Design & WebApp',
      value: 24500,
      stage: 'proposal-sent',
      score: 92,
      probability: '75%',
      assignedTo: 'Marcus Vance',
      updatedAt: '2026-07-24'
    },
    {
      id: 'lead-102',
      tenantId: 'tenant-apex-web',
      company: 'Krypton Luxury E-Commerce',
      contactName: 'Julian Vance',
      email: 'julian@kryptonluxury.io',
      serviceType: 'Shopify Plus Redesign',
      value: 18000,
      stage: 'discovery-call',
      score: 85,
      probability: '50%',
      assignedTo: 'Sarah Jenkins',
      updatedAt: '2026-07-23'
    },
    {
      id: 'lead-103',
      tenantId: 'tenant-apex-web',
      company: 'AeroDynamics Aerospace',
      contactName: 'Dr. Robert Chen',
      email: 'r.chen@aerodynamics.com',
      serviceType: 'Corporate Portal Redesign',
      value: 45000,
      stage: 'contract-signed',
      score: 98,
      probability: '95%',
      assignedTo: 'Marcus Vance',
      updatedAt: '2026-07-24'
    },
    {
      id: 'lead-104',
      tenantId: 'tenant-apex-web',
      company: 'Lumina Solar Technologies',
      contactName: 'Sophia Miller',
      email: 'smiller@luminasolar.org',
      serviceType: 'Landing Page & Lead Funnel',
      value: 9500,
      stage: 'new-inquiry',
      score: 65,
      probability: '25%',
      assignedTo: 'Alex Mercer',
      updatedAt: '2026-07-24'
    },
    {
      id: 'lead-105',
      tenantId: 'tenant-apex-web',
      company: 'Verve Health & Fitness',
      contactName: 'Derrick Rose',
      email: 'drose@vervehealth.co',
      serviceType: 'Web App & Portal',
      value: 32000,
      stage: 'in-onboarding',
      score: 99,
      probability: '100%',
      assignedTo: 'Sarah Jenkins',
      updatedAt: '2026-07-22'
    },
    // Vanguard Marketing Leads
    {
      id: 'lead-201',
      tenantId: 'tenant-vanguard-marketing',
      company: 'OmniHealth SaaS',
      contactName: 'Claire Redfield',
      email: 'claire@omnihealth.io',
      serviceType: 'SEO & Content Retainer',
      value: 8500,
      stage: 'proposal-sent',
      score: 88,
      probability: '70%',
      assignedTo: 'David Kim',
      updatedAt: '2026-07-24'
    },
    {
      id: 'lead-202',
      tenantId: 'tenant-vanguard-marketing',
      company: 'Zenith Logistics',
      contactName: 'Arthur Pendelton',
      email: 'art@zenithlogistics.com',
      serviceType: 'PPC & Ad Operations',
      value: 14000,
      stage: 'contract-signed',
      score: 95,
      probability: '90%',
      assignedTo: 'David Kim',
      updatedAt: '2026-07-23'
    }
  ],

  clients: [
    {
      id: 'client-01',
      tenantId: 'tenant-apex-web',
      name: 'Novus FinTech Systems',
      industry: 'Financial Technology',
      contactName: 'Elena Rostova',
      email: 'elena@novusfintech.com',
      phone: '+1 (555) 234-8901',
      health: 'High',
      retainerMonthly: 3500,
      ltv: 84000,
      status: 'Active Client',
      joinedDate: 'Jan 15, 2025'
    },
    {
      id: 'client-02',
      tenantId: 'tenant-apex-web',
      name: 'AeroDynamics Aerospace',
      industry: 'Aeronautics',
      contactName: 'Dr. Robert Chen',
      email: 'r.chen@aerodynamics.com',
      phone: '+1 (555) 987-1234',
      health: 'High',
      retainerMonthly: 5000,
      ltv: 125000,
      status: 'Active Client',
      joinedDate: 'Mar 01, 2024'
    },
    {
      id: 'client-03',
      tenantId: 'tenant-apex-web',
      name: 'Verve Health & Fitness',
      industry: 'Healthcare & Wellness',
      contactName: 'Derrick Rose',
      email: 'drose@vervehealth.co',
      phone: '+1 (555) 456-7890',
      health: 'Medium',
      retainerMonthly: 2500,
      ltv: 45000,
      status: 'Active Client',
      joinedDate: 'Oct 10, 2025'
    },
    {
      id: 'client-04',
      tenantId: 'tenant-apex-web',
      name: 'Starlight Media Group',
      industry: 'Digital Publishing',
      contactName: 'Tanya Sterling',
      email: 'tanya@starlightmedia.com',
      phone: '+1 (555) 321-6549',
      health: 'At Risk',
      retainerMonthly: 1800,
      ltv: 28000,
      status: 'Review Needed',
      joinedDate: 'May 12, 2025'
    }
  ],

  projects: [
    {
      id: 'proj-01',
      tenantId: 'tenant-apex-web',
      clientId: 'client-01',
      clientName: 'Novus FinTech Systems',
      title: 'FinTech Dashboard & Customer Portal Redesign',
      serviceCategory: 'Website Design & Development',
      progress: 78,
      milestone: 'Frontend Integration & Component Testing',
      deadline: '2026-08-15',
      budget: 24500,
      status: 'In Progress',
      assignedTeam: ['Marcus V.', 'Elena K.']
    },
    {
      id: 'proj-02',
      tenantId: 'tenant-apex-web',
      clientId: 'client-02',
      clientName: 'AeroDynamics Aerospace',
      title: 'Global Corporate Website & 3D Interactive Showcase',
      serviceCategory: '3D Web Experience & WebGL',
      progress: 45,
      milestone: '3D Model Optimization & Shader Development',
      deadline: '2026-09-30',
      budget: 45000,
      status: 'In Progress',
      assignedTeam: ['Marcus V.', 'Devon W.', 'Sarah J.']
    },
    {
      id: 'proj-03',
      tenantId: 'tenant-apex-web',
      clientId: 'client-03',
      clientName: 'Verve Health & Fitness',
      title: 'Mobile Web Application & Booking Funnel',
      serviceCategory: 'Web Application Development',
      progress: 92,
      milestone: 'Final Staging Review & QA Testing',
      deadline: '2026-07-30',
      budget: 32000,
      status: 'Near Completion',
      assignedTeam: ['Sarah J.', 'Alex M.']
    }
  ],

  proposals: [
    {
      id: 'prop-801',
      tenantId: 'tenant-apex-web',
      clientName: 'Novus FinTech Systems',
      title: 'Enterprise Web Portal & Design System Proposal',
      amount: 24500,
      status: 'Sent',
      validUntil: '2026-08-10',
      createdDate: '2026-07-20',
      items: [
        { desc: 'UX Research & Wireframing System', cost: 4500 },
        { desc: 'Design System & Glassmorphism UI Component Library', cost: 7500 },
        { desc: 'Next.js Frontend & API Integration', cost: 9500 },
        { desc: 'QA Testing, Security Audit & Deployment', cost: 3000 }
      ]
    },
    {
      id: 'prop-802',
      tenantId: 'tenant-apex-web',
      clientName: 'Krypton Luxury E-Commerce',
      title: 'Shopify Plus Redesign & Performance Optimization',
      amount: 18000,
      status: 'Draft',
      validUntil: '2026-08-15',
      createdDate: '2026-07-23',
      items: [
        { desc: 'Custom Liquid Theme Design', cost: 8000 },
        { desc: 'Speed & Core Web Vitals Optimization', cost: 4000 },
        { desc: 'Custom Checkout & Subscription Flow', cost: 6000 }
      ]
    }
  ],

  invoices: [
    {
      id: 'INV-2026-001',
      tenantId: 'tenant-apex-web',
      clientName: 'Novus FinTech Systems',
      description: 'Milestone 2: Frontend Integration',
      amount: 12250,
      dueDate: '2026-08-01',
      status: 'Paid',
      issuedDate: '2026-07-15'
    },
    {
      id: 'INV-2026-002',
      tenantId: 'tenant-apex-web',
      clientName: 'AeroDynamics Aerospace',
      description: 'Monthly Maintenance & Infrastructure Retainer',
      amount: 5000,
      dueDate: '2026-08-05',
      status: 'Pending',
      issuedDate: '2026-07-20'
    },
    {
      id: 'INV-2026-003',
      tenantId: 'tenant-apex-web',
      clientName: 'Starlight Media Group',
      description: 'Q3 Maintenance & SEO Audit',
      amount: 1800,
      dueDate: '2026-07-15',
      status: 'Overdue',
      issuedDate: '2026-07-01'
    }
  ],

  activityLog: [
    { id: 1, tenantId: 'tenant-apex-web', text: 'Proposal #PROP-801 viewed by Elena Rostova (Novus FinTech)', time: '10 mins ago', type: 'proposal' },
    { id: 2, tenantId: 'tenant-apex-web', text: 'Lead "AeroDynamics Aerospace" moved to Contract Signed stage', time: '1 hour ago', type: 'lead' },
    { id: 3, tenantId: 'tenant-apex-web', text: 'Payment of $12,250 received from Novus FinTech Systems', time: '3 hours ago', type: 'payment' },
    { id: 4, tenantId: 'tenant-apex-web', text: 'Project "Verve Health Mobile Web App" reached 92% progress', time: '5 hours ago', type: 'project' }
  ]
};

class Store {
  constructor(initialData) {
    this.state = JSON.parse(JSON.stringify(initialData));
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  getActiveTenant() {
    return this.state.tenants.find(t => t.id === this.state.activeTenantId) || this.state.tenants[0];
  }

  setTenant(tenantId) {
    this.state.activeTenantId = tenantId;
    this.notify();
  }

  getLeads() {
    return this.state.leads.filter(l => l.tenantId === this.state.activeTenantId);
  }

  getClients() {
    return this.state.clients.filter(c => c.tenantId === this.state.activeTenantId);
  }

  getProjects() {
    return this.state.projects.filter(p => p.tenantId === this.state.activeTenantId);
  }

  getProposals() {
    return this.state.proposals.filter(p => p.tenantId === this.state.activeTenantId);
  }

  getInvoices() {
    return this.state.invoices.filter(i => i.tenantId === this.state.activeTenantId);
  }

  getActivityLogs() {
    return this.state.activityLog.filter(a => a.tenantId === this.state.activeTenantId);
  }

  addLead(leadData) {
    const newLead = {
      id: `lead-${Date.now()}`,
      tenantId: this.state.activeTenantId,
      score: Math.floor(70 + Math.random() * 28),
      probability: '50%',
      updatedAt: new Date().toISOString().split('T')[0],
      ...leadData
    };
    this.state.leads.unshift(newLead);
    this.addActivityLog(`New lead added: ${newLead.company}`, 'lead');
    this.notify();
    return newLead;
  }

  updateLeadStage(leadId, newStage) {
    const lead = this.state.leads.find(l => l.id === leadId);
    if (lead) {
      lead.stage = newStage;
      lead.updatedAt = new Date().toISOString().split('T')[0];
      this.addActivityLog(`Lead "${lead.company}" moved to ${newStage.replace('-', ' ')}`, 'lead');
      this.notify();
    }
  }

  addProposal(proposalData) {
    const newProp = {
      id: `prop-${Math.floor(100 + Math.random() * 899)}`,
      tenantId: this.state.activeTenantId,
      status: 'Sent',
      createdDate: new Date().toISOString().split('T')[0],
      ...proposalData
    };
    this.state.proposals.unshift(newProp);
    this.addActivityLog(`Created proposal for ${newProp.clientName} ($${newProp.amount.toLocaleString()})`, 'proposal');
    this.notify();
    return newProp;
  }

  addInvoice(invoiceData) {
    const newInv = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 899)}`,
      tenantId: this.state.activeTenantId,
      status: 'Pending',
      issuedDate: new Date().toISOString().split('T')[0],
      ...invoiceData
    };
    this.state.invoices.unshift(newInv);
    this.addActivityLog(`Issued invoice ${newInv.id} to ${newInv.clientName} ($${newInv.amount.toLocaleString()})`, 'payment');
    this.notify();
    return newInv;
  }

  addActivityLog(text, type = 'info') {
    this.state.activityLog.unshift({
      id: Date.now(),
      tenantId: this.state.activeTenantId,
      text,
      time: 'Just now',
      type
    });
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const appStore = new Store(INITIAL_STATE);
