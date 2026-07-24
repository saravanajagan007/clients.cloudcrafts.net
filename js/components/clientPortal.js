/* AgencyOS — End-Client Portal View Simulator Component */
import { appStore } from '../state.js';

export function renderClientPortalView(containerEl) {
  if (!containerEl) return;

  const activeTenant = appStore.getActiveTenant();
  const clients = appStore.getClients();
  const activeClient = clients[0] || { name: 'Novus FinTech Systems' };
  const projects = appStore.getProjects();
  const invoices = appStore.getInvoices();

  containerEl.innerHTML = `
    <div class="glass-panel" style="border: 1px solid rgba(16, 185, 129, 0.3); background: linear-gradient(135deg, rgba(19, 27, 46, 0.85), rgba(16, 185, 129, 0.08));">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
        <div>
          <span class="badge badge-success" style="margin-bottom: 0.5rem;"><span class="badge-dot"></span> End-Client Self-Service View</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.35rem;">Client Portal: ${escapeHtml(activeClient.name)}</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem;">This is the exact portal interface experienced by clients of <strong>${escapeHtml(activeTenant.name)}</strong>.</p>
        </div>
        <button class="action-btn" onclick="document.querySelector('[data-view=\\'dashboard\\']').click()">⬅️ Return to Agency OS Admin</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
        <div class="metric-card">
          <div class="metric-header">
            <span>Active Project</span>
            <div class="metric-icon">🚀</div>
          </div>
          <div class="metric-value" style="font-size: 1.25rem;">FinTech Dashboard</div>
          <div class="metric-trend trend-up">78% Progress · Milestone 2</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Monthly Retainer</span>
            <div class="metric-icon">💳</div>
          </div>
          <div class="metric-value">$3,500 / mo</div>
          <div class="metric-trend trend-up">Current status: Active</div>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span>Pending Invoices</span>
            <div class="metric-icon">📄</div>
          </div>
          <div class="metric-value">$0.00</div>
          <div class="metric-trend trend-up">All invoices paid</div>
        </div>
      </div>

      <!-- Client Project Milestone Status -->
      <div style="background: rgba(10, 15, 26, 0.6); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.75rem;">Active Deliverable Deliveries</h4>
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.35rem;">
            <span>FinTech Dashboard & Customer Portal Redesign</span>
            <strong>78%</strong>
          </div>
          <div style="height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
            <div style="width: 78%; height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-cyan)); border-radius: 4px;"></div>
          </div>
        </div>
      </div>

      <!-- Client Quick Actions -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button class="action-btn primary" onclick="alert('Opening support ticket form for client...')">💬 Raise Support Request</button>
        <button class="action-btn" onclick="alert('Downloading latest invoice PDF...')">📄 Download Statement PDF</button>
        <button class="action-btn" onclick="alert('Opening Figma design proof review...')">🎨 Review Design Proofs (Figma)</button>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
