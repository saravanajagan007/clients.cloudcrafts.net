/* AgencyOS — Multi-Tenant Production-Grade State & Data Store */

export const INITIAL_STATE = {
  activeTenantId: 'tenant-default',

  tenants: [
    {
      id: 'tenant-default',
      name: 'AgencyOS Workspace',
      type: 'Website Design & Software Agency',
      logo: '⚡',
      currency: '$',
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
  activityLog: []
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

  getQuotations() {
    return this.state.quotations.filter(q => q.tenantId === this.state.activeTenantId);
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
      score: 85,
      probability: '50%',
      updatedAt: new Date().toISOString().split('T')[0],
      ...leadData
    };
    this.state.leads.unshift(newLead);
    this.addActivityLog(`New lead captured: ${newLead.company}`, 'lead');
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
