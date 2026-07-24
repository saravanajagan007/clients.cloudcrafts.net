/* AgencyOS — Module 3 & 7: CRM Chronological Activity Timeline & Follow-up Engine */
import { appStore } from '../state.js';

export function renderCrmTimeline(containerEl) {
  if (!containerEl) return;

  const activities = appStore.getActivityLogs();
  const leads = appStore.getLeads();

  containerEl.innerHTML = `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
      <!-- Timeline Feed -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>CRM Chronological Activity Stream</h3>
          <button class="action-btn btn-sm primary" id="btn-log-new-activity">+ Log Activity</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${activities.length === 0 ? `
            <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted);">
              <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🕒</div>
              <h4 style="font-family: var(--font-heading); font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.35rem;">No Activity Logged Yet</h4>
              <p style="font-size: 0.85rem; max-width: 380px; margin: 0 auto 1rem;">All calls, meetings, WhatsApp messages, proposals, and lead stage changes will appear here chronologically.</p>
              <button class="action-btn primary btn-sm" id="btn-log-first-activity">+ Log First Activity</button>
            </div>
          ` : activities.map(act => `
            <div style="display: flex; gap: 1rem; background: rgba(10, 15, 26, 0.6); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                ${act.type === 'whatsapp' ? '💬' : act.type === 'email' ? '✉️' : act.type === 'call' ? '📞' : act.type === 'payment' ? '💳' : act.type === 'lead' ? '🎯' : '🚀'}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <strong style="font-size: 0.9rem;">Workspace Activity</strong>
                  <span style="font-size: 0.78rem; color: var(--text-dim);">${escapeHtml(act.time)}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(act.text)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Smart Follow-ups Widget -->
      <div class="glass-panel" style="margin-bottom: 0;">
        <div class="panel-header">
          <h3>Smart Follow-up Reminders</h3>
          <span class="badge ${leads.length > 0 ? 'badge-warning' : 'badge-success'}">
            <span class="badge-dot"></span> ${leads.length} Active
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${leads.length === 0 ? `
            <div style="padding: 1.5rem 0.5rem; text-align: center; color: var(--text-dim); font-size: 0.82rem;">
              No follow-ups due. Add new leads to schedule follow-up reminders.
            </div>
          ` : leads.map(lead => `
            <div style="background: rgba(10, 15, 26, 0.6); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
              <div style="font-size: 0.78rem; color: var(--color-cyan); font-weight: 600; margin-bottom: 0.2rem;">Follow-up due: Today</div>
              <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">${escapeHtml(lead.company)}</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.65rem;">Contact: ${escapeHtml(lead.contactName)} (${escapeHtml(lead.serviceType)})</p>
              <button class="action-btn btn-sm primary btn-complete-followup" data-lead-name="${escapeHtml(lead.company)}">Mark Completed</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach log activity button listeners
  const btnLog = containerEl.querySelector('#btn-log-new-activity');
  const btnLogFirst = containerEl.querySelector('#btn-log-first-activity');
  
  [btnLog, btnLogFirst].filter(Boolean).forEach(btn => {
    btn.addEventListener('click', () => {
      openActivityLogPrompt(containerEl);
    });
  });

  containerEl.querySelectorAll('.btn-complete-followup').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-lead-name');
      appStore.addActivityLog(`Follow-up completed for ${name}`, 'call');
      renderCrmTimeline(containerEl);
    });
  });
}

function openActivityLogPrompt(containerEl) {
  const text = prompt('Enter Activity Note (e.g. "Called Client regarding requirement scope"):');
  if (text && text.trim()) {
    appStore.addActivityLog(text.trim(), 'note');
    renderCrmTimeline(containerEl);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
