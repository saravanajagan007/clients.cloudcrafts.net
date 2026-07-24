/* AgencyOS — Module 10 & 11: Project & Task Management Board Component */
import { appStore } from '../state.js';

export function renderProjectsTasks(containerEl) {
  if (!containerEl) return;

  const projects = appStore.getProjects();
  const tenant = appStore.getActiveTenant();

  containerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Active Agency Projects -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Active Client Projects & Milestone Tracker</h3>
          <button class="action-btn btn-sm primary" id="btn-create-project">+ New Project</button>
        </div>

        ${projects.length === 0 ? `
          <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted);">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🚀</div>
            <h4 style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.35rem;">No Active Projects</h4>
            <p style="font-size: 0.85rem; max-width: 400px; margin: 0 auto 1rem;">Won leads and client proposals will populate active milestone projects here.</p>
            <button class="action-btn primary btn-sm" id="btn-create-first-project">+ Create Project</button>
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
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">Client: <strong>${escapeHtml(p.clientName)}</strong></p>

                <div style="margin-bottom: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                    <span style="color: var(--text-dim);">Milestone Progress:</span>
                    <strong>${p.progress}%</strong>
                  </div>
                  <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                    <div style="width: ${p.progress}%; height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-cyan));"></div>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted);">
                  <span>Deadline: <strong>${p.deadline}</strong></span>
                  <span>Budget: <strong style="color: var(--color-emerald);">${tenant.currencySymbol}${p.budget.toLocaleString()}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  const btnCreate = containerEl.querySelector('#btn-create-project');
  const btnCreateFirst = containerEl.querySelector('#btn-create-first-project');

  [btnCreate, btnCreateFirst].filter(Boolean).forEach(btn => {
    btn.addEventListener('click', () => {
      const title = prompt('Enter Project Title:') || 'New Client Web Project';
      const clientName = prompt('Enter Client Company Name:') || 'Enterprise Client';
      const budget = parseFloat(prompt('Enter Project Budget:') || '25000');

      const state = appStore.getState();
      state.projects.unshift({
        id: `proj-${Date.now()}`,
        tenantId: appStore.getActiveTenant().id,
        clientId: 'c-new',
        clientName,
        title,
        serviceCategory: 'Web & Software Development',
        progress: 15,
        deadline: '2026-09-15',
        budget,
        status: 'In Progress'
      });

      appStore.addActivityLog(`Created project "${title}" for ${clientName}`, 'project');
      renderProjectsTasks(containerEl);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
