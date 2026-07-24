/* AgencyOS — Multi-Tenant Production-Grade State & Data Store with Auth, Multi-Currency, Client Portal, & Backend DB */

import { createLeadApi, updateLeadStageApi, loginApi } from './api.js';

const AUTH_STORAGE_KEY = 'agencyos_auth_session';
const STATE_STORAGE_KEY = 'agencyos_app_state';

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'INR (₹) — Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'USD ($) — US Dollar' },
  { code: 'EUR', symbol: '€', name: 'EUR (€) — Euro' },
  { code: 'GBP', symbol: '£', name: 'GBP (£) — British Pound' },
  { code: 'AED', symbol: 'AED ', name: 'AED (AED) — UAE Dirham' },
  { code: 'SGD', symbol: 'S$', name: 'SGD (S$) — Singapore Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'AUD (A$) — Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'CAD (C$) — Canadian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'JPY (¥) — Japanese Yen' }
];

export const INITIAL_STATE = {
  activeTenantId: 'tenant-default',
  isAuthenticated: false,
  currentUser: null,

  tenants: [
    {
      id: 'tenant-default',
      name: 'AgencyOS Workspace',
      type: 'Website Design & Software Agency',
      logo: '⚡',
      currency: 'INR',
      currencySymbol: '₹',
      mrr: 0,
      clientsCount: 0,
      activeProjects: 0,
      teamSize: 1
    }
  ],

  leads: [],
  clients: [],
  projects: [],
  proposals: [],
  quotations: [],
  invoices: [],
  tickets: [],
  activityLog: []
};

class Store {
  constructor(initialData) {
    this.state = JSON.parse(JSON.stringify(initialData));
    this.listeners = [];
    this.loadState();
    this.checkSession();
  }

  loadState() {
    try {
      const storedState = localStorage.getItem(STATE_STORAGE_KEY);
      if (storedState) {
        const parsed = JSON.parse(storedState);
        this.state = { ...this.state, ...parsed };
      }
    } catch {
      // Use initial state if parsing fails
    }
  }

