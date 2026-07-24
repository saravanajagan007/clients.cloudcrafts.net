/* AgencyOS — Module 10 & 11: Project & Task Management Board Component */
import { appStore } from '../state.js';

export function renderProjectsTasks(containerEl) {
  if (!containerEl) return;

  const projects = appStore.getProjects();

  const tasks = [
    { id: 'T-1', title: 'Complete Glassmorphism Component Wireframes', project: 'Novus FinTech Dashboard', priority: 'High', assignee: 'Marcus V.', due: 'Jul 28', status: 'In Progress' },
    { id: 'T-2', title: '3D WebGL Shader Optimization', project: 'AeroDynamics Global Web', priority: 'Urgent', assignee: 'Devon W.', due: 'Jul 30', status: 'Review' },
    { id: 'T-3', title: 'Mobile Staging QA & Security Audit', project: 'Verve Health WebApp', priority: 'Medium', assignee: 'Sarah J.', due: 'Jul 26', status: 'Completed' }
  ];

  containerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Active Agency Projects -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Active Client Projects & Milestone Tracker</h3>
          <button class="action-btn btn-sm primary" onclick="alert('Creating new client project...')">+ New Project</button>
        </div>

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
                <span>Budget: <strong style="color: var(--color-emerald);">$${p.budget.toLocaleString()}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Task Kanban & List View -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Task Management & Team Deliverables</h3>
          <button class="action-btn btn-sm" onclick="alert('Adding task...')">+ Create Task</button>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Title</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${tasks.map(t => `
              <tr>
                <td><strong>${t.id}</strong></td>
                <td>${escapeHtml(t.title)}</td>
                <td><span style="font-size: 0.82rem; color: var(--text-muted);">${escapeHtml(t.project)}</span></td>
                <td><span class="badge ${t.priority === 'Urgent' ? 'badge-danger' : 'badge-warning'}"><span class="badge-dot"></span> ${t.priority}</span></td>
                <td>👤 ${escapeHtml(t.assignee)}</td>
                <td>${t.due}</td>
                <td><span class="badge ${t.status === 'Completed' ? 'badge-success' : 'badge-warning'}"><span class="badge-dot"></span> ${t.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
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
