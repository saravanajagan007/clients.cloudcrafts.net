/* AgencyOS — Module 3 & 7: CRM Chronological Activity Timeline & Follow-up Engine */
import { appStore } from '../state.js';

export function renderCrmTimeline(containerEl) {
  if (!containerEl) return;

  const activities = [
    { type: 'whatsapp', text: 'WhatsApp message sent to Elena Rostova: "Proposal #PROP-801 breakdown attached"', time: '10 mins ago', author: 'Marcus Vance' },
    { type: 'email', text: 'Email opened by Dr. Robert Chen (AeroDynamics Aerospace)', time: '45 mins ago', author: 'System Tracker' },
    { type: 'call', text: 'Discovery Call completed with Julian Vance (Krypton Luxury) — 25 mins', time: '2 hours ago', author: 'Sarah Jenkins' },
    { type: 'payment', text: 'Payment of $12,250 processed via Stripe (Invoice #INV-2026-001)', time: '4 hours ago', author: 'Stripe Integration' },
    { type: 'meeting', text: 'Scheduled Strategy Meeting with Verve Health team for July 28', time: '1 day ago', author: 'Alex Mercer' }
  ];

  const followups = [
    { client: 'Krypton Luxury E-Commerce', type: 'Call', text: 'Follow up on Shopify Plus scope proposal', due: 'Today, 4:00 PM', status: 'Pending' },
    { client: 'Lumina Solar Technologies', type: 'WhatsApp', text: 'Send landing page design portfolio samples', due: 'Tomorrow, 11:00 AM', status: 'Pending' }
  ];

  containerEl.innerHTML = `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem;">
      <!-- Timeline Feed -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3>CRM Chronological Activity Stream</h3>
          <button class="action-btn btn-sm primary" id="btn-add-activity">+ Log Activity</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${activities.map(act => `
            <div style="display: flex; gap: 1rem; background: rgba(10, 15, 26, 0.6); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                ${act.type === 'whatsapp' ? '💬' : act.type === 'email' ? '✉️' : act.type === 'call' ? '📞' : act.type === 'payment' ? '💳' : '📅'}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                  <strong style="font-size: 0.9rem;">${escapeHtml(act.author)}</strong>
                  <span style="font-size: 0.78rem; color: var(--text-dim);">${escapeHtml(act.time)}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(act.text)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Smart Follow-ups Widget -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3>Smart Follow-up Reminders</h3>
          <span class="badge badge-warning"><span class="badge-dot"></span> 2 Due</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${followups.map(f => `
            <div style="background: rgba(10, 15, 26, 0.6); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
              <div style="font-size: 0.78rem; color: var(--color-cyan); font-weight: 600; margin-bottom: 0.2rem;">${f.type} · ${f.due}</div>
              <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">${escapeHtml(f.client)}</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.65rem;">${escapeHtml(f.text)}</p>
              <button class="action-btn btn-sm primary" onclick="alert('Follow-up completed!')">Mark Completed</button>
            </div>
          `).join('')}
        </div>
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
