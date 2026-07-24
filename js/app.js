/* AgencyOS — Main Application Orchestrator & Controller */

import { appStore } from './state.js';
import { renderKanbanBoard } from './components/kanban.js';
import { renderProposalBuilder } from './components/proposals.js';
import { renderAutomationEngine } from './components/automation.js';
import { renderAiCopilotPanel } from './components/aiCopilot.js';
import { renderClientPortalView } from './components/clientPortal.js';
import { renderCrmTimeline } from './components/crmTimeline.js';
import { renderQuotationBuilder } from './components/quotations.js';
import { renderProjectsTasks } from './components/projectsTasks.js';
import { renderReportsAnalytics } from './components/reportsAnalytics.js';
import { renderIntegrationsHub } from './components/integrations.js';
import { initCommandPalette, toggleCommandPalette } from './components/commandPalette.js';

document.addEventListener('DOMContentLoaded', () => {
  initAuthGuard();
  initTenantSelector();
  initNavigation();
  initCommandPalette();
  initLeadModal();
  
  // Initial render of default state
  renderUI(appStore.getState());

  // Subscribe to state changes
  appStore.subscribe((state) => {
    renderUI(state);
  });
});

/* Authentication Protection Guard */
function initAuthGuard() {
  const authScreen = document.getElementById('auth-screen');
  const protectedApp = document.getElementById('protected-app');
  const loginForm = document.getElementById('login-form');
  const errorAlert = document.getElementById('auth-error-alert');
  const logoutBtn = document.getElementById('btn-logout');

  function updateAuthDisplay() {
    const state = appStore.getState();
    if (state.isAuthenticated) {
      if (authScreen) authScreen.style.display = 'none';
      if (protectedApp) protectedApp.style.display = 'flex';
    } else {
      if (authScreen) authScreen.style.display = 'flex';
      if (protectedApp) protectedApp.style.display = 'none';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      const result = appStore.login(email, password);
      if (result.success) {
        if (errorAlert) errorAlert.style.display = 'none';
        updateAuthDisplay();
      } else {
        if (errorAlert) {
          errorAlert.textContent = result.message;
          errorAlert.style.display = 'block';
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      appStore.logout();
      updateAuthDisplay();
    });
  }

  updateAuthDisplay();
}

/* Multi-Tenant Workspace Selector */
function initTenantSelector() {
  const selectEl = document.getElementById('tenant-select');
  if (!selectEl) return;

  const state = appStore.getState();
  selectEl.innerHTML = state.tenants.map(tenant => `
    <option value="${tenant.id}" ${tenant.id === state.activeTenantId ? 'selected' : ''}>
      ${tenant.logo} ${escapeHtml(tenant.name)}
    </option>
  `).join('');

  selectEl.addEventListener('change', (e) => {
    appStore.setTenant(e.target.value);
  });
}

/* View Switching Navigation */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const viewSections = document.querySelectorAll('.view-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      viewSections.forEach(section => {
        if (section.id === `view-${targetView}`) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });

      // Lazy render components on view switch
      switch (targetView) {
        case 'kanban':
          renderKanbanBoard(document.getElementById('kanban-component-container'));
          break;
        case 'timeline':
          renderCrmTimeline(document.getElementById('timeline-component-container'));
          break;
        case 'proposals':
          renderProposalBuilder(document.getElementById('proposal-builder-container'));
          break;
        case 'quotations':
          renderQuotationBuilder(document.getElementById('quotations-component-container'));
          break;
        case 'projects':
          renderProjectsTasks(document.getElementById('projects-component-container'));
          break;
        case 'aicopilot':
          renderAiCopilotPanel(document.getElementById('aicopilot-view-container'));
          break;
        case 'automation':
          renderAutomationEngine(document.getElementById('automation-view-container'));
          break;
        case 'clientportal':
          renderClientPortalView(document.getElementById('clientportal-view-container'));
          break;
        case 'reports':
          renderReportsAnalytics(document.getElementById('reports-component-container'));
          break;
        case 'integrations':
          renderIntegrationsHub(document.getElementById('integrations-component-container'));
          break;
      }
    });
  });

  // Top bar command palette triggers
  document.getElementById('btn-cmd-palette')?.addEventListener('click', () => {
    toggleCommandPalette();
  });

  document.getElementById('global-search-input')?.addEventListener('click', () => {
    toggleCommandPalette();
  });
}