  saveState() {
    try {
      const toSave = {
        activeTenantId: this.state.activeTenantId,
        tenants: this.state.tenants,
        leads: this.state.leads,
        clients: this.state.clients,
        projects: this.state.projects,
        proposals: this.state.proposals,
        quotations: this.state.quotations,
        invoices: this.state.invoices,
        tickets: this.state.tickets,
        activityLog: this.state.activityLog
      };
      localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }

  checkSession() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (session && session.email) {
          this.state.isAuthenticated = true;
          this.state.currentUser = session;
        }
      }
    } catch {
      this.state.isAuthenticated = false;
    }
  }

  login(email, password, role = 'staff') {
    if (role === 'staff') {
      if (email === 'saravanajagan@gmail.com' && password === 'Goldwinner007#') {
        const user = {
          name: 'Saravana Jagan',
          email: 'saravanajagan@gmail.com',
          role: 'Agency Owner',
          type: 'staff',
          company: 'AgencyOS Studio',
          loggedInAt: new Date().toISOString()
        };
        this.state.isAuthenticated = true;
        this.state.currentUser = user;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        this.addActivityLog('User Saravana Jagan (Agency Owner) logged in', 'info');
        loginApi(email, password).catch(() => {});
        this.notify();
        return { success: true };
      }
      return { success: false, message: 'Invalid Staff email or password.' };
    } else {
      // Client Portal Login
      const companyName = email.split('@')[0].toUpperCase();
      const user = {
        name: email.split('@')[0],
        email: email,
        role: 'Client',
        type: 'client',
        company: companyName,
        loggedInAt: new Date().toISOString()
      };
      this.state.isAuthenticated = true;
      this.state.currentUser = user;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      this.addActivityLog(`Client ${email} logged into Client Portal`, 'info');
      this.notify();
      return { success: true };
    }
  }

  logout() {
    this.state.isAuthenticated = false;
    this.state.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  }

  getState() {
    return this.state;
  }

  isClientUser() {
    return this.state.currentUser && this.state.currentUser.type === 'client';
  }

  getActiveTenant() {
    const t = this.state.tenants.find(t => t.id === this.state.activeTenantId) || this.state.tenants[0];
    const curr = CURRENCIES.find(c => c.code === t.currency) || CURRENCIES[0];
    return { ...t, currencySymbol: curr.symbol };
  }

  setTenantCurrency(currencyCode) {
    const tenant = this.state.tenants.find(t => t.id === this.state.activeTenantId) || this.state.tenants[0];
    const curr = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
    tenant.currency = curr.code;
    tenant.currencySymbol = curr.symbol;
    this.addActivityLog(`Workspace primary currency updated to ${curr.name}`, 'info');
    this.saveState();
    this.notify();
  }

  setTenant(tenantId) {
    this.state.activeTenantId = tenantId;
    this.saveState();
    this.notify();
  }

  getLeads() {
    return this.state.leads.filter(l => l.tenantId === this.state.activeTenantId);
  }

  getClients() {
    return this.state.clients.filter(c => c.tenantId === this.state.activeTenantId);
  }

  getProjects() {
    const all = this.state.projects.filter(p => p.tenantId === this.state.activeTenantId);
    if (this.isClientUser()) {
      return all.filter(p => p.clientEmail === this.state.currentUser.email || p.clientName.toLowerCase().includes(this.state.currentUser.company.toLowerCase()));
    }
    return all;
  }

  getProposals() {
    const all = this.state.proposals.filter(p => p.tenantId === this.state.activeTenantId);
    if (this.isClientUser()) {
      return all.filter(p => p.clientEmail === this.state.currentUser.email || p.clientName.toLowerCase().includes(this.state.currentUser.company.toLowerCase()));
    }
    return all;
  }

  getQuotations() {
    return this.state.quotations.filter(q => q.tenantId === this.state.activeTenantId);
  }

  getInvoices() {
    const all = this.state.invoices.filter(i => i.tenantId === this.state.activeTenantId);
    if (this.isClientUser()) {
      return all.filter(i => i.clientEmail === this.state.currentUser.email || i.clientName.toLowerCase().includes(this.state.currentUser.company.toLowerCase()));
    }
    return all;
  }

  getTickets() {
    const all = this.state.tickets || [];
    if (this.isClientUser()) {
      return all.filter(t => t.clientEmail === this.state.currentUser.email);
    }
    return all;
  }

  addTicket(ticketData) {
    if (!this.state.tickets) this.state.tickets = [];
    const newTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 8999)}`,
      tenantId: this.state.activeTenantId,
      clientEmail: this.state.currentUser ? this.state.currentUser.email : 'client@external.com',
      company: this.state.currentUser ? this.state.currentUser.company : 'External Client',
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      ...ticketData
    };
    this.state.tickets.unshift(newTicket);
    this.addActivityLog(`Support ticket ${newTicket.id} created by ${newTicket.company}`, 'support');
    this.saveState();
    this.notify();
    return newTicket;
  }

  getActivityLogs() {
    return this.state.activityLog.filter(a => a.tenantId === this.state.activeTenantId);
  }

  addLead(leadData) {
    const tenant = this.getActiveTenant();
    const newLead = {
      id: `lead-${Date.now()}`,
      tenantId: this.state.activeTenantId,
      currencySymbol: leadData.currencySymbol || tenant.currencySymbol,
      score: 85,
      probability: '50%',
      updatedAt: new Date().toISOString().split('T')[0],
      ...leadData
    };
    this.state.leads.unshift(newLead);
    this.addActivityLog(`New lead captured: ${newLead.company} (${newLead.currencySymbol}${newLead.value.toLocaleString()})`, 'lead');
    this.saveState();

    // Store in backend database API
    createLeadApi(newLead).catch(() => {});

    this.notify();
    return newLead;
  }

  updateLeadStage(leadId, newStage) {
    const lead = this.state.leads.find(l => l.id === leadId);
    if (lead) {
      lead.stage = newStage;
      lead.updatedAt = new Date().toISOString().split('T')[0];
      this.addActivityLog(`Lead "${lead.company}" moved to ${newStage.replace('-', ' ')}`, 'lead');
      this.saveState();

      // Sync stage update with backend database API
      updateLeadStageApi(leadId, newStage).catch(() => {});

      this.notify();
    }
  }

  addProposal(proposalData) {
    const tenant = this.getActiveTenant();
    const newProp = {
      id: `prop-${Math.floor(100 + Math.random() * 899)}`,
      tenantId: this.state.activeTenantId,
      currencySymbol: proposalData.currencySymbol || tenant.currencySymbol,
      status: 'Sent',
      createdDate: new Date().toISOString().split('T')[0],
      ...proposalData
    };
    this.state.proposals.unshift(newProp);
    this.addActivityLog(`Created proposal for ${newProp.clientName} (${newProp.currencySymbol}${newProp.amount.toLocaleString()})`, 'proposal');
    this.saveState();
    this.notify();
    return newProp;
  }

  addInvoice(invoiceData) {
    const tenant = this.getActiveTenant();
    const newInv = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 899)}`,
      tenantId: this.state.activeTenantId,
      currencySymbol: invoiceData.currencySymbol || tenant.currencySymbol,
      status: 'Pending',
      issuedDate: new Date().toISOString().split('T')[0],
      ...invoiceData
    };
    this.state.invoices.unshift(newInv);
    this.addActivityLog(`Issued invoice ${newInv.id} to ${newInv.clientName} (${newInv.currencySymbol}${newInv.amount.toLocaleString()})`, 'payment');
    this.saveState();
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
    this.saveState();
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
