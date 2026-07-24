/* AgencyOS — Main Application Orchestrator & Controller */

import { appStore, CURRENCIES } from './state.js';
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
  initCurrencySelector();
  initNavigation();
  initCommandPalette();
  initGlobalLeadModal();
  
  // Initial render of default state
  renderUI(appStore.getState());

  // Subscribe to state changes
  appStore.subscribe((state) => {
    renderUI(state);
  });
});

/* Toast Notification Utility */
export function showToast(message, icon = '✅') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

/* Authentication & Role Protection Guard */
function initAuthGuard() {
  const authScreen = document.getElementById('auth-screen');
  const protectedApp = document.getElementById('protected-app');
  const loginForm = document.getElementById('login-form');
  const errorAlert = document.getElementById('auth-error-alert');
  const logoutBtn = document.getElementById('btn-logout');

  const tabStaff = document.getElementById('tab-auth-staff');
  const tabClient = document.getElementById('tab-auth-client');
  const roleInput = document.getElementById('login-role-type');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('btn-login-submit');

  // Role Tab Switching
  if (tabStaff && tabClient) {
    tabStaff.addEventListener('click', () => {
      tabStaff.classList.add('primary');
      tabStaff.style.background = '';
      tabClient.classList.remove('primary');
      tabClient.style.background = 'transparent';

      roleInput.value = 'staff';
      emailInput.value = 'saravanajagan@gmail.com';
      passInput.value = 'Goldwinner007#';
      submitBtn.textContent = 'Sign In to AgencyOS Workspace ➔';
      document.getElementById('lbl-login-email').textContent = 'Agency Email Address';
    });

    tabClient.addEventListener('click', () => {
      tabClient.classList.add('primary');
      tabClient.style.background = '';
      tabStaff.classList.remove('primary');
      tabStaff.style.background = 'transparent';

      roleInput.value = 'client';
      emailInput.value = 'client@novusfintech.com';
      passInput.value = 'Client123#';
      submitBtn.textContent = 'Sign In to Client Self-Service Portal ➔';
      document.getElementById('lbl-login-email').textContent = 'Client Email Address';
    });
  }

  function updateAuthDisplay() {
    const state = appStore.getState();
    if (state.isAuthenticated) {
      if (authScreen) authScreen.style.display = 'none';
      if (protectedApp) protectedApp.style.display = 'flex';

      // Adapt Sidebar for Client vs Staff
      const isClient = appStore.isClientUser();
      const staffNav = document.getElementById('nav-group-staff');
      const clientNav = document.getElementById('nav-group-client');
      const tenantSelect = document.getElementById('sidebar-tenant-wrapper');
      const quickLeadBtn = document.getElementById('btn-quick-lead');

      const user = state.currentUser;
      if (document.getElementById('sidebar-username')) document.getElementById('sidebar-username').textContent = user.name;
      if (document.getElementById('user-role-badge')) document.getElementById('user-role-badge').textContent = user.role;
      if (document.getElementById('rbac-role-name')) document.getElementById('rbac-role-name').textContent = user.role;

      if (isClient) {
        if (staffNav) staffNav.style.display = 'none';
        if (clientNav) clientNav.style.display = 'block';
        if (tenantSelect) tenantSelect.style.display = 'none';
        if (quickLeadBtn) quickLeadBtn.style.display = 'none';

        // Auto navigate client to clientportal view
        const portalNav = document.querySelector('.nav-item[data-view="clientportal"]');
        if (portalNav) portalNav.click();

      } else {
        if (staffNav) staffNav.style.display = 'block';
        if (clientNav) clientNav.style.display = 'none';
        if (tenantSelect) tenantSelect.style.display = 'block';
        if (quickLeadBtn) quickLeadBtn.style.display = 'inline-flex';
      }

    } else {
      if (authScreen) authScreen.style.display = 'flex';
      if (protectedApp) protectedApp.style.display = 'none';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passInput.value.trim();
      const role = roleInput.value;

      const result = appStore.login(email, password, role);
      if (result.success) {
        if (errorAlert) errorAlert.style.display = 'none';
        updateAuthDisplay();
        showToast(`Welcome back, ${appStore.getState().currentUser.name}!`, '👋');
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
    showToast(`Switched workspace to ${appStore.getActiveTenant().name}`, '⚡');
  });
}

/* Currency Selector Handler */
function initCurrencySelector() {
  const selectEl = document.getElementById('global-currency-select');
  if (!selectEl) return;

  const tenant = appStore.getActiveTenant();
  selectEl.value = tenant.currency || 'INR';

  selectEl.addEventListener('change', (e) => {
    appStore.setTenantCurrency(e.target.value);
    showToast(`Primary currency set to ${e.target.value}`, '💱');
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

/* Global Lead Modal & Submission Handler */
function initGlobalLeadModal() {
  const modal = document.getElementById('add-lead-modal');
  const form = document.getElementById('add-lead-form');

  // Event delegation to catch clicks on any Add Lead trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('#btn-quick-lead, #btn-add-lead-kanban, .btn-open-add-lead');
    if (trigger && modal) {
      modal.classList.add('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('lead-company')?.value.trim();
      const contactName = document.getElementById('lead-contact')?.value.trim();
      const email = document.getElementById('lead-email')?.value.trim();
      const serviceType = document.getElementById('lead-service')?.value.trim();
      const currencyCode = document.getElementById('lead-currency')?.value || 'INR';
      const value = parseFloat(document.getElementById('lead-budget')?.value) || 0;

      if (!company || !contactName) {
        alert('Please provide Company Name and Contact Person.');
        return;
      }

      const currObj = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

      appStore.addLead({
        company,
        contactName,
        email,
        serviceType,
        value,
        currencySymbol: currObj.symbol,
        stage: 'new-inquiry'
      });

      form.reset();
      if (modal) modal.classList.remove('active');

      showToast(`Lead "${company}" saved successfully!`, '🎯');

      // Re-render kanban if currently visible
      const kanbanContainer = document.getElementById('kanban-component-container');
      if (kanbanContainer && kanbanContainer.offsetParent !== null) {
        renderKanbanBoard(kanbanContainer);
      }
    });
  }
}

/* Render Main UI Modules */
function renderUI(state) {
  const tenant = appStore.getActiveTenant();

  // Update Currency Select Sync
  const currSelect = document.getElementById('global-currency-select');
  if (currSelect) currSelect.value = tenant.currency || 'INR';

  // Update Header & Dashboard Metrics
  const titleEl = document.getElementById('workspace-title-display');
  if (titleEl) titleEl.textContent = `${tenant.name} Overview`;

  const mrrEl = document.getElementById('dash-mrr');
  if (mrrEl) mrrEl.textContent = `${tenant.currencySymbol}${tenant.mrr.toLocaleString()}`;

  const clientsEl = document.getElementById('dash-clients');
  if (clientsEl) clientsEl.textContent = tenant.clientsCount;

  const projectsEl = document.getElementById('dash-projects');
  if (projectsEl) projectsEl.textContent = tenant.activeProjects;

  const teamEl = document.getElementById('dash-team');
  if (teamEl) teamEl.textContent = `${tenant.teamSize} Member`;

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
      <td style="font-weight: 700; color: var(--color-emerald);">${lead.currencySymbol || '₹'}${lead.value.toLocaleString()}</td>
      <td><span class="score-tag">Score ${lead.score}</span></td>
      <td><span class="badge badge-warning"><span class="badge-dot"></span> ${escapeHtml(lead.stage)}</span></td>
    </tr>
  `).join('');
}

function renderClientsTable() {
  const container = document.getElementById('clients-table-body');
  if (!container) return;

  const clients = appStore.getClients();
  const tenant = appStore.getActiveTenant();

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
      <td style="font-weight: 600;">${tenant.currencySymbol}${client.retainerMonthly.toLocaleString()} / mo</td>
      <td style="font-weight: 700; color: var(--color-emerald);">${tenant.currencySymbol}${client.ltv.toLocaleString()}</td>
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
      <td style="font-weight: 700; color: var(--color-emerald);">${inv.currencySymbol || '₹'}${inv.amount.toLocaleString()}</td>
      <td>${escapeHtml(inv.dueDate)}</td>
      <td><span class="badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Pending' ? 'badge-warning' : 'badge-danger'}"><span class="badge-dot"></span> ${inv.status}</span></td>
    </tr>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