/* Render Main UI Modules */
function renderUI(state) {
  const tenant = appStore.getActiveTenant();

  // Update Header & Dashboard Metrics
  const titleEl = document.getElementById('workspace-title-display');
  if (titleEl) titleEl.textContent = `${tenant.name} Overview`;

  const mrrEl = document.getElementById('dash-mrr');
  if (mrrEl) mrrEl.textContent = `${tenant.currency}${tenant.mrr.toLocaleString()}`;

  const clientsEl = document.getElementById('dash-clients');
  if (clientsEl) clientsEl.textContent = tenant.clientsCount;

  const projectsEl = document.getElementById('dash-projects');
  if (projectsEl) projectsEl.textContent = tenant.activeProjects;

  const teamEl = document.getElementById('dash-team');
  if (teamEl) teamEl.textContent = `${tenant.teamSize} Members`;

  // Render embedded AI Panel on Dashboard
  renderAiCopilotPanel(document.getElementById('dashboard-ai-container'));

  // Render Activity Log
  renderActivityFeed();

  // Render Leads Table
  renderLeadsTable();

  // Render Clients Table
  renderClientsTable();

  // Render Invoices Table
  renderInvoicesTable();
}

function renderActivityFeed() {
  const container = document.getElementById('activity-feed-container');
  if (!container) return;

  const logs = appStore.getActivityLogs();

  if (logs.length === 0) {
    container.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        No activity recorded yet. Add a new lead or proposal to see real-time updates!
      </div>
    `;
    return;
  }

  container.innerHTML = logs.map(log => `
    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(10, 15, 26, 0.6); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1rem;">
          ${log.type === 'proposal' ? '✍️' : log.type === 'lead' ? '🎯' : log.type === 'payment' ? '💳' : '🚀'}
        </span>
        <span style="font-size: 0.88rem;">${escapeHtml(log.text)}</span>
      </div>
      <span style="font-size: 0.78rem; color: var(--text-dim);">${escapeHtml(log.time)}</span>
    </div>
  `).join('');
}

function renderLeadsTable() {
  const container = document.getElementById('leads-table-body');
  if (!container) return;

  const leads = appStore.getLeads();

  if (leads.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No leads captured yet. Click <strong>+ Add Lead</strong> above to record a new inquiry.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = leads.map(lead => `
    <tr>
      <td><strong>${escapeHtml(lead.company)}</strong></td>
      <td>${escapeHtml(lead.contactName)} (${escapeHtml(lead.email)})</td>
      <td><span class="service-tag">${escapeHtml(lead.serviceType)}</span></td>
      <td style="font-weight: 700; color: var(--color-emerald);">$${lead.value.toLocaleString()}</td>
      <td><span class="score-tag">Score ${lead.score}</span></td>
      <td><span class="badge badge-warning"><span class="badge-dot"></span> ${escapeHtml(lead.stage)}</span></td>
    </tr>
  `).join('');
}

function renderClientsTable() {
  const container = document.getElementById('clients-table-body');
  if (!container) return;

  const clients = appStore.getClients();

  if (clients.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No clients registered yet. Closed leads will automatically populate your Client 360° directory.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = clients.map(client => `
    <tr>
      <td><strong>${escapeHtml(client.name)}</strong></td>
      <td>${escapeHtml(client.industry)}</td>
      <td>${escapeHtml(client.primaryContact)} (${escapeHtml(client.contactEmail)})</td>
      <td><span class="badge ${client.health === 'High' ? 'badge-success' : 'badge-warning'}"><span class="badge-dot"></span> ${client.health}</span></td>
      <td style="font-weight: 600;">$${client.retainerMonthly.toLocaleString()} / mo</td>
      <td style="font-weight: 700; color: var(--color-emerald);">$${client.ltv.toLocaleString()}</td>
    </tr>
  `).join('');
}

function renderInvoicesTable() {
  const container = document.getElementById('invoices-table-body');
  if (!container) return;

  const invoices = appStore.getInvoices();

  if (invoices.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No invoices issued yet. Create a proposal or project to issue milestone & retainer invoices.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = invoices.map(inv => `
    <tr>
      <td><strong>#${escapeHtml(inv.id)}</strong></td>
      <td>${escapeHtml(inv.clientName)}</td>
      <td>${escapeHtml(inv.description)}</td>
      <td style="font-weight: 700; color: var(--color-emerald);">$${inv.amount.toLocaleString()}</td>
      <td>${escapeHtml(inv.dueDate)}</td>
      <td><span class="badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Pending' ? 'badge-warning' : 'badge-danger'}"><span class="badge-dot"></span> ${inv.status}</span></td>
    </tr>
  `).join('');
}

/* Modal Lead Handling */
function initLeadModal() {
  const modal = document.getElementById('add-lead-modal');
  const openBtns = [document.getElementById('btn-quick-lead'), document.getElementById('btn-add-lead-kanban')].filter(Boolean);
  const form = document.getElementById('add-lead-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('lead-company').value;
      const contactName = document.getElementById('lead-contact').value;
      const email = document.getElementById('lead-email').value;
      const serviceType = document.getElementById('lead-service').value;
      const value = parseFloat(document.getElementById('lead-budget').value) || 0;

      appStore.addLead({
        company,
        contactName,
        email,
        serviceType,
        value,
        stage: 'new-inquiry'
      });

      form.reset();
      modal.classList.remove('active');
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
