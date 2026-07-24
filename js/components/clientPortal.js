/* AgencyOS — Module 18: Client Self-Service Portal Engine */
import { appStore } from '../state.js';

export function renderClientPortalView(containerEl) {
  if (!containerEl) return;

  const user = appStore.getState().currentUser || { name: 'Client Partner', company: 'Novus FinTech', email: 'client@novusfintech.com' };
  const projects = appStore.getProjects();
  const proposals = appStore.getProposals();
  const invoices = appStore.getInvoices();
  const tickets = appStore.getTickets();
  const tenant = appStore.getActiveTenant();

  containerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Welcome Header -->
      <div class="glass-panel" style="margin-bottom: 0; background: linear-gradient(135deg, rgba(14, 21, 38, 0.9), rgba(99, 102, 241, 0.15)); border: 1px solid var(--border-glass-bright);">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span class="badge badge-success"><span class="badge-dot"></span> Verified Client Session</span>
              <span style="font-size: 0.78rem; color: var(--color-cyan); font-weight: 600;">${escapeHtml(user.email)}</span>
            </div>
            <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800;">Welcome to ${escapeHtml(user.company || user.name)} Client Portal</h2>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.25rem;">Track deliverable milestones, sign digital proposals, pay invoices, and open support tickets.</p>
          </div>
          <button class="action-btn primary" id="btn-create-support-ticket">🎧 + Open Support Ticket</button>
        </div>
      </div>

      <!-- Scoped Client Deliverables -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Your Active Deliverables & Milestones</h3>
        </div>

        ${projects.length === 0 ? `
          <div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
            No active project deliverables listed for ${escapeHtml(user.company || 'your account')} yet.
          </div>
        ` : `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;">
            ${projects.map(p => `
              <div style="background: rgba(10, 15, 26, 0.6); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span class="service-tag">${escapeHtml(p.serviceCategory)}</span>
                  <span class="badge badge-success"><span class="badge-dot"></span> ${escapeHtml(p.status)}</span>
                </div>
                <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 0.35rem;">${escapeHtml(p.title)}</h4>
                
                <div style="margin: 1rem 0;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.35rem;">
                    <span>Development Progress:</span>
                    <strong>${p.progress}%</strong>
                  </div>
                  <div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${p.progress}%; height: 100%; background: linear-gradient(90deg, var(--color-indigo), var(--color-cyan));"></div>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
                  <span>Target Launch: <strong>${p.deadline}</strong></span>
                  <span>Approved Budget: <strong>${tenant.currencySymbol}${p.budget.toLocaleString()}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Scoped Client Invoices & Support Tickets Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <!-- Invoices -->
        <div class="glass-panel" style="margin-bottom: 0;">
          <div class="panel-header">
            <h3>Your Invoices & Billing Statements</h3>
          </div>
          ${invoices.length === 0 ? `
            <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              No billing statements found.
            </div>
          ` : `
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${invoices.map(inv => `
                  <tr>
                    <td><strong>#${escapeHtml(inv.id)}</strong></td>
                    <td style="font-weight: 700; color: var(--color-emerald);">${inv.currencySymbol || '₹'}${inv.amount.toLocaleString()}</td>
                    <td><span class="badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}"><span class="badge-dot"></span> ${inv.status}</span></td>
                    <td>
                      ${inv.status === 'Paid' ? `
                        <span style="font-size: 0.78rem; color: var(--color-emerald);">Receipt Available</span>
                      ` : `
                        <button class="action-btn btn-sm primary btn-pay-client-inv" data-inv-id="${inv.id}">💳 Pay Online</button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>

        <!-- Support Tickets -->
        <div class="glass-panel" style="margin-bottom: 0;">
          <div class="panel-header">
            <h3>Your Active Support Tickets</h3>
          </div>
          ${tickets.length === 0 ? `
            <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              No support tickets opened. Need help? Click <strong>+ Open Support Ticket</strong> above.
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${tickets.map(t => `
                <div style="background: rgba(10, 15, 26, 0.6); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.25rem;">
                    <span style="color: var(--color-cyan); font-weight: 700;">#${t.id}</span>
                    <span class="badge badge-warning"><span class="badge-dot"></span> ${t.status}</span>
                  </div>
                  <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.25rem;">${escapeHtml(t.subject)}</h4>
                  <p style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(t.details)}</p>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  // Attach Open Ticket handler
  const btnTicket = containerEl.querySelector('#btn-create-support-ticket');
  if (btnTicket) {
    btnTicket.addEventListener('click', () => {
      const subject = prompt('Enter Ticket Subject (e.g. Need SSL Renewal assistance):');
      if (!subject || !subject.trim()) return;
      const details = prompt('Describe issue details:') || 'Technical support request';

      appStore.addTicket({
        subject: subject.trim(),
        details: details.trim()
      });

      renderClientPortalView(containerEl);
    });
  }

  // Attach Pay Online simulation
  containerEl.querySelectorAll('.btn-pay-client-inv').forEach(btn => {
    btn.addEventListener('click', () => {
      const invId = btn.getAttribute('data-inv-id');
      const invoices = appStore.getInvoices();
      const inv = invoices.find(i => i.id === invId);
      if (inv) {
        inv.status = 'Paid';
        appStore.addActivityLog(`Invoice ${inv.id} paid online by client ${user.company || user.email}`, 'payment');
        appStore.notify();
        alert(`Payment Successful! Invoice ${inv.id} marked as Paid.`);
        renderClientPortalView(containerEl);
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
