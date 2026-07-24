/* AgencyOS — Visual Workflow Automation Engine Component */

export function renderAutomationEngine(containerEl) {
  if (!containerEl) return;

  const workflows = [
    {
      id: 'wf-1',
      name: 'New Lead Auto-Nurture & Sales Assignment',
      trigger: 'Website Form / Lead Created',
      steps: ['Assign to Salesperson', 'Send Welcome Email via Resend', 'Schedule Follow-up Task in 48h'],
      active: true
    },
    {
      id: 'wf-2',
      name: 'Proposal Accepted -> Auto Create Project & Invoice',
      trigger: 'Proposal E-Sign Accepted',
      steps: ['Create Project in Client Portal', 'Generate Milestone 1 Invoice', 'Notify Slack #agency-wins'],
      active: true
    },
    {
      id: 'wf-3',
      name: 'Overdue Retainer Escalation & WhatsApp Alert',
      trigger: 'Invoice Overdue > 3 Days',
      steps: ['Send Escalation Email to Finance Contact', 'Send WhatsApp Reminder', 'Pause Non-Critical Sprint Tasks'],
      active: false
    }
  ];

  containerEl.innerHTML = `
    <div class="panel-header" style="margin-bottom: 1.5rem;">
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem;">Visual Workflow Automation Builder</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Build no-code automated triggers, WhatsApp notifications, and stage movements.</p>
      </div>
      <button class="action-btn primary" id="btn-create-workflow">+ Create New Workflow</button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      ${workflows.map(wf => `
        <div class="glass-panel" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 1.05rem;">⚡ ${escapeHtml(wf.name)}</h4>
              <p style="font-size: 0.8rem; color: var(--color-cyan); margin-top: 0.2rem;">Trigger: <strong>${escapeHtml(wf.trigger)}</strong></p>
            </div>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${wf.active ? 'Active' : 'Disabled'}</span>
              <input type="checkbox" ${wf.active ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--color-primary);" />
            </label>
          </div>

          <div class="workflow-node-chain" style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; background: rgba(10, 15, 26, 0.6); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
            <div style="background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: var(--color-cyan); padding: 0.4rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 600;">
              🏁 ${escapeHtml(wf.trigger)}
            </div>
            
            ${wf.steps.map(step => `
              <span style="color: var(--text-dim); font-size: 0.8rem;">➔</span>
              <div style="background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--color-primary); padding: 0.4rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 500;">
                ⚙️ ${escapeHtml(step)}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
